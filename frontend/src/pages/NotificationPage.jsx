import React, { useState, useEffect } from "react";
import { createConsumer } from "@rails/actioncable";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // useNavigateを使用してページ遷移

  useEffect(() => {
    // 通知データをAPIから最初に取得
    apiClient.get('/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error("Error fetching notifications:", error);
      });
      
    // ActionCableでリアルタイム通知を受信
    const cable = createConsumer(`${process.env.REACT_APP_API_URL}/cable`); // WebSocket接続
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

    // コンポーネントがアンマウントされたらチャンネルの購読を解除
    return () => {
      channel.unsubscribe();
    };
  }, []);

  // 既読にする関数
  const handleReadNotification = async (notificationId, resumeId) => {
    try {
      // まず通知を既読にする
      await apiClient.patch(`/notifications/${notificationId}/read`);
      
      // 通知を非表示にする（フロントで既読にする）
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true } // 状態更新
            : notification
        )
      );

      // 通知をタッチしたらその投稿の詳細ページへ遷移
      navigate(`/resumes/${resumeId}`); // ここで遷移
    } catch (error) {
      console.error('既読にする処理でエラー:', error);
    }
  };

  // すべて既読にする関数
  const handleReadAllNotifications = async () => {
    try {
      await apiClient.patch('/notifications/read_all'); // APIで全部既読処理
      setNotifications([]); // 通知リストを空に
    } catch (error) {
      console.error('すべての通知を既読にする処理でエラー:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      
      {/* すべて既読ボタン */}
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
          .filter((notification) => !notification.read) // 未読通知だけ表示
          .map((notification) => (
            <li
              key={notification.id}
              onClick={() => handleReadNotification(notification.id, notification.resume_id)} // 通知をクリックしたら投稿に遷移
              className="bg-white p-4 mb-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg text-gray-500">{notification.message}</p>
                <span className="text-sm text-gray-500">{notification.created_at}</span>
              </div>
              
              {/* 既読の場合の表示変更 */}
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