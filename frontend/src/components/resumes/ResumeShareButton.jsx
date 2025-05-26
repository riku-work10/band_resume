import React from 'react';

const ResumeShareButton = ({ resumeId }) => {
  const baseUrl = process.env.REACT_APP_VERCEL_URL || window.location.origin;
  const shareUrl = `${baseUrl}/resumes/${resumeId}`; // ← ogp用URL から 実ページに変更！

  const handleShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=私の履歴書です！`,
      '_blank'
    );
  };

  return (
    <button
      onClick={handleShare}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      X（旧Twitter）で共有
    </button>
  );
};

export default ResumeShareButton;