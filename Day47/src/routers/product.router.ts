// src/routes/product.route.ts
import { Router } from "express";
import { productController } from "../controllers/product.controller";

const router = Router();

router.post("/products", productController.create);
router.get("/products", productController.findAll);
router.get("/products/:id", productController.find);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);

export default router;
