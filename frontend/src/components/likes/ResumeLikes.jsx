import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../hooks/AuthContext';

const ResumeLikes = () => {
  const { user } = useAuth();
  const [likedResumes, setLikedResumes] = useState([]);

  useEffect(() => {
    const fetchLikedResumes = async () => {
      try {
        const response = await apiClient.get('/resumes/my_liked_resumes');
        setLikedResumes(response.data);
      } catch (error) {
        console.error("いいねした履歴書の取得に失敗しました", error);
      }
    };

    if (user) {
      fetchLikedResumes();
    }
  }, [user]);

  if (!likedResumes.length) {
    return (
      <div className="mt-10 text-gray-400">
        <h1 className="text-2xl font-bold text-white mb-4">いいねした履歴書</h1>
        <p>いいねした履歴書はありません。</p>
      </div>
    );
  }

  return (
    <div className="mt-10 px-4 md:px-10">
      <h1 className="text-2xl font-bold text-white mb-4">いいねした履歴書</h1>

      <div className="overflow-x-auto scrollbar-hide pb-4">
        <div className="flex space-x-6 snap-x snap-mandatory">
          {likedResumes.map((resume) => (
            <Link
              to={`/resumes/${resume.id}`}
              key={resume.id}
              className="snap-start flex-shrink-0 w-64 bg-stone-700 text-stone-100 rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105 hover:bg-stone-600"
            >
              {resume.profile_image && (
                <img
                  src={resume.profile_image}
                  alt={resume.title}
                  className="w-full h-36 object-cover rounded-md mb-2"
                />
              )}
              <h2 className="text-lg font-semibold">{}の履歴書</h2>
              <p className="text-sm text-stone-200">年齢: {resume.age}</p>
              <p className="text-sm text-stone-200">性別: {resume.gender}</p>
              <p className="text-sm text-stone-200">場所: {resume.location}</p>
              <p className="text-sm text-stone-300 truncate">{resume.introduction}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeLikes;
