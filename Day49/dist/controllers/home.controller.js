"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeController = void 0;
exports.homeController = {
    index: (req, res) => {
        const user = req.user;
        res.json({ user });
    },
};
//# sourceMappingURL=home.controller.js.map