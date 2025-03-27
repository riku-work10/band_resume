import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdPerson, MdChat, MdMenuBook, MdOutlinePersonAddAlt1, MdMic  } from "react-icons/md";

const LoginFooter = () => {
  const location = useLocation();

  return (
    <div >
      <ul className="container mx-auto flex items-center justify-center justify-between px-6">
        <li>
          <Link 
            to="/events"
            className={`flex flex-col items-center gap-1 ${location.pathname === "/lives" ? "text-orange-500" : ""}`}>
            <MdMic className="text-xl" /> {/* アイコンのサイズ調整 */}
            <span className="text-xs sm:text-sm">ライブ一覧</span> {/* 文字サイズを小さく */}
          </Link>
        </li>
        <li>
          <Link to="/myresumes"
          className={`flex flex-col items-center gap-1 ${location.pathname === "/myresumes" ? "text-orange-500" : ""}`}>
            <MdOutlinePersonAddAlt1 className="text-xl"/>
            <span className="text-xs sm:text-sm">マイ履歴書</span>
          </Link>
        </li>
        <li>
          <Link to="/resumes"
          className={`flex flex-col items-center gap-1 ${location.pathname === "/resumes" ? "text-orange-500" : ""}`}>
            <MdMenuBook className="text-xl"/>
            <span className="text-xs sm:text-sm">履歴書一覧</span>
          </Link>
        </li>
        <li>
          <Link to="/chat"
          className={`flex flex-col items-center gap-1 ${location.pathname === "/chat" ? "text-orange-500" : ""}`}>
            <MdChat className="text-xl"/>
            <span className="text-xs sm:text-sm">オープンチャット</span>
          </Link>
        </li>
        <li>
          <Link to="/mypage"
          className={`flex flex-col items-center gap-1 ${location.pathname === "/mypage" ? "text-orange-500" : ""}`}>
            <MdPerson className="text-xl"/>
            <span className="text-xs sm:text-sm">マイページ</span>
          </Link>
        </li>
      </ul>
    </div>
  )
};
    

export default LoginFooter;