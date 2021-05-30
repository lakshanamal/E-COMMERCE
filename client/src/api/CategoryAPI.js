import axios from "axios";
import React, { useState, useEffect } from "react";

function CategoryAPI() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };
    getCategory();
  }, []);

  return {
    categories: [categories, setCategories],
  };
}

export default CategoryAPI;
