import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import apiClient from '../../services/apiClient';
import { ResumeSection } from './ResumeSection';
import { AddResumeSectionButton } from './AddResumeSectionButton';
import { useAuth } from '../../hooks/AuthContext';
import { InitializeResumeSections } from './InitializeResumeSections';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export function ResumeSections({ resumeId, resume }) {
  const { user } = useAuth();
  const [resumeSectionsList, setResumeSectionsList] = useState([]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const newOrder = reorder(resumeSectionsList, result.source.index, result.destination.index);
    const reordered = newOrder.map((section, index) => ({ ...section, position: index }));

    setResumeSectionsList(reordered);

    try {
      await apiClient.put(`/resumes/${resumeId}/resume_sections/update_position`, {
        sections: reordered.map((section) => ({
          id: section.id,
          position: section.position,
        })),
      });
      console.log('Section positions updated successfully');
    } catch (error) {
      console.error('Error updating section positions:', error);
    }
  };

  useEffect(() => {
    apiClient
      .get(`resumes/${resumeId}/resume_sections`)
      .then((response) => setResumeSectionsList(response.data))
      .catch((error) => console.error('Error fetching sections:', error));
  }, [resumeId]);

  return (
    <div className="space-y-4">
      <InitializeResumeSections resumeId={resumeId} setResumeSectionsList={setResumeSectionsList} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {resumeSectionsList.map((resumeSection, index) => (
                <ResumeSection
                  key={resumeSection.id}
                  index={index}
                  resumeSectionsList={resumeSectionsList}
                  setResumeSectionsList={setResumeSectionsList}
                  resumeSection={resumeSection}
                  resumeId={resumeId}
                />
              ))}
              {provided.placeholder}
              {user?.id === resume.user_id && (
                <AddResumeSectionButton
                  resumeSectionsList={resumeSectionsList}
                  setResumeSectionsList={setResumeSectionsList}
                  resumeId={resumeId}
                />
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
