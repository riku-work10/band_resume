import React from 'react';
import { MdAdd } from 'react-icons/md';
import apiClient from '../../services/apiClient';

export function AddResumeSectionButton({ resumeSectionsList, setResumeSectionsList, resumeId }) {
  const addResumeSection = async () => {
    const newResumeSectionData = {
      title: null,
      position: null,
    };

    try {
      const response = await apiClient.post(`resumes/${resumeId}/resume_sections`, {
        resume_section: newResumeSectionData,
      });
      setResumeSectionsList([...resumeSectionsList, response.data]);
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        onClick={addResumeSection}
      >
        <MdAdd size={20} />
        セクションを追加
      </button>
    </div>
  );
}
