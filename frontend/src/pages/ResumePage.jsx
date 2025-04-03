import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getResumes } from "../services/apiResumes";
import ResumeSearch from "../components/search/ResumeSearch";
import { useAuth } from "../hooks/AuthContext";

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
    <div>
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

          <hr />
        </div>
      ))}
    </div>
  );
};

export default ResumePage;
