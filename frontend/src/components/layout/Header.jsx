import React from "react";
import LoginHeader from "./LoginHeader";
import NotLoginHeader from "./NotLoginHeader";
import { useAuth } from '../../hooks/AuthContext';

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="bg-stone-600 text-white py-4 shadow-md">
      { user ? <LoginHeader /> : <NotLoginHeader />}
    </div>
  )
};

export default Header;