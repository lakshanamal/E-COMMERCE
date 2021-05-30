import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import Category from "./api/CategoryAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI"; // catch users logging data

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  // main function
  const [token, setToken] = useState(false);

  const state = {
    // pack to export
    state: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    category: Category()
  };

  const refreshToken = async () => {
    const res = await axios.get("/user/refreshToken");
    setToken(res.data.acessToken);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      refreshToken();
    }
  }, []);
  // console.log(state);

  return (
    <div>
      <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
    </div>
  );
};
