import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/apiLives';
import EventCreate from '../components/events/EventCreate'; // イベント作成用モーダルをインポート
import EventLikeButton from '../components/likes/EventLikeButton';
import { useAuth } from '../hooks/AuthContext';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態を管理
    const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError('イベントの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">イベント一覧</h1>
      <br></br>
      {events.map((event) => (
        <div key={event.id}>
          <Link to={`/events/${event.id}`} className="hover:underline">
            {event.image && <img src={event.image} alt={event.title} width="100" />}
            <h2>{event.title}</h2>
            <p>場所: {event.location}</p>
            <p>紹介: {event.introduction}</p>
            <p>開催日: {event.date}</p>
          </Link>
          {user && user.id !== event.user_id && (
          <EventLikeButton eventId={event.id} className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400" />
        )}
        </div>
      ))}

      <br></br>
      {/* モーダルを開くボタン */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        イベント作成
      </button>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <EventCreate onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
