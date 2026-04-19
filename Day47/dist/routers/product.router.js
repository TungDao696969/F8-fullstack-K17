"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/product.route.ts
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.post("/products", product_controller_1.productController.create);
router.get("/products", product_controller_1.productController.findAll);
router.get("/products/:id", product_controller_1.productController.find);
router.put("/products/:id", product_controller_1.productController.update);
router.delete("/products/:id", product_controller_1.productController.delete);
exports.default = router;
//# sourceMappingURL=product.router.js.map