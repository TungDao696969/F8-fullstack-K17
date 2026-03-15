import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { loginUser } from "../services/auth.service";
export const register = (req: Request, res: Response) => {
  try {
    const user = registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "Register successfully",
      data: user,
    });
  } catch (error: any) {
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

export const login = (req: Request, res: Response) => {
  try {
    const user = loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      data: user,
    });
  } catch (error: any) {
    const status = error.status || 500;

    return res.status(status).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
