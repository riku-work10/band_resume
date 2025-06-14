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
      <div className="flex justify-between items-center">
        {/* ロゴ */}
        <div className="flex-1 flex justify-start items-center space-x-4">
          <Link
            to="/"
            className={`text-lg font-bold ${location.pathname === '/' ? 'text-orange-500' : ''}`}
          >
            <MdHome className="text-xl" />
          </Link>
        </div>
        {/* ハンバーガーメニュー */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          <button className="text-white focus:outline-none z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MdClose className="text-xl" /> : <MdOutlineMenu className="text-xl" />}
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
