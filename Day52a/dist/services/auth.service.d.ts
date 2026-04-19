export declare const authService: {
    handleGoogleLogin(code: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        avatar: string | null;
        provider: string | null;
        providerId: string | null;
        password: string | null;
        createdAt: Date;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map