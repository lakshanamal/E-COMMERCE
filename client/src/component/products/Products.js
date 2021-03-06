import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import ProductItem from "../until/ProductItem/ProductItem";
import Loading from "../until/loading/Loading";
import Filters from './Filters'
import LoadMore from './LoadMore'

import "./header.css";


function Products() {
  const state = useContext(GlobalState);
  const [token]=state.state
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <>
    <Filters/>
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              product={product}
              key={product._id}
              isAdmin={isAdmin}
              token={token}
              setProducts={setProducts}
            />

            // console.log(product._id)
          );
        })}
      </div>
      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
