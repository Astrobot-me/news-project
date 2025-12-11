import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../model/user.model.js";
import type { JwtPayload } from "../utlils/schema.js";
import type { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

// Authorization header i.e. Bearer Token

const protect = asyncHandler(async (req, res, next) => {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as unknown as string
        ) as JwtPayload;

        req.user = await User.findById(decoded.userId).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Token Failed, not authorized");
      }
    } else {
      res.status(401);
      throw new Error("No token found, not authorized");
    }
});

export { protect };
