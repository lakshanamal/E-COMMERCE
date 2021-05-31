import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import ProductItem from "../until/ProductItem/ProductItem";
import Loading from "../until/loading/Loading";
import "./header.css";
import axios from "axios";

function Products() {
  const state = useContext(GlobalState);

  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
    };
    getProduct();
    // console.log(products)
  }, []);

  return (
    <>
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              product={product}
              key={product._id}
              isAdmin={isAdmin}
            />

            // console.log(product._id)
          );
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
