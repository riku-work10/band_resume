import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import apiClient from '../../services/apiClient';
import { MdDelete } from "react-icons/md";

export const ResumeItem = ({ index, item, itemList, setItemList }) => {
  //taskを削除
  const handleDelete = async (itemId) => {
    try {
      // APIで削除リクエストを送信
      const response = await apiClient.delete(`resume_items/${itemId}`)

      console.log(response.data.message);  // 成功メッセージをコンソールに出力

      // タスクを削除した後、リストからそのタスクを削除
      setItemList(itemList.filter((item) => item.id !== itemId));  // タスクリストを更新
    } catch (error) {
      console.error('Error deleting task:', error);  // エラーハンドリング
    }
  };

  return (
    <Draggable index={index} draggableId={item.id.toString()}>
      {(provided) => (
        <div
          className='taskBox'
          key={item.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className='taskText'>{item.content}</p>
          <button
            onClick={() => handleDelete(item.id)}
            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
            <MdDelete />
          </button>
        </div>
      )}
    </Draggable>
  );
};