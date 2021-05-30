import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import PaypalButton from "./PaypalButton";
import "./cart.css";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.state;
  const [total, setTotal] = useState(0);
  const [callback,setCallback]=state.userAPI.callback

  useEffect(() => {
    const getUser = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };

    getUser();
  }, [cart]);

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity -= 1;
        if (item.quantity === 0) item.quantity = 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product ?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSucess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      { headers: { Authorization: token } }
    );
    setCart([]);
    addToCart([]);
  
    alert("You have sucessfully placed an order");
    setCallback(!callback)
  };

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addCart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}> Cart Empty</h2>
    );
  }
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
              <button onClick={() => decrement(product._id)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}>+</button>

              <div
                className="delete"
                onClick={() => removeProduct(product._id)}
              >
                X
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total :$ {total}</h3>
        <PaypalButton total={total} tranSucess={tranSucess} />
      </div>
    </>
  );
}

export default Cart;
