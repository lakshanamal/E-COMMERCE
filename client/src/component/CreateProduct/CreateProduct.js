import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Loading from "../until/loading/Loading";
import axios from "axios";
import "./createProduct.css";

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
  const [isAdmin] = state.userAPI.isAdmin;
  const [loading, setLoading] = useState(false);
  const [token] = state.state;

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const handleUplaod = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an admin");
      const file = e.target.files[0];
      if (!file) return alert("File doesnt exsit");

      if (file.size > 1024 * 1024) return alert("File size is too large");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format incorrect");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelect = async () => {
    try {
      if (!isAdmin) return alert("You're not admin");
      setLoading(true);
      await axios.post(
        "/api/destory",
        { public_id: images.public_id },
        { headers: { Authorization: token } }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUplaod} />
        {loading ? (
          <div className="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDelect}>X</span>
          </div>
        )}
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
          <select name="category" value={product.category}>
            <option value="">Please select a category</option>
            {categories.map((category) => {
              return (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProduct;
