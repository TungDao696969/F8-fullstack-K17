"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
// src/utils/jwt.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens = (userId) => {
    const accessSecret = process.env.JWT_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const accessOptions = {
        expiresIn: (process.env.JWT_EXPIRED || "15m"),
    };
    const refreshOptions = {
        expiresIn: (process.env.JWT_REFRESH_EXPIRED ||
            "7d"),
    };
    const accessToken = jsonwebtoken_1.default.sign({ userId }, accessSecret, accessOptions);
    const refreshToken = jsonwebtoken_1.default.sign({ userId }, refreshSecret, refreshOptions);
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
//# sourceMappingURL=jwt.js.map