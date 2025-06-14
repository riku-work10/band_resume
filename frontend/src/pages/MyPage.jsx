import { useState } from 'react';
import EditProfile from '../components/auth/EditProfile';
import { useAuth } from '../hooks/AuthContext';
import '../css/modal.css';
import ResumeLikes from '../components/likes/ResumeLikes';
import EventLikes from '../components/likes/EventLikes';
import { MdEdit } from 'react-icons/md';

function Mypage() {
  const defaultProfileImage =
    'https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/%E3%83%9E%E3%82%A4%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88.png';
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-black text-white">
      {user ? (
        <div className="max-w-screen-xl mx-auto">
          {/* プロフィール編集モーダル */}
          {isEditing && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setIsEditing(false)}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-black"
                onClick={(e) => e.stopPropagation()}
              >
                <span
                  className="absolute top-2 right-2 text-xl cursor-pointer"
                  onClick={() => setIsEditing(false)}
                />
                <EditProfile setIsEditing={setIsEditing} />
              </div>
            </div>
          )}

          {/* プロフィール表示 */}
          {!isEditing && (
            <>
              <img
                src={user.image || defaultProfileImage}
                alt={user.name}
                className="mx-auto rounded-full w-40 h-40 object-cover mb-4"
              />
              <div className="flex items-center justify-center gap-4 mb-10">
                <p className="text-xl font-semibold">{user.name}</p>
                <button
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={toggleEdit}
                >
                  <MdEdit size={20} />
                </button>
              </div>
            </>
          )}

          {/* いいねセクション */}
          <div className="space-y-12">
            <ResumeLikes />
            <EventLikes />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p>ログインしてください</p>
        </div>
      )}
    </div>
  );
}

export default Mypage;
