import React from "react";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = `${process.env.REACT_APP_API_URL}/api/${process.env.REACT_APP_API_VERSION}`;

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/sign_in`, {
        email,
        password,
      });
      localStorage.setItem("access-token", res.headers["access-token"]);
      localStorage.setItem("client", res.headers["client"]);
      localStorage.setItem("uid", res.headers["uid"]);
      alert("ログイン成功！");
    } catch (err) {
      console.error(err);
      alert("ログイン失敗");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;

