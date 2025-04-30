import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';


function ResetPasswordForm() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token') || '';
  const client = searchParams.get('client') || '';
  const uid = searchParams.get('uid') || '';

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
        }
      );
      setMessage('パスワードを変更しました。ログインしてください。');
    } catch (error) {
      const errorMsg =
        error.response?.data?.errors?.full_messages?.join(', ') ||
        '変更に失敗しました。';
      setMessage(errorMsg);
    }
  };

  return (
    <div>
      <h2>パスワード再設定</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="新しいパスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード確認"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">パスワードを変更する</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPasswordForm;
