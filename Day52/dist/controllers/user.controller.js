"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const post_service_1 = require("../services/post.service");
exports.userController = {
    findAll: async (req, res) => {
        const [users, count] = await user_service_1.userService.findAll(req.query);
        res.json({
            success: true,
            message: "Get users success",
            data: users,
            meta: {
                total: count,
                currentPage: req.query.page ? +req.query.page : 1,
            },
        });
    },
    find: async (req, res) => {
        const { id } = req.params;
        const user = await user_service_1.userService.find(+id);
        res.json({
            success: true,
            message: "Get user success",
            data: user,
        });
    },
    create: async (req, res) => {
        const user = await user_service_1.userService.create(req.body);
        res.status(201).json({
            success: true,
            message: "Create user success",
            data: user,
        });
    },
    update: async (req, res) => {
        const { id } = req.params;
        const user = await user_service_1.userService.update(req.body, +id);
        res.status(200).json({
            success: true,
            message: "Update user success",
            data: user,
        });
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const user = await user_service_1.userService.delete(+id);
        res.status(200).json({
            success: true,
            message: "Delete user success",
            data: user,
        });
    },
    createPost: async (req, res) => {
        const userId = req.params.id;
        const body = req.body;
        const post = await post_service_1.postService.create(+userId, body);
        res.status(201).json({
            success: true,
            message: "Create post by user success",
            data: post,
        });
    },
};
//# sourceMappingURL=user.controller.js.map