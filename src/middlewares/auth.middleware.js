import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';

const isAuthenticate = asyncHandler((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorized, Please login first', success: false });
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  req.user = decoded;

  next();
});

export { isAuthenticate };
