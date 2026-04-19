"use client";

import { postService } from "@/services/post.service";
import PostList from "@/app/posts/post-list";
import Link from "next/link";
import CreatePostDialog from "./posts/create-post-dialog";

import { useState, useEffect } from "react";
import { Post } from "@/types/post";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("posts");

    postService.getAll().then((data) => {
      const apiPosts = data.posts;

      if (saved) {
        const localPosts = JSON.parse(saved);

        // merge: local lên đầu, tránh trùng id
        const merged = [
          ...localPosts,
          ...apiPosts.filter(
            (p: Post) => !localPosts.some((lp: Post) => lp.id === p.id),
          ),
        ];

        setPosts(merged);
      } else {
        setPosts(apiPosts);
      }
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trang chủ</h1>

      <CreatePostDialog
        onCreated={(newPost) => {
          setPosts((prev) => {
            const updated = [newPost, ...prev];
            localStorage.setItem("posts", JSON.stringify(updated));
            return updated;
          });
        }}
      />

      <p className="text-gray-600 mb-6">Danh sách bài viết:</p>

      <PostList
        posts={posts}
        onUpdated={(updatedPost) => {
          setPosts((prev) => {
            const updated = prev.map((post) =>
              post.id === updatedPost.id ? updatedPost : post,
            );
            localStorage.setItem("posts", JSON.stringify(updated));
            return updated;
          });
        }}
        onDeleted={(id) => {
          setPosts((prev) => {
            const updated = prev.filter((post) => post.id !== id);
            localStorage.setItem("posts", JSON.stringify(updated));
            return updated;
          });
        }}
      />

      <div className="mt-6">
        <Link href="/posts" className="text-blue-500 underline">
          Xem tất cả bài viết
        </Link>
      </div>
    </div>
  );
}
