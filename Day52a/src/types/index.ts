declare module "express" {
  export interface Request {
    user?: {
      name: string;
      email: string;
      id: number;
      status: boolean;
    };
    token?: string;
  }
}
