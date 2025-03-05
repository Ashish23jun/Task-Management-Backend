import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return; // ✅ Return after sending response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    req.user = { id: decoded.userId }; // ✅ Attach user ID to request
    next(); // ✅ Call next() after successful validation
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
    return; // ✅ Ensure the function ends after sending a response
  }
};
