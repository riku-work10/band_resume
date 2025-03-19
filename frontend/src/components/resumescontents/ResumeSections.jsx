import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import apiClient from '../../services/apiClient';
import { ResumeSection } from './ResumeSection';
// import { ResumeSection } from './ResumeSection';
// import { AddResumeSectionButton } from './AddResumeSectionButton';

const reorder = (resumeSectionsList, startIndex, endIndex) => {
  //タスクを並びかえる
  const remove = resumeSectionsList.splice(startIndex, 1);
  resumeSectionsList.splice(endIndex, 0, remove[0]);
  console.log(ResumeSections)
}

export const ResumeSections = ({resumeId}) => {
  const [resumeSectionsList, setResumeSectionsList] = useState([])
  //ドラッグアンドドロップの処理を実装
  const handleDragEnd = async (result) => {
    reorder(resumeSectionsList, result.source.index, result.destination.index)  //result.source.indexはつかんだ元の位置　//result.destination.indexはドロップした位置
    setResumeSectionsList(resumeSectionsList)  //ResumeSectionsが入れ替えた配列だ！

    const reorderedResumeSections = resumeSectionsList.map((section, index) => ({
      ...section,
      position: index  // 新しい位置（index）を position として設定
    }));
    console.log(reorderedResumeSections)
    setResumeSectionsList(reorderedResumeSections)

    try {
      // 並べ替えた順番をバックエンドに送信
      await apiClient.put(`/resumes/${resumeId}/resume_sections/update_position`, {
        sections: reorderedResumeSections.map(section => ({
          id: section.id,
          position: section.position  // 新しい position を送信
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
    apiClient.get(`resumes/${resumeId}/resume_sections`)
      .then(response => setResumeSectionsList(response.data))  // タスクを状態にセット
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='dropaable' direction='horizontal'>
        {(provided) => (
        <div className='taskCardsArea' {...provided.droppableProps} ref={provided.innerRef}>
            {resumeSectionsList.map((resumeSection, index) => (
            <ResumeSection key={resumeSection.id} index={index} resumeSectionsList={resumeSectionsList} setResumeSectionsList={setResumeSectionsList} resumeSection={resumeSection} resumeId={resumeId}/>
          ))}
          {provided.placeholder}
          <h1 className='text-4xl'>ここにドラッグアンドドロップを実装します</h1>
          {/* <AddResumeSectionButton resumeSectionsList={resumeSectionsList} setResumeSectionsList={setResumeSectionsList} /> */}
        </div>
        )}
    </Droppable>
    </DragDropContext>
  )};