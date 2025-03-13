import React from "react";
import LoginHeader from "./LoginHeader";
import NotLoginHeader from "./NotLoginHeader";
import { useAuth } from '../../hooks/AuthContext';

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-stone-600 text-white flex items-center justify-center shadow-md z-50">
      { user ? <LoginHeader /> : <NotLoginHeader />}
    </div>
  )
};

export default Header;