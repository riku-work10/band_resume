import React, { useState } from 'react';
import apiClient from '../../services/apiClient';

export function ResumeSectionTitle({
  resumeSectionsList,
  setResumeSectionsList,
  resumeSection,
  resumeId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputTitle, setInputTitle] = useState(resumeSection.title || '');

  const handleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const saveTitle = async () => {
    try {
      const trimmedTitle = inputTitle.trim();
      const response = await apiClient.put(
        `resumes/${resumeId}/resume_sections/${resumeSection.id}`,
        {
          resume_section: {
            title: trimmedTitle,
          },
        },
      );
      setResumeSectionsList(
        resumeSectionsList.map((section) =>
          section.id === resumeSection.id ? response.data : section,
        ),
      );
    } catch (error) {
      console.error('Error updating section title:', error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    saveTitle();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTitle();
  };

  return (
    <div className="w-full">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            maxLength={20}
            placeholder="セクションタイトルを入力"
            className="w-full bg-stone-800 text-white placeholder-stone-400 border border-stone-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 transition"
          />
        </form>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className={`w-full bg-stone-800 border border-stone-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-stone-700 transition ${
            inputTitle ? 'text-white' : 'text-stone-400 italic'
          }`}
        >
          {inputTitle || 'セクションタイトルを入力'}
        </div>
      )}
    </div>
  );
}
