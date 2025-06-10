import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getResume, ResumeDelete  } from '../../services/apiResumes';
import ResumeEdit from './ResumesEdit';
import ResumeComments from '../comments/ResumeComments';
import ResumeLikeButton from '../likes/ResumeLikeButton ';
import { MdDelete, MdEdit } from "react-icons/md";
import { useAuth } from '../../hooks/AuthContext';
import ResumesShowSectionItemDetail from './ResumesShowSectionItemDetail';
import ResumeShareButton from './ResumeShareButton';
import { FaXTwitter } from "react-icons/fa6";
import HarukamiraiTitle from './HarukamiraiTitle';

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

  if (loading) return <div className="bg-black text-stone-100 min-h-screen p-4">Loading...</div>;
  if (error) return <div className="bg-black text-stone-100 min-h-screen p-4">{error}</div>;

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
    <div className="bg-black text-stone-100 min-h-screen">
        {resume ? (
            <div className='mt-6 max-w-5xl mx-auto'>
              <HarukamiraiTitle />
              
              {/* メインコンテンツエリア */}
              <div className="mb-6 flex items-start space-x-6 ">
                
                {/* ①写真 */}
                <div className="flex-shrink-0">
                  <img
                    src={resume.profile_image || "https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg"}
                    alt={resume.title}
                    className="w-32 h-32 object-cover rounded-full border-2 border-stone-600"
                  />
                </div>
                
                {/* ②③④の縦並びエリア */}
                <div className="flex-1 space-y-3">
                  {/* ②名前 */}
                  <h2 className="text-2xl font-bold text-stone-100">{user.name}</h2>
                  
                  {/* ③年齢、性別、場所を横並び */}
                  <div className="flex space-x-6">
                    {resume.age && (
                      <p className="text-stone-300">年齢: {resume.age}</p>
                    )}
                    {resume.gender && (
                      <p className="text-stone-300">性別: {resume.gender}</p>
                    )}
                    {resume.location && (
                      <p className="text-stone-300">場所: {resume.location}</p>
                    )}
                  </div>
                  
                  {/* ④SNSとプレイリストを横並び */}
                  <div className="flex space-x-6 items-center">
                    {resume.sns_url && (
                      <div className="flex items-center space-x-2">
                        <span className="text-stone-300">SNS:</span>
                        <a
                          href={`https://x.com/${resume.sns_url.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300 transition"
                        >
                          <FaXTwitter className="text-white bg-black p-1 text-2xl hover:bg-stone-800 transition rounded" />
                        </a>
                      </div>
                    )}
                    {resume.playlist_url && (
                      <div className="flex items-center space-x-2">
                        <span className="text-stone-300">プレイリスト:</span>
                        <a
                          href={resume.playlist_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition"
                        >
                          私のプレイリスト
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* ⑤ボタンエリア */}
                <div className="flex-shrink-0">
                  {user && user.id === resume.user_id && ( // ログインユーザーが作成者の場合
                    <div className="space-y-3">
                      {/* 編集と削除ボタンを横並び */}
                      <div className="flex space-x-3">
                        <button
                          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition flex items-center"
                          onClick={() => setIsEditModalOpen(true)}>
                          <MdEdit className="mr-1" />
                          編集
                        </button>
                        <button
                          onClick={handleDelete}
                          className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition flex items-center">
                          <MdDelete className="mr-1" />
                          削除
                        </button>
                      </div>
                      
                      {/* 共有ボタン */}
                      <div>
                        <ResumeShareButton resumeId={resume.id} title={resume.title} introduction={resume.introduction} />
                      </div>
                    </div>
                  )}
                  {user && user.id !== resume.user_id && (
                    <ResumeLikeButton resumeId={resume.id} textColor="text-white" className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
                  )}
                </div>
              </div>
              
              {/* 履歴書詳細セクション（相対配置のコンテナ） */}
              <div className="relative">
                <ResumesShowSectionItemDetail resume={resume}/>
                
                {/* 履歴書内容作成/編集ボタン（右上に配置） */}
                <div className="absolute top-0 right-0">
                  {resume.resume_sections.length > 0 ? (
                    <button 
                      onClick={CreateEditButton}
                      className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition font-medium"
                    >
                      履歴書内容の編集
                    </button>
                  ) : (
                    <button 
                      onClick={CreateEditButton}
                      className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition font-medium"
                    >
                      履歴書内容の作成
                    </button>
                  )}
                </div>
              </div>
              
              <ResumeComments resumeId={resumeId}/>
            </div>
        ) : (
          <p className="bg-black text-stone-100 min-h-screen p-4">履歴書を読み込み中...</p>
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

