import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { useS3Upload } from "../../hooks/useS3Upload";
import SelectLocation from "../selectlists/SelectLocation";
import TagSelect from "../selectlists/TagSelect";
import { createEvent } from "../../services/apiLives";

const EventCreate = ({ onClose }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // S3アップロード用
  const {
    profileImage: eventImage,
    selectedFile,
    setSelectedFile,
    isUploading,
    uploadImage,
    deleteImage,
  } = useS3Upload(user.id, "event", "");

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
      setError("イベントの作成に失敗しました");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">新しいイベントの作成</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-4 text-black">
        {/* タイトル */}
        <div>
          <label className="block font-semibold mb-1">タイトル：</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        {/* イベント画像 */}
<div>
  <label className="block font-semibold mb-1">イベント画像：</label>

  <img
    src={eventImage || "https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg"}
    alt="イベント画像プレビュー"
    className="mb-2 w-32 h-32 object-cover rounded"
  />

  {/* アップロードとファイル選択ボックス */}
  <div className="flex flex-wrap items-center gap-2 mb-2">
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
      }}
      className="border border-gray-300 p-2 rounded min-w-0 flex-1"
    />
    <button
      type="button"
      onClick={uploadImage}
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

  {eventImage && (
    <button
      type="button"
      onClick={deleteImage}
      className="bg-red-500 text-white px-4 py-2 rounded"
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
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        {/* 場所 */}
        <div>
          <label className="block font-semibold mb-1">場所：</label>
          <SelectLocation value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        {/* 自己紹介 */}
        <div>
          <label className="block font-semibold mb-1">紹介文：</label>
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            rows={3}
          />
        </div>

        {/* タグ選択 */}
        <TagSelect value={tags} onChange={(newTags) => setTags(newTags)} />

        {/* エラー */}
        {error && <p className="text-red-600 font-semibold">{error}</p>}

        {/* アクション */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            イベント作成
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreate;
