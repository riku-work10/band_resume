import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { useS3Upload } from '../../hooks/useS3Upload';
import SelectLocation from '../selectlists/SelectLocation';
import TagSelect from '../selectlists/TagSelect';
import { createEvent } from '../../services/apiLives';

function EventCreate({ onClose }) {
  const modalRef = useRef(null);
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    profileImage: eventImage,
    selectedFile,
    setSelectedFile,
    isUploading,
    uploadImage,
    deleteImage,
  } = useS3Upload(user.id, 'event', '');

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        user_id: user.id,
        title,
        image: eventImage,
        date,
        location,
        introduction,
      };
      const response = await createEvent(eventData, tags);
      onClose();
      navigate(`/events/${response.id}`);
    } catch (err) {
      setError('イベントの作成に失敗しました');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div
        ref={modalRef}
        className="bg-stone-800 text-white max-h-[calc(100vh-30px)] w-full max-w-lg rounded-xl shadow-lg overflow-y-auto p-6"
      >
        <h2 className="text-xl font-bold mb-4">ライブ情報の作成</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* タイトル */}
          <div>
            <label className="block font-semibold mb-1">タイトル：</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-stone-600 bg-stone-900 text-white p-2 rounded"
            />
          </div>

          {/* イベント画像 */}
          <div>
            <label className="block font-semibold mb-1">イベント画像：</label>
            <img
              src={
                eventImage ||
                'https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg'
              }
              alt="イベント画像プレビュー"
              className="mb-2 w-32 h-32 object-cover rounded border border-stone-700"
            />
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setSelectedFile(file);
                }}
                className="border border-stone-600 bg-stone-900 text-white p-2 rounded flex-1 min-w-0"
              />
              <button
                type="button"
                onClick={uploadImage}
                disabled={isUploading || !selectedFile}
                className={`px-4 py-2 rounded text-white min-w-[120px] ${
                  isUploading || !selectedFile
                    ? 'bg-stone-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isUploading ? 'アップロード中...' : 'アップロード'}
              </button>
            </div>
            {eventImage && (
              <button
                type="button"
                onClick={deleteImage}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                画像を削除
              </button>
            )}
          </div>

          {/* 日付 */}
          <div>
            <label className="block font-semibold mb-1">日時：</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-stone-600 bg-stone-900 text-white p-2 rounded"
            />
          </div>

          {/* 場所 */}
          <div>
            <label className="block font-semibold mb-1">場所：</label>
            <SelectLocation
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>

          {/* 紹介文 */}
          <div>
            <label className="block font-semibold mb-1">紹介文：</label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              rows={3}
              className="w-full border border-stone-600 bg-stone-900 text-white p-2 rounded"
            />
          </div>

          {/* タグ */}
          <TagSelect value={tags} onChange={(newTags) => setTags(newTags)} />

          {/* エラー表示 */}
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {/* ボタン */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-stone-500 hover:bg-stone-600 text-white px-4 py-2 rounded"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              イベント作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventCreate;
