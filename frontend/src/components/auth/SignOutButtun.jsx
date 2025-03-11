import axios from "axios";

const SignOutButtun = () => {
  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:3000/api/v1/auth/sign_out", {
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

