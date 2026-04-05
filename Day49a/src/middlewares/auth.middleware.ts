import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"]?.split(" ").slice(-1).join();
  if (!token) {
    return res.status(401).json({
      message: "Token invalid",
      success: false,
    });
  }
  const user = await authService.profile(token);
  if (!user) {
    return res.status(401).json({
      message: "Token invalid",
      success: false,
    });
  }
  req.user = user;
  req.token = token;
  next();
};
