import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getResumes } from '../services/apiResumes';
import ResumeLikeButton from '../components/likes/ResumeLikeButton ';

const ResumePage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getResumes();  // 履歴書データを取得
        setResumes(data); // ステートにデータをセット
        setLoading(false);
      } catch (err) {
        setError('履歴書の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchResumes(); // データを取得
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {resumes.map((resume) => (
      <div key={resume.id}>
        <Link to={`/resumes/${resume.id}`} className="hover:underline">
        <h2>{resume.title}</h2>
        {resume.profile_image && <img src={resume.profile_image} alt={resume.title} width="100" />}
        <p>年齢: {resume.age}歳</p>
        <p>性別: {resume.gender}</p>
        <p>場所: {resume.location}</p>
        <p>紹介: {resume.introduction}</p>
        {resume.sns_url && <a href={resume.sns_url} target="_blank" rel="noopener noreferrer">SNSリンク</a>}
        </Link>
        <br />
        <ResumeLikeButton resumeId={resume.id} />
        <hr />
      </div>
      ))}
    </div>
  );
};

export default ResumePage;

