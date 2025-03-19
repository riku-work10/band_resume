// import React, { useEffect, useState } from 'react';
// import { Draggable } from 'react-beautiful-dnd';
// import { TaskCardDeleteButton } from './TaskCardDeleteButton';
// import { TaskCardTitle } from './TaskCardTitle';
// import { TaskAddInput } from './TaskAddInput';
// import { Tasks } from './Tasks';
// import axios from 'axios';


// export const ResumeSection = ({ taskCardsList, setTaskCardsList, taskCard, index }) => {
//   const [inputText, setInputText] = useState("")
//   const [taskList, setTaskList] = useState([])

//   useEffect(() => {
//     axios.get(`http://localhost:3000/tasks/${taskCard.id}/items`)
//       .then(response => setTaskList(response.data))  // タスクを状態にセット
//       .catch(error => console.error('Error fetching tasks:', error));
//   }, [taskCard.id]);

//   return (
//     <Draggable draggableId={taskCard.id.toString()} index={index}>
//       {(provided) => (
//     <div className='taskCard' ref={provided.innerRef} {...provided.draggableProps}>
//       <div className='taskCardTitleAndtaskCardDeleteButtonArea' {...provided.dragHandleProps}>
//       <TaskCardTitle  taskCardsList={taskCardsList} setTaskCardsList={setTaskCardsList} taskCard={taskCard}/>
//       <TaskCardDeleteButton taskCardsList={taskCardsList} setTaskCardsList={setTaskCardsList} taskCard={taskCard}/>
//       </div>
//       <TaskAddInput inputText={inputText} setInputText={setInputText} taskList={taskList} setTaskList={setTaskList} taskCard={taskCard}/>
//       <Tasks inputText={inputText} taskList={taskList} setTaskList={setTaskList} taskCard={taskCard}/>
//     </div>
//       )}
//     </Draggable>
//   )};