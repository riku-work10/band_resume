import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import apiClient from '../../services/apiClient';

export const ResumeSection = ({ index, resumeSectionsList, setResumeSectionsList, resumeSection, resumeId }) => {
  const [inputText, setInputText] = useState("")
  const [itemList, setItemList] = useState([])

  useEffect(() => {
    apiClient.get(`resumes/${resumeId}/resume_sections/${resumeSection.id}/resume_items`)
      .then(response => setItemList(response.data))  // タスクを状態にセット
      .catch(error => console.error('Error fetching tasks:', error));
  }, [resumeSection.id]);

  return (
    <Draggable draggableId={resumeSection.id.toString()} index={index}>
      {(provided) => (
    <div className='taskCard' ref={provided.innerRef} {...provided.draggableProps}>
      <div className='taskCardTitleAndtaskCardDeleteButtonArea' {...provided.dragHandleProps}>
      {/* <TaskCardTitle  resumeSectionsList={resumeSectionsList} setResumeSectionsList={setResumeSectionsList} resumeSection={resumeSection}/> */}
      {/* <TaskCardDeleteButton resumeSectionsList={resumeSectionsList} setResumeSectionsList={setResumeSectionsList} resumeSection={resumeSection}/> */}
      </div>
      {/* <TaskAddInput inputText={inputText} setInputText={setInputText} itemList={itemList} setItemList={setItemList} resumeSection={resumeSection}/>
      <Tasks inputText={inputText} itemList={itemList} setItemList={setItemList} resumeSection={resumeSection}/> */}
    </div>
      )}
    </Draggable>
  )};