import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import Logo from "../icon/logo.png";
import "./header.css";
const Header = () => {
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
            <Link to="">Girls</Link>
          </li>
          <li className="nav-link-item">
            <Link to="">Boys</Link>
          </li>
          <li className="nav-link-item">
            <Link to="">Kids</Link>
          </li>
        </ul>
      </div>
      <div className="logo">
        <img src={Logo} alt="" width="200" />
      </div>
      <div className="sign">
        <div className="Cart-icon">
          <img src="https://img.icons8.com/pastel-glyph/64/000000/fast-cart.png" />
        </div>
        <div className="Signin-icon">
          <h5>Log In</h5>
        </div>
        <div className="Signout-icon">
          <h5>Sign Out</h5>
        </div>
      </div>
    </header>
  );
};

export default Header;
