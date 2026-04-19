"use client";

import { useState } from "react";
import type { Post } from "@/types/post";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

type Props = {
  post: Post;
  onDeleted: (id: number) => void;
};

export default function DeletePostDialog({ post, onDeleted }: Props) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    const saved = localStorage.getItem("posts");

    if (saved) {
      const posts = JSON.parse(saved) as Post[];
      const newList = posts.filter((p) => p.id !== post.id);
      localStorage.setItem("posts", JSON.stringify(newList));
    }

    onDeleted(post.id);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 text-white hover:bg-red-600 hover:text-white">
          Xóa
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc muốn xóa không ?</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="mt-4 flex justify-end gap-4">
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
          >
            Xóa
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
