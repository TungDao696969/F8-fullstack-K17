"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { CACHE_TAGS } from "@/constants/cache.constant";

export async function deleteAction(id: string) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    method: "DELETE",
  });

  revalidateTag(CACHE_TAGS.PRODUCTS, { expire: 0 });
  revalidateTag(CACHE_TAGS.PRODUCT_DETAIL(id), { expire: 0 });

  redirect("/");
}
