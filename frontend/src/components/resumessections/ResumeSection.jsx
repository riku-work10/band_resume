import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdExpandMore, MdExpandLess, MdDragIndicator  } from 'react-icons/md';
import apiClient from '../../services/apiClient';
import { ResumeSectionTitle } from './ResumeSectionTitle';
import { ResumeSectionDeleteButton } from './ResumeSectionDeleteButton';
import { ResumeItemInputToggle } from '../resumesitems/ResumeItemInputToggle';
import { ResumeItems } from '../resumesitems/ResumeItems';

export function ResumeSection({
  index,
  resumeSectionsList,
  setResumeSectionsList,
  resumeSection,
  resumeId,
}) {
  const [itemList, setItemList] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showInputToggle, setShowInputToggle] = useState(true);

  useEffect(() => {
    apiClient
      .get(`resumes/${resumeId}/resume_sections/${resumeSection.id}/resume_items`)
      .then((response) => setItemList(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  }, [resumeSection.id, resumeId]);

  return (
    <Draggable draggableId={resumeSection.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-stone-800 rounded-xl shadow-lg border transition-colors duration-200 ${
            snapshot.isDragging ? 'border-stone-400' : 'border-stone-700'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-stone-700 border-b border-stone-600 rounded-t-xl">
            <div className="flex items-center flex-1 min-w-0">
              {/* Drag Handle */}
            <div
              {...provided.dragHandleProps}
              className={`p-2 mr-2 cursor-grab active:cursor-grabbing transition-colors duration-200 ${
                snapshot.isDragging ? 'text-white' : 'text-stone-400 hover:text-white'
              }`}
              title="ドラッグして移動"
            >
              <MdDragIndicator size={20} />
            </div>

              <ResumeSectionTitle
                resumeSectionsList={resumeSectionsList}
                setResumeSectionsList={setResumeSectionsList}
                resumeSection={resumeSection}
                resumeId={resumeId}
              />
            </div>

            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-600 transition-colors duration-200"
                title={isExpanded ? 'セクションを閉じる' : 'セクションを開く'}
              >
                {isExpanded ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
              </button>

              <ResumeSectionDeleteButton
                resumeSectionsList={resumeSectionsList}
                setResumeSectionsList={setResumeSectionsList}
                resumeSection={resumeSection}
                resumeId={resumeId}
              />
            </div>
          </div>

          {/* Content */}
          {isExpanded && (
            <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInputToggle(!showInputToggle);
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-stone-300 bg-stone-700 hover:bg-stone-700 hover:text-white rounded-md transition-all duration-200"
                >
                  {showInputToggle ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
                  {showInputToggle ? '入力欄を隠す' : '入力欄を表示'}
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className={`transition-all duration-300 ${showInputToggle ? 'md:w-1/2' : 'w-full'}`}>
                  <ResumeItems
                    itemList={itemList}
                    setItemList={setItemList}
                    resumeSection={resumeSection}
                    resumeId={resumeId}
                  />
                </div>

                {showInputToggle && (
                  <div className="w-full md:w-1/2">
                    <ResumeItemInputToggle
                      itemList={itemList}
                      setItemList={setItemList}
                      resumeSection={resumeSection}
                      resumeId={resumeId}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
