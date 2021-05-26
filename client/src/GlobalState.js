import React, { createContext, useState, useContext } from "react";
import ProductsAPI from "./api/ProductsAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  // console.log(ProductsAPI())
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
  };

  return (
    <div>
      <GlobalState.Provider value={state}>
        {children}
      </GlobalState.Provider>
    </div>
  );
};
