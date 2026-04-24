import { productServices } from "@/app/services/product.service";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/constants/cache.constant";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await productServices.getProductById(id);

  async function updateProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, stock }),
    });

    revalidateTag(CACHE_TAGS.PRODUCTS, { expire: 0 });
    revalidateTag(CACHE_TAGS.PRODUCT_DETAIL(id), { expire: 0 });

    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
          <p className="text-sm text-gray-400 mt-1">
            Update product information below
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <form action={updateProduct} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Product Name
              </label>
              <input
                name="name"
                defaultValue={product.name}
                className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Price & Stock */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Price (₫)
                </label>
                <input
                  name="price"
                  type="number"
                  defaultValue={product.price}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Stock
                </label>
                <input
                  name="stock"
                  type="number"
                  defaultValue={product.stock}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-1" />

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                href="/"
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
