import React from 'react'
import { useParams } from 'react-router-dom'

export default function CreateOrder() {
    const {productId} = useParams();
  return (
    <div>
        <h1>Đặt hàng cho sản phẩm: {productId}</h1>
    </div>
  )
}
