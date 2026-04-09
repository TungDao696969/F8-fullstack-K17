"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
exports.authController = {
    async register(req, res) {
        const user = await auth_service_1.authService.register(req.body);
        res.status(201).json({
            success: true,
            message: "Register success",
            data: user,
        });
    },
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email or password not correct",
            });
        }
        const token = await auth_service_1.authService.login(email, password);
        res.status(200).json({
            success: true,
            message: "Login success",
            data: token,
        });
    },
    async profile(req, res) {
        res.json({
            success: true,
            message: "Get user profile success",
            data: req.user,
        });
    },
    async logout(req, res) {
        const token = req.token;
        await auth_service_1.authService.logout(token, req.user.id);
        res.json({
            success: true,
            message: "Logout success",
        });
    },
    async refreshToken(req, res) {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required",
            });
        }
        const tokens = await auth_service_1.authService.refreshToken(refreshToken);
        res.status(200).json({
            success: true,
            message: "Refresh token success",
            data: tokens,
        });
    },
    async verifyEmail(req, res) {
        const { userId, code } = req.body;
        const result = await auth_service_1.authService.verifyEmail(userId, code);
        res.json({
            success: true,
            message: result.message,
        });
    },
};
//# sourceMappingURL=auth.controller.js.map