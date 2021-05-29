import React, { useContext } from "react";
import Products from "../products/Products";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProductDetails from "../detailsProduct/DetailsProduct";
import Cart from "../cart/Cart";
import NotFound from "../until/not_found/NotFound";
import { GlobalState } from "../../GlobalState";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route path="/details/:id" exact component={ProductDetails} />
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      />
      <Route path="/cart" exact component={Cart} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
