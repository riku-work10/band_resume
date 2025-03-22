import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getResume, ResumeDelete  } from '../../services/apiResumes';
import ResumeEdit from './ResumesEdit';
import ResumeComments from '../comments/ResumeComments';
import ResumeLikeButton from '../likes/ResumeLikeButton ';
import { ResumeSections } from '../resumescontents/ResumeSections';
import { MdDelete, MdEdit } from "react-icons/md";

const ResumePageShow = () => {
  const { resumeId } = useParams(); // URLパラメータからIDを取得
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  //削除ボタン
  const handleDelete = async () => {
    setLoading(true);
    try {
      await ResumeDelete(resumeId); // 履歴書削除
      alert("削除しました");
      navigate("/myresumes")
    } catch (err) {
      setError('履歴書の削除に失敗しました');
    } finally {
      setLoading(false);
    }
  };

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
              <br />
              <ResumeLikeButton resumeId={resume.id} />
              <br />
              <button 
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setIsEditModalOpen(true)}>
                <MdEdit />
              </button>

              <button
              onClick={() => handleDelete(resumeId)}
              className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
                <MdDelete />
              </button>
              <ResumeSections resumeId={resumeId}/>
              <ResumeComments resumeId={resumeId}/>
            </div>
        ) : (
          <p>履歴書を読み込み中...</p>
        )}

        {/* 編集モーダル */}
        {isEditModalOpen && (
          <ResumeEdit
            resume={resume}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={setResume}
          />
        )}
    </div>
  );
};

export default ResumePageShow;