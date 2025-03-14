import React from "react";
import { Link } from "react-router-dom";

const MyResumePage = () => {
  return (
    <div>
      <h1>MyResumePageです</h1>
      <p>今から実装します</p>
      <Link to="/resumes/create" >履歴書作成</Link>
    </div>
  )
};
    

export default MyResumePage;