import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const getProduct =async () => {
    const res = await axios.get("/api/products");
    console.log(res);
  };

  useEffect(() => {
    getProduct();
  }, [])


  return {
      products:[products, setProducts]
  }
}

export default ProductsAPI;
