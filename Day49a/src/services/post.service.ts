import { prisma } from "../utils/prisma";

export const postService = {
  create: async (
    userId: number,
    postData: {
      title: string;
      content: string;
    },
  ) => {
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
    return prisma.post.create({
      data: {
        ...postData,
        userId,
      },
    });
  },
};
