import React from 'react';
import apiClient from '../../services/apiClient';

//フォームで入力した内容をnewTaskDataでオブジェクトを作成（textとかtitleとか入れる）
//→そのデータをバックに送信
//→レスポンスのデータをsetTaskCardsListで更新

export const AddResumeSectionButton = ({ resumeSectionsList, setResumeSectionsList, resumeId }) => {
  const addResumeSection = async () => {
    const newResumeSectionData = {
      title: null,
      position: null 
    };
    // タスクを POST で Rails API に送信
    apiClient.post(`resumes/${resumeId}/resume_sections`, { resume_section: newResumeSectionData })
      .then((response) => {
        setResumeSectionsList ([...resumeSectionsList, response.data]);  // 新しいタスクをリストに追加
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div className='addTaskCardButtonArea'>
      <button className='addTaskCardButton' onClick={addResumeSection}>+</button>
    </div>
  )};