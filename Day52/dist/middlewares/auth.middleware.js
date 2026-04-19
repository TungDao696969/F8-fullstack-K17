"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_service_1 = require("../services/auth.service");
const authMiddleware = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ").slice(-1).join();
    if (!token) {
        return res.status(401).json({
            message: "Token invalid",
            success: false,
        });
    }
    const user = await auth_service_1.authService.profile(token);
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
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map