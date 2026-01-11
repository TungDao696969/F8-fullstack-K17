import React, { useEffect, useState } from "react";
import { getProductDetail } from "../services/api";
import { useParams } from "react-router-dom";
export default function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [mainImg, setMainImg] = useState("");
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await getProductDetail(id);
        if (res.status !== 200) {
          throw new Error("Lỗi dữ liệu detail");
        }
        setProductDetail(res.data);
        setMainImg(res.data.thumbnail || res.data.images[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetail();
  }, [id]);
  return (
    <div>
      <h1 className="text-center mt-5 font-bold text-2xl">Chi tiết sản phẩm</h1>

      <div className="flex justify-center mt-[30px] gap-5">
        <div>
          <img className="w-[300px]" src={mainImg} alt={productDetail?.title} />

          <div className="flex gap-3 mt-3">
            {productDetail?.images?.map((img) => (
              <img
                key={img}
                src={img}
                className="w-20 cursor-pointer border rounded-sm border-gray-400"
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
        </div>

        <div className="w-[500px] mt-5">
          <p className="font-semibold text-lg">{productDetail?.title}</p>

          <p className="text-red-500 font-bold mt-1">${productDetail?.price}</p>

          <p className="text-sm mt-2">{productDetail?.description}</p>

          <p className="text-sm mt-2">
            <strong>Stock: </strong>
            {productDetail?.stock}
          </p>

          <div className="mt-4 mb-4">
            <button className="mr-5 border p-1 border-red-500 text-red-500 rounded-md cursor-pointer hover:bg-green-400 hover:text-white">
              Thêm giỏ hàng
            </button>
            <button className="border p-1 rounded-md bg-black text-white cursor-pointer hover:bg-orange-700">
              Mua hàng
            </button>
          </div>
          <hr />
          <p className="text-sm mt-2">
            <strong>Category: </strong>
            {productDetail?.category}
          </p>
          <p className="text-sm mt-2">
            <strong>Rank: </strong>
            {productDetail?.rating}
          </p>
        </div>
      </div>
    </div>
  );
}
