import React, { useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import "./cart.css";

function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getUser = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity);
      },0);
      setTotal(total);
      console.log(total)
    };

    getUser()
  }, [cart]);

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}> Cart Empty</h2>
    );

  return (
    <>
      {cart.map((product) => (
        <div className="details cart" key={product._id}>
          <img src={product.images.url} alt="" className="image_container" />
          <div className="box-details">
            <div className="row">
              <h2>{product.title}</h2>
              <h6>{product.product_id}</h6>
            </div>
            <span>${product.price * product.quantity}</span>
            <p>{product.discription}</p>
            <p>{product.context}</p>
            <div className="amount">
              <button>-</button>
              <span>{product.quantity}</span>
              <button>+</button>

              <div className="delete">X</div>
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total :$ {total}</h3>
        <Link to="#!">Payment</Link>
      </div>
    </>
  );
}

export default Cart;
