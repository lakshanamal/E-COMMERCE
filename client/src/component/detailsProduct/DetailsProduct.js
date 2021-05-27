import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import "./DetailsProducts.css";

function DetailsProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setProductDetails(product);
        }
      });
    }
  }, [params, products]);
  console.log(productDetails);
  if (productDetails.length === 0) return null;
  return (
    <div className="details">
      <img src={productDetails.images.url} alt="" />
      <div className="box-details">
        <div className="row">
          <h2>{productDetails.title}</h2>
          <h6>{productDetails.product_id}</h6>
        </div>
        <span>${productDetails.price}</span>
        <p>{productDetails.discription}</p>
        <p>{productDetails.context}</p>
        <p>Sold: {productDetails.sold}</p>
        <Link to="/cart" className="cart">
          Buy now
        </Link>
      </div>
    </div>
  );
}

export default DetailsProduct;
