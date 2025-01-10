import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { ACCESS_TOKEN_SECRET } from '../configs/env.config.js';

const isAuthenticate = asyncHandler((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new ApiError(401, 'Unauthorized, Please login first'));
  }

  const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

  req.user = decoded;

  next();
});

export { isAuthenticate };
