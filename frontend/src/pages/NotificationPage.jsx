import React, { useState, useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';
import { useNavigate } from 'react-router-dom';
import { MdNotificationsActive } from 'react-icons/md';
import apiClient from '../services/apiClient';

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get('/notifications')
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error('Error fetching notifications:', error));

    const cable = createConsumer(`${process.env.REACT_APP_API_URL}/cable`);
    const channel = cable.subscriptions.create(
      { channel: 'NotificationChannel' },
      {
        received(data) {
          setNotifications((prev) => [...prev, data]);
        },
      },
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleReadNotification = async (id, resumeId) => {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      navigate(`/resumes/${resumeId}`);
    } catch (error) {
      console.error('既読処理失敗:', error);
    }
  };

  const handleReadAllNotifications = async () => {
    try {
      await apiClient.patch('/notifications/read_all');
      setNotifications([]);
    } catch (error) {
      console.error('一括既読処理失敗:', error);
    }
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadNotifications = notifications.filter((n) => !n.read);

  return (
    <div className="bg-stone-900 rounded-xl shadow-md p-6 border border-stone-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-stone-100">通知一覧</h2>
        {unreadNotifications.length > 0 && (
          <button
            onClick={handleReadAllNotifications}
            className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md"
          >
            すべて既読にする
          </button>
        )}
      </div>

      {unreadNotifications.length === 0 ? (
        <p className="text-stone-400 text-center">新しい通知はありません</p>
      ) : (
        <ul className="space-y-4">
          {unreadNotifications.map((n) => (
            <li
              key={n.id}
              onClick={() => handleReadNotification(n.id, n.resume_id)}
              className="flex items-start gap-3 bg-stone-700 hover:bg-stone-600 transition-all p-4 rounded-xl shadow-sm border border-stone-600 cursor-pointer"
            >
              <div className="bg-orange-500 rounded-full p-2">
                <MdNotificationsActive className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-100 mb-1">{n.message}</p>
                {n.comment_content && <p className="text-sm text-stone-300">{n.comment_content}</p>}
              </div>
              <span className="text-xs text-stone-400 whitespace-nowrap ml-2 mt-1">
                {formatDate(n.created_at)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationList;
