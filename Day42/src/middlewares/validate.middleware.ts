import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateUser =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: errors,
      });
    }
    req.body = result.data;
    next();
  };
