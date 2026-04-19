import type { ProductCreateInput, ProductUpdateInput } from "../generated/prisma/models/Product";
export declare const createProduct: (data: ProductCreateInput) => import("../generated/prisma/models/Product").Prisma__ProductClient<{
    name: string;
    price: import("@prisma/client-runtime-utils").Decimal;
    description: string;
    created_At: Date;
    id: number;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
}>;
export declare const getAllProducts: () => import("../generated/prisma/internal/prismaNamespace").PrismaPromise<{
    name: string;
    price: import("@prisma/client-runtime-utils").Decimal;
    description: string;
    created_At: Date;
    id: number;
}[]>;
export declare const getProductById: (id: number) => Promise<{
    name: string;
    price: import("@prisma/client-runtime-utils").Decimal;
    description: string;
    created_At: Date;
    id: number;
}>;
export declare const updateProduct: (id: number, data: ProductUpdateInput) => Promise<{
    name: string;
    price: import("@prisma/client-runtime-utils").Decimal;
    description: string;
    created_At: Date;
    id: number;
}>;
export declare const deleteProduct: (id: number) => Promise<{
    name: string;
    price: import("@prisma/client-runtime-utils").Decimal;
    description: string;
    created_At: Date;
    id: number;
}>;
//# sourceMappingURL=product.service.d.ts.map