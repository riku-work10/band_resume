import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getResumes } from "../services/apiResumes";
import ResumeSearch from "../components/search/ResumeSearch";
import { useAuth } from "../hooks/AuthContext";
import ResumeLikeButton from '../components/likes/ResumeLikeButton ';

const ResumePage = () => {
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getResumes();
        setResumes(data);
        setFilteredResumes(data);
        setLoading(false);
      } catch (err) {
        setError("履歴書の取得に失敗しました");
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  // 検索＆フィルタ処理
  const handleSearch = (query, minAge, maxAge, selectedGenders, selectedLocations) => {
    let filtered = resumes;

    // タイトル検索
    if (query) {
      filtered = filtered.filter((resume) =>
        resume.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // 年齢範囲フィルタ
    if (minAge || maxAge) {
      filtered = filtered.filter((resume) => {
        const age = resume.age;
        return (!minAge || age >= minAge) && (!maxAge || age <= maxAge);
      });
    }

    // 性別フィルタ
    if (selectedGenders.length > 0) {
      filtered = filtered.filter((resume) => selectedGenders.includes(resume.gender));
    }

    // 場所フィルタ
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((resume) => selectedLocations.includes(resume.location));
    }

    setFilteredResumes(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

return (
  <div className="pt-4 px-4 mb-6">
    <ResumeSearch onSearch={handleSearch} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {filteredResumes.map((resume) => (
        <div
          key={resume.id}
          className="relative flex flex-col sm:flex-row bg-orange-100 rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition"
        >
          {/* プロフィール画像 */}
          {resume.profile_image && (
            <div className="w-full sm:w-36 flex-shrink-0 sm:h-auto aspect-square sm:aspect-auto bg-gray-100">
              <img
                src={resume.profile_image}
                alt={resume.title}
                className="w-full h-full object-cover sm:rounded-l-2xl"
              />
            </div>
          )}

          {/* 情報エリア */}
          <div className="flex flex-col justify-between p-4 flex-grow min-h-[150px]">
            <div>
              <Link to={`/resumes/${resume.id}`} className="hover:underline block">
                {/* 名前 */}
                <h2 className="text-lg font-semibold text-gray-900 mb-2 break-words">
                  {resume.title}
                </h2>

                {/* 年齢・性別・場所 */}
                <div className="flex flex-wrap text-sm text-gray-600 gap-x-4 gap-y-1 mb-3">
                  <p>{resume.age}歳</p>
                  <p>{resume.gender}</p>
                  <p>{resume.location}</p>
                </div>

                {/* 紹介文 */}
                <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                  {resume.introduction}
                </p>
              </Link>
            </div>

            {/* いいねボタン */}
            {user && user.id !== resume.user_id && (
              <div className="absolute bottom-4 right-4">
                <ResumeLikeButton
                  resumeId={resume.id}
                  textColor="text-black"
                  className="py-1 px-4 bg-emerald-500 text-white text-sm font-medium rounded-lg shadow hover:bg-emerald-600 transition"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);





};

export default ResumePage;
