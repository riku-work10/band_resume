import ResumesCreate from "../components/resumes/ResumesCreate";
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { Link } from "react-router-dom";
import { getResumesByUserId } from "../services/apiResumes";

const MyResumePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        if (!user) return; // ユーザーが取得できていない場合は処理しない
        const data = await getResumesByUserId(user.id); // 自分の履歴書のみ取得
        setResumes(data);
      } catch (err) {
        setError("履歴書の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    
    fetchResumes();
  }, [user]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">自分の履歴書一覧</h1>

      {resumes.length === 0 ? (
        <p>履歴書がありません。</p>
      ) : (
        resumes.map((resume) => (
          <Link to={`/resumes/${resume.id}`} className="hover:underline">
          <div key={resume.id} className="border p-4 my-4 rounded shadow-md">
            <h2 className="text-xl font-bold">{resume.title}</h2>
            <p>年齢: {resume.age}歳</p>
            <p>性別: {resume.gender}</p>
            <p>場所: {resume.location}</p>
            <p>{resume.introduction}</p>
          </div>
          </Link>
        ))
      )}


      {/* モーダルを開くボタン */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        履歴書作成
      </button>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <ResumesCreate onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResumePage;
