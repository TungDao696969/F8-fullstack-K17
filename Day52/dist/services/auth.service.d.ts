export declare const authService: {
    register(userData: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    profile(token: string): Promise<false | ({
        posts: {
            userId: number;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string;
        }[];
    } & {
        status: boolean;
        name: string;
        email: string;
        is_verified: boolean;
        password: string;
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
    })>;
    logout(token: string, userId: number): Promise<boolean>;
    refreshToken(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    verifyEmail(userId: number, code: string): Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map