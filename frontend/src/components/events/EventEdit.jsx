import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import SelectLocation from "../selectlists/SelectLocation";
import { putEvent } from '../../services/apiLives';
import TagSelect from '../selectlists/TagSelect'; // タグ選択コンポーネントをインポート

const EventEdit = ({ event, onClose, onUpdate }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [selectedTags, setSelectedTags] = useState([]); // タグの状態
  const [error, setError] = useState(null);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setImage(event.image || '');
      setDate(event.date || '');
      setLocation(event.location || '');
      setIntroduction(event.introduction || '');
      setSelectedTags(event.tags ? event.tags.map(tag => tag.name) : []); // 既存タグをセット
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEventData = {
        user_id: user.id,
        title,
        image,
        date,
        location,
        introduction,
      };
      const tagNames = selectedTags; 
      const updatedEvent = await putEvent(event.id, updatedEventData, tagNames);
      onUpdate(updatedEvent);
      onClose();
    } catch (err) {
      setError('イベントの更新に失敗しました');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4 text-black">イベントの編集</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-black">タイトル：</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="text-black">イベント画像URL：</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="text-black">日時：</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="text-black">場所：</label>
            <SelectLocation value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div>
            <label className="text-black">自己紹介：</label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="text-black">タグ：</label>
            <TagSelect value={selectedTags} onChange={setSelectedTags} />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
              キャンセル
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              更新する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventEdit;
