import { MdShare } from 'react-icons/md';

function ResumeShareButton({ resumeId, introduction }) {
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
      className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-center"
    >
      <MdShare size={20} />
    </button>
  );
}

export default ResumeShareButton;
