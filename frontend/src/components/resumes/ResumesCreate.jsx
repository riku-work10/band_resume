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
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      setIsUploading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/${process.env.REACT_APP_API_VERSION}/s3/presigned_url?user_id=${user.id}&filename=${selectedFile.name}&content_type=${selectedFile.type}`
      );
      const { url, file_url } = await res.json();

      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });
      if (!uploadRes.ok) throw new Error("S3アップロードに失敗しました");

      setProfileImage(file_url); // DB保存用
      setSelectedFile(null); // アップロードしたらファイル選択をクリア
      alert("画像アップロード成功！");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // S3オブジェクト削除関数
  const deleteS3Object = async (objectKey) => {
    const url = new URL(
      `${process.env.REACT_APP_API_URL}/api/${process.env.REACT_APP_API_VERSION}/s3/delete_object`
    );
    url.searchParams.append("object_key", objectKey);

    const res = await fetch(url.toString(), {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "画像削除に失敗しました");
    }

    return true;
  };

  // 画像削除ハンドラー
  const handleDeleteImage = async () => {
    if (!profileImage) return;

    const bucketUrl = `https://${process.env.REACT_APP_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/`;
    const objectKey = profileImage.startsWith(bucketUrl)
      ? profileImage.substring(bucketUrl.length)
      : null;

    if (!objectKey) {
      alert("画像のキーが取得できません");
      return;
    }

    if (!window.confirm("画像を削除しますか？")) return;

    try {
      await deleteS3Object(objectKey);
      setProfileImage("");
      setSelectedFile(null);
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
            onClick={handleUpload}
            disabled={isUploading || !selectedFile}
            className="bg-green-500 text-white px-3 py-1 rounded ml-2"
          >
            {isUploading ? "アップロード中..." : "アップロード"}
          </button>

          {profileImage && (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={profileImage}
                alt="アップロード済み画像"
                className="h-20 rounded object-cover"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                削除
              </button>
            </div>
          )}
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
          <label className="text-black">SNSリンク：</label>
          <input
            type="text"
            value={snsUrl}
            onChange={(e) => setSnsUrl(e.target.value)}
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
