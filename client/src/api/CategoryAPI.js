import axios from "axios";
import React, { useState, useEffect } from "react";

function CategoryAPI() {
  const [categories, setCategories] = useState([]);
  const [callback,setCallback]=useState(false)

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };
    getCategory();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    callback:[callback,setCallback]
  };
}

export default CategoryAPI;
