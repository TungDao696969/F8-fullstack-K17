import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { coinController } from "../controllers/coin.controller";

const router = Router();

router.get("/auth/google", authController.googleLogin);
router.get("/auth/google/callback", authController.googleCallback);
router.get("/coins", coinController.getList);
router.get("/coins/:symbol", coinController.getDetail);
router.put("/coins/:symbol/cache", coinController.refreshCacheAfterUpdate);
router.delete("/coins/:symbol/cache", coinController.refreshCacheAfterDelete);

export default router;
