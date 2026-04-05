"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_controller_1 = require("../controllers/home.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const auth_validate_1 = require("../validators/auth.validate");
const router = express_1.default.Router();
// router.use(authMiddleware);
router.get("/", home_controller_1.homeController.index);
router.get("/users", user_controller_1.userController.findAll);
router.get("/users/:id", user_controller_1.userController.find);
router.post("/users", user_controller_1.userController.create);
router.put("/users/:id", user_controller_1.userController.update);
router.delete("/users/:id", user_controller_1.userController.delete);
router.post("/users/:id/posts", user_controller_1.userController.createPost);
router.post("/auth/register", (0, validate_middleware_1.validate)(auth_validate_1.registerSchema), auth_controller_1.authController.register);
router.post("/auth/login", auth_controller_1.authController.login);
router.get("/auth/profile", auth_middleware_1.authMiddleware, auth_controller_1.authController.profile);
router.delete("/auth/logout", auth_middleware_1.authMiddleware, auth_controller_1.authController.logout);
router.post("/auth/refresh-token", auth_controller_1.authController.refreshToken);
exports.default = router;
//# sourceMappingURL=index.route.js.map