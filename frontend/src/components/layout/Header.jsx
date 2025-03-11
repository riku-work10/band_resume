import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1>ヘッダーです</h1>
      <p>今から実装します</p>
      <ul className="flex space-x-6">
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
            <Link to="/mypage">
              マイページ
            </Link>
          </li>
          <li>
            <Link to="/tasks">
              タスク
            </Link>
          </li>
        </ul>
    </div>
  )
};
    

export default Header;