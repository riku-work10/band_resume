import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResumesCreate from '../components/resumes/ResumesCreate';
import { useAuth } from '../hooks/AuthContext';
import { getResumesByUserId } from '../services/apiResumes';

function MyResumePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        if (!user) return;
        const data = await getResumesByUserId(user.id);
        setResumes(data);
      } catch (err) {
        setError('履歴書の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user]);

  if (loading) return <div className="text-stone-400 p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {resumes.length === 0 ? (
          <p className="text-stone-300 text-center">履歴書がありません。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="relative flex flex-col sm:flex-row bg-stone-700 rounded-2xl shadow-md overflow-hidden hover:bg-stone-600 hover:shadow-lg transition"
              >
                <Link
                  to={`/resumes/${resume.id}`}
                  className="w-full sm:w-36 flex-shrink-0 aspect-square sm:aspect-auto bg-stone-900"
                >
                  <img
                    src={
                      resume.profile_image ||
                      'https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg'
                    }
                    alt={resume.title}
                    className="w-full h-full object-cover sm:rounded-l-2xl"
                  />
                </Link>

                <div className="flex flex-col justify-between p-4 flex-grow min-h-[150px]">
                  <div>
                    <Link to={`/resumes/${resume.id}`} className="hover:underline block">
                      <h2 className="text-lg font-semibold text-stone-100 mb-2 break-words">
                        {`${resume.user.name}の履歴書`}
                      </h2>
                      <div className="flex flex-wrap text-sm text-stone-300 gap-x-4 gap-y-1 mb-3">
                        {resume.age && <p>年齢：{resume.age}</p>}
                        {resume.gender && <p>性別：{resume.gender}</p>}
                        {resume.location && <p>現在地：{resume.location}</p>}
                      </div>
                      <p className="text-sm text-stone-200 whitespace-pre-wrap break-words">
                        {resume.introduction}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 履歴書作成ボタン（右下固定） */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-xl text-white font-bold py-3 px-6 rounded-full shadow-lg"
      >
        履歴書作成
      </button>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <ResumesCreate onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyResumePage;
