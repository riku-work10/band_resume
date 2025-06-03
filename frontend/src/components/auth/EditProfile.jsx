import { useState } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../hooks/AuthContext";
import { useS3Upload } from "../../hooks/useS3Upload";

const EditProfile = ({ setIsEditing }) => {
  const defaultProfileImage = "https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/%E3%83%9E%E3%82%A4%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88.png";
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [error, setError] = useState("");

  const {
    profileImage,
    selectedFile,
    setSelectedFile,
    isUploading,
    uploadImage,
    deleteImage,
  } = useS3Upload(user.id, "profile", user.image || "");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleUploadClick = () => {
    uploadImage().catch(() => {});
  };

  const handleDeleteClick = () => {
    deleteImage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      email,
      image: profileImage,
    };

    try {
      const res = await apiClient.put(`/users/${user.id}`, { user: updatedUser });
      setUser(res.data);
      alert("プロフィールが更新されました");
      setIsEditing(false);
    } catch (err) {
      setError("更新に失敗しました");
      console.error(err);
    }
  };

  return (
    <div className="text-black max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">プロフィール編集</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* 画像プレビューと削除ボタン */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={profileImage || defaultProfileImage}
          alt="profile"
          className="w-32 h-32 object-cover rounded mb-3"
        />
        {profileImage && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            画像削除
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* ファイル選択＆アップロード */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 rounded px-2 py-1 flex-shrink"
            style={{ minWidth: 0 }} // flexboxで縮まるように安全対策
          />
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={isUploading || !selectedFile}
            className={`px-4 py-2 rounded text-white ${
              isUploading || !selectedFile
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-700"
            }`}
            style={{ minWidth: "120px" }} // ボタン幅を固定か最小値に設定
          >
            {isUploading ? "アップロード中..." : "アップロード"}
          </button>
        </div>

        {/* 名前入力 */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">名前:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* メール入力 */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">メールアドレス:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded font-semibold transition-colors"
        >
          更新
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
