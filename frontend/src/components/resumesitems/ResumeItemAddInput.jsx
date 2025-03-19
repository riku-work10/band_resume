import React from 'react';
import apiClient from '../../services/apiClient';

export const ResumeItemAddInput = ({ inputText, setInputText, itemList, setItemList, resumeSection, resumeId }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText === "") {  // 空白で入力してもタスクが追加されないようにする
      return;
    }
    
    try {
      // 新しいタスクをサーバーに送信
      const response = await apiClient.post(`resumes/${resumeId}/resume_sections/${resumeSection.id}/resume_items`, {
        content: inputText,  // 送信するデータ（タスクのテキスト）
      });

      // サーバーから新しいタスクが返ってきたらリストに追加
      setItemList([
        ...itemList,
        response.data,  // サーバーから返されたタスク（IDなども含まれている）
      ]);

      // 入力フィールドをクリア
      setInputText("");
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='add a title' className='taskAddInput' onChange={handleChange} value={inputText}/>
      </form>
    </div>
  )};