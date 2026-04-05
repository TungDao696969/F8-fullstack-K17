import z from "zod";
import { userService } from "../services/user.service";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Email invalid"))
    .refine(
      async (email: string) => {
        const existing = await userService.existingEmail(email);
        return !existing;
      },
      {
        message: "Email is exist",
      },
    ),
  password: z.string().min(6, "Password min 6 charactor"),
});
