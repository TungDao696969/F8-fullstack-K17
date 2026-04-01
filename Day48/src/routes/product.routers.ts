import { Router } from "express";
import {
  createProduct,
  deletePoduct,
  getAllProduct,
  getById,
  updateProduct,
} from "../controllers/product.controller";
import { validate } from "../middlewares/validate";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator";

const router = Router();

router.post("/", validate(createProductSchema), createProduct);
router.get("/", getAllProduct);
router.get("/:id", getById);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", deletePoduct);
export default router;
