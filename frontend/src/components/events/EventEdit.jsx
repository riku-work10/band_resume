import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import SelectLocation from "../selectlists/SelectLocation";
import { putEvent } from '../../services/apiLives';
import TagSelect from '../selectlists/TagSelect'; 
import { useS3Upload } from '../../hooks/useS3Upload';

const EventEdit = ({ event, onClose, onUpdate }) => {
  const { user } = useAuth();
  const defaultImage = "https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg";

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState(null);

  const {
    profileImage: image,
    selectedFile,
    setSelectedFile,
    isUploading,
    uploadImage,
    deleteImage,
  } = useS3Upload(user.id, "event", event?.image || '');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date || '');
      setLocation(event.location || '');
      setIntroduction(event.introduction || '');
      setSelectedTags(event.tags ? event.tags.map(tag => tag.name) : []);
    }
  }, [event]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleUploadClick = async () => {
    try {
      await uploadImage();
    } catch {
      setError('画像アップロードに失敗しました');
    }
  };

  const handleDeleteClick = () => deleteImage();

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
      const updatedEvent = await putEvent(event.id, updatedEventData, selectedTags);
      onUpdate(updatedEvent);
      onClose();
    } catch (err) {
      setError('イベントの更新に失敗しました');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-stone-900 text-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[calc(100vh-30px)] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">ライブ情報の編集</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">タイトル：</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 rounded bg-stone-800 text-white border border-stone-600"
            />
          </div>

          <div>
            <label className="block mb-1">イベント画像：</label>
            <img
              src={image || defaultImage}
              alt="イベント画像プレビュー"
              className="mb-2 w-32 h-32 object-cover rounded"
            />
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-stone-600 p-2 rounded bg-stone-800 text-white min-w-0 flex-1"
              />
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={isUploading || !selectedFile}
                className={`px-4 py-2 rounded text-white min-w-[120px] ${
                  isUploading || !selectedFile
                    ? "bg-stone-600 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isUploading ? "アップロード中..." : "アップロード"}
              </button>
            </div>
            {image && (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                画像を削除
              </button>
            )}
          </div>

          <div>
            <label className="block mb-1">日時：</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 rounded bg-stone-800 text-white border border-stone-600"
            />
          </div>

          <div>
            <label className="block mb-1">場所：</label>
            <SelectLocation value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1">自己紹介：</label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="w-full p-2 rounded bg-stone-800 text-white border border-stone-600"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-1">タグ：</label>
            <TagSelect value={selectedTags} onChange={setSelectedTags} />
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="flex justify-end gap-2 pt-4 border-t border-stone-700 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-stone-600 hover:bg-stone-500 text-white px-4 py-2 rounded"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              更新する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventEdit;
