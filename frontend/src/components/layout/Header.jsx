import React from "react";
import LoginHeader from "./LoginHeader";
import NotLoginHeader from "./NotLoginHeader";
import { useAuth } from '../../hooks/AuthContext';

const Header = () => {
  const { user } = useAuth();
  return (
    <div>
      { user ? <LoginHeader /> : <NotLoginHeader />}
    </div>
  )
};
    

export default Header;