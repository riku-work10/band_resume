import React from 'react';
import apiClient from '../../services/apiClient';
import { MdDelete } from "react-icons/md";

export const ResumeSectionDeleteButton = ({ resumeSectionsList, setResumeSectionsList, resumeSection, resumeId }) => {
  //タスクカードを削除する
  const resumeSectionDeleteButton = async (sectionId) => {
    try {
      const response = await apiClient.delete(`resumes/${resumeId}/resume_sections/${resumeSection.id}`);  // タスクの削除リクエスト
      console.log(response.data.message);  // 成功メッセージ

      // タスクを削除した後、リストからそのタスクを削除
      setResumeSectionsList(resumeSectionsList.filter((section) => section.id !== sectionId));  // タスクリストを更新
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <div>
      <button 
        onClick={() => resumeSectionDeleteButton(resumeSection.id)} 
       className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
        <MdDelete />
      </button>
    </div>
  )};
