import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const getUser = async () => {
    try {
      const res = await axios.get("/user/infor", {
        headers: { Authorization: token },
      });
      // console.log(token);
      setIsLogged(true); //if try not error then
      res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  useEffect(() => {
    if (token) {
      getUser();
    }
    // console.log("hello")
  }, [token]);
  // console.log("hello")
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
  };
}

export default UserAPI;
