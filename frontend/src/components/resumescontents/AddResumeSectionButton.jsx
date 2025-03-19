import axios from 'axios';
import React from 'react';

//フォームで入力した内容をnewTaskDataでオブジェクトを作成（textとかtitleとか入れる）
//→そのデータをバックに送信
//→レスポンスのデータをsetTaskCardsListで更新

export const AddResumeSectionButton = ({ taskCardsList, setTaskCardsList }) => {
    const addTaskCard = async () => {
    const newTaskData = {
      title: null,
      position: null 
    };
    // タスクを POST で Rails API に送信
    axios.post('http://localhost:3000/tasks', { task: newTaskData })
      .then((response) => {
        setTaskCardsList ([...taskCardsList, response.data]);  // 新しいタスクをリストに追加
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div className='addTaskCardButtonArea'>
      <button className='addTaskCardButton' onClick={addTaskCard}>+</button>
    </div>
  )};