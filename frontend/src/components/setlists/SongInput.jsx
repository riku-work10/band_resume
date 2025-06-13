import React from 'react';

function SongInput({ song, onChange, inputRef, onDelete, onFocus, placeholder }) {
  return (
    <div className="mb-4 flex items-center space-x-2">
      <input
        ref={inputRef}
        type="text"
        name="title"
        value={song.title}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className="flex-grow p-2 rounded-md border border-stone-600 bg-stone-900 text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        type="button"
        onClick={onDelete}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm select-none"
      >
        ✕
      </button>
    </div>
  );
}

export default SongInput;
