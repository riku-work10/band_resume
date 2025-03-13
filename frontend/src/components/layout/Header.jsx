import React from "react";
import LoginHeader from "./LoginHeader";
import NotLoginHeader from "./NotLoginHeader";
import { useAuth } from '../../hooks/AuthContext';
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="bg-stone-600 text-white py-4 shadow-md">
      { user ? <LoginHeader /> : <NotLoginHeader />}
    </div>
  )
};

export default Header;