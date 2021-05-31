import axios from "axios";
import React from "react";
import BtnRender from "./BtnRender";

function ProductItem({ product,isAdmin,token }) {


  const deleteProduct= async ()=>{
    try {
      const deleteImage=await axios.post('/api/destory',{public_id:product.images.public_id},{
        headers:{Authorization:token}
      })
       const deleteProduct=await axios.delete(`/api/products/${product._id}`,{
        headers:{Authorization:token}
       })

       await deleteImage;
       await deleteProduct
    } catch(err) {
      alert(err.response.data.msg)
    }
    await axios
  }

  return (
    <div className="product_card">
      {
        isAdmin && <input type="checkbox" checked={product.checked}/>
      }
      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title} </h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <BtnRender product={product} deleteProduct={deleteProduct}/>
    </div>
  );
}

export default ProductItem;
