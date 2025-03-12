import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ローカルストレージから認証情報を取得
    const token = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    if (token && client && uid) {
      fetchUser(token, client, uid);
    }
  }, []);

  const fetchUser = async (token, client, uid) => {
    try {
      const res = await apiClient.get('/auth/validate_token', {
        headers: {
          'access-token': token,
          client: client,
          uid: uid,
        },
      });
      setUser(res.data.data);
    } catch (err) {
      console.error('ユーザー情報の取得に失敗しました:', err);
    }
  };

  const login = (userData, token, client, uid) => {
    localStorage.setItem('access-token', token);
    localStorage.setItem('client', client);
    localStorage.setItem('uid', uid);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// `useAuth` フックを作成して、コンテキストのデータにアクセスできるようにする
export const useAuth = () => {
  return useContext(AuthContext);
};