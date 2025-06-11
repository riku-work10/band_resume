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
  const [showControls, setShowControls] = useState(true);

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
  <div className="bg-black text-stone-100 min-h-screen px-4 py-6 md:px-0">
  {resume ? (
    <div
      className={`max-w-5xl mx-auto ${
        !showControls ? 'flex flex-col items-center justify-center min-h-[70vh] gap-8 py-8' : ''
      }`}
    >
      {/* タイトル */}
      <div className="mb-6">
        {/* HarukamiraiTitle内のスタイルは別途修正必要 */}
        <HarukamiraiTitle />
      </div>

      {/* 表示/非表示切り替えボタン */}
      <div className="mb-4 text-center">
        <button
          onClick={() => setShowControls(!showControls)}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          {showControls ? 'UIを非表示にする' : 'UIを表示する'}
        </button>
      </div>

      {/* ← 戻る */}
      {showControls && (
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-stone-700 text-white rounded hover:bg-stone-600 transition"
          >
            ← 戻る
          </button>
        </div>
      )}

      {/* メイン情報と写真 */}
      <div
        className={`mb-6 flex flex-col md:flex-row ${
          showControls ? 'items-start' : 'items-center justify-center'
        } space-y-6 md:space-y-0 ${showControls ? 'md:space-x-6' : 'gap-6'}`}
      >
        {/* プロフィール画像 */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img
            src={
              resume.profile_image ||
              'https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg'
            }
            alt={resume.title}
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-stone-600"
          />
        </div>

        {/* ユーザー情報 */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-stone-100">{resume.user.name}</h2>

          <div className="flex justify-center md:justify-start space-x-4 md:space-x-6 text-stone-300 text-sm md:text-base">
            {resume.age && <p>年齢: {resume.age}</p>}
            {resume.gender && <p>性別: {resume.gender}</p>}
            {resume.location && <p>場所: {resume.location}</p>}
          </div>

          <div className="flex justify-center md:justify-start space-x-4 md:space-x-6 items-center text-sm md:text-base">
            {resume.sns_url && (
              <div className="flex items-center space-x-2">
                <span className="text-stone-300">SNS:</span>
                <a
                  href={`https://x.com/${resume.sns_url.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:text-blue-300 transition"
                >
                  <FaXTwitter className="text-white bg-black p-1 text-xl md:text-2xl hover:bg-stone-800 transition rounded" />
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

        {/* ボタン群 */}
        {showControls && (
          <div className="flex-shrink-0 flex justify-center md:block space-x-3 mt-4 md:mt-0">
            {user && user.id === resume.user_id ? (
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <button
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <MdEdit className="mr-1" />
                  編集
                </button>
                <button
                  onClick={handleDelete}
                  className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center"
                >
                  <MdDelete className="mr-1" />
                  削除
                </button>
                <ResumeShareButton
                  resumeId={resume.id}
                  title={resume.title}
                  introduction={resume.introduction}
                />
              </div>
            ) : (
              <ResumeLikeButton
                resumeId={resume.id}
                textColor="text-white"
                className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              />
            )}
          </div>
        )}
      </div>

      {/* 詳細セクション */}
      <div className="relative w-full">
        <ResumesShowSectionItemDetail resume={resume} />
        {showControls && (
          <div className="absolute top-0 right-0">
            <button
              onClick={CreateEditButton}
              className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition font-medium"
            >
              {resume.resume_sections.length > 0 ? '履歴書内容の編集' : '履歴書内容の作成'}
            </button>
          </div>
        )}
      </div>

      {/* コメント */}
      {showControls && <ResumeComments resumeId={resumeId} />}
    </div>
  ) : (
    <p className="bg-black text-stone-100 min-h-screen p-4">履歴書を読み込み中...</p>
  )}

  {/* 編集モーダル */}
  {isEditModalOpen && (
    <ResumeEdit
      resume={resume}
      onClose={() => setIsEditModalOpen(false)}
      userName={resume.user.name}
      onUpdate={setResume}
    />
  )}
</div>
);
};

export default ResumePageShow;

