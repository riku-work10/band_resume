import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useAuth } from "../../hooks/AuthContext";

const EventLikes = () => {
  const { user } = useAuth();
  const [likedevents, setLikedEvents] = useState([]);

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

  if (!likedevents.length) {
    return (
      <div className="mt-10 text-gray-400">
        <h1 className="text-2xl font-bold text-white mb-4">いいねしたイベント</h1>
        <p>いいねしたイベントはありません。</p>
      </div>
    );
  }

  return (
    <div className="mt-10 px-4 md:px-10">
      <h1 className="text-2xl font-bold text-white mb-4">いいねしたイベント</h1>

      <div className="overflow-x-auto scrollbar-hide pb-4">
        <div className="flex space-x-6 snap-x snap-mandatory">
          {likedevents.map((event) => (
            <Link
              to={`/events/${event.id}`}  // イベント詳細ページへのルーティング（要設定）
              key={event.id}
              className="snap-start flex-shrink-0 w-64 bg-gray-800 text-white rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105 hover:bg-gray-700"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-36 object-cover rounded-md mb-2"
                />
              )}
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-300">日時: {event.date}</p>
              <p className="text-sm text-gray-300">場所: {event.location}</p>
              <p className="text-sm text-gray-400 truncate">{event.introduction}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventLikes;
