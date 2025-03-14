import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import { putResume } from '../../services/apiResumes';
import SelectAge from "../selectlists/SelectAge";
import SelectGender from "../selectlists/SelectGender";
import SelectLocation from "../selectlists/SelectLocation";


const ResumeEdit = ({ resume, onClose, onUpdate }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [snsUrl, setSnsUrl] = useState('');
  const [location, setLocation] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [error, setError] = useState(null);

  // 編集画面の初期データを入れる＝デフォルトのデータ
  useEffect(() => {
    if (resume) {
      setTitle(resume.title);
      setProfileImage(resume.profile_image || '');
      setAge(resume.age || '');
      setGender(resume.gender || '');
      setSnsUrl(resume.sns_url || '');
      setLocation(resume.location || '');
      setIntroduction(resume.introduction || '');
    }
  }, [resume]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedResumeData = {
        user_id: user.id,
        title,
        profile_image: profileImage,
        age,
        gender,
        sns_url: snsUrl,
        location,
        introduction,
      };
      const updatedResume = await putResume(resume.id, updatedResumeData); // 履歴書更新
      onUpdate(updatedResume); // 親コンポーネントの状態を更新
      onClose(); // モーダルを閉じる
    } catch (err) {
      setError('履歴書の更新に失敗しました');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4 text-black">履歴書の編集</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-black">タイトル：</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="text-black">プロフィール画像URL：</label>
            <input
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div>
          <label className="text-black">年齢：</label>
          <SelectAge value={age} onChange={(e) => setAge(e.target.value)} />
          </div>

          <div>
            <label className="text-black">性別：</label>
            <SelectGender value={gender} onChange={(e) => setGender(e.target.value)} />
          </div>

          <div>
            <label className="text-black">SNSリンク：</label>
            <input
              type="text"
              value={snsUrl}
              onChange={(e) => setSnsUrl(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div>
          <label className="text-black">場所：</label>
          <SelectLocation value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div>
            <label className="text-black">自己紹介：</label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
              キャンセル
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              更新する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeEdit;
