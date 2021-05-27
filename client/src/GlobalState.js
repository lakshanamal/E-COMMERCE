import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState("true");
  // console.log(ProductsAPI())
  const state = {
    state: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
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
