import z from "zod";
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodPipe<z.ZodString, z.ZodEmail>;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=createUser.validate.d.ts.map