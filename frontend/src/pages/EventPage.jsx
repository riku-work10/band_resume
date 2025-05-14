import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/apiLives';
import EventCreate from '../components/events/EventCreate'; // イベント作成用モーダルをインポート
import EventLikeButton from '../components/likes/EventLikeButton';
import { useAuth } from '../hooks/AuthContext';
import EventSearch from '../components/search/EventSearch';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態を管理
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

  
  // 検索＆フィルタ処理
  const handleSearch = (query, startDate, closeDate, selectedTags, selectedLocations) => {
    let filtered = events;

    // タイトル検索
    if (query) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // 日付範囲フィルタ
    if (startDate || closeDate) {
      filtered = filtered.filter((event) => {
        const date = event.date;
        return (!startDate || date >= startDate) && (!closeDate || event <= closeDate);
      });
    }

    // タグフィルタ
    if (selectedTags.length > 0) {
      filtered = filtered.filter((event) =>
        event.tags.some((tag) => selectedTags.includes(tag.name))
      );
    }
    // 場所フィルタ
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((event) => selectedLocations.includes(event.location));
    }

    setFilteredEvents(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <div className="relative">
        <div className="pt-4 px-6">
          {/* 検索バー */}
          <div className="mx-auto justify-center flex">
            <EventSearch onSearch={handleSearch} />
          </div>

          {/* グリッドレイアウト：スマホ1列、md以上で2列 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex bg-orange-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* 左側：画像 */}
                {event.image && (
                  <Link to={`/events/${event.id}`} className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                )}

                {/* 右側：テキスト情報 */}
                <div className="flex flex-col justify-between p-2 flex-grow">
                  <div>
                    <Link to={`/events/${event.id}`} className="hover:underline">
                      <h2 className="text-lg font-bold text-gray-800">{event.title}</h2>
                    </Link>
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      {event.date} @ {event.location}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{event.introduction}</p>

                    {/* タグ */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {event.tags?.map((tag) => (
                        <Link
                          key={tag.id}
                          to={`/events/tag/${tag.name}`}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* 下部アクション */}
                  <div className="mt-4 flex gap-2 items-center">
                    {user && user.id !== event.user_id && (
                      <EventLikeButton
                        eventId={event.id}
                        className="py-1 px-3 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 作成 */}
      <div className="fixed bottom-16 right-6 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition"
        >
          イベント作成
        </button>
      </div>

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
