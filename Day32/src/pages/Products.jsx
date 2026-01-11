import React, { useEffect, useState } from "react";
import { getPagination, getSearch } from "../services/api";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useDebounce } from "../components/useDebounce";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const limit = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const skip = (pageFromUrl - 1) * limit;

  const [keyword, setKeyword] = useState("");
  const debounceKeyword = useDebounce(keyword, 500);

  // pagination
  const fetchPagination = async () => {
    try {
      setLoading(true);
      const res = await getPagination(skip, limit);
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // search
  const fetchSearch = async () => {
    try {
      setLoading(true);
      const res = await getSearch(debounceKeyword);
      setProducts(res.data.products);
      setTotal(res.data.total || res.data.products.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // call api
  useEffect(() => {
    if (debounceKeyword.trim()) {
      fetchSearch();
    } else {
      fetchPagination();
    }
  }, [skip, debounceKeyword]);

  const totalPage = Math.ceil(total / limit);

  // reset page khi search
  useEffect(() => {
    if (debounceKeyword.trim()) {
      setSearchParams({ page: 1 });
    }
  }, [debounceKeyword]);

  return (
    <div>
      <h1 className="text-xl font-bold m-5">Sản phẩm</h1>
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="border ml-5 border-gray-400 p-1 rounded-md w-xs"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <div>
          {isLoading ? (
            <div className="flex justify-center mt-10">
              <h1 className="font-bold text-2xl mr-3">Loading</h1>
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent"></div>
            </div>
          ) : (
             <ul className="grid grid-cols-4 gap-6 px-5 mt-5">
            {products.map((product) => (
              <li
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>

                <div className="p-4">
                  <p className="font-semibold text-lg line-clamp-1">
                    {product.title}
                  </p>

                  <p className="text-red-500 font-bold mt-1">
                    ${product.price}
                  </p>

                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </li>
            ))}
          </ul>
          )}
         
          <Pagination
            currentPage={pageFromUrl}
            totalPage={totalPage}
            onPageChange={(page) => {
              setSearchParams({ page });
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
