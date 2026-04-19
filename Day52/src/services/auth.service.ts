import { JwtPayload } from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/hashing";
import { jwtService, generateTokens } from "./jwt.service";
import { userService } from "./user.service";
import { redisClient } from "../utils/redis";
import { prisma } from "../utils/prisma";
import { sendVerifyEmail } from "../utils/mail";
import { sendResetPasswordEmail } from "../utils/mail";
export const authService = {
  async register(userData: { name: string; email: string; password: string }) {
    //Hashing password
    const passwordHash = hashPassword(userData.password);
    //Gọi userService để thêm vào database
    const user = await userService.create({
      ...userData,
      password: passwordHash,
      is_verified: false,
    });

    // Tạo mã 6 số
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    //Lưu Redis (10 phút)
    await redisClient.set(`verify:${user.id}`, code, {
      EX: 600, // 600s = 10 phút
    });
    //Gửi email xác thực, chào mừng
    console.log(`Verification code for user ${user.id}: ${code}`); // Log code for testing
    sendVerifyEmail(user.email, code, user.name).catch((error) => {
      console.error("Email send failed:", error);
    });
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

    if (!user.is_verified) {
      throw new Error(
        "Tài khoản chưa xác thực. Vui lòng kiểm tra email hoặc yêu cầu gửi lại mã.",
      );
    }

    const { accessToken, refreshToken, accessJti, refreshJti } = generateTokens(
      user.id,
    );

    // //Tạo token
    // const accessToken = jwtService.createAccessToken(user.id);
    // const refreshToken = jwtService.createRefreshToken(user.id);
    // 5. Lưu refresh token vào Redis
    await redisClient.setEx(
      `refresh:${user.id}:${refreshJti}`,
      7 * 24 * 60 * 60, // 7 ngày
      JSON.stringify({
        userId: user.id,
        accessJti,
        refreshJti,
      }),
    );

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
    // await prisma.refreshToken.deleteMany({ where: { userId } });

    return true;
  },

  async refreshToken(oldRefreshToken: string) {
    // 1. Verify JWT
    const decoded = jwtService.verifyRefreshToken(oldRefreshToken);
    if (!decoded) {
      throw new Error("Refresh token không hợp lệ");
    }

    const { userId, jti } = decoded as any;

    // 2. Check Redis
    const key = `refresh:${userId}:${jti}`;
    const stored = await redisClient.get(key);

    if (!stored) {
      throw new Error("Refresh token đã bị thu hồi");
    }

    // 3. XÓA token cũ
    await redisClient.del(key);

    // 4. Tạo token mới
    const { accessToken, refreshToken, accessJti, refreshJti } =
      generateTokens(userId);

    // 5. Lưu token mới vào Redis
    await redisClient.setEx(
      `refresh:${userId}:${refreshJti}`,
      7 * 24 * 60 * 60, // 7 ngày
      JSON.stringify({
        userId,
        accessJti,
        refreshJti,
      }),
    );

    return { accessToken, refreshToken };
  },

  async verifyEmail(userId: number, code: string) {
    const key = `verify:${userId}`;

    const storedCode = await redisClient.get(key);

    if (!storedCode) {
      throw new Error("Mã đã hết hạn");
    }

    if (storedCode !== code) {
      throw new Error("Mã không đúng");
    }

    // cập nhật DB
    await prisma.user.update({
      where: { id: userId },
      data: { is_verified: true },
    });

    // xóa redis
    await redisClient.del(key);

    return {
      message: "Xác thực thành công",
    };
  },

  async resendVerifyEmail(userId: number) {
    // check user
    const user = await userService.find(userId);
    if (!user) {
      throw new Error("Tài khoản không hợp lệ");
    }

    // check đã verify chưa
    if (user.is_verified) {
      throw new Error("Tài khoản đã được xác thực");
    }

    const key = `resend:${userId}`;

    const count = await redisClient.incr(key);

    if (count === 1) {
      await redisClient.expire(key, 60); // 60s
    }

    if (count > 3) {
      throw new Error("Bạn gửi quá nhiều lần, vui lòng thử lại sau");
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // ghi đè code redis
    await redisClient.setEx(`verify:${userId}`, 600, code);
    await sendVerifyEmail(user.email, code);

    return {
      message: "Đã gửi lại email xác thực",
    };
  },

  async forgotPassword(email: string) {
    const user = await userService.findByEmail(email);

    if (!user) {
      throw new Error("Email không tồn tại");
    }

    const rateKey = `reset_req:${user.id}`;
    const count = await redisClient.incr(rateKey);

    if (count === 1) {
      await redisClient.expire(rateKey, 60);
    }

    if (count > 3) {
      throw new Error("Bạn gửi quá nhiều yêu cầu, vui lòng thử lại sau");
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await redisClient.setEx(`reset:${user.id}`, 600, code);

    await sendResetPasswordEmail(user.email, code);

    return {
      message: "Đã gửi mã reset mật khẩu",
    };
  },

  async resetPassword(userId: number, code: string, newPassword: string) {
    const key = `reset:${userId}`;

    const storedCode = await redisClient.get(key);

    if (!storedCode) {
      throw new Error("Mã đã hết hạn");
    }

    if (storedCode !== code) {
      throw new Error("Mã không đúng");
    }

    const passwordHash = hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: passwordHash },
    });

    await redisClient.del(key);

    const keys = await redisClient.keys(`refresh:${userId}:*`);

    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    return {
      message: "Đặt lại mật khẩu thành công",
    };
  },
};
