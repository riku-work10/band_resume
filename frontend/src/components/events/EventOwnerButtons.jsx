import React from 'react';
import { MdDelete, MdEdit } from "react-icons/md";

const EventOwnerButtons = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-2">
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={onEdit}
      >
        <MdEdit />
      </button>
      <button
        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={onDelete}
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default EventOwnerButtons;
