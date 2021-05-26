import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import Logo from "../icon/logo.png";
import "./header.css";
const Header = () => {
  const value=useState(GlobalState);
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
        </ul>
      </div>
      <div className="logo">
        <img src={Logo} alt="" width="200" />
      </div>
      <div className="sign">
        <div className="Cart-icon">
          <Link to='/cart'><img alt="" src="https://img.icons8.com/pastel-glyph/50/000000/fast-cart.png" /></Link>
        </div>
        <div className="Signin-icon">
          <Link to='/login'><h5>Log In</h5></Link>
          {/* <h5>Log In</h5> */}
        </div>
        <div className="Signout-icon">
          <Link to='/register'><h5>Sign Out</h5></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
