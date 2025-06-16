import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdClose, MdOutlineMenu, MdHome, MdNotifications } from 'react-icons/md';
import SignOutButtun from '../auth/SignOutButtun';
import GetPageName from '../../hooks/GetPageName';
import NotificationPage from '../../pages/NotificationPage';

function LoginHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowNotificationModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <Link
            to="/top"
            className={`text-lg font-bold ${location.pathname === '/top' ? 'text-orange-500' : ''}`}
          >
            <MdHome className="text-xl" />
          </Link>
        </div>
        <div className="flex-1 text-center">
          <p className="text-lg font-semibold">{GetPageName()}</p>
        </div>
        <div className="flex-1 flex justify-end items-center space-x-4">
          <button className="block text-white" onClick={() => setShowNotificationModal(true)}>
            <MdNotifications className="text-xl" />
          </button>
          <button className="text-white z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MdClose className="text-xl" /> : <MdOutlineMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* メニュー */}
      {isOpen && (
        <nav
          ref={menuRef}
          className="absolute top-16 right-0 w-1/8 bg-stone-700 p-4 shadow-lg rounded-l-lg"
        >
          <ul className="space-y-2">
            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                お問い合わせ
              </Link>
            </li>
            <li>
              <Link to="/privacypolicy" onClick={() => setIsOpen(false)}>
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link to="/termsofservice" onClick={() => setIsOpen(false)}>
                利用規約
              </Link>
            </li>
            <li>
              <SignOutButtun />
            </li>
          </ul>
        </nav>
      )}

      {/* 通知モーダル */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-stone-800 text-stone-100 rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-xl p-6 border border-stone-600"
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="p-2 rounded-full hover:bg-stone-700 transition-colors focus:outline-none"
              >
                <MdClose className="text-2xl text-stone-300" />
              </button>
            </div>
            <NotificationPage onClose={() => setShowNotificationModal(false)}/>
          </div>
        </div>
      )}
    </header>
  );
}

export default LoginHeader;
