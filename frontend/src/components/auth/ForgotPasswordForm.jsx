import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post('/auth/password', {
        email,
        redirect_url: `${process.env.REACT_APP_VERCEL_URL}/password/reset`,
      });
      setMessage('リセットメールを送信しました。メールを確認してください。');
    } catch (error) {
      setMessage('送信に失敗しました。メールアドレスを確認してください。');
    }
  };

  return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12"
        style={{ backgroundImage: "url('/images/001.jpg')" }}
      >
      <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg text-white w-full max-w-md sm:max-w-lg p-6 sm:p-10">
        <h2 className="text-2xl font-light text-center mb-6 tracking-widest">パスワードリセット</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border-b border-white bg-transparent placeholder-white focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-stone-600 hover:bg-stone-700 text-white py-2 rounded-full transition-all"
          >
            送信
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-white/90">{message}</p>}

        <hr className="my-6 border-white/30" />

        <div className="text-center text-sm">
          <Link to="/signin" className="underline hover:text-cyan-200">
            ログインページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
