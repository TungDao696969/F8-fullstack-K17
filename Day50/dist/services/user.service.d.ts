import { UserQuery } from "../types/user.type";
export declare const userService: {
    findAll({ status, s, page, limit, select }: UserQuery): Promise<[{
        status: boolean;
        name: string;
        email: string;
        is_verified: boolean;
        password: string;
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[], number]>;
    find(id: number): Promise<{
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
    }>;
    create({ ...userData }: {
        name: string;
        email: string;
        status?: boolean;
        is_verified?: boolean;
        password: string;
    }): import("../generated/prisma/models").Prisma__UserClient<{
        status: boolean;
        name: string;
        email: string;
        is_verified: boolean;
        password: string;
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    update({ phone, ...userData }: {
        name: string;
        email: string;
        status: boolean;
        phone: string;
    }, id: number): import("../generated/prisma/models").Prisma__UserClient<{
        status: boolean;
        name: string;
        email: string;
        is_verified: boolean;
        password: string;
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    delete(id: number): Promise<[{
        userId: number;
        phone: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }, {
        status: boolean;
        name: string;
        email: string;
        is_verified: boolean;
        password: string;
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
    }]>;
    existingEmail(email: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<number>;
    findByEmail(email: string): import("../generated/prisma/models").Prisma__UserClient<{
        status: boolean;
        name: string;
        email: string;
        is_verified: boolean;
        password: string;
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map