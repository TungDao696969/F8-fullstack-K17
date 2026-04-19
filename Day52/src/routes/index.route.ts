import express from "express";
import { homeController } from "../controllers/home.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userController } from "../controllers/user.controller";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../validators/auth.validate";
const router = express.Router();
// router.use(authMiddleware);
router.get("/", homeController.index);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.find);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);
router.post("/users/:id/posts", userController.createPost);

router.post(
  "/auth/register",
  validate(registerSchema),
  authController.register,
);
router.post("/auth/verify-email", authController.verifyEmail);
router.post("/auth/login", authController.login);
router.get("/auth/profile", authMiddleware, authController.profile);
router.delete("/auth/logout", authMiddleware, authController.logout);
router.post("/auth/refresh-token", authController.refreshToken);
router.post("/auth/resend-verify", authController.resendVerifyEmail);

router.post("/auth/forgot-password", authController.forgotPassword);
router.post("/auth/reset-password", authController.resetPassword);

router.get("/auth/google", authController.googleRedirect);
router.get("/auth/google/callback", authController.googleCallback);

export default router;
