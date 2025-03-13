import React from "react";
import { Link } from "react-router-dom";
import SignOutButtun from "../auth/SignOutButtun";

const LoginHeader = () => {
  return (
    <div>
      <h1>ログインしたあとのヘッダーです</h1>
      <ul className="flex space-x-6">
          <li>
            <Link to="/top">
              トップページ
            </Link>
          </li>
          <li>
            <SignOutButtun />
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
    

export default LoginHeader;