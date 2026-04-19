declare module "express" {
    interface Request {
        user?: {
            name: string;
            email: string;
            id: number;
            status: boolean;
        };
        token?: string;
    }
}
export {};
//# sourceMappingURL=index.d.ts.map