function ResumeShareButton({ resumeId, title, introduction }) {
  const baseUrl = process.env.REACT_APP_API_URL;
  const shareUrl = `${baseUrl}/ogp/resumes/${resumeId}`;
  const tweetText = `${introduction}\n#ハルカミライ履歴書 #ハルカミライ`;

  const handleShare = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Xで共有
    </button>
  );
}

export default ResumeShareButton;
