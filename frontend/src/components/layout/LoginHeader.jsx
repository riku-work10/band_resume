import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdClose, MdOutlineMenu, MdHome, MdNotifications } from 'react-icons/md';
import SignOutButtun from '../auth/SignOutButtun';
import GetPageName from '../../hooks/GetPageName';
import NotificationPage from '../../pages/NotificationPage';
import apiClient from '../../services/apiClient';

function LoginHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    apiClient
      .get('/notifications')
      .then((response) => {
        const unread = response.data.filter((n) => !n.read);
        setUnreadCount(unread.length);
      })
      .catch((error) => console.error('通知数取得エラー:', error));
  }, []);

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
      <div className="flex justify-between items-center h-14 sm:h-16 pb-5">
        <div className="flex-shrink-0">
          <Link
            to="/top"
            className={`text-lg font-bold ${location.pathname === '/top' ? 'text-orange-500' : 'text-white'}`}
            aria-label="ホーム"
          >
            <MdHome className="text-xl sm:text-2xl" />
          </Link>
        </div>

        <div className="flex-grow text-center">
          <p className="text-lg font-semibold text-white">{GetPageName()}</p>
        </div>

        <div className="flex-shrink-0 flex items-center space-x-4">
          <button
            className="relative text-white"
            onClick={() => setShowNotificationModal(true)}
            aria-label="通知を表示"
          >
            <MdNotifications className="text-2xl sm:text-3xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center leading-none shadow-sm">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          <button
            className="text-white z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            {isOpen ? <MdClose className="text-xl sm:text-2xl" /> : <MdOutlineMenu className="text-xl sm:text-2xl" />}
          </button>
        </div>
      </div>

      {/* メニュー */}
      {isOpen && (
        <nav
          ref={menuRef}
          className="absolute top-16 right-2 w-48 bg-stone-700 p-4 shadow-lg rounded-lg sm:w-64 text-white z-40"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-4">
          <div
            ref={modalRef}
            className="bg-stone-800 text-stone-100 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl p-4 sm:p-6 border border-stone-600"
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="p-2 rounded-full hover:bg-stone-700 transition-colors focus:outline-none"
                aria-label="通知モーダルを閉じる"
              >
                <MdClose className="text-2xl text-stone-300" />
              </button>
            </div>
            <NotificationPage onClose={() => setShowNotificationModal(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

export default LoginHeader;
