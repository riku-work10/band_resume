import { useState, useEffect, useRef } from 'react';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../hooks/AuthContext';
import { useS3Upload } from '../../hooks/useS3Upload';

function EditProfile({ setIsEditing }) {
  const modalRef = useRef(null);

  const defaultProfileImage =
    'https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/%E3%83%9E%E3%82%A4%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88.png';
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [error, setError] = useState('');

  const { profileImage, selectedFile, setSelectedFile, isUploading, uploadImage, deleteImage } =
    useS3Upload(user.id, 'profile', user.image || '');

  // 外側クリックでモーダルを閉じる
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [setIsEditing]);

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
    const updatedUser = { name, email, image: profileImage };

    try {
      const res = await apiClient.put(`/users/${user.id}`, { user: updatedUser });
      setUser(res.data);
      alert('プロフィールが更新されました');
      setIsEditing(false);
    } catch (err) {
      setError('更新に失敗しました');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div
        ref={modalRef}
        className="bg-stone-800 text-white dark:bg-stone-800 w-full max-w-md sm:max-w-md rounded-xl shadow-lg overflow-y-auto max-h-[calc(100vh-30px)]"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-center">プロフィール編集</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* 画像 */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={profileImage || defaultProfileImage}
              alt="profile"
              className="w-32 h-32 object-cover rounded-full mb-3 border-2 border-stone-600"
            />
            {/* 名前 */}
            <div className="mb-4 w-full">
              <label className="block mb-1 font-semibold">名前:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-stone-600 bg-stone-900 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {profileImage && (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                画像削除
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            {/* アップロード部分: モバイルでは縦並び */}
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-stone-500 rounded px-2 py-1 bg-stone-900 text-white w-full sm:w-auto"
                style={{ minWidth: 0 }}
              />
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={isUploading || !selectedFile}
                className={`w-full sm:w-auto px-4 py-2 rounded text-white ${
                  isUploading || !selectedFile
                    ? 'bg-stone-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                style={{ minWidth: '120px' }}
              >
                {isUploading ? 'アップロード中...' : 'アップロード'}
              </button>
            </div>

            {/* 更新ボタン */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition-colors"
            >
              更新
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
