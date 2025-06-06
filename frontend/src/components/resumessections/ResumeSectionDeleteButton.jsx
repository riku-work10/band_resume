import { MdDelete } from "react-icons/md";
import apiClient from '../../services/apiClient';

export const ResumeSectionDeleteButton = ({ resumeSectionsList, setResumeSectionsList, resumeSection, resumeId }) => {
  const resumeSectionDeleteButton = async (sectionId) => {
    try {
      const response = await apiClient.delete(`resumes/${resumeId}/resume_sections/${resumeSection.id}`);
      console.log(response.data.message);
      setResumeSectionsList(resumeSectionsList.filter((section) => section.id !== sectionId));
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  return (
    <button 
      onClick={() => resumeSectionDeleteButton(resumeSection.id)} 
      className="p-2 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
      title="セクションを削除"
    >
      <MdDelete size={18} />
    </button>
  );
};
