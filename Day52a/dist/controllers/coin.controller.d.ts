import { Request, Response } from "express";
export declare const coinController: {
    getList(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getDetail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshCacheAfterUpdate(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshCacheAfterDelete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=coin.controller.d.ts.map