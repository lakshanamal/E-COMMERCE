import { useState,useEffect } from "react";
import axios from 'axios'


function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [callback,setCallBack]=useState(false);
  const [category,setCategory]=useState('')
  const [sort,setSort]=useState('')
  const [search,setSearch]=useState('')
  const [page,setpage]=useState(1)
  const [result,setResult]=useState(0)


  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`);
      setProducts(res.data.products);
      console.log(res)
    };
    getProduct();
  }, [callback,category,sort,search,page])
  return {
    products: [products, setProducts],
    callback:[callback,setCallBack],
    category:[category,setCategory],
    sort:[sort,setSort],
    search:[search,setSearch],
    page:[page,setpage],
    result:[result,setResult],
  };
}

export default ProductsAPI;
