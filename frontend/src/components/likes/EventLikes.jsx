import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { useAuth } from "../../hooks/AuthContext";

const EventLikes = () => {
  const { user } = useAuth();
  const [likedevents, setLikedEvents] = useState([]);
  const [isLikesVisible, setIsLikesVisible] = useState(false);

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
        const response = await apiClient.get('/events/my_liked_events');
        setLikedEvents(response.data);
      } catch (error) {
        console.error("いいねしたイベントの取得に失敗しました", error);
      }
    };

    if (user) {
      fetchLikedEvents();
    }
  }, [user]);

  const toggleLikesVisibility = () => {
    setIsLikesVisible(!isLikesVisible);
  };

  return (
    <div className='mt-6 border rounded p-4'>
      <h1 className='text-2xl font-bold cursor-pointer mb-4' onClick={toggleLikesVisibility}>
        {isLikesVisible ? 'いいねしたイベントを閉じる' : 'いいねしたイベントを見る'}
      </h1>
      <hr />

      {/* いいねしたイベント一覧の表示 */}
      {isLikesVisible && likedevents.length === 0 && (
        <p className="text-gray-500 mt-4">いいねしたイベントはありません。</p>
      )}

      {isLikesVisible && likedevents.length > 0 && (
        <div className="relative">
          {/* 横スクロールコンテナ */}
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory">
            {likedevents.map((event) => (
              <div 
                key={event.id} 
                className="snap-start flex-shrink-0 w-64 border rounded-lg shadow-md p-4 bg-white"
              >
                {event.image && (
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}
                <h2 className="text-lg font-semibold mt-2">{event.title}</h2>
                <p className="text-sm text-gray-600">日時: {event.date}</p>
                <p className="text-sm text-gray-600">場所: {event.location}</p>
                <p className="text-sm text-gray-600 truncate">{event.introduction}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventLikes;
