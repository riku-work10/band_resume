import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import apiClient from '../../services/apiClient';
import { ResumeSectionTitle } from './ResumeSectionTitle';
import { ResumeSectionDeleteButton } from './ResumeSectionDeleteButton';
import { ResumeItemAddInput } from '../resumesitems/ResumeItemAddInput';
import { ResumeItems } from '../resumesitems/ResumeItems';

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
        <div
          className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-md"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex justify-between items-center mb-4" {...provided.dragHandleProps}>
            <ResumeSectionTitle
              resumeSectionsList={resumeSectionsList}
              setResumeSectionsList={setResumeSectionsList}
              resumeSection={resumeSection}
              resumeId={resumeId}
            />
            <ResumeSectionDeleteButton
              resumeSectionsList={resumeSectionsList}
              setResumeSectionsList={setResumeSectionsList}
              resumeSection={resumeSection}
              resumeId={resumeId}
            />
          </div>
          <ResumeItemAddInput
            inputText={inputText}
            setInputText={setInputText}
            itemList={itemList}
            setItemList={setItemList}
            resumeSection={resumeSection}
            resumeId={resumeId}
          />
          <ResumeItems itemList={itemList} setItemList={setItemList} resumeSection={resumeSection} resumeId={resumeId} />
        </div>
      )}
    </Draggable>
  );};