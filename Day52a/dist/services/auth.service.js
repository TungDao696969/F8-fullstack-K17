"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const prisma_1 = require("../utils/prisma");
exports.authService = {
    async handleGoogleLogin(code) {
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_CALLBACK_URL,
                grant_type: "authorization_code",
            }),
        });
        const tokenData = await tokenRes.json();
        if (!tokenData.access_token) {
            throw new Error("Cannot get access_token");
        }
        // Lấy info user
        const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        });
        const googleUser = await userRes.json();
        const { id, email, name, picture } = googleUser;
        if (!email) {
            throw new Error("Email not found");
        }
        // 3. Check user DB
        let user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            user = await prisma_1.prisma.user.create({
                data: {
                    email,
                    name,
                    avatar: picture,
                    provider: "google",
                    providerId: id,
                },
            });
        }
        return user;
    },
};
//# sourceMappingURL=auth.service.js.map