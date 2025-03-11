import React from "react";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const API_URL = `${process.env.REACT_APP_API_URL}/api/${process.env.REACT_APP_API_VERSION}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth`, {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      localStorage.setItem("access-token", res.headers["access-token"]);
      localStorage.setItem("client", res.headers["client"]);
      localStorage.setItem("uid", res.headers["uid"]);
      alert("登録成功！");
    } catch (err) {
      console.error(err);
      alert("登録に失敗しました");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirmation(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

