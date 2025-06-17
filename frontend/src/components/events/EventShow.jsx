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
import EventShareButton from './EventShareButton';

function EventShow() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useAuth();
  const [isPreview, setIsPreview] = useState(false);

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
    <div className="relative pt-16">
      {/* ✅ 左上：戻るボタン */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 inline-flex items-center px-4 py-2 bg-stone-700 text-white rounded hover:bg-stone-600 transition z-10"
      >
        ← 戻る
      </button>

      {/* ✅ 右上：プレビューボタン */}
      <button
        onClick={() => setIsPreview(!isPreview)}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition z-10"
      >
        {isPreview ? '通常表示' : 'プレビュー'}
      </button>

      {event ? (
        <div className="mb-6 mt-4 mx-4">
          {/* イベントヘッダー */}
          <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start justify-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6 max-w-5xl mx-auto">
            <img
              src={
                event.image ||
                'https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default.png'
              }
              alt={event.title}
              className="w-auto max-h-40 object-contain rounded-xl border-2 border-gray-300"
            />

            <div className="flex-1 max-w-5xl w-full">
              <div className="flex justify-between items-start">
                <h2 className="text-4xl font-extrabold mb-2">{event.title}</h2>

                {/* ✅ プレビュー中はボタン非表示 */}
                {!isPreview && (
                  <div className="flex items-center space-x-2">
                    {user && user.id === event.user_id && (
                      <EventOwnerButtons
                        onEdit={() => setIsEditModalOpen(true)}
                        onDelete={handleDelete}
                      />
                    )}
                       {user && user.id === event.user_id && (
                        <EventShareButton
                          enventId={event.id}
                          introduction={event.introduction}
                          title={event.title}
                        />
                      )}
                    <EventLikeButton
                      eventId={event.id}
                      className="ml-2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-center sm:justify-start space-x-4 text-sm sm:text-base">
                {event.location && <p>in {event.location}</p>}
                {event.date && <p>@ {event.date}</p>}
              </div>

              <p className="text-lg mt-2">{event.introduction}</p>

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

          {/* セットリスト */}
          <div className="relative w-full mb-6 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-white text-center mb-4">セットリスト</h2>

            {/* ✅ プレビュー中は非表示 */}
            {!isPreview && (
              <div className="absolute top-0 right-0">
                <SetlistActionButton event={event} />
              </div>
            )}

            <div className="flex flex-col items-center">
              <SetlistList event={event} />
            </div>
          </div>

          {/* ✅ プレビュー中はコメント非表示 */}
          {!isPreview && (
            <div className="max-w-5xl mx-auto">
              <EventComments eventId={eventId} />
            </div>
          )}
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
