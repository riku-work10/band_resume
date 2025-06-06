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
    <div className="min-h-screen bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-0">
          {resume.resume_sections.length > 0 ? "履歴書内容の編集" : "履歴書内容の作成"}
          </h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={closebutton}
              className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              保存
            </button>
            <button 
              onClick={closebutton}
              className="px-6 py-2 bg-stone-600 hover:bg-stone-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
            >
              戻る
            </button>
          </div>
        </div>

        {/* メインコンテンツ */}
        <ResumeSections resumeId={resume.id} resume={resume}/>
      </div>
    </div>
  );
};

export default ResumesShowSectionItemCreateEdit;
