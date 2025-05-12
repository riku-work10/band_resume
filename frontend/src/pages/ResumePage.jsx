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
    <div className="pt-4">
      <ResumeSearch onSearch={handleSearch} />
      {filteredResumes.map((resume) => (
        <div key={resume.id}>
          <Link to={`/resumes/${resume.id}`} className="hover:underline">
            {resume.profile_image && (
              <img src={resume.profile_image} alt={resume.title} width="100" />
            )}
            <h2>{resume.title}</h2>
            <p>年齢: {resume.age}歳</p>
            <p>性別: {resume.gender}</p>
            <p>場所: {resume.location}</p>
            <p>紹介: {resume.introduction}</p>
          </Link>
          {user && user.id !== resume.user_id && (
          <ResumeLikeButton resumeId={resume.id} className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400" />
        )}

          <hr />
        </div>
      ))}
    </div>
  );
};

export default ResumePage;
