import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProduct();
    // console.log(products)
  },[]);

  return {
    products: [products, setProducts],
  };
}

export default ProductsAPI;
