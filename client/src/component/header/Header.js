import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import Logo from "../icon/logo.png";
import "./header.css";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const adminRouter = () => {
    return (
      <>
        <li className="nav-link-item">
          <Link to="/create_product"> Create Product </Link>
        </li>
        <li className="nav-link-item">
          <Link to="/category"> Categories</Link>
        </li>
      </>
    );
  };
  const loggoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
   window.location.href='/'
  };
  const loggedRouter = () => {
    return (
      <>
        <li className="nav-link-item">
          <Link to="/history"> History </Link>
        </li>
        <li className="nav-link-item">
          <Link to="/" onClick={loggoutUser}>
            {" "}
            Logout
          </Link>
        </li>
      </>
    );
  };

  // console.log(value)
  return (
    <header className="header">
      <div className="nav-links">
        <ul>
          <li className="nav-link-item">
            <Link to="/">Home</Link>
          </li>
          {/* <li className="nav-link-item">
            <Link to="/"><h4>Product</h4></Link>
          </li> */}
          <li className="nav-link-item">
            <Link to="/">Girls</Link>
          </li>
          <li className="nav-link-item">
            <Link to="/">Boys</Link>
          </li>
          <li className="nav-link-item">
            <Link to="">Kids</Link>
          </li>
          {isAdmin ? (
            <li className="nav-link-item">
              <Link to="">Product</Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="logo">
        <img src={Logo} alt="" width="200" />
      </div>
      <div className="sign">
        {isAdmin ? (
          ""
        ) : (
          <div className="Cart-icon">
            <Link to="/cart">
              <span>{cart.length}</span>
              <img
                alt=""
                src="https://img.icons8.com/pastel-glyph/50/000000/fast-cart.png"
              />
            </Link>
          </div>
        )}
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <>
            <div className="Signin-icon">
              <Link to="/login">
                <h5>Log In</h5>
              </Link>
            </div>
            <div className="Signout-icon">
              <Link to="/register">
                <h5>Sign Out</h5>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
