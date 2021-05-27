import React from "react";
import Products from "../products/Products";
import {Route,Switch } from 'react-router-dom';
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProductDetails from '../detailsProduct/DetailsProduct'
import Cart from "../cart/Cart";
import NotFound from '../until/not_found/NotFound'



function pages() {
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/login" exact component={Login} />
      <Route path="/details/:id" exact component={ProductDetails}/>
      <Route path="/register" exact component={Register} />
      <Route path="/cart" exact component={Cart} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default pages;
