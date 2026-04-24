"use client";

import { useState } from "react";
import { deleteAction } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await deleteAction(id);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`px-3 py-1 rounded text-white transition
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
    >
      {loading ? "Đang xóa..." : "Xóa"}
    </button>
  );
}
