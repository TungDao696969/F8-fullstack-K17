import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>ProductDetail: {id}</h1>
      <button
        className="border rounded-sm p-1 bg-blue-500 text-white cursor-pointer"
        onClick={() => navigate(`/users/order/${id}`)}
      >
        Đặt hàng
      </button>
    </div>
  );
}
