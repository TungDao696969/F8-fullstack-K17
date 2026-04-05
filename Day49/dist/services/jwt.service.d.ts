import jsonwebtoken from "jsonwebtoken";
export declare const jwtService: {
    createAccessToken(userId: number): string;
    verifyAccessToken(token: string): string | false | jsonwebtoken.JwtPayload;
    decodedToken(token: string): string | jsonwebtoken.JwtPayload | null;
    createRefreshToken(userId: number): string;
    verifyRefreshToken(token: string): string | false | jsonwebtoken.JwtPayload;
};
//# sourceMappingURL=jwt.service.d.ts.map