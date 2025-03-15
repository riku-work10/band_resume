import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { useAuth } from "../../hooks/AuthContext";

const ResumeLikes = () => {
  const { user } = useAuth();
  const [likedResumes, setLikedResumes] = useState([]);
  const [isLikesVisible, setIsLikesVisible] = useState(false); // いいねした履歴書一覧の表示状態を管理

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

  // いいねした履歴書一覧の表示/非表示を切り替える
  const toggleLikesVisibility = () => {
    setIsLikesVisible(!isLikesVisible);
  };

  return (
    <div className='mt-6 border rounded'>
      <h1 className='text-4xl cursor-pointer' onClick={toggleLikesVisibility}>
        {isLikesVisible ? 'いいねした履歴書を閉じる' : 'いいねした履歴書を見る'}
      </h1>
      <hr />
      
      {/* いいねした履歴書一覧の表示 */}
      {isLikesVisible && likedResumes.length === 0 && (
        <p>いいねした履歴書はありません。</p>
      )}

      {isLikesVisible && likedResumes.length > 0 && (
        <div>
          {likedResumes.map((resume) => (
            <div key={resume.id} className="border-b border-gray-300 py-4">
              <h2>{resume.title}</h2>
              {resume.profile_image && <img src={resume.profile_image} alt={resume.title} width="100" />}
              <p>年齢: {resume.age}歳</p>
              <p>性別: {resume.gender}</p>
              <p>場所: {resume.location}</p>
              <p>紹介: {resume.introduction}</p>
              {resume.sns_url && <a href={resume.sns_url} target="_blank" rel="noopener noreferrer">SNSリンク</a>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeLikes;
