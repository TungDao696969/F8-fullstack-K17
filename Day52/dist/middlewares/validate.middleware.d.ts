import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
export declare const validate: (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=validate.middleware.d.ts.map