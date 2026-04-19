"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const querystring_1 = __importDefault(require("querystring"));
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("../utils/jwt");
exports.authController = {
    // Redirect Google
    googleLogin(req, res) {
        const params = querystring_1.default.stringify({
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
    async googleCallback(req, res) {
        const FRONTEND_URL = "http://localhost:5173";
        try {
            const { code } = req.query;
            if (!code) {
                return res.status(400).json({ message: "Missing code" });
            }
            const user = await auth_service_1.authService.handleGoogleLogin(code);
            const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(user.id);
            return res.redirect(`${FRONTEND_URL}?accessToken=${accessToken}`);
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
};
//# sourceMappingURL=auth.controller.js.map