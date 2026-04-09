"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const hashing_1 = require("../utils/hashing");
const jwt_service_1 = require("./jwt.service");
const user_service_1 = require("./user.service");
const redis_1 = require("../utils/redis");
const prisma_1 = require("../utils/prisma");
const mail_1 = require("../utils/mail");
exports.authService = {
    async register(userData) {
        //Hashing password
        const passwordHash = (0, hashing_1.hashPassword)(userData.password);
        //Gọi userService để thêm vào database
        const user = await user_service_1.userService.create({
            ...userData,
            password: passwordHash,
            is_verified: false,
        });
        // Tạo mã 6 số
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        //Lưu Redis (10 phút) - tạm comment để test
        // await redisClient.set(`verify:${user.id}`, code, {
        //   EX: 600, // 600s = 10 phút
        // });
        //Gửi email xác thực, chào mừng (không block)
        (0, mail_1.sendVerifyEmail)(user.email, code, user.name).catch((error) => {
            console.error("Email send failed:", error);
        });
        //Tạo token (Gọi jwtService)
        const accessToken = jwt_service_1.jwtService.createAccessToken(user.id);
        return { accessToken };
    },
    async login(email, password) {
        //Find email
        const user = await user_service_1.userService.findByEmail(email);
        if (!user) {
            throw new Error("Email or password not correct");
        }
        //Lấy password hash
        const passwordHash = user.password;
        //Verify password
        if (!(0, hashing_1.verifyPassword)(password, passwordHash)) {
            throw new Error("Email or password not correct");
        }
        if (!user.is_verified) {
            throw new Error("Tài khoản chưa xác thực. Vui lòng kiểm tra email hoặc yêu cầu gửi lại mã.");
        }
        const { accessToken, refreshToken, accessJti, refreshJti } = (0, jwt_service_1.generateTokens)(user.id);
        // //Tạo token
        // const accessToken = jwtService.createAccessToken(user.id);
        // const refreshToken = jwtService.createRefreshToken(user.id);
        // 5. Lưu refresh token vào Redis
        await redis_1.redisClient.setEx(`refresh:${user.id}:${refreshJti}`, 7 * 24 * 60 * 60, // 7 ngày
        JSON.stringify({
            userId: user.id,
            accessJti,
            refreshJti,
        }));
        return { accessToken, refreshToken };
    },
    async profile(token) {
        //verfify token
        const decoded = jwt_service_1.jwtService.verifyAccessToken(token);
        if (!decoded) {
            return false;
        }
        //Check blacklist
        const blacklist = await redis_1.redisClient.get(`blacklist:${token}`);
        if (blacklist) {
            return false;
        }
        const { userId } = decoded;
        //Query db
        const user = await user_service_1.userService.find(userId);
        //Check user block không? verify chưa?
        return user;
    },
    async logout(token, userId) {
        const { exp } = jwt_service_1.jwtService.decodedToken(token);
        const seconds = Math.ceil(exp - Date.now() / 1000);
        await redis_1.redisClient.setEx(`blacklist:${token}`, seconds, "1");
        // Xóa toàn bộ refresh token của user này trong database
        // await prisma.refreshToken.deleteMany({ where: { userId } });
        return true;
    },
    async refreshToken(token) {
        // kiểm tra chữ kí của refreshToken
        const decoded = jwt_service_1.jwtService.verifyRefreshToken(token);
        if (!decoded) {
            throw new Error("Refresh token invalid or expired");
        }
        // kiểm tra token có tồn tại trong database không
        const storedToken = await prisma_1.prisma.refreshToken.findUnique({
            where: { token },
        });
        if (!storedToken) {
            throw new Error("Refresh token not found");
        }
        //Kiểm tra token đã hết hạn chưa
        if (storedToken.expiresAt < new Date()) {
            throw new Error("Refresh token expired");
        }
        const { userId } = decoded;
        //Xóa refresh token cũ trong database
        await prisma_1.prisma.refreshToken.delete({ where: { token } });
        // Tạo cặp token mới
        const newAccessToken = jwt_service_1.jwtService.createAccessToken(userId);
        const newRefreshToken = jwt_service_1.jwtService.createRefreshToken(userId);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await prisma_1.prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId,
                expiresAt,
            },
        });
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    },
    async verifyEmail(userId, code) {
        const key = `verify:${userId}`;
        const storedCode = await redis_1.redisClient.get(key);
        if (!storedCode) {
            throw new Error("Mã đã hết hạn");
        }
        if (storedCode !== code) {
            throw new Error("Mã không đúng");
        }
        // cập nhật DB
        await prisma_1.prisma.user.update({
            where: { id: userId },
            data: { is_verified: true },
        });
        // xóa redis
        await redis_1.redisClient.del(key);
        return {
            message: "Xác thực thành công",
        };
    },
};
//# sourceMappingURL=auth.service.js.map