import jsonwebtoken from "jsonwebtoken";
export declare const jwtService: {
    createAccessToken(userId: number): string;
    verifyAccessToken(token: string): string | false | jsonwebtoken.JwtPayload;
    decodedToken(token: string): string | jsonwebtoken.JwtPayload | null;
    createRefreshToken(userId: number): string;
    verifyRefreshToken(token: string): string | false | jsonwebtoken.JwtPayload;
};
export declare const generateTokens: (userId: number) => {
    accessToken: string;
    refreshToken: string;
    accessJti: `${string}-${string}-${string}-${string}-${string}`;
    refreshJti: `${string}-${string}-${string}-${string}-${string}`;
};
//# sourceMappingURL=jwt.service.d.ts.map