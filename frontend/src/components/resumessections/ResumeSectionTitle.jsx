import React, { useState } from 'react';
import apiClient from '../../services/apiClient';

export const ResumeSectionTitle = ({ resumeSectionsList, setResumeSectionsList, resumeSection, resumeId }) => {
const [isClick, setIsClick] = useState(false)
const [inputResumeSectionTitle, setInputResumeSectionTitle] = useState(resumeSection.title || "タイトル")


const hundleSubmit = async (e) => {
  e.preventDefault();  //フォームでエンターを押してもページが更新されないようにする

  try {
    const response = await apiClient.put(`resumes/${resumeId}/resume_sections/${resumeSection.id}`, {
      resume_section: {
        title: inputResumeSectionTitle,
      },
    });
    // 成功したら、更新されたタスクをリストに反映
    setResumeSectionsList(resumeSectionsList.map(section => 
      section.id === resumeSection.id ? response.data : section
    ));
    setIsClick(false);  // 編集モード終了
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

const handleClick = () => {
  setIsClick(true);
};

const handleChange = (e) => {
  setInputResumeSectionTitle(e.target.value)
};

//inputタブからマウスを外したときにクリックしたら呼び出されるもの
const handleBlur = () => {
  setIsClick(false)
};

  return (
    <div onClick={handleClick} className='taskCardTitleInputArea'>
      {isClick ? 
      (<form onSubmit={hundleSubmit}>
        <input 
        className='taskCardTitleInput'
        type="text"
        autoFocus
        onChange={handleChange}
        onBlur={handleBlur}
        value={inputResumeSectionTitle}
        placeholder='aaa'
        maxLength={10}/>
      </form>) : 
      (<h3 className='inputResumeSectionTitleText'>
        {inputResumeSectionTitle}
      </h3>)}
    </div>
  )};