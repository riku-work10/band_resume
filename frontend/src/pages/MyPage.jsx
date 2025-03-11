import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Mypage = () => {
  const [user, setUser] = useState(null);
  const API_URL = `${process.env.REACT_APP_API_URL}/api/${process.env.REACT_APP_API_VERSION}`;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/validate_token`, {
          headers: {
            "access-token": localStorage.getItem("access-token"),
            client: localStorage.getItem("client"),
            uid: localStorage.getItem("uid"),
          },
        });
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h2>My Page</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
};

export default Mypage;

