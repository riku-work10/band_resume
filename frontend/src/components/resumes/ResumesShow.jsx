import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getResume } from '../../services/apiResumes';

const ResumePageShow = () => {
  const { resumeId } = useParams(); // URLパラメータからIDを取得
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResume(resumeId); // 履歴書データを取得
        setResume(data); // ステートにセット
        setLoading(false);
      } catch (err) {
        setError('履歴書の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchResume(); // データ取得を実行
  }, [resumeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>履歴書詳細</h1>
        {resume ? (
            <div className='mb-6'>
              <h2>{resume.title}</h2>
              {resume.profile_image && <img src={resume.profile_image} alt={resume.title} width="100" />}
              <p>年齢: {resume.age}歳</p>
              <p>性別: {resume.gender}</p>
              <p>場所: {resume.location}</p>
              <p>紹介: {resume.introduction}</p>
              {resume.sns_url && <a href={resume.sns_url} target="_blank" rel="noopener noreferrer">SNSリンク</a>}
            </div>
        ) : (
          <p>履歴書を読み込み中...</p>
        )}
    </div>
  );
};

export default ResumePageShow;