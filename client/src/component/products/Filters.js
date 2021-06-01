import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  // const [products,setProsucts]=state.productsAPI.products
//   const [callback, setCallBack] = useState(false);
  const [categories, setCategories] = state.category.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;
  // const [page,setpage]=state.productsAPI.page
  // const [result,setResult]=state.productsAPI.result
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
    console.log(category);
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters : </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((item) => {
            return (
              <option value={"category=" + item._id} key={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <input
        type="text"
        value={search}
        placeholder="Enter your Search"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="row">
        <span>Sort By : </span>
        <select
          name="category"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best Sales</option>
          <option value="sort=-price">Price : High-Low</option>
          <option value="sort=price">Price : Low-High</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
