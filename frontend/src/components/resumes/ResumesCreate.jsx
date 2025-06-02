import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResume } from "../../services/apiResumes";
import { useAuth } from "../../hooks/AuthContext";
import SelectAge from "../selectlists/SelectAge";
import SelectGender from "../selectlists/SelectGender";
import SelectLocation from "../selectlists/SelectLocation";
import { useS3Image } from "../../hooks/useS3Image";

const ResumesCreate = ({ onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [snsUrl, setSnsUrl] = useState("");
  const [location, setLocation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [error, setError] = useState(null);

  const {
    profileImage,
    selectedFile,
    previewUrl,
    isUploading,
    handleFileChange,
    uploadToS3,
    deleteS3Object,
    extractObjectKey,
  } = useS3Image();

  const handleUpload = async () => {
    try {
      await uploadToS3(user.id);
      alert("画像アップロード成功！");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteImage = async () => {
    if (!profileImage) return;
    const objectKey = extractObjectKey();
    if (!objectKey) {
      alert("画像のキーが取得できません");
      return;
    }
    if (!window.confirm("画像を削除しますか？")) return;
    try {
      await deleteS3Object(objectKey);
      alert("画像を削除しました");
    } catch (err) {
      alert(err.message);
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
    } catch {
      setError("履歴書の作成に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md text-black">
      {/* タイトルや選択リスト、プロフィール画像部分は省略 */}
      <div>
        <label>プロフィール画像：</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "アップロード中..." : "アップロード"}
        </button>

        {profileImage ? (
          <div>
            <img src={profileImage} alt="アップロード済み" />
            <button onClick={handleDeleteImage}>削除</button>
          </div>
        ) : previewUrl ? (
          <img src={previewUrl} alt="プレビュー" />
        ) : null}
      </div>
      {/* その他フォーム要素 */}
    </form>
  );
};

export default ResumesCreate;
