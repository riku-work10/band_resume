// import axios from 'axios';
// import React from 'react';

// export const ResumeItemAddInput = ({ inputText, setInputText, taskList, setTaskList, taskCard }) => {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (inputText === "") {  // 空白で入力してもタスクが追加されないようにする
//       return;
//     }
    
//     try {
//       // 新しいタスクをサーバーに送信
//       const response = await axios.post(`http://localhost:3000/tasks/${taskCard.id}/items`, {
//         text: inputText,  // 送信するデータ（タスクのテキスト）
//       });

//       // サーバーから新しいタスクが返ってきたらリストに追加
//       setTaskList([
//         ...taskList,
//         response.data,  // サーバーから返されたタスク（IDなども含まれている）
//       ]);

//       // 入力フィールドをクリア
//       setInputText("");
//     } catch (error) {
//       console.error('Error creating task:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setInputText(e.target.value);
//   };

//   return (

//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type='text' placeholder='add a title' className='taskAddInput' onChange={handleChange} value={inputText}/>
//       </form>
//     </div>
//   )};