"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = require("../utils/prisma");
exports.userService = {
    findAll({ status, s, page = 1, limit = 3, select = "" }) {
        const filters = {};
        if (["true", "false"].includes(status)) {
            filters.status = status === "true";
        }
        if (s) {
            filters.OR = [
                {
                    name: {
                        contains: s,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: s,
                        mode: "insensitive",
                    },
                },
            ];
        }
        const offset = (page - 1) * limit;
        const fields = select
            .trim()
            .split(",")
            .filter((item) => item)
            .reduce((acc, cur) => {
            acc[cur.trim()] = true;
            return acc;
        }, {});
        const options = {
            where: {
                ...filters,
                // posts: {
                //   // none: {}, //có ít nhất 1 posts
                //   // some: {
                //   //   title: {
                //   //     contains: "t 1",
                //   //   },
                //   // },
                // },
            },
            take: limit,
            skip: offset,
            orderBy: {
                id: "desc",
            },
            // include: {
            //   // phone: true,
            //   // posts: true,
            // },
        };
        if (Object.keys(fields).length) {
            options.select = fields;
        }
        options.select = {
            id: true,
            name: true,
            email: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    posts: true,
                },
            },
            phone: true,
            posts: true,
        };
        return Promise.all([
            prisma_1.prisma.user.findMany(options),
            prisma_1.prisma.user.count({
                where: {
                    ...fields,
                },
            }),
        ]);
    },
    async find(id) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                posts: true,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    },
    create({ 
    // phone,
    ...userData }) {
        return prisma_1.prisma.user.create({
            data: {
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date(),
                // phone: {
                //   create: {
                //     phone: phone!,
                //   },
                // },
            },
        });
    },
    update({ phone, ...userData }, id) {
        return prisma_1.prisma.user.update({
            where: { id },
            data: {
                ...userData,
                phone: {
                    upsert: {
                        where: {
                            userId: id,
                        },
                        create: {
                            phone,
                        },
                        update: {
                            phone,
                        },
                    },
                },
            },
        });
    },
    delete(id) {
        return prisma_1.prisma.$transaction([
            prisma_1.prisma.phone.delete({
                where: {
                    userId: id,
                },
            }),
            prisma_1.prisma.user.delete({
                where: { id },
            }),
        ]);
    },
    existingEmail(email) {
        return prisma_1.prisma.user.count({
            where: { email },
        });
    },
    findByEmail(email) {
        return prisma_1.prisma.user.findUnique({ where: { email } });
    },
};
//# sourceMappingURL=user.service.js.map