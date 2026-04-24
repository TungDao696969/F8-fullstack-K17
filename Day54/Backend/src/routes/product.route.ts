import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validate } from "../middlewares/validate";
import { productValidate } from "../validations/product.validation";

const router = Router();

router.post("/", validate(productValidate), ProductController.create);
router.get("/", ProductController.findAll);
router.get("/:id", ProductController.findOne);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
