import { ResumeSections } from "../resumesections/ResumeSections";

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
      <ResumeSections resumeId={resume.id} resume={resume}/>
      <button onClick={closebutton}>保存</button>
    </div>
  );
};

export default ResumesShowSectionItemCreateEdit;
