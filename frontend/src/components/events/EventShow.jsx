import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdDelete, MdEdit } from "react-icons/md";
import { useAuth } from '../../hooks/AuthContext';
import { deleteEvent, getEvent } from '../../services/apiLives';
import EventEdit from './EventEdit';
import EventComments from '../comments/EventComments';
import EventLikeButton from '../likes/EventLikeButton';
import SetlistList from '../setlists/SetlistList';

const EventShow = () => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  //削除ボタン
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteEvent(eventId); // 履歴書削除
      alert("削除しました");
      navigate("/events")
    } catch (err) {
      setError('イベントの削除に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  //セトリ作成フォームへ
  const handleClickForm = () => {
    navigate("/setlistCreate", {
      state: { eventId }
    });
  };

    //セトリ編集フォームへ
  const handleClickEditForm = () => {
    navigate("/setlistEdit", {
      state: { event }
    });
  };
  return (
    <div>
        {event ? (
            <div className='mb-6'>
              <div className="mb-6 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {/* 画像部分 */}
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                  />
                )}
                {/* テキスト部分 */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{event.title}</h2>
                  {/* 場所とリンクを横並び */}
                  <div className="flex space-x-4">
                    <p>場所: {event.location}</p>
                    <p>日時: {event.date}</p>
                  </div>
                  {/* 紹介文は大きめに表示 */}
                  <p className="text-lg mt-2">{event.introduction}</p>
                </div>
                {/* ボタン部分 */}
                <div className="flex space-x-4 mt-4 sm:mt-0">
                {user && user.id === event.user_id && ( // ログインユーザーが作成者の場合
                <div>
                  <button
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => setIsEditModalOpen(true)}>
                    <MdEdit />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
                    <MdDelete />
                  </button>
                </div>
                 )}
                {user && user.id !== event.user_id && (
                  <EventLikeButton eventId={event.id} className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400" />
                )}
                </div>
              </div>
            </div>
        ) : (
          <p>イベントを読み込み中...</p>
        )}
        {/* 編集モーダル */}
        {isEditModalOpen && (
          <EventEdit
            event={event}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={setEvent}
          />
        )}
        <SetlistList event={event}/>
        {event.setlists && event.setlists.length > 0 ? (
        <button
          onClick={handleClickEditForm}
          className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400">
          セトリ編集
        </button>
      ) : (
        <button
          onClick={handleClickForm}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          セトリ作成
        </button>
      )}
        <EventComments eventId={eventId}/>
    </div>
  );
};

export default EventShow;