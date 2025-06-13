import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getResumes } from '../services/apiResumes';
import ResumeSearch from '../components/search/ResumeSearch';
import { useAuth } from '../hooks/AuthContext';
import ResumeLikeButton from '../components/likes/ResumeLikeButton ';
import ResumesCreate from '../components/resumes/ResumesCreate';

function ResumePage() {
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getResumes();
        setResumes(data);
        setFilteredResumes(data);
        setLoading(false);
      } catch (err) {
        setError('履歴書の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleSearch = (query, minAge, maxAge, selectedGenders, selectedLocations) => {
    let filtered = resumes;

    if (query) {
      filtered = filtered.filter((resume) =>
        resume.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (minAge || maxAge) {
      filtered = filtered.filter((resume) => {
        const { age } = resume;
        return (!minAge || age >= minAge) && (!maxAge || age <= maxAge);
      });
    }

    if (selectedGenders.length > 0) {
      filtered = filtered.filter((resume) => selectedGenders.includes(resume.gender));
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter((resume) => selectedLocations.includes(resume.location));
    }

    setFilteredResumes(filtered);
  };

  if (loading) return <div className="text-stone-400 p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <ResumeSearch onSearch={handleSearch} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {filteredResumes.map((resume) => (
            <div
              key={resume.id}
              className="relative flex flex-col sm:flex-row bg-stone-700 rounded-2xl shadow-md overflow-hidden hover:bg-stone-600 hover:shadow-lg transition"
            >
              {/* プロフィール画像 */}
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

              {/* 情報エリア */}
              <div className="flex flex-col justify-between p-4 flex-grow min-h-[150px]">
                <div>
                  <Link to={`/resumes/${resume.id}`} className="hover:underline block">
                    {/* タイトル */}
                    <h2 className="text-lg font-semibold text-stone-100 mb-2 break-words">
                      {resume.user.name}の履歴書
                    </h2>

                    {/* 年齢・性別・場所 */}
                    <div className="flex flex-wrap text-sm text-stone-300 gap-x-4 gap-y-1 mb-3">
                      {resume.age && <p>年齢：{resume.age}</p>}
                      {resume.gender && <p>性別：{resume.gender}</p>}
                      {resume.location && <p>現在地：{resume.location}</p>}
                    </div>

                    {/* 紹介文 */}
                    <p className="text-sm text-stone-200 whitespace-pre-wrap break-words">
                      {resume.introduction && <p>{resume.introduction}</p>}
                    </p>
                  </Link>
                </div>

                {/* いいねボタン */}
                {user && user.id !== resume.user_id && (
                  <div className="absolute bottom-4 right-4">
                    <ResumeLikeButton
                      resumeId={resume.id}
                      textColor="text-white"
                      className="py-1 px-4 bg-orange-600 text-white text-sm font-medium rounded-lg shadow hover:bg-orange-700 transition"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ✅ 固定表示の「履歴書作成」ボタン */}
      {user && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-20 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-xl text-white font-bold py-3 px-6 rounded-full shadow-lg"
        >
          履歴書作成
        </button>
      )}

      {/* ✅ モーダル */}
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

export default ResumePage;
