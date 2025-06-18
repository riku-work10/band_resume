import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdClose, MdOutlineMenu, MdHome } from 'react-icons/md';

function NotLoginHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

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
    <header className="fixed top-0 left-0 w-full bg-stone-800 text-white z-40">
      <div className="flex items-center h-14 sm:h-16 px-4">
        {/* 左：ロゴ */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className={`text-lg font-bold ${location.pathname === '/' ? 'text-orange-500' : 'text-white'}`}
            aria-label="ホーム"
          >
            <MdHome className="text-2xl sm:text-3xl" />
          </Link>
        </div>

        {/* 右側：ログイン・登録・メニュー */}
        <div className="flex items-center space-x-3 ml-auto">
          <Link
            to="/signup"
            className="px-3 py-1 bg-stone-200 text-stone-800 rounded hover:bg-stone-100 transition text-sm sm:text-base"
          >
            新規登録
          </Link>
          <Link
            to="/signin"
            className="px-3 py-1 bg-stone-600 rounded hover:bg-stone-500 transition text-sm sm:text-base"
          >
            ログイン
          </Link>
          <button
            className="text-white focus:outline-none z-50"
            aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <MdClose className="text-2xl sm:text-3xl" /> : <MdOutlineMenu className="text-2xl sm:text-3xl" />}
          </button>
        </div>
      </div>

      {/* メニューリスト */}
      {isOpen && (
        <nav
          ref={menuRef}
          className="absolute top-16 right-2 w-48 sm:w-64 bg-stone-700 p-4 shadow-lg rounded-lg z-40"
        >
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link to="/" className="block hover:text-orange-400" onClick={() => setIsOpen(false)}>
                ホーム
              </Link>
            </li>
            <li>
              <Link to="/signin" className="block hover:text-orange-400" onClick={() => setIsOpen(false)}>
                ログイン
              </Link>
            </li>
            <li>
              <Link to="/signup" className="block hover:text-orange-400" onClick={() => setIsOpen(false)}>
                新規登録
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block hover:text-orange-400" onClick={() => setIsOpen(false)}>
                お問い合わせ
              </Link>
            </li>
            <li>
              <Link to="/privacypolicy" className="block hover:text-orange-400" onClick={() => setIsOpen(false)}>
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link to="/termsofservice" className="block hover:text-orange-400" onClick={() => setIsOpen(false)}>
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
