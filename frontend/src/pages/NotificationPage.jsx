import React, { useState, useEffect } from "react";
import { createConsumer } from "@rails/actioncable";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error("Error fetching notifications:", error);
      });

    const cable = createConsumer(`${process.env.REACT_APP_API_URL}/cable`);
    const channel = cable.subscriptions.create(
      { channel: "NotificationChannel" },
      {
        received(data) {
          console.log(data);
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            data,
          ]);
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleReadNotification = async (notificationId, resumeId) => {
    try {
      await apiClient.patch(`/notifications/${notificationId}/read`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
      navigate(`/resumes/${resumeId}`);
    } catch (error) {
      console.error('既読にする処理でエラー:', error);
    }
  };

  const handleReadAllNotifications = async () => {
    try {
      await apiClient.patch('/notifications/read_all');
      setNotifications([]);
    } catch (error) {
      console.error('すべての通知を既読にする処理でエラー:', error);
    }
  };

  // 日付フォーマット関数
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">通知一覧</h2>

      {notifications.length > 0 && (
        <button
          onClick={handleReadAllNotifications}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
        >
          すべて既読にする
        </button>
      )}

      <ul>
        {notifications
          .filter((notification) => !notification.read)
          .map((notification) => (
            <li
              key={notification.id}
              onClick={() => handleReadNotification(notification.id, notification.resume_id)}
              className="bg-white p-4 mb-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg text-gray-700">{notification.message}</p>
                <span className="text-sm text-gray-500">
                  {formatDate(notification.created_at)}
                </span>
              </div>

              {notification.read && (
                <span className="text-sm text-green-500">（既読）</span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NotificationList;
