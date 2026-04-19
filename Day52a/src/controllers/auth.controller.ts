import { Request, Response } from "express";
import querystring from "querystring";
import { authService } from "../services/auth.service";
import { generateTokens } from "../utils/jwt";

export const authController = {
  // Redirect Google
  googleLogin(req: Request, res: Response) {
    const params = querystring.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    });

    const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    console.log("URL:", url);
    res.redirect(url);
  },

  // Callback
  async googleCallback(req: Request, res: Response) {
    const FRONTEND_URL = "http://localhost:5173";

    try {
      const { code } = req.query;

      if (!code) {
        return res.status(400).json({ message: "Missing code" });
      }

      const user = await authService.handleGoogleLogin(code as string);

      const { accessToken, refreshToken } = generateTokens(user.id);

      return res.redirect(`${FRONTEND_URL}?accessToken=${accessToken}`);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
