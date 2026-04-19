// src/utils/jwt.ts
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const generateTokens = (userId: string) => {
  const accessSecret: Secret = process.env.JWT_SECRET as string;
  const refreshSecret: Secret = process.env.JWT_REFRESH_SECRET as string;

  const accessOptions: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRED || "15m") as SignOptions["expiresIn"],
  };

  const refreshOptions: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRED ||
      "7d") as SignOptions["expiresIn"],
  };

  const accessToken = jwt.sign({ userId }, accessSecret, accessOptions);

  const refreshToken = jwt.sign({ userId }, refreshSecret, refreshOptions);

  return { accessToken, refreshToken };
};
