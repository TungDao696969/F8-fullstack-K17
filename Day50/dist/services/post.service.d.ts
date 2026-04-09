export declare const postService: {
    create: (userId: number, postData: {
        title: string;
        content: string;
    }) => Promise<{
        userId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
    }>;
};
//# sourceMappingURL=post.service.d.ts.map