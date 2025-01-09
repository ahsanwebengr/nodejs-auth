import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const userRegister = asyncHandler(async (req, res, next) => {
  const { full_name, email, password, username, profile_pic } = req.body;

  if (
    [full_name, email, username, password, profile_pic].some(
      (field) => field?.trim() === ''
    )
  ) {
    next(
      new ApiError(
        400,
        'Full Name, Email, Username, Profile Pic and Password are required'
      )
    );
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existedUser) {
    next(new ApiError(409, 'User with email or username already exists'));
  }

  const profilePicPath = req.file ? req.file.filename : null;

  const user = await User.create({
    username: username.toLowerCase(),
    password,
    email,
    profile_pic: profilePicPath,
    full_name
  });

  await User.findById(user._id);

  return res
    .status(201)
    .json({ message: 'User created successfully', success: true });
});

const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, 'Email and Password is required'));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ApiError(404, 'Invalid email or password'));
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return next(new ApiError(401, 'Invalid email or password'));
  }

  const token = user.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true
  };

  user.access_token.push(token);

  await user.save();

  return res.status(200).cookie('access_token', token, options).json({
    message: 'User Logged in successfully',
    success: true,
    accessToken: token
  });
});

const userLogout = asyncHandler(async (req, res, next) => {
  const { access_token } = req.cookies;

  if (!access_token) {
    return res
      .status(400)
      .json({ message: 'You are already logged out', success: false });
  }

  const user = await User.findOneAndUpdate(
    { access_token },
    { $pull: { access_token } },
    { new: true }
  );

  if (!user) {
    return next(new ApiError(404, 'User not found or session expired'));
  }

  return res
    .status(200)
    .clearCookie('access_token')
    .json({ message: 'User logged out successfully', success: true });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ApiError(404, 'User not found'));
  }

  const OTP = Math.floor(100000 + Math.random() * 900000);

  user.otp_code = OTP;
  await user.save();

  return res
    .status(200)
    .json({ message: 'OTP send successfully', OTP, success: true });
});

const verifyOtp = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return next(new ApiError(400, 'Email and OTP are required'));
  }

  const user = await User.findOne({ email, otp_code: otp });

  if (!user) {
    return next(new ApiError(404, 'Invalid OTP Code, Please try again!'));
  }

  if (Date.now() > user.otp_expiry) {
    return next(new ApiError(400, 'OTP has expired, please request a new one'));
  }

  user.is_otp_verified = true;
  user.otp_code = null;
  await user.save();

  return res
    .status(200)
    .json({ message: 'OTP is verified successfully', success: true });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, 'Email and Password are required'));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ApiError(404, 'User not found'));
  }

  if (!user.is_otp_verified) {
    return next(
      new ApiError(403, 'OTP verification is required to reset the password')
    );
  }

  user.password = password;
  user.is_otp_verified = false;
  await user.save();

  return res
    .status(200)
    .json({ message: 'Password reset successfully', success: true });
});

export {
  userRegister,
  userLogin,
  userLogout,
  forgotPassword,
  verifyOtp,
  resetPassword
};
