import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import SelectLocation from "../selectlists/SelectLocation";
import { putEvent } from '../../services/apiLives';
import TagSelect from '../selectlists/TagSelect'; 
import { useS3Upload } from '../../hooks/useS3Upload'; // 追加

const EventEdit = ({ event, onClose, onUpdate }) => {
  const { user } = useAuth();
  const defaultImage = "https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg";

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState(null);

  // useS3Uploadを初期化、イベント画像URLを初期値にセット
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
      // setSelectedFileはファイルなので直接はセットしない
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

  const handleDeleteClick = () => {
    deleteImage();
  };

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
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full" onClick={(e) => e.stopPropagation()}>
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

          <div className="mt-4">
            <label className="text-black block mb-1">イベント画像：</label>

            {/* 画像プレビュー */}
            <img
              src={image || defaultImage}
              alt="イベント画像プレビュー"
              className="mb-2 w-32 h-32 object-cover rounded"
            />

            {/* ファイル選択とアップロードボタン */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded min-w-0 flex-1"
              />
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={isUploading || !selectedFile}
                className={`px-4 py-2 rounded text-white min-w-[120px] ${
                  isUploading || !selectedFile
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-700"
                }`}
              >
                {isUploading ? "アップロード中..." : "アップロード"}
              </button>
            </div>

            {/* 画像削除ボタン */}
            {image && (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                画像を削除
              </button>
            )}
          </div>

          <div className="mt-4">
            <label className="text-black">日時：</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mt-4">
            <label className="text-black">場所：</label>
            <SelectLocation value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="text-black">自己紹介：</label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mt-4">
            <label className="text-black">タグ：</label>
            <TagSelect value={selectedTags} onChange={setSelectedTags} />
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
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
