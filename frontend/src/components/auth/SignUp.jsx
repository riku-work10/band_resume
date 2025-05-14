import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, passwordConfirmation);
      alert("登録成功！");
      navigate("/top");
    } catch (err) {
      console.error(err);
      alert("登録に失敗しました");
    }
  };

  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="メールアドレス" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="パスワード" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="パスワード（確認）" onChange={(e) => setPasswordConfirmation(e.target.value)} />
        <button type="submit">登録</button>
      </form>
      < GoogleLoginButton />
      <p>
        <Link to="/signin">ログインページへ</Link>
      </p>
    </div>
  );
};

export default SignUp;

