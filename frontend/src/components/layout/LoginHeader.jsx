import React from "react";
import { Link, useLocation } from "react-router-dom";
import SignOutButtun from "../auth/SignOutButtun";
import GetPageName from "../../hooks/GetPageName";

const LoginHeader = () => {

  const location = useLocation();
  return (
    <div>
      <ul className="flex space-x-6">
          <li>
          <Link to="/top" className={`hover:underline ${location.pathname === "/top" ? "text-red-500" : ""}`}>
              <h1 className="text-lg font-bold">ハルカミライ（トップ）</h1>
          </Link>
          </li>
          <li>
          <h1>{GetPageName()}</h1>
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