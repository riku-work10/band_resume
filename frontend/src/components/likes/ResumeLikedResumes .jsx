//つかってないよねこれ？
import React, { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';

const ResumeLikedResumes = ({ userId }) => {
  const [likedResumes, setLikedResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLikedResumes = async () => {
      try {
        const response = await apiClient.get(`/users/${userId}/liked_resumes`);
        setLikedResumes(response.data);
      } catch (err) {
        console.error('Failed to fetch liked resumes:', err);
        setError('履歴書の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    getLikedResumes();
  }, [userId]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>いいねした履歴書</h2>
      {likedResumes.length === 0 ? (
        <p>まだいいねした履歴書がありません。</p>
      ) : (
        <ul>
          {likedResumes.map((resume) => (
            <li key={resume.id}>
              <h3>{resume.name}</h3>
              <p>{resume.batch}期</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeLikedResumes;
