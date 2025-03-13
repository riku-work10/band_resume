import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <h1>フッターです</h1>
      <ul className="flex space-x-6">
                <li>
                  <Link to="/lives">
                    ライブ一覧
                  </Link>
                </li>
                <li>
                  <Link to="/myresumes">
                    マイ履歴書
                  </Link>
                </li>
                <li>
                  <Link to="/resumes">
                    履歴書一覧
                  </Link>
                </li>
                <li>
                  <Link to="/chat">
                    オープンチャット
                  </Link>
                </li>
                <li>
                  <Link to="/mypage">
                    マイページ
                  </Link>
                </li>
              </ul>
    </div>
  )
};
    

export default Footer;