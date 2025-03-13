import { useState } from "react";
import EditProfile from "../components/auth/EditProfile";
import { useAuth } from "../hooks/AuthContext";
import '../css/modal.css';

const Mypage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);  // 編集フォームの表示を切り替え
  };

  return (
    <div>
      <h2>マイページ</h2>
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
              <p>名前: {user.name}</p>
              <p>メールアドレス: {user.email}</p>
              <button onClick={toggleEdit}>プロフィール編集</button>
            </div>
          )}
        </div>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
};

export default Mypage;