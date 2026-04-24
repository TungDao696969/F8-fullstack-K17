import Link from "next/link";

import DeleteButton from "./products/DeleteButton";
import { productServices } from "./services/product.service";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/constants/cache.constant";

export const dynamic = "force-dynamic";

export default async function ProductPage() {
  const products = await productServices.getProducts();

  async function createProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, stock }),
    });

    revalidateTag(CACHE_TAGS.PRODUCTS, { expire: 0 });
  }
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Sản phẩm</h1>
            <p className="mt-1 text-sm text-gray-400">
              {products.length} sản phẩm hiện có
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Thêm sản phẩm
          </h3>
          <form
            action={createProduct}
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Tên sản phẩm
              </label>
              <input
                name="name"
                placeholder="VD: iPhone 15"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Giá (₫)
              </label>
              <input
                name="price"
                placeholder="0"
                type="number"
                className="w-32 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Tồn kho
              </label>
              <input
                name="stock"
                placeholder="0"
                type="number"
                className="w-24 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95">
              <span>+</span> Thêm
            </button>
          </form>
        </div>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white py-16 text-center">
            <p className="text-4xl">📦</p>
            <p className="mt-3 font-medium text-gray-500">
              Chưa có sản phẩm nào
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Bắt đầu bằng cách thêm sản phẩm đầu tiên
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-md"
              >
                {/* Product Info */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-500 font-bold text-sm">
                    {product.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">
                    {product.name}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                  >
                    Sửa
                  </Link>
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-100">
                    <DeleteButton id={product.id.toString()} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
