import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1>ヘッダーです</h1>
      <p>今から実装します</p>
      <ul className="flex space-x-6">
          <li>
            <Link to="/">
              ホームページ
            </Link>
          </li>
          <li>
            <Link to="/top">
              トップページ
            </Link>
          </li>
          <li>
            <Link to="/signup">
              新規登録
            </Link>
          </li>
          <li>
            <Link to="/signin">
              ログイン
            </Link>
          </li>
          <li>ログアウトボタン</li>
          <li>
            <Link to="/tasks">
              タスク
            </Link>
          </li>
          <li>
            <Link to="/notification">
              通知
            </Link>
          </li>
          <li>
            <Link to="/contact">
              お問い合わせ
            </Link>
          </li>
          <li>
            <Link to="/privacypolicy">
              プライバシーポリシー
            </Link>
          </li>
          <li>
            <Link to="/termspfservice">
              利用規約
            </Link>
          </li>
        </ul>
    </div>
  )
};
    

export default Header;