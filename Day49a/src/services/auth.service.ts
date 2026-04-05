import { JwtPayload } from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/hashing";
import { jwtService } from "./jwt.service";
import { userService } from "./user.service";
import { redisClient } from "../utils/redis";
import { prisma } from "../utils/prisma";
export const authService = {
  async register(userData: { name: string; email: string; password: string }) {
    //Hashing password
    const passwordHash = hashPassword(userData.password);
    //Gọi userService để thêm vào database
    const user = await userService.create({
      ...userData,
      password: passwordHash,
    });
    //Gửi email xác thực, chào mừng
    //Tạo token (Gọi jwtService)
    const accessToken = jwtService.createAccessToken(user.id);
    return { accessToken };
  },
  async login(email: string, password: string) {
    //Find email
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new Error("Email or password not correct");
    }
    //Lấy password hash
    const passwordHash = user.password;

    //Verify password
    if (!verifyPassword(password, passwordHash)) {
      throw new Error("Email or password not correct");
    }

    //Tạo token
    const accessToken = jwtService.createAccessToken(user.id);
    const refreshToken = jwtService.createRefreshToken(user.id);
    // lưu DB
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  },

  async profile(token: string) {
    //verfify token
    const decoded = jwtService.verifyAccessToken(token);
    if (!decoded) {
      return false;
    }
    //Check blacklist
    const blacklist = await redisClient.get(`blacklist:${token}`);
    if (blacklist) {
      return false;
    }
    const { userId } = decoded as JwtPayload;
    //Query db
    const user = await userService.find(userId);
    //Check user block không? verify chưa?
    return user;
  },
  async logout(token: string, userId: number) {
    const { exp } = jwtService.decodedToken(token) as JwtPayload;
    const seconds = Math.ceil(exp! - Date.now() / 1000);
    await redisClient.setEx(`blacklist:${token}`, seconds, "1");

    // Xóa toàn bộ refresh token của user này trong database
    await prisma.refreshToken.deleteMany({ where: { userId } });

    return true;
  },

  async refreshToken(token: string) {
    // kiểm tra chữ kí của refreshToken
    const decoded = jwtService.verifyRefreshToken(token);
    if (!decoded) {
      throw new Error("Refresh token invalid or expired");
    }

    // kiểm tra token có tồn tại trong database không
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
    });
    if (!storedToken) {
      throw new Error("Refresh token not found");
    }
    //Kiểm tra token đã hết hạn chưa
    if (storedToken.expiresAt < new Date()) {
      throw new Error("Refresh token expired");
    }
    const { userId } = decoded as JwtPayload;

    //Xóa refresh token cũ trong database
    await prisma.refreshToken.delete({ where: { token } });

    // Tạo cặp token mới
    const newAccessToken = jwtService.createAccessToken(userId);
    const newRefreshToken = jwtService.createRefreshToken(userId);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId,
        expiresAt,
      },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },
};
