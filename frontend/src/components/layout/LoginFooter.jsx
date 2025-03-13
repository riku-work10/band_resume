import React from "react";
import { Link } from "react-router-dom";

const LoginFooter = () => {
  return (
    <div className="bg-stone-600 text-white py-4 shadow-md">
      <ul className="container mx-auto flex justify-between items-center px-6">
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
    

export default LoginFooter;