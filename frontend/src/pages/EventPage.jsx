import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/apiLives';
import EventCreate from '../components/events/EventCreate';
import EventLikeButton from '../components/likes/EventLikeButton';
import { useAuth } from '../hooks/AuthContext';
import EventSearch from '../components/search/EventSearch';

function EventPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      } catch (err) {
        setError('イベントの取得に失敗しました');
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSearch = (query, startDate, closeDate, selectedTags, selectedLocations) => {
    let filtered = events;
    if (query) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase()),
      );
    }
    if (startDate || closeDate) {
      filtered = filtered.filter((event) => {
        const { date } = event;
        return (!startDate || date >= startDate) && (!closeDate || date <= closeDate);
      });
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter((event) =>
        event.tags.some((tag) => selectedTags.includes(tag.name)),
      );
    }
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((event) => selectedLocations.includes(event.location));
    }
    setFilteredEvents(filtered);
  };

  if (loading) return <div className="text-stone-400 p-4">Loading...</div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-7xl">
        {/* 検索バー */}
        <div className="flex justify-center mb-6">
          <EventSearch onSearch={handleSearch} />
        </div>

        {/* グリッドレイアウト：スマホ1列、md以上で2列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="relative flex bg-stone-700 text-stone-300 rounded-lg shadow-md overflow-hidden transition hover:bg-stone-600 hover:shadow-xl"
            >
              {/* 左側：画像 */}
              <Link to={`/events/${event.id}`} className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40">
                <img
                  src={
                    event.image ||
                    'https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg'
                  }
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </Link>

              {/* 右側：テキスト情報 */}
              <div className="flex flex-col justify-between p-4 flex-grow">
                <div>
                  <Link
                    to={`/events/${event.id}`}
                    className="hover:underline text-stone-100 font-semibold text-lg"
                  >
                    {event.title}
                  </Link>
                  {/* {event.location && event.date ()} */}
                  <div className="flex text-stone-400 mt-1 text-sm">
                    {event.location && <p> in {event.location}</p>}
                    {event.date && <p className="ml-1"> @ {event.date} </p>}
                  </div>
                  <p className="text-stone-300 mt-2 text-sm">{event.introduction}</p>

                  {/* タグ */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {event.tags?.map((tag) => (
                      <Link
                        key={tag.id}
                        to={`/events/tag/${tag.name}`}
                        className="text-xs bg-stone-600 text-stone-200 px-3 py-1 rounded-full hover:bg-stone-500 transition"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 下部アクション */}
                <div className="mt-4 flex justify-end items-center relative">
                  {user && user.id !== event.user_id && (
                    <EventLikeButton
                      eventId={event.id}
                      className="py-1 px-3 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 作成ボタン */}
      <div className="fixed bottom-24 right-6 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 text-white px-5 py-2 rounded shadow-lg hover:bg-orange-700 transition text-2xl"
        >
          投稿
        </button>
      </div>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-stone-700 text-stone-200 p-6 rounded-lg shadow-lg w-96">
            <EventCreate onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPage;
