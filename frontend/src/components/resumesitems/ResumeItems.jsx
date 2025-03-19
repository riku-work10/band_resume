import React from 'react';
import { DragDropContext, Droppable} from "react-beautiful-dnd"
import { Task } from './Task';
import axios from 'axios';


const reorder = (taskList, startIndex, endIndex ) => {
    //タスクを並びかえる
    const remove = taskList.splice(startIndex, 1);
    taskList.splice(endIndex, 0, remove[0]);
}

export const ResumeItems = ({ taskList, setTaskList, taskCard }) => {

  const handleDragEnd = async (result) => {
    reorder(taskList, result.source.index, result.destination.index)  //result.source.indexはつかんだ元の位置　//result.destination.indexはドロップした位置
    setTaskList(taskList)  //taskCardsListが入れ替えた配列だ！

    const reorderedTasksitem = taskList.map((task, index) => ({
      ...task,
      position: index  // 新しい位置（index）を position として設定
    }));
    console.log(reorderedTasksitem)
    setTaskList(reorderedTasksitem)

    try {
      // 並べ替えた順番をバックエンドに送信
      await axios.put(`http://localhost:3000/tasks/${taskCard.id}/items/update_position`, {
        items: reorderedTasksitem.map(task => ({  //itemsの部分はバックエンドで設定した名前に変更ね！
          id: task.id,
          position: task.position  // 新しい position を送信
        }))
      });

      console.log('Task positions updated successfully');
    } catch (error) {
      console.error('Error updating task positions:', error);
    }
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => 
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {taskList.map((task, index) => (
            <div key={task.id}>
              <Task
              index={index}
              task={task}
              taskList={taskList} 
              setTaskList={setTaskList}
              />
            </div>
            ))}
            {provided.placeholder}
          </div>}
        </Droppable>
      </DragDropContext>
    </div>
  );};