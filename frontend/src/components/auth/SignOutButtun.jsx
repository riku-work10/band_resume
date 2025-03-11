import axios from "axios";

const SignOutButtun = () => {
  const API_URL = `${process.env.REACT_APP_API_URL}/api/${process.env.REACT_APP_API_VERSION}`;
  const handleLogout = async () => {
    try {
      await axios.delete(`${API_URL}/auth/sign_out`, {
        headers: {
          "access-token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          uid: localStorage.getItem("uid"),
        },
      });
      localStorage.clear();
      alert("ログアウトしました");
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default SignOutButtun;

