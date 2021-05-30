import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
 
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data);
    }
  };
  //   useEffect(() => {
  //       console.log(user.email)
  //       console.log(user.password)
  //   })

  return (
    <div className="login-page">
        <h2>Login</h2>
      <form onSubmit={loginSubmit}>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={onChangeInput}
          id="email"
          required
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onChangeInput}
          id="password"
          required
          placeholder="Password"
          autoComplete="on"
        />
        <button type="submit">Login</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
}

export default Login;
