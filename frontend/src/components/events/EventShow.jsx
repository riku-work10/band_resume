import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { deleteEvent, getEvent } from '../../services/apiLives';
import EventEdit from './EventEdit';
import EventComments from '../comments/EventComments';
import EventLikeButton from '../likes/EventLikeButton';
import SetlistList from '../setlists/SetlistList';
import SetlistActionButton from './SetlistActionButton';
import EventOwnerButtons from './EventOwnerButtons';

function EventShow() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvent(eventId);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError('イベントの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteEvent(eventId);
      alert('削除しました');
      navigate('/events');
    } catch (err) {
      setError('イベントの削除に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {event ? (
        <div className="mb-6 mt-4 mx-4">
          {/* イベントヘッダー */}
          <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start justify-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6 max-w-5xl mx-auto">
            {/* イベント画像 */}
            <img
              src={
                event.image ||
                'https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg'
              }
              alt={event.title}
              className="w-auto max-h-40 object-contain rounded-xl border-2 border-gray-300"
            />

            {/* タイトル・紹介文・ボタン */}
            <div className="flex-1 max-w-5xl w-full">
              <div className="flex justify-between items-start">
                <h2 className="text-4xl font-extrabold mb-2">{event.title}</h2>

                <div className="flex items-center space-x-2">
                  {user && user.id === event.user_id && (
                    <EventOwnerButtons
                      onEdit={() => setIsEditModalOpen(true)}
                      onDelete={handleDelete}
                    />
                  )}

                  <EventLikeButton
                    eventId={event.id}
                    className="ml-2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
              {/* 会場・日付 */}
              <div className="flex justify-center sm:justify-start space-x-4 text-sm sm:text-base">
                {event.location && <p>in {event.location}</p>}
                {event.date && <p>@ {event.date}</p>}
              </div>

              {/* 紹介文 */}
              <p className="text-lg mt-2">{event.introduction}</p>

              {/* タグ */}
              {event.tags &&
                event.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/events/tag/${tag.name}`}
                    className="mr-2 text-blue-400 hover:underline"
                  >
                    {tag.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* セットリストセクション */}
          <div className="relative w-full mb-6 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-white text-center mb-4">セットリスト</h2>
            <div className="absolute top-0 right-0">
              <SetlistActionButton event={event} />
            </div>
            <div className="flex flex-col items-center">
              <SetlistList event={event} />
            </div>
          </div>

          {/* コメント */}
          <div className="max-w-5xl mx-auto">
            <EventComments eventId={eventId} />
          </div>
        </div>
      ) : (
        <p>イベントを読み込み中...</p>
      )}

      {/* 編集モーダル */}
      {isEditModalOpen && (
        <EventEdit event={event} onClose={() => setIsEditModalOpen(false)} onUpdate={setEvent} />
      )}
    </div>
  );
}

export default EventShow;
