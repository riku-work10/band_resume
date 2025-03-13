import React from "react";
import LoginFooter from "./LoginFooter";
import NotLoginFooter from "./NotLoginFooter";
import { useAuth } from '../../hooks/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  return (
    <div>
      { user ? <LoginFooter /> : <NotLoginFooter />}
    </div>
  )
};
    

export default Footer;