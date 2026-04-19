import { Request, Response } from "express";
export declare const authController: {
    googleLogin(req: Request, res: Response): void;
    googleCallback(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>>;
};
//# sourceMappingURL=auth.controller.d.ts.map