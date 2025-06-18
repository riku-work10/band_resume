import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const client = searchParams.get('client') || '';
  const uid = searchParams.get('uid') || '';
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('パスワードが一致しません。');
      return;
    }

    try {
      await apiClient.put(
        '/auth/password',
        {
          reset_password_token: token,
          password,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            'access-token': token,
            client,
            uid,
          },
        },
      );
      setMessage('パスワードを変更しました。ログインしてください。');
      navigate('/signin');
    } catch (error) {
      const errorMsg =
        error.response?.data?.errors?.full_messages?.join(', ') || '変更に失敗しました。';
      setMessage(errorMsg);
    }
  };

  return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12"
        style={{ backgroundImage: "url('/images/001.jpg')" }}
      >
      <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg text-white w-full max-w-md sm:max-w-lg p-6 sm:p-10">
        <h2 className="text-2xl font-light text-center mb-6 tracking-widest">パスワード再設定</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            placeholder="新しいパスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border-b border-white bg-transparent placeholder-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="パスワード確認"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border-b border-white bg-transparent placeholder-white focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-stone-600 hover:bg-stone-700 text-white py-2 rounded-full transition-all"
          >
            パスワードを変更する
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

export default ResetPasswordForm;
