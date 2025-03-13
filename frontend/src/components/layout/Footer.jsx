import React from "react";
import LoginFooter from "./LoginFooter";
import NotLoginFooter from "./NotLoginFooter";
import { useAuth } from '../../hooks/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-stone-600 text-white shadow-md z-50 ">
      { user ? <LoginFooter /> : <NotLoginFooter />}
    </div>
  )
};
    

export default Footer;