import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResume } from "../../services/apiResumes";
import { useAuth } from "../../hooks/AuthContext";
import SelectAge from "../selectlists/SelectAge";
import SelectGender from "../selectlists/SelectGender";
import SelectLocation from "../selectlists/SelectLocation";

const ResumesCreate = ({ onClose }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [snsUrl, setSnsUrl] = useState("");
  const [location, setLocation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      setIsUploading(true);
      const res = await fetch(`http://localhost:3000/api/v1/s3/presigned_url?user_id=${user.id}&filename=${selectedFile.name}&content_type=${selectedFile.type}`);
      const { url, file_url } = await res.json();
      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      })
      console.log(uploadRes)
      if (!uploadRes.ok) throw new Error("S3アップロードに失敗しました");
      setProfileImage(file_url);
      alert("画像アップロード成功！");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resumeData = {
        user_id: user.id,
        title,
        profile_image: profileImage,
        age,
        gender,
        sns_url: snsUrl,
        location,
        introduction,
      };
      const response = await createResume(resumeData);
      onClose();
      navigate(`/resumes/${response.id}`);
    } catch (err) {
      setError("履歴書の作成に失敗しました");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold">新しい履歴書の作成</h2>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md text-black">
        <div>
          <label className="text-black">タイトル：</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded text-white"
          />
        </div>

        <div>
          <label className="text-black">プロフィール画像：</label>
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <button type="button" onClick={handleUpload} disabled={isUploading} className="bg-green-500 text-white px-3 py-1 rounded ml-2">
            {isUploading ? "アップロード中..." : "アップロード"}
          </button>
          {profileImage && (
            <div className="mt-2">
              <img src={profileImage} alt="プロフィール画像" className="h-20 rounded" />
            </div>
          )}
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
            className="border border-gray-300 p-2 w-full rounded text-white"
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
            className="border border-gray-300 p-2 w-full rounded text-white"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            キャンセル
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            履歴書作成
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumesCreate;
