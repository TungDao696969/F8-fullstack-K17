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
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            title: string;
            content: string;
        }[];
    } & {
        status: boolean;
        name: string;
        email: string;
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
};
//# sourceMappingURL=auth.service.d.ts.map