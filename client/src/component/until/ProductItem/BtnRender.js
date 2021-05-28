import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function BtnRender({ product }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  return (
    <div>
      {isAdmin ? (
        <div className="row_btn">
          <Link id="btn_buy" to="/">
            Delete
          </Link>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </div>
      ) : (
        <div className="row_btn">
          <Link id="btn_buy" to="/" onClick={() => addCart(product)}>
            Buy
          </Link>
          <Link id="btn_view" to={`/details/${product._id}`}>
            View
          </Link>
        </div>
      )}
    </div>
  );
}

export default BtnRender;
