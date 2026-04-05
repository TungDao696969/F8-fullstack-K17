"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const prisma_1 = require("../utils/prisma");
exports.postService = {
    create: async (userId, postData) => {
        //user này có tồn tại hay không?
        // return prisma.$transaction(async (tx) => {
        //   const user = await tx.user.findUnique({
        //     where: {
        //       id: userId,
        //     },
        //   });
        //   if (!user) {
        //     throw new Error("User Not Found");
        //   }
        //   await tx.post.create({
        //     data: {
        //       ...postData,
        //       userId,
        //     },
        //   });
        // });
        return prisma_1.prisma.post.create({
            data: {
                ...postData,
                userId,
            },
        });
    },
};
//# sourceMappingURL=post.service.js.map