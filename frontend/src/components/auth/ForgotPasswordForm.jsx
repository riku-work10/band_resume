import React, { useState } from 'react';
import apiClient from '../../services/apiClient';
import { Link } from "react-router-dom";

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post('/auth/password', {
        email,
        redirect_url: 'https://band-resume.vercel.app/password/reset', // リセット後のReact画面URL
      });
      setMessage('リセットメールを送信しました。メールを確認してください。');
    } catch (error) {
      setMessage('送信に失敗しました。メールアドレスを確認してください。');
    }
  };

  return (
    <div>
      <h2>パスワードをお忘れですか？</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">送信</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        <Link to="/signin">ログインページへ戻る</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordForm;
