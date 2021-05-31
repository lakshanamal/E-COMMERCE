import axios from "axios";
import React,{useContext} from "react";
import BtnRender from "./BtnRender";
import { GlobalState } from "../../../GlobalState";

function ProductItem({ product, isAdmin, token,setProduct }) {
  const state = useContext(GlobalState);
  const [callback,setCallback]=state.productsAPI.callback


  const deleteProduct = async () => {
    try {
      if (window.confirm("Are you sure delete this item ?")) {
        const deleteImage = await axios.post(
          "/api/destory",
          { public_id: product.images.public_id },
          {
            headers: { Authorization: token },
          }
        );
        const deleteProduct = await axios.delete(
          `/api/products/${product._id}`,
          {
            headers: { Authorization: token },
          }
        );

        await deleteImage;
        await deleteProduct;
        setCallback(!callback)
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
    await axios;
  };

  const handleCheck=(id)=>{
    // product.forEach((item)=>{
    //   if(item._id===id) product.checked=!product.checked
    // })
    console.log(product)
  }

  return (
    <div className="product_card">
      {isAdmin && <input type="checkbox" checked={product.checked} onChange={()=>handleCheck(product._id)} /> }
      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title} </h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;
