import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../hooks/AuthContext';

function EventLikes() {
  const { user } = useAuth();
  const [likedevents, setLikedEvents] = useState([]);

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
        const response = await apiClient.get('/events/my_liked_events');
        setLikedEvents(response.data);
      } catch (error) {
        console.error('いいねしたイベントの取得に失敗しました', error);
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
              to={`/events/${event.id}`}
              key={event.id}
              className="snap-start flex-shrink-0 w-64 bg-stone-700 text-stone-100 rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105 hover:bg-stone-600"
            >
                <img
                  src={event.image || 'https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default.png'}
                  alt={event.title}
                  className="w-full h-36 object-cover rounded-md mb-2"
                />
                {event.date && <p>@ {event.date}</p>}
              <h2 className="text-lg font-semibold">{event.title}</h2>
              {event.date && <p className="text-sm text-stone-200">日時: {event.date}</p>}
              {event.location && <p className="text-sm text-stone-200">場所: {event.location}</p>}
              {event.introduction && <p className="text-sm text-stone-300 truncate">{event.introduction}</p>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventLikes;
