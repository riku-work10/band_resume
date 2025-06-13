import React from 'react';
import { MdAdd } from 'react-icons/md';
import apiClient from '../../services/apiClient';

export function ResumeItemAddInput({
  inputText,
  setInputText,
  itemList,
  setItemList,
  resumeSection,
  resumeId,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    try {
      const response = await apiClient.post(
        `resumes/${resumeId}/resume_sections/${resumeSection.id}/resume_items`,
        {
          resume_item: {
            content: inputText,
            song_title: null,
          },
        },
      );

      setItemList([...itemList, response.data]);
      setInputText('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        placeholder="アイテム内容を入力してください"
        className="w-full px-4 py-2 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none min-h-[120px] pr-16"
        onChange={handleChange}
        value={inputText}
        rows={1}
      />
      <button
        type="submit"
        className="absolute bottom-2 right-2 flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
      >
        <MdAdd size={18} />
        追加
      </button>
    </form>
  );
}
