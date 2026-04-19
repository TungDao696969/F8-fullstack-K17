"use client";

import { useState } from "react";
import type { Post } from "@/types/post";
import { postService } from "@/services/post.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  post: Post;
  onUpdated: (post: Post) => void;
};

export default function EditPostDialog({ post, onUpdated }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [loading, setLoading] = useState(false);
  const handleUpdate = async () => {
    if (!title.trim()) return alert("Nhap tieu de!");
    if (!body.trim()) return alert("Nhap noi dung!");

    try {
      setLoading(true);
      const updatedPost = await postService.update(post.id, {
        title,
        body,
        userId: post.userId,
      });

      onUpdated({
        ...post,
        ...updatedPost,
        title,
        body,
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Loi khi cap nhat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="cursor-pointer"
          onClick={() => {
            setTitle(post.title);
            setBody(post.body);
            setOpen(true);
          }}
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Cập nhật bài viết</DialogTitle>
        </DialogHeader>

        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea value={body} onChange={(e) => setBody(e.target.value)} />

        <div className="flex justify-center gap-5">
          <Button
            disabled={loading}
            className="rounded-lg bg-green-400 cursor-pointer hover:bg-green-500 disabled:opacity-50"
            onClick={handleUpdate}
          >
            {loading ? "Đang tạo..." : "Cập nhật"}
          </Button>
          <Button
            className="rounded-lg bg-red-400 cursor-pointer hover:bg-red-500"
            onClick={() => setOpen(false)}
          >
            Hủy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
