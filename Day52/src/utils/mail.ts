import nodemailer from "nodemailer";
import { renderFile } from "ejs";
import { resolve } from "path";
import path from "path";
import ejs from "ejs";
let mailTransporter = null;

const smtpPort = +(process.env.SMTP_PORT ?? 465);
const smtpUser = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;

// Create a transporter using SMTP
if (!mailTransporter) {
  mailTransporter = nodemailer.createTransport({
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

export const sendMail = async (
  to: string,
  subject: string,
  message: string,
) => {
  try {
    const info = await mailTransporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" ${process.env.SMTP_FROM_EMAIL}`,
      to,
      subject,
      html: message,
    });
    return info;
  } catch (error) {
    console.error("sendMail error:", error);
    return false;
  }
};

export const sendVerifyEmail = async (
  to: string,
  code: string,
  userName: string = "Bạn",
) => {
  try {
    const templatePath = resolve("src/mail/verify-email.ejs");
    const html = await renderFile(templatePath, { code, userName });
    const subject = "Xác thực Email - F8 Training";
    return sendMail(to, subject, html);
  } catch (error) {
    console.error("sendVerifyEmail error:", error);
    return false;
  }
};

export const sendResetPasswordEmail = async (to: string, code: string) => {
  // render template EJS
  const templatePath = path.join(__dirname, "../mail/reset-password.ejs");

  const html = await ejs.renderFile(templatePath, { code });

  await mailTransporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject: "Reset mật khẩu",
    html,
  });
};
