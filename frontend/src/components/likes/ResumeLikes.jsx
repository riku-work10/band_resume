import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../hooks/AuthContext';

function ResumeLikes() {
  const { user } = useAuth();
  const [likedResumes, setLikedResumes] = useState([]);

  useEffect(() => {
    const fetchLikedResumes = async () => {
      try {
        const response = await apiClient.get('/resumes/my_liked_resumes');
        setLikedResumes(response.data);
      } catch (error) {
        console.error('いいねした履歴書の取得に失敗しました', error);
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
                <img
                  src={resume.profile_image || 'https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default.png'}
                  alt={resume.title}
                  className="w-full h-36 object-cover rounded-md mb-2"
                />
              <h2 className="text-lg font-semibold">{resume.user.name}の履歴書</h2>
              {resume.age && <p className="text-sm text-stone-200">年齢: {resume.age}</p>}
              {resume.gender && <p className="text-sm text-stone-200">性別: {resume.gender}</p>}
              {resume.location && <p className="text-sm text-stone-200">場所: {resume.location}</p>}
              {resume.introduction && <p className="text-sm text-stone-300 truncate">{resume.introduction}</p>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResumeLikes;
