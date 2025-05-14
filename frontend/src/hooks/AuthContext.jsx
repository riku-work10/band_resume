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

  //ログイン
  const signin = async (email, password) => {
    try {
      const res = await apiClient.post('/auth/sign_in', { email, password });
      
      // 認証情報をローカルストレージに保存
      localStorage.setItem("access-token", res.headers["access-token"]);
      localStorage.setItem("client", res.headers["client"]);
      localStorage.setItem("uid", res.headers["uid"]);

      // 🔹 `fetchUser` を実行して `user` を更新
      fetchUser(res.headers["access-token"], res.headers["client"], res.headers["uid"]);
    } catch (err) {
      console.error("ログインに失敗しました:", err);
    }
  };

  //グーグル認証
const signinWithGoogle = async (idToken) => {
  try {
    const res = await apiClient.post("/snsauth/googleauth", {
      id_token: idToken,
    });
    const accessToken = res.headers["access-token"];
    const client = res.headers["client"];
    const uid = res.headers["uid"];

    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);

    fetchUser(accessToken, client, uid);
  } catch (err) {
    console.error("Googleログインに失敗しました:", err);
    throw err;
  }
};


  //新規登録
  const signup = async (name, email, password, passwordConfirmation) => {
    try {
      await apiClient.post("/auth", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      // サインアップ後に自動的にログイン
      await signin(email, password);
    } catch (err) {
      console.error("サインアップに失敗しました:", err);
    }
  };

  //ログアウト
  const signout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
    setUser(null);  // ユーザー情報をクリア
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout, setUser, signinWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );
};

// `useAuth` フックを作成して、コンテキストのデータにアクセスできるようにする
export const useAuth = () => {
  return useContext(AuthContext);
};