export declare const postService: {
    create: (userId: number, postData: {
        title: string;
        content: string;
    }) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
    }>;
};
//# sourceMappingURL=post.service.d.ts.map