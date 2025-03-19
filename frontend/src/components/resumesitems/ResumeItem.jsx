// import axios from 'axios';
// import React from 'react';
// import { Draggable } from 'react-beautiful-dnd';

// export const ResumeItem = ({ task, taskList, setTaskList, index }) => {
//   //taskを削除
//   const handleDelete = async (taskId) => {
//     try {
//       // APIで削除リクエストを送信
//       const response = await axios.delete(`http://localhost:3000/items/${taskId}`)

//       console.log(response.data.message);  // 成功メッセージをコンソールに出力

//       // タスクを削除した後、リストからそのタスクを削除
//       setTaskList(taskList.filter((task) => task.id !== taskId));  // タスクリストを更新
//     } catch (error) {
//       console.error('Error deleting task:', error);  // エラーハンドリング
//     }
//   };

//   return (
//     <Draggable index={index} draggableId={task.id.toString()}>
//       {(provided) => (
//         <div
//           className='taskBox'
//           key={task.id}
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//         >
//           <p className='taskText'>{task.text}</p>
//           <button
//             onClick={() => handleDelete(task.id)}
//             className='taskTrashButton'
//           >
//             削除
//           </button>
//         </div>
//       )}
//     </Draggable>
//   );
// };