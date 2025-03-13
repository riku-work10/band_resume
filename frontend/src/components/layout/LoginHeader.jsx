import React from "react";
import { Link } from "react-router-dom";
import SignOutButtun from "../auth/SignOutButtun";

const LoginHeader = () => {
  return (
    <div>
      <ul className="flex space-x-6">
          <li>
          <Link to="/top" className="hover:underline">
              <h1 className="text-lg font-bold">ハルカミライ（トップ）</h1>
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