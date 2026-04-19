import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async register(req: Request, res: Response) {
    const user = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: "Register success",
      data: user,
    });
  },
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const token = await authService.login(email, password);

      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login success",
        data: {
          accessToken: token.accessToken,
        },
      });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  async profile(req: Request, res: Response) {
    res.json({
      success: true,
      message: "Get user profile success",
      data: req.user,
    });
  },
  async logout(req: Request, res: Response) {
    const token = req.token;
    await authService.logout(token as string, req.user!.id);
    res.json({
      success: true,
      message: "Logout success",
    });
  },

  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Không có refresh token",
        });
      }

      const tokens = await authService.refreshToken(refreshToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        success: true,
        message: "Refresh token thành công",
        data: {
          accessToken: tokens.accessToken,
        },
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message || "Refresh token thất bại",
      });
    }
  },

  async verifyEmail(req: Request, res: Response) {
    try {
      const { userId, code } = req.body;
      const result = await authService.verifyEmail(userId, code);
      res.json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: error.message || "Xác thực thất bại",
      });
    }
  },

  async resendVerifyEmail(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const result = await authService.resendVerifyEmail(userId);

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const result = await authService.forgotPassword(email);

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const { userId, code, newPassword } = req.body;

      const result = await authService.resetPassword(userId, code, newPassword);

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  googleRedirect(req: Request, res: Response) {
    const url = `https://accounts.google.com/o/oauth2/v2/auth`;
    const params = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      response_type: "code",
      scope: "email profile",
      access_type: "offline",
    };
    const urlRedirect = `${url}?${new URLSearchParams(params as unknown as URLSearchParams).toString()}`;
    res.redirect(urlRedirect);
  },
  async googleCallback(req: Request, res: Response) {
    const { code } = req.query;
    const response = await fetch(`https://oauth2.googleapis.com/token`, {
      method: "POST",
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
      }),
    });
    const { access_token } = await response.json();

    const responseUser = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    const userGoogle = await responseUser.json();
    res.json(userGoogle);
  },
};
