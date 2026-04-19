"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const productService = __importStar(require("../services/product.service"));
exports.productController = {
    create: async (req, res, next) => {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json({
                success: true,
                message: "Create product success",
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    },
    findAll: async (req, res, next) => {
        try {
            const products = await productService.getAllProducts();
            res.json({
                success: true,
                message: "Get products success",
                data: products,
            });
        }
        catch (error) {
            next(error);
        }
    },
    find: async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const product = await productService.getProductById(id);
            res.json({
                success: true,
                message: "Get product success",
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const product = await productService.updateProduct(id, req.body);
            res.json({
                success: true,
                message: "Update product success",
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            await productService.deleteProduct(id);
            res.json({
                success: true,
                message: "Delete product success",
            });
        }
        catch (error) {
            next(error);
        }
    },
};
//# sourceMappingURL=product.controller.js.map