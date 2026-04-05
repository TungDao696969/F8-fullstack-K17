"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRED = process.env.JWT_EXPIRED;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRED = process.env.JWT_REFRESH_EXPIRED;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.jwtService = {
    createAccessToken(userId) {
        const payload = {
            userId,
        };
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRED,
        });
    },
    verifyAccessToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return decoded;
        }
        catch {
            return false;
        }
    },
    decodedToken(token) {
        return jsonwebtoken_1.default.decode(token);
    },
    createRefreshToken(userId) {
        const payload = { userId };
        return jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: JWT_REFRESH_EXPIRED,
        });
    },
    verifyRefreshToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
            return decoded;
        }
        catch {
            return false;
        }
    },
};
//jwtService
// - secret key
// - expired
//# sourceMappingURL=jwt.service.js.map