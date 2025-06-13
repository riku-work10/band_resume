import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import apiClient from '../../services/apiClient';
import { ResumeItem } from './ResumeItem';

const reorder = (itemList, startIndex, endIndex) => {
  const remove = itemList.splice(startIndex, 1);
  itemList.splice(endIndex, 0, remove[0]);
};

export function ResumeItems({ itemList, setItemList, resumeSection, resumeId }) {
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    reorder(itemList, result.source.index, result.destination.index);
    setItemList([...itemList]); // 配列のコピーをセット

    const reorderedResumeitem = itemList.map((item, index) => ({
      ...item,
      position: index,
    }));

    setItemList(reorderedResumeitem);

    try {
      await apiClient.put(
        `resumes/${resumeId}/resume_sections/${resumeSection.id}/resume_items/update_position`,
        {
          items: reorderedResumeitem.map((item) => ({
            id: item.id,
            position: item.position,
          })),
        },
      );
      console.log('Item positions updated successfully');
    } catch (error) {
      console.error('Error updating item positions:', error);
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {itemList.map((item, index) => (
                <ResumeItem
                  key={item.id}
                  index={index}
                  item={item}
                  itemList={itemList}
                  setItemList={setItemList}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
