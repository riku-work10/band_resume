import { ResumeSections } from "../resumessections/ResumeSections";

import { useLocation, useNavigate } from 'react-router-dom';
const ResumesShowSectionItemCreateEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resume } = location.state || {}; 
  const closebutton = () => {
  navigate(`/resumes/${resume.id}`)
  }

  return (
    <div>
      <h2 className="text-6xl">コンテンツ/アイテム作成ページ</h2>
      <ResumeSections resumeId={resume.id} resume={resume}/>
      <button onClick={closebutton}>戻る</button>
      <button onClick={closebutton}>保存</button>
    </div>
  );
};

export default ResumesShowSectionItemCreateEdit;
