import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState("true");
  // console.log(ProductsAPI())
  const state = {
    state: [token, setToken],
    productsAPI: ProductsAPI(),
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
