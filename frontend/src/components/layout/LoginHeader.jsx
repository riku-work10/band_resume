import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import SignOutButtun from "../auth/SignOutButtun";
import GetPageName from "../../hooks/GetPageName";
import { MdClose, MdOutlineMenu, MdHome, MdNotifications } from "react-icons/md";

const LoginHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header>
      <div className="flex justify-between items-center">
        {/* ロゴ */}
        <div className="flex-1">
          <Link to="/top" className={`text-lg font-bold ${location.pathname === "/top" ? "text-orange-500" : ""}`}><MdHome className="text-xl"/></Link>
        </div>
        {/* ページタイトル */}
        <div className="flex-1 text-center">
          <p className="text-lg font-semibold">{GetPageName()}</p>
        </div>
        {/*（通知 & ハンバーガーメニュー） */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          <Link to="/notification" className="block" onClick={() => setIsOpen(false)}><MdNotifications className="text-xl" /></Link>
          <button className="text-white focus:outline-none z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MdClose className="text-xl" /> : <MdOutlineMenu className="text-xl" /> }
          </button>
        </div>
      </div>

      {/* メニューリスト（isOpen が true のときだけ表示） */}
      {isOpen && (
        <nav className="menu-container absolute top-16 right-0 w-1/8 bg-stone-700 p-4 shadow-lg rounded-l-lg">
          <ul className="space-y-2">
            <li><Link to="/contact" className="block" onClick={() => setIsOpen(false)}>お問い合わせ</Link></li>
            <li><Link to="/privacypolicy" className="block" onClick={() => setIsOpen(false)}>プライバシーポリシー</Link></li>
            <li><Link to="/termspfservice" className="block" onClick={() => setIsOpen(false)}>利用規約</Link></li>
            <li><SignOutButtun /></li>
          </ul>
        </nav>
      )}
    </header>
  );
};
    

export default LoginHeader;