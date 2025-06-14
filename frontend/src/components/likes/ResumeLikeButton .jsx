import React, { useState, useEffect } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { fetchLikeStatus, likeResume, unlikeResume } from '../../services/apiLikes';

function ResumeLikeButton({ resumeId, textColor = 'text-black' }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const getLikeStatus = async () => {
      const data = await fetchLikeStatus(resumeId);
      setLiked(data.liked);
      setLikesCount(data.likes_count);
    };
    getLikeStatus();
  }, [resumeId]);

  const handleClick = async () => {
    if (liked) {
      const data = await unlikeResume(resumeId);
      setLiked(data.liked);
      setLikesCount(data.likes_count);
    } else {
      const data = await likeResume(resumeId);
      setLiked(data.liked);
      setLikesCount(data.likes_count);
    }
  };

  return (
    <button onClick={handleClick} className="flex items-center space-x-1">
      {liked ? (
        <MdFavorite className="text-red-500 text-2xl" />
      ) : (
        <MdFavoriteBorder className="text-gray-500 text-2xl" />
      )}
      {likesCount > 0 && <span className={textColor}>{likesCount}</span>}
    </button>
  );
}

export default ResumeLikeButton;
