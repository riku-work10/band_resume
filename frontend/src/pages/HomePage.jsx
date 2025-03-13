import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>ホームページです</h1>
      <p>今から実装します</p>
      <ul>
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
        </ul>
    </div>
  )
};
    

export default HomePage;