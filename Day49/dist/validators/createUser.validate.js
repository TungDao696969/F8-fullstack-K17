"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Tên không được để trống"),
    email: zod_1.default
        .string()
        .min(1, "Email không được để trống")
        .pipe(zod_1.default.email("Email không đúng định dạng")),
    password: zod_1.default.string().min(6, "Mật khẩu phải từ 6 ký tự"),
});
//# sourceMappingURL=createUser.validate.js.map