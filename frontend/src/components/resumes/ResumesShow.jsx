import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getResume, ResumeDelete  } from '../../services/apiResumes';
import ResumeEdit from './ResumesEdit';
import ResumeComments from '../comments/ResumeComments';
import ResumeLikeButton from '../likes/ResumeLikeButton ';
import { MdDelete, MdEdit } from "react-icons/md";
import { useAuth } from '../../hooks/AuthContext';
import ResumesShowSectionItemDetail from './ResumesShowSectionItemDetail';

const ResumePageShow = () => {
  const { resumeId } = useParams(); // URLパラメータからIDを取得
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useAuth();

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
  
  const CreateEditButton = () => {
    navigate("/resumesectionitemcreateedit", {
      state: { resume }
    })
  }

  return (
    <div>
        {resume ? (
            <div className='mb-6'>
              <div className="mb-6 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {/* 画像部分 */}
                {resume.profile_image && (
                  <img
                    src={resume.profile_image}
                    alt={resume.title}
                    className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                  />
                )}
                {/* テキスト部分 */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{resume.title}</h2>
                  {/* 年齢と性別を横並び */}
                  <div className="flex space-x-4">
                    <p>年齢: {resume.age}歳</p>
                    <p>性別: {resume.gender}</p>
                  </div>
                  {/* 場所とリンクを横並び */}
                  <div className="flex space-x-4">
                    <p>場所: {resume.location}</p>
                    {resume.sns_url && (
                      <a href={resume.sns_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        SNSリンク
                      </a>
                    )}
                  </div>
                  {/* 紹介文は大きめに表示 */}
                  <p className="text-lg mt-2">{resume.introduction}</p>
                </div>
                {/* ボタン部分 */}
                <div className="flex space-x-4 mt-4 sm:mt-0">
                {user && user.id === resume.user_id && ( // ログインユーザーが作成者の場合
                <div>
                  <button
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => setIsEditModalOpen(true)}>
                    <MdEdit />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
                    <MdDelete />
                  </button>
                </div>
                 )}
                {user && user.id !== resume.user_id && (
                  <ResumeLikeButton resumeId={resume.id} className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400" />
                )}
                </div>
              </div>
              <ResumesShowSectionItemDetail resume={resume}/>
              {resume.resume_sections.length > 0 ? (<button onClick={CreateEditButton}>コンテンツの編集</button>) : ((<button onClick={CreateEditButton}>コンテンツの作成</button>))}
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