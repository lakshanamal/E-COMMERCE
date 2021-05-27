import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './login.css'

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
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
        <h2>Register</h2>
      <form onSubmit={registerSubmit}>
      <input
          type="text"
          name="name"
          value={user.name}
          onChange={onChangeInput}
          id="name"
          required
          placeholder="Name"
        />
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
        <button type="submit">Register</button>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
}

export default Register;
