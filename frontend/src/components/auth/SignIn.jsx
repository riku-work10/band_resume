import { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

const SignIn = () => {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password);
      alert("ログイン成功！");
      navigate("/top");
    } catch (err) {
      console.error(err);
      alert("ログイン失敗");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/images/001.jpg')" }} // 画像パスは適宜変更
    >
      <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-light text-center mb-8 tracking-widest">LOGIN</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full px-4 py-2 border-b border-white bg-transparent placeholder-white focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="パスワード"
            className="w-full px-4 py-2 border-b border-white bg-transparent placeholder-white focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-stone-600 hover:bg-stone-700 text-white py-2 rounded-full transition-all"
          >
            ログイン
          </button>
        </form>

        <div className="mt-6">
          <GoogleLoginButton />
        </div>

        <hr className="my-6 border-white/30" />

        <div className="flex flex-col items-center text-sm space-y-2">
          <Link to="/password/forgot" className="underline hover:text-cyan-200">
            パスワードをお忘れですか？
          </Link>
          <Link to="/signup" className="underline hover:text-cyan-200">
            新規登録へ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
