import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import SelectLocation from "../selectlists/SelectLocation";
import { createEvent } from "../../services/apiLives";

const EventCreate = ({ onClose }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        user_id: user.id,
        title,
        image,
        date,
        location,
        introduction,
      };
      const response = await createEvent(eventData);
      onClose();
      navigate(`/events/${response.id}`);
    } catch (err) {
      setError("履歴書の作成に失敗しました");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold">新しいイベントの作成</h2>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md text-black">
        <div>
          <label className="text-black">タイトル：</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded text-white"
          />
        </div>

        <div>
          <label className="text-black">イベント画像：</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded text-white"
          />
        </div>

        <div>
          <label className="text-black">日時：</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded text-white"
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
            className="border border-gray-300 p-2 w-full rounded text-white"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            キャンセル
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            イベント作成
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreate;
