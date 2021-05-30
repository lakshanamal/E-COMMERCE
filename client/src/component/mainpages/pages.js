import React, { useContext } from "react";
import Products from "../products/Products";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProductDetails from "../detailsProduct/DetailsProduct";
import Cart from "../cart/Cart";
import History from "../history/OrderHistory";
import HistoryDetails from "../history/OrderDetails";
import NotFound from "../until/not_found/NotFound";
import { GlobalState } from "../../GlobalState";
import Categories from '../Categories/Categories'
import CreateProduct from '../CreateProduct/CreateProduct'

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
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
      <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
      <Route path="/history" exact component={isLogged ? History : NotFound} />
      <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
      <Route
        path="/history/:id"
        exact
        component={isLogged ? HistoryDetails : NotFound}
      />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
