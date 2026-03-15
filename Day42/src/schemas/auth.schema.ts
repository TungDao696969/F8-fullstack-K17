import z, { email } from "zod";
export const zodRegisterUser = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .pipe(z.email("Email không đúng định dạng")),
  password: z.string().min(6, "Mật khẩu phải 6 kí tự"),
  fullname: z.string().min(1, "Họ tên không được để trống"),
});

export const zodLoginUser = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .pipe(z.email("Email không đúng định dạng")),
  password: z.string().min(6, "Mật khẩu phải 6 kí tự"),
});
