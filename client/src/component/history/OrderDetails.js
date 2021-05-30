import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import "./history.css";

function OrderDetails() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetais, setOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);
  console.log(orderDetais);
  if (orderDetais.length === 0) return null;
  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country code </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetais.address.recipient_name}</td>
            <td>
              {orderDetais.address.line1 + "-" + orderDetais.address.city}
            </td>
            <td>{orderDetais.address.postal_code}</td>
            <td>{orderDetais.address.country_code}</td>
          </tr>
        </tbody>
      </table>
      <table style={{ margin: "30px 0px" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product </th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetais.cart.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <img width="100" src={item.images.url} alt="" />
                </td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>$ {item.quantity * item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
