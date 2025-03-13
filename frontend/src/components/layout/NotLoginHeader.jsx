import React from "react";
import { Link } from "react-router-dom";
import SignOutButtun from "../auth/SignOutButtun";

const NotLoginHeader = () => {
  return (
    <div>
      <h1>ログインしていない時のヘッダーです</h1>
      <ul className="flex space-x-6">
          <li>
            <Link to="/">
              ホームページ
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
    

export default NotLoginHeader;