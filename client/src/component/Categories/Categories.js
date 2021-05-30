import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.category.categories;
  const [category, setCategory] = useState([]);

  return (
    <div className="categories">
      <form>
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