"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerifyEmail = exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = require("ejs");
const path_1 = require("path");
let mailTransporter = null;
const smtpPort = +(process.env.SMTP_PORT ?? 465);
const smtpUser = process.env.SMTP_USERNAME ?? process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;
// Create a transporter using SMTP
if (!mailTransporter) {
    mailTransporter = nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
            user: smtpUser,
            pass: smtpPassword,
        },
        connectionTimeout: 10000, // 10 seconds
        socketTimeout: 10000, // 10 seconds
    });
}
const sendMail = async (to, subject, message) => {
    try {
        const info = await mailTransporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME}" ${process.env.SMTP_FROM_EMAIL}`,
            to,
            subject,
            html: message,
        });
        return info;
    }
    catch (error) {
        console.error("sendMail error:", error);
        return false;
    }
};
exports.sendMail = sendMail;
const sendVerifyEmail = async (to, code, userName = "Bạn") => {
    try {
        const templatePath = (0, path_1.resolve)("src/mail/verify-email.ejs");
        const html = await (0, ejs_1.renderFile)(templatePath, { code, userName });
        const subject = "Xác thực Email - F8 Training";
        return (0, exports.sendMail)(to, subject, html);
    }
    catch (error) {
        console.error("sendVerifyEmail error:", error);
        return false;
    }
};
exports.sendVerifyEmail = sendVerifyEmail;
//# sourceMappingURL=mail.js.map