import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../../hooks/AuthContext";
import { putResume } from "../../services/apiResumes";
import SelectAge from "../selectlists/SelectAge";
import SelectGender from "../selectlists/SelectGender";
import SelectLocation from "../selectlists/SelectLocation";
import { useS3Upload } from "../../hooks/useS3Upload";

const ResumeEdit = ({ resume, onClose, onUpdate }) => {
  const { user } = useAuth();

  const {
    profileImage,
    selectedFile,
    setSelectedFile,
    isUploading,
    uploadImage,
    deleteImage,
  } = useS3Upload(user.id, "resumes", resume?.profile_image || "");

  const [previewUrl, setPreviewUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [snsUrl, setSnsUrl] = useState("");
  const [location, setLocation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resume) {
      setPreviewUrl(resume.profile_image || "");
      setAge(resume.age || "");
      setGender(resume.gender || "");
      setSnsUrl(resume.sns_url || "");
      setLocation(resume.location || "");
      setIntroduction(resume.introduction || "");
      setPlaylistUrl(resume.playlist_url || "");
    }
  }, [resume]);

  useEffect(() => {
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else if (profileImage) {
      setPreviewUrl(profileImage);
    } else {
      setPreviewUrl("");
    }
  }, [selectedFile, profileImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedResumeData = {
        user_id: user.id,
        profile_image: profileImage,
        age,
        gender,
        sns_url: snsUrl,
        location,
        introduction,
        playlist_url: playlistUrl,
      };
      const updatedResume = await putResume(resume.id, updatedResumeData);
      onUpdate(updatedResume);
      onClose();
    } catch {
      setError("履歴書の更新に失敗しました");
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-stone-800 text-white max-h-[calc(100vh-30px)] overflow-y-auto w-full max-w-xl mx-4 rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{user.name}の履歴書編集</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1">プロフィール画像：</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-2 w-full text-white"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={uploadImage}
                disabled={isUploading || !selectedFile}
                className={`px-4 py-2 rounded ${
                  isUploading || !selectedFile
                    ? "bg-stone-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isUploading ? "アップロード中..." : "アップロード"}
              </button>
              {profileImage && (
                <button
                  type="button"
                  onClick={deleteImage}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  削除
                </button>
              )}
            </div>
            <img
              src={
                previewUrl ||
                "https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg"
              }
              alt="アップロード済み画像"
              className="mt-2 h-24 w-24 object-cover rounded"
            />
          </div>

          <div>
            <label className="block mb-1">年齢：</label>
            <SelectAge value={age} onChange={(e) => setAge(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1">性別：</label>
            <SelectGender value={gender} onChange={(e) => setGender(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1">場所：</label>
            <SelectLocation value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1">Xユーザー名（@から入力）：</label>
            <input
              type="text"
              value={snsUrl}
              onChange={(e) => setSnsUrl(e.target.value)}
              placeholder="@example"
              className="w-full p-2 rounded bg-stone-700 text-white border border-stone-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">プレイリストURL：</label>
            <input
              type="url"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              placeholder="共有したいプレイリストのURL"
              className="w-full p-2 rounded bg-stone-700 text-white border border-stone-600 focus:outline-none"
            />
          </div>


          <div>
            <label className="block mb-1">自己紹介：</label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="w-full p-2 rounded bg-stone-700 text-white border border-stone-600 focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-stone-600 hover:bg-stone-700 text-white px-4 py-2 rounded"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              更新する
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ResumeEdit;
