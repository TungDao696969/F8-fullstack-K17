export declare const sendMail: (to: string, subject: string, message: string) => Promise<false | import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export declare const sendVerifyEmail: (to: string, code: string, userName?: string) => Promise<false | import("nodemailer/lib/smtp-transport").SentMessageInfo>;
//# sourceMappingURL=mail.d.ts.map