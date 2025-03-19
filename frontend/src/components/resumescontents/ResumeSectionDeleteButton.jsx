import React from 'react';
import apiClient from '../../services/apiClient';

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
      <button onClick={() => resumeSectionDeleteButton(resumeSection.id)} className='taskCardDeleteButton'>X</button>
    </div>
  )};
