const ResumeShareButton = ({ resumeId }) => {
  // 共有URL：Render上のRailsでOGP付きHTMLを返すエンドポイント
  const shareUrl = `https://band-resume.onrender.com/ogp/resumes/${resumeId}`;

  const handleShare = () => {
    // X（旧Twitter）のシェア用URLにリダイレクト
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=私の履歴書です！%20#ハルカミライ履歴書`,
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
