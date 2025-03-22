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
          to="/lives"
          className={location.pathname === "/lives" ? "text-red-500" : ""}
          >
            <MdMic />
            ライブ一覧
          </Link>
        </li>
        <li>
          <Link to="/myresumes"
          className={location.pathname === "/myresumes" ? "text-red-500" : ""}>
            <MdOutlinePersonAddAlt1 />
            マイ履歴書
          </Link>
        </li>
        <li>
          <Link to="/resumes"
          className={location.pathname === "/resumes" ? "text-red-500" : ""}>
            <MdMenuBook />
            履歴書一覧
          </Link>
        </li>
        <li>
          <Link to="/chat"
          className={location.pathname === "/chat" ? "text-red-500" : ""}>
            <MdChat />
            オープンチャット
          </Link>
        </li>
        <li>
          <Link to="/mypage"
          className={location.pathname === "/mypage" ? "text-red-500" : ""}>
            <MdPerson />
            マイページ
          </Link>
        </li>
      </ul>
    </div>
  )
};
    

export default LoginFooter;