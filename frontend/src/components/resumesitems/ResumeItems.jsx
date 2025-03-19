import React from 'react';
import { DragDropContext, Droppable} from "react-beautiful-dnd"
import apiClient from '../../services/apiClient';
import { ResumeItem } from './ResumeItem';


const reorder = (itemList, startIndex, endIndex ) => {
    //タスクを並びかえる
    const remove = itemList.splice(startIndex, 1);
    itemList.splice(endIndex, 0, remove[0]);
}

export const ResumeItems = ({ itemList, setItemList, resumeSection, resumeId }) => {

  const handleDragEnd = async (result) => {
    reorder(itemList, result.source.index, result.destination.index)  //result.source.indexはつかんだ元の位置　//result.destination.indexはドロップした位置
    setItemList(itemList)  //taskCardsListが入れ替えた配列だ！

    const reorderedResumeitem = itemList.map((item, index) => ({
      ...item,
      position: index  // 新しい位置（index）を position として設定
    }));
    console.log(reorderedResumeitem)
    setItemList(reorderedResumeitem)

    try {
      // 並べ替えた順番をバックエンドに送信
      await apiClient.put(`resumes/${resumeId}/resume_sections/${resumeSection.id}/resume_items/update_position`, {
        items: reorderedResumeitem.map(item => ({  //itemsの部分はバックエンドで設定した名前に変更ね！
          id: item.id,
          position: item.position  // 新しい position を送信
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
            {itemList.map((item, index) => (
            <div key={item.id}>
              <ResumeItem
              index={index}
              item={item}
              itemList={itemList} 
              setItemList={setItemList}
              />
            </div>
            ))}
            {provided.placeholder}
          </div>}
        </Droppable>
      </DragDropContext>
    </div>
  );};