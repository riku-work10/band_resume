import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import SignOutButtun from "../auth/SignOutButtun";
import GetPageName from "../../hooks/GetPageName";

const LoginHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  return (
    <header className="bg-stone-600 text-white p-4 relative">
      <div className="flex justify-between items-center">
        {/* ロゴ */}
        <Link to="/top" className="text-lg font-bold">
          ハルカミライ（トップ）
        </Link>
        <p>{GetPageName()}</p>
        {/* ハンバーガーメニューボタン */}
        <button
          className="text-white focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? ( // 🔹 メニューが開いている時は「×」アイコンを表示
            <p>
            X
            </p>
          ) : ( // 🔹 メニューが閉じている時は「≡」アイコンを表示
            <p>=</p>
          )}
        </button>
      </div>

      {/* メニューリスト（isOpen が true のときだけ表示） */}
      {isOpen && (
        <nav className="menu-container absolute top-16 left-0 w-full bg-stone-700 p-4 shadow-lg rounded">
          <ul className="space-y-2">
            <li>
              <Link to="/tasks" className="block" onClick={() => setIsOpen(false)}>タスク</Link>
            </li>
            <li>
              <Link to="/notification" className="block" onClick={() => setIsOpen(false)}>通知</Link>
            </li>
            <li>
              <Link to="/contact" className="block" onClick={() => setIsOpen(false)}>お問い合わせ</Link>
            </li>
            <li>
              <Link to="/privacypolicy" className="block" onClick={() => setIsOpen(false)}>プライバシーポリシー</Link>
            </li>
            <li>
              <Link to="/termspfservice" className="block" onClick={() => setIsOpen(false)}>利用規約</Link>
            </li>
            <li>
              <SignOutButtun />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
    

export default LoginHeader;