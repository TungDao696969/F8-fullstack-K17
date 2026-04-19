"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { postService } from "@/services/post.service";
import type { Post } from "@/types/post";
import BackButton from "./back-button";

export default function PostDetail() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return;
    }

    postService
      .getById(id)
      .then(setPost)
      .catch(() => setPost(null));
  }, [id]);

  if (!id) {
    return <div className="p-6">Khong tim thay bai viet</div>;
  }

  if (post === undefined) {
    return <div className="p-6">Dang tai bai viet...</div>;
  }

  if (!post) {
    return <div className="p-6">Khong tim thay bai viet</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <BackButton />
      <div className="rounded-xl border p-5 shadow-sm">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="mt-3 text-gray-600">{post.body}</p>
      </div>
    </div>
  );
}
