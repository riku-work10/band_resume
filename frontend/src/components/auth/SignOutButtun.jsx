import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

const SignOutButtun = () => {
  const { signout } = useAuth(); // `logout` 関数を `useAuth` から取得
  const navigate = useNavigate();
  
  const handleLogout = () => {
    signout(); // ローカルストレージからトークン削除
    alert("ログアウトしました");
    navigate("/"); // トップページに遷移
  };

  return <button onClick={handleLogout}>ログアウト</button>;
};

export default SignOutButtun;

