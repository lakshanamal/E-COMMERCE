import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState"

function Products() {
  const state = useContext(GlobalState);
  console.log(state);

  return (
    <div>
      <h1>Hello</h1>
      {/* <h2>{state}</h2> */}
    </div>
  );
}

export default Products;
