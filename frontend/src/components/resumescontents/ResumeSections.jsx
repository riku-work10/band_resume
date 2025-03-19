import React, { useEffect, useState } from 'react';
import { AddTaskCardButton } from './AddTaskCardButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TaskCard } from './TaskCard';
import axios from 'axios';

const reorder = (taskCardsList, startIndex, endIndex) => {
  //タスクを並びかえる
  const remove = taskCardsList.splice(startIndex, 1);
  taskCardsList.splice(endIndex, 0, remove[0]);
  console.log(taskCardsList)
}

export const ResumeSections = () => {
  const [taskCardsList, setTaskCardsList] = useState([])
  //ドラッグアンドドロップの処理を実装
  const handleDragEnd = async (result) => {
    reorder(taskCardsList, result.source.index, result.destination.index)  //result.source.indexはつかんだ元の位置　//result.destination.indexはドロップした位置
    setTaskCardsList(taskCardsList)  //taskCardsListが入れ替えた配列だ！

    const reorderedTasks = taskCardsList.map((task, index) => ({
      ...task,
      position: index  // 新しい位置（index）を position として設定
    }));
    console.log(reorderedTasks)
    setTaskCardsList(reorderedTasks)

    try {
      // 並べ替えた順番をバックエンドに送信
      await axios.put('http://localhost:3000/tasks/update_position', {
        tasks: reorderedTasks.map(task => ({
          id: task.id,
          position: task.position  // 新しい position を送信
        }))
      });

      console.log('Task positions updated successfully');
    } catch (error) {
      console.error('Error updating task positions:', error);
    }
  }

//既存データの取得に関しては普通に取得してsetTaskCardsListに保存しているだけ
//できればどこかでidは文字列に直したいくらいかな？
//タスクカードは単純だけど細かいタスクになったら変わってくるかも？
//→タスクに関してはタスクコンポーネントで取得すればいいのか！
  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
      .then(response => setTaskCardsList(response.data))  // タスクを状態にセット
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='dropaable' direction='horizontal'>
        {(provided) => (
        <div className='taskCardsArea' {...provided.droppableProps} ref={provided.innerRef}>
            {taskCardsList.map((taskCard, index) => (
            <TaskCard key={taskCard.id} index={index} taskCardsList={taskCardsList} setTaskCardsList={setTaskCardsList} taskCard={taskCard}/>
          ))}
          {provided.placeholder}
          <AddTaskCardButton taskCardsList={taskCardsList} setTaskCardsList={setTaskCardsList} />
        </div>
        )}
    </Droppable>
    </DragDropContext>
  )};