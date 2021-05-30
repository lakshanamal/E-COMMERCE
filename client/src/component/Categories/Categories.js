import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.category.categories;
  const [category, setCategory] = useState("");
  const [token] = state.state;
  const [callback,setCallback] = state.category.callback;

  const createCategory = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/category",
        { name: category },
        {
          headers: { Authorization: token },
        }
      );
      setCategory('')
      setCallback(!callback)
      alert(res.data.msg);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="categories">
      <form onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          required
        />
        <button type="submit">Save</button>
      </form>
      <div className="col">
        {categories.map((category) => {
          return (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
