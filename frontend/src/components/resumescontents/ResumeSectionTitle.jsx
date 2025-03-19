// import axios from 'axios';
// import React, { useState } from 'react';

// export const ResumeSectionTitle = ({ taskCardsList, setTaskCardsList, taskCard }) => {
// const [isClick, setIsClick] = useState(false)
// const [inputCardTitle, setInputCardTitle] = useState(taskCard.title || "タイトル")


// const hundleSubmit = async (e) => {
//   e.preventDefault();  //フォームでエンターを押してもページが更新されないようにする

//   try {
//     const response = await axios.put(`http://localhost:3000/tasks/${taskCard.id}`, {
//       task: {
//         title: inputCardTitle,
//       },
//     });

//     // 成功したら、更新されたタスクをリストに反映
//     setTaskCardsList(taskCardsList.map(task => 
//       task.id === taskCard.id ? response.data : task
//     ));
//     setIsClick(false);  // 編集モード終了
//   } catch (error) {
//     console.error("Error updating task:", error);
//   }
// };

// const handleClick = () => {
//   setIsClick(true);
// };

// const handleChange = (e) => {
//   setInputCardTitle(e.target.value)
// };

// //inputタブからマウスを外したときにクリックしたら呼び出されるもの
// const handleBlur = () => {
//   setIsClick(false)
// };

//   return (
//     <div onClick={handleClick} className='taskCardTitleInputArea'>
//       {isClick ? 
//       (<form onSubmit={hundleSubmit}>
//         <input 
//         className='taskCardTitleInput'
//         type="text"
//         autoFocus
//         onChange={handleChange}
//         onBlur={handleBlur}
//         value={inputCardTitle}
//         placeholder='aaa'
//         maxLength={10}/>
//       </form>) : 
//       (<h3>
//         {inputCardTitle}
//       </h3>)}
//     </div>
//   )};