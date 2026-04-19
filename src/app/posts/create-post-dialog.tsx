"use client";

import { useState } from "react";
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
import { Post } from "@/types/post";
type Props = {
  onCreated: (post: Post) => void;
};

export default function CreatePostDialog({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCreate = async () => {
    if (!title.trim()) return alert("Nhập tiêu đề!");
    if (!description.trim()) return alert("Nhập mô tả!");
    try {
      setLoading(true);
      const newPost = await postService.create({
        title,
        body: description,
        userId: 1,
      });

      onCreated(newPost);

      setTitle("");
      setDescription("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 mb-2">+ Thêm bài viết</Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Thêm bài viết</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Nhập tiêu đề..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Nhập mô tả..."
          className="min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-center gap-5">
          <Button
            disabled={loading}
            className="rounded-lg bg-green-400 cursor-pointer hover:bg-green-500 disabled:opacity-50"
            onClick={handleCreate}
          >
            {loading ? "Đang tạo..." : "Tạo"}
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
