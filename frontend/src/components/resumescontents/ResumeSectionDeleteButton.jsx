import axios from 'axios';
import React from 'react';

export const ResumeSectionDeleteButton = ({ taskCardsList, setTaskCardsList, taskCard }) => {
  //タスクカードを削除する
  const taskCardDeleteButton = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`);  // タスクの削除リクエスト
      console.log(response.data.message);  // 成功メッセージ

      // タスクを削除した後、リストからそのタスクを削除
      setTaskCardsList(taskCardsList.filter((task) => task.id !== taskId));  // タスクリストを更新
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <div>
      <button onClick={() => taskCardDeleteButton(taskCard.id)} className='taskCardDeleteButton'>X</button>
    </div>
  )};


  // const taskCardDeleteButton = (id) => {
  //   setTaskCardsList(taskCardsList.filter((e) => e.id !== id));
  // };