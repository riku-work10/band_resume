import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { useAuth } from "../../hooks/AuthContext";

const ResumeLikes = () => {
  const { user } = useAuth();
  const [likedResumes, setLikedResumes] = useState([]);
  const [isLikesVisible, setIsLikesVisible] = useState(false);

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

  const toggleLikesVisibility = () => {
    setIsLikesVisible(!isLikesVisible);
  };

  return (
    <div className='mt-6 border rounded p-4'>
      <h1 className='text-2xl font-bold cursor-pointer mb-4' onClick={toggleLikesVisibility}>
        {isLikesVisible ? 'いいねした履歴書を閉じる' : 'いいねした履歴書を見る'}
      </h1>
      <hr />

      {/* いいねした履歴書一覧の表示 */}
      {isLikesVisible && likedResumes.length === 0 && (
        <p className="text-gray-500 mt-4">いいねした履歴書はありません。</p>
      )}

      {isLikesVisible && likedResumes.length > 0 && (
        <div className="relative">
          {/* 横スクロールコンテナ */}
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory">
            {likedResumes.map((resume) => (
              <div 
                key={resume.id} 
                className="snap-start flex-shrink-0 w-64 border rounded-lg shadow-md p-4 bg-white"
              >
                {resume.profile_image && (
                  <img 
                    src={resume.profile_image} 
                    alt={resume.title} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}
                <h2 className="text-lg font-semibold mt-2">{resume.title}</h2>
                <p className="text-sm text-gray-600">年齢: {resume.age}歳</p>
                <p className="text-sm text-gray-600">性別: {resume.gender}</p>
                <p className="text-sm text-gray-600">場所: {resume.location}</p>
                <p className="text-sm text-gray-600 truncate">{resume.introduction}</p>
                {resume.sns_url && (
                  <a 
                    href={resume.sns_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 text-sm mt-2 inline-block"
                  >
                    SNSリンク
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeLikes;
