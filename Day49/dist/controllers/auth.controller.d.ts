import { Request, Response } from "express";
export declare const authController: {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    profile(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=auth.controller.d.ts.map