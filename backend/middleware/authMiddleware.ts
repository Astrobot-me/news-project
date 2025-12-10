import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../src/model/user.model.js';


const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as unknown as string);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Token Failed, not authorized');
    }
  } else {
    res.status(401);
    throw new Error('No token found, not authorized');
  }
});

export { protect };