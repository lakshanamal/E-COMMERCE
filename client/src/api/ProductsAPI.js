import { useState,useEffect } from "react";
import axios from 'axios'


function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [callback,setCallBack]=useState(false)

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
    };
    getProduct();
  }, [callback])
  return {
    products: [products, setProducts],
    callback:[callback,setCallBack]
  };
}

export default ProductsAPI;
