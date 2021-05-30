import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Loading from "../until/loading/Loading";
import axios from "axios";
import './createProduct.css'

const initialState = {
  product_id: "",
  title: "",
  price: "0",
  description: "How to and tutorial video of cool CSS ",
  content: "kjndsfnjksd  jnsf s fiejijsfe",
  category: "",
};
function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.category.categories;
  const [images, setImages] = useState(false);
  // console.log(state.category)
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" />
        <div id="file_img">
          <img src='https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg' alt="" />
          <span>X</span>
        </div>
      </div>
      <form>
        <div className="row">
          <label htmlFor="product_id">Product Id</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
          />
        </div>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
          />
        </div>
        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
          />
        </div>
        <div className="row">
          <label htmlFor="discription">Discription</label>
          <textarea
            type="number"
            name="discription"
            id="discription"
            required
            rows="5"
            value={product.discription}
          />
        </div>
        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            rows="7"
            value={product.content}
          />
        </div>
        <div className="row">
          <label htmlFor="category">Category</label>
          <select name="category" value={product.category} >
              <option value="">Please select a category</option>
              {
                  categories.map((category)=>{
                      return(
                          <option value={category.name} key={category._id}>{category.name}</option>
                      )
                  })
              }
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProduct;
