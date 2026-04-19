import z from "zod";
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodPipe<z.ZodString, z.ZodEmail>;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.validate.d.ts.map