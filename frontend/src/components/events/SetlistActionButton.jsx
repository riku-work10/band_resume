import React from 'react';
import { useNavigate } from 'react-router-dom';

const SetlistActionButton = ({ event }) => {
  const navigate = useNavigate();

  const handleClickEditForm = () => {
    navigate("/setlistEdit", { state: { event } });
  };

  const handleClickForm = () => {
    navigate("/setlistCreate", { state: { eventId: event.id } });
  };

  return (
    <div className="absolute top-0 right-4">
      {event.setlists && event.setlists.length > 0 ? (
        <button
          onClick={handleClickEditForm}
          className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          セトリ編集
        </button>
      ) : (
        <button
          onClick={handleClickForm}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          セトリ作成
        </button>
      )}
    </div>
  );
};

export default SetlistActionButton;
