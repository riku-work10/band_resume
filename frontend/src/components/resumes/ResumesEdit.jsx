import React, { useState, useEffect } from "react";
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
  } = useS3Upload(user.id, resume?.profile_image || "");

  const [title, setTitle] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [snsUrl, setSnsUrl] = useState("");
  const [location, setLocation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [error, setError] = useState(null);

  // resumeが変わったらフォーム初期化（画像はuseS3Uploadの初期値でセットされるためプレビューにセット）
  useEffect(() => {
    if (resume) {
      setTitle(resume.title);
      setPreviewUrl(resume.profile_image || "");
      setAge(resume.age || "");
      setGender(resume.gender || "");
      setSnsUrl(resume.sns_url || "");
      setLocation(resume.location || "");
      setIntroduction(resume.introduction || "");
    }
  }, [resume]);

  // selectedFileが変わったらプレビュー更新
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
        title,
        profile_image: profileImage,
        age,
        gender,
        sns_url: snsUrl,
        location,
        introduction,
      };
      const updatedResume = await putResume(resume.id, updatedResumeData);
      onUpdate(updatedResume);
      onClose();
    } catch {
      setError("履歴書の更新に失敗しました");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-black">履歴書の編集</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-black">タイトル：</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label className="text-black">プロフィール画像：</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-2"
            />
            <button
              type="button"
              onClick={uploadImage}
              disabled={isUploading || !selectedFile}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              {isUploading ? "アップロード中..." : "画像アップロード"}
            </button>

            <div className="mt-2 flex items-center gap-2">
              <img
                src={previewUrl || "https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg"}
                alt="プロフィール画像プレビュー"
                className="h-20 rounded object-cover"
              />
              {previewUrl && (
                <button
                  type="button"
                  onClick={deleteImage}
                  disabled={!profileImage}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  画像削除
                </button>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-black">年齢：</label>
            <SelectAge value={age} onChange={(e) => setAge(e.target.value)} />
          </div>

          <div className="mb-4">
            <label className="text-black">性別：</label>
            <SelectGender
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="text-black">SNSリンク：</label>
            <input
              type="text"
              value={snsUrl}
              onChange={(e) => setSnsUrl(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label className="text-black">場所：</label>
            <SelectLocation
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="text-black">自己紹介：</label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
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
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              更新する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeEdit;
