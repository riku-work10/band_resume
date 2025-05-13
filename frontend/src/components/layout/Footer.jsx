import React from "react";
import LoginFooter from "./LoginFooter";
import { useAuth } from '../../hooks/AuthContext';

const Footer = () => {
  const { user } = useAuth();

  // ログインしていない場合は何も表示しない
  if (!user) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-stone-600 text-white shadow-md z-50">
      <LoginFooter />
    </div>
  );
};

export default Footer;