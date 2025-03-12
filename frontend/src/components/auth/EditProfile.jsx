import { useState } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../hooks/AuthContext";

const EditProfile = ({ setIsEditing }) => {
  const { user, setUser } = useAuth();  // `setUser`をコンテキストから取得
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      email,
    };

    try {
      const res = await apiClient.put(`/users/${user.id}`, { user: updatedUser });
      setUser(res.data); // ユーザー情報を更新
      alert("プロフィールが更新されました");
      setIsEditing(false); // 更新後にフォームを非表示にする
    } catch (err) {
      setError("更新に失敗しました");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>プロフィール編集</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default EditProfile;