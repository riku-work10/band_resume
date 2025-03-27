import { useState } from "react";
import EditProfile from "../components/auth/EditProfile";
import { useAuth } from "../hooks/AuthContext";
import '../css/modal.css';
import ResumeLikes from "../components/likes/ResumeLikes";
import { MdEdit } from "react-icons/md";
import EventLikes from "../components/likes/EventLikes";

const Mypage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);  // 編集フォームの表示を切り替え
  };

  return (
    <div>
      {user ? (
        <div>
          {/* 編集モード isEditing=trueの場合モーダルを表示する*/}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setIsEditing(false)}>
              <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
                <span className="absolute top-2 right-2 text-xl cursor-pointer" onClick={() => setIsEditing(false)}>
                  ×
                </span>
                <EditProfile setIsEditing={setIsEditing} />
              </div>
            </div>
          )}

          {!isEditing && (
            <div>
              {user.image && <img src={user.image} alt={user.name} style={{ width: '200px', height: 'auto' }} />}
              <p>{user.name}</p>
              <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                onClick={toggleEdit}>
                <MdEdit />
              </button>
            </div>
          )}
          <ResumeLikes />
          <EventLikes />
        </div>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
};

export default Mypage;