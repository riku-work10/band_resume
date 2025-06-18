import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import apiClient from '../../services/apiClient';

export function ResumeItemAddSongInput({
  itemList,
  setItemList,
  resumeSection,
  resumeId,
}) {
  const [inputSong, setInputSong] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputSong.trim() === '') return;

    try {
      const response = await apiClient.post(
        `resumes/${resumeId}/resume_sections/${resumeSection.id}/resume_items`,
        {
          resume_item: {
            content: null,
            song_title: inputSong,
          },
        },
      );

      setItemList([...itemList, response.data]);
      setInputSong('');
    } catch (error) {
      console.error('Error creating song item:', error);
    }
  };

  const handleChange = (e) => {
    setInputSong(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
      <input
        type="text"
        placeholder="楽曲名を入力してください"
        className="flex-grow px-4 py-2 bg-stone-700 border border-stone-600 rounded-lg text-white text-sm sm:text-base placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        onChange={handleChange}
        value={inputSong}
        aria-label="楽曲名入力欄"
      />
      <button
        type="submit"
        aria-label="楽曲を追加"
        className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-9 sm:h-10"
      >
        <MdAdd size={18} />
        <span className="hidden sm:inline">追加</span>
      </button>
    </form>
  );
}
