import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createResume } from '../../services/apiResumes';
import { useAuth } from '../../hooks/AuthContext';

const ResumesCreate = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [snsUrl, setSnsUrl] = useState('');
  const [location, setLocation] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resumeData = {
        user_id: user.id,
        title,
        profile_image: profileImage,
        age: age,
        gender: gender,
        sns_url: snsUrl,
        location: location,
        introduction: introduction,
      };
      const newResume = await createResume(resumeData); // 履歴書作成
      navigate("/myresumes");
    } catch (err) {
      setError('履歴書の作成に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md text-black" >
      <h2>新しい履歴書の作成</h2>

      <div>
        <label>タイトル：</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-emerald-400"
        />
      </div>

      <div>
        <label>プロフィール画像URL：</label>
        <input
          type="text"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          className="bg-emerald-400"
        />
      </div>

      <div>
        <label>年齢：</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="bg-emerald-400"
        />
      </div>

      <div>
        <label>性別：</label>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="bg-emerald-400"
        />
      </div>

      <div>
        <label>SNSリンク：</label>
        <input
          type="text"
          value={snsUrl}
          onChange={(e) => setSnsUrl(e.target.value)}
          className="bg-emerald-400"
        />
      </div>

      <div>
        <label>場所：</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-emerald-400"
        />
      </div>

      <div>
        <label>自己紹介：</label>
        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className="bg-emerald-400"
        />
      </div>

      {error && <p>{error}</p>}

      <button
        type="submit"
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        履歴書作成
      </button>
    </form>
  );
};

export default ResumesCreate;
