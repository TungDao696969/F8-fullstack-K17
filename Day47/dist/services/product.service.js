"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const prisma_1 = require("../utils/prisma");
const createProduct = (data) => {
    return prisma_1.prisma.product.create({ data });
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return prisma_1.prisma.product.findMany();
};
exports.getAllProducts = getAllProducts;
const getProductById = async (id) => {
    const product = await prisma_1.prisma.product.findUnique({
        where: { id },
    });
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }
    return product;
};
exports.getProductById = getProductById;
const updateProduct = async (id, data) => {
    // kiểm tra tồn tại trước
    const product = await prisma_1.prisma.product.findUnique({ where: { id } });
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }
    return prisma_1.prisma.product.update({
        where: { id },
        data,
    });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    const product = await prisma_1.prisma.product.findUnique({ where: { id } });
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }
    return prisma_1.prisma.product.delete({
        where: { id },
    });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.service.js.map