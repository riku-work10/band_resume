import { useState } from "react";
import EditProfile from "../components/auth/EditProfile";
import { useAuth } from "../hooks/AuthContext";

const Mypage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);  // 編集フォームの表示を切り替え
  };



  return (
    <div>
      <h2>My Page</h2>
      {user ? (
        <div>
          {isEditing ? (
            <EditProfile setIsEditing={setIsEditing}/>
          ) : (
            <div>
              {user.image && <img src={user.image} alt={user.name}  style={{ width: '200px', height: 'auto' }}/>}
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
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