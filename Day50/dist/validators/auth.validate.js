"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_service_1 = require("../services/user.service");
exports.registerSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    email: zod_1.default
        .string()
        .min(1, "Email is required")
        .pipe(zod_1.default.email("Email invalid"))
        .refine(async (email) => {
        const existing = await user_service_1.userService.existingEmail(email);
        return !existing;
    }, {
        message: "Email is exist",
    }),
    password: zod_1.default.string().min(6, "Password min 6 charactor"),
});
//# sourceMappingURL=auth.validate.js.map