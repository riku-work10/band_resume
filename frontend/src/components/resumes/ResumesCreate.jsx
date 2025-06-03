import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResume } from "../../services/apiResumes";
import { useAuth } from "../../hooks/AuthContext";
import SelectAge from "../selectlists/SelectAge";
import SelectGender from "../selectlists/SelectGender";
import SelectLocation from "../selectlists/SelectLocation";
import { useS3Upload } from "../../hooks/useS3Upload";

const ResumesCreate = ({ onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    profileImage,
    selectedFile,
    setSelectedFile,
    isUploading,
    uploadImage,
    deleteImage,
  } = useS3Upload(user.id, "resumes");

  const [title, setTitle] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [snsUrl, setSnsUrl] = useState("");
  const [location, setLocation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    uploadImage().catch(() => {});
  };

  const handleDeleteClick = () => {
    deleteImage();
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
        playlist_url: playlistUrl,
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

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-4 rounded-lg shadow-md text-black"
      >
        <div>
          <label className="text-black">タイトル：</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded text-black"
          />
        </div>

        <div>
          <label className="text-black">プロフィール画像：</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2"
          />
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={isUploading || !selectedFile}
            className="bg-green-500 text-white px-3 py-1 rounded ml-2"
          >
            {isUploading ? "アップロード中..." : "アップロード"}
          </button>

            <div className="mt-2 flex items-center gap-2">
              <img
                src={profileImage || "https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg"}
                alt="アップロード済み画像"
                className="h-20 rounded object-cover"
                />
                {profileImage && (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                削除
              </button>
          )}
          </div>
        </div>


        <div>
          <label className="text-black">年齢：</label>
          <SelectAge value={age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <div>
          <label className="text-black">性別：</label>
          <SelectGender
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div>
          <label className="text-black">Xユーザー名（@から入力）：</label>
          <input
            type="text"
            value={snsUrl}
            onChange={(e) => setSnsUrl(e.target.value)}
            placeholder="@example"
            className="border border-gray-300 p-2 w-full rounded text-black"
          />
        </div>
        <div>
          <label className="text-black">プレイリストURL：</label>
          <input
            type="url"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            placeholder="共有したいプレイリストのURL"
            className="border border-gray-300 p-2 w-full rounded text-black"
          />
        </div>
        <div>
          <label className="text-black">場所：</label>
          <SelectLocation
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label className="text-black">自己紹介：</label>
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded text-black"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            履歴書作成
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumesCreate;
