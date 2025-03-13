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
        <img src={"https://delyze.com/wp-content/uploads/2022/04/hrkmr-logo-thumb.jpg"} alt="Example" style={{ width: '1000px', height: 'auto' }} />
    </div>
  )
};
    

export default HomePage;