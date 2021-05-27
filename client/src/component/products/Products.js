import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import ProductItem from '../until/ProductItem/ProductItem'
function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  console.log(products);
  return (
    <div>
      <h1>Hello</h1>
      {products.map((product) => {
        return (
          <ProductItem key={product._id}/>
  
          // console.log(product._id)
        );
      })}
    </div>
  );
}

export default Products;
