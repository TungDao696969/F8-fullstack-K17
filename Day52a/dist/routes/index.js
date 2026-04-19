"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const coin_controller_1 = require("../controllers/coin.controller");
const router = (0, express_1.Router)();
router.get("/auth/google", auth_controller_1.authController.googleLogin);
router.get("/auth/google/callback", auth_controller_1.authController.googleCallback);
router.get("/coins", coin_controller_1.coinController.getList);
router.get("/coins/:symbol", coin_controller_1.coinController.getDetail);
router.put("/coins/:symbol/cache", coin_controller_1.coinController.refreshCacheAfterUpdate);
router.delete("/coins/:symbol/cache", coin_controller_1.coinController.refreshCacheAfterDelete);
exports.default = router;
//# sourceMappingURL=index.js.map