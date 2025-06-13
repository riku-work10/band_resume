import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import GoogleLoginButton from './GoogleLoginButton';

function SignUp() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password, passwordConfirmation);
      alert('登録成功！');
      navigate('/top');
    } catch (err) {
      console.error(err);
      alert('登録に失敗しました');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center -my-16"
      style={{ backgroundImage: "url('/images/001.jpg')" }}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-light text-center mb-8 tracking-widest">SIGN UP</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="ニックネーム"
            className="w-full px-4 py-2 border-b border-white bg-transparent placeholder-white focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="パスワード（確認）"
            className="w-full px-4 py-2 border-b border-white bg-transparent placeholder-white focus:outline-none"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-stone-600 hover:bg-stone-700 text-white py-2 rounded-full transition-all"
          >
            登録
          </button>
        </form>
        <div className="my-6">
          <GoogleLoginButton />
        </div>
        <hr />
        <div className="flex flex-col items-center text-sm space-y-2">
          <span>すでにアカウントをお持ちですか？</span>
          <Link to="/signin" className="underline hover:text-cyan-200">
            ログインページへ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
