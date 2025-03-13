import React from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password); // 🔹 `login` を呼び出し
      alert("ログイン成功！");
      navigate("/top"); // トップページへ遷移
    } catch (err) {
      console.error(err);
      alert("ログイン失敗");
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;

