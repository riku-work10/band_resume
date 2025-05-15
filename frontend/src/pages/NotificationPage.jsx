import React, { useState, useEffect } from "react";
import { createConsumer } from "@rails/actioncable";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md"; 

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/notifications')
      .then(response => setNotifications(response.data))
      .catch(error => console.error("Error fetching notifications:", error));

    const cable = createConsumer(`${process.env.REACT_APP_API_URL}/cable`);
    const channel = cable.subscriptions.create(
      { channel: "NotificationChannel" },
      {
        received(data) {
          setNotifications((prev) => [...prev, data]);
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleReadNotification = async (id, resumeId) => {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">通知一覧</h2>
          {notifications.length > 0 && (
            <button
              onClick={handleReadAllNotifications}
              className="text-sm bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded-md"
            >
              すべて既読にする
            </button>
          )}
        </div>

        <ul className="space-y-4">
  {notifications
    .filter((n) => !n.read)
    .map((n) => (
      <li
        key={n.id}
        onClick={() => handleReadNotification(n.id, n.resume_id)}
        className="flex items-start gap-3 bg-orange-50 hover:bg-orange-100 transition-all p-3 rounded-xl shadow-sm border border-orange-200 cursor-pointer"
      >
        {/* 左のアイコン */}
        <div className="bg-orange-200 rounded-full p-2">
          <MdNotificationsActive className="text-orange-600 text-xl" />
        </div>

        {/* メッセージ部分 */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800 mb-1">{n.message}</p>

          {n.comment_content && (
            <p className="text-sm text-gray-600">{n.comment_content}</p>
          )}
        </div>

        {/* 日時表示 */}
        <span className="text-xs text-gray-400 whitespace-nowrap ml-2 mt-1">
          {formatDate(n.created_at)}
        </span>
      </li>
    ))}
</ul>

      </div>
    </div>
  );
};

export default NotificationList;
