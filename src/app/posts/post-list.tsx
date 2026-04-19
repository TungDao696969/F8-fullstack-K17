"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditPostDialog from "./edit-post-dialog";
import type { Post } from "@/types/post";
import DeletePostDialog from "./delete-post-dialog";
type Props = {
  posts: Post[];
  onUpdated: (post: Post) => void;
  onDeleted: (id: number) => void;
};

export default function PostList({ posts, onUpdated, onDeleted }: Props) {
  if (posts.length === 0) {
    return <p className="text-gray-500">Khong co bai viet de hien thi.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold text-lg">{post.title}</h2>
          <p className="text-gray-600">{post.body}</p>

          <div className="mt-3 flex gap-2">
            <Link href={`/posts/${post.id}`} className="hover:text-yellow-700">
              <Button variant="outline" className="cursor-pointer">
                View
              </Button>
            </Link>

            <EditPostDialog post={post} onUpdated={onUpdated} />
            {/* Delete */}
            <DeletePostDialog post={post} onDeleted={onDeleted} />
          </div>
        </div>
      ))}
    </div>
  );
}
