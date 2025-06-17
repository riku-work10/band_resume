import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdClose, MdOutlineMenu, MdHome } from 'react-icons/md';

function NotLoginHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null); // メニューのref

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="fixed bg-stone-800 text-white relative">
<div className="flex items-center h-full">
        {/* 左：ロゴ */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className={`text-lg font-bold ${location.pathname === '/' ? 'text-orange-500' : ''}`}
          >
            <MdHome className="text-2xl" />
          </Link>
        </div>

        {/* 右側：ログイン・登録・メニュー */}
        <div className="flex items-center space-x-3 ml-auto">
          <Link
            to="/signup"
            className="px-3 py-1 bg-stone-200 text-stone-800 rounded hover:bg-stone-100 transition"
          >
            新規登録
          </Link>
          <Link
            to="/signin"
            className=" px-3 py-1 bg-stone-600 rounded hover:bg-stone-500 transition"
          >
            ログイン
          </Link>
          <button
            className="text-white focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <MdClose className="text-2xl" /> : <MdOutlineMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* メニューリスト */}
      {isOpen && (
        <nav
          ref={menuRef} // ref をつける
          className="menu-container absolute top-12 right-0 w-1/8 bg-stone-700 p-4 shadow-lg rounded-l-lg"
        >
          <ul className="space-y-2">
            <li>
              <Link to="/" className="block" onClick={() => setIsOpen(false)}>
                ホーム
              </Link>
            </li>
            <li>
              <Link to="/signin" className="block" onClick={() => setIsOpen(false)}>
                ログイン
              </Link>
            </li>
            <li>
              <Link to="/signup" className="block" onClick={() => setIsOpen(false)}>
                新規登録
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block" onClick={() => setIsOpen(false)}>
                お問い合わせ
              </Link>
            </li>
            <li>
              <Link to="/privacypolicy" className="block" onClick={() => setIsOpen(false)}>
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link to="/termsofservice" className="block" onClick={() => setIsOpen(false)}>
                利用規約
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default NotLoginHeader;
