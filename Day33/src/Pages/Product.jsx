import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Product() {
    const [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.get("q"));
    // console.log(searchParams.get("status"));
    
    const handleChangeStatus = (e) => {
        const value = e.target.value;
        setSearchParams({
            status: value,
            q: searchParams.get("q") ?? "",
        });
    };
    const handleSearchValue = (e) => {
        const value = e.target.value;
        setSearchParams({
            status: searchParams.get("status") ?? "",
            q: value,
        });
    }
  return (
    <div>
        <h1>Product</h1>
        <select onChange={handleChangeStatus}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>
        <input type='text' placeholder='Từ khóa ...' onChange={handleSearchValue}></input>
        <p>Keyword: {searchParams.get("q")}</p>
        <p>Status: {searchParams.get("status")}</p>

    </div>
  )
}
