import React, { useState, useEffect } from 'react';
import { fetchLikeStatus, likeResume, unlikeResume } from '../../services/apiLikes';
import { MdFavorite, MdFavoriteBorder  } from "react-icons/md";

const ResumeLikeButton = ({ resumeId }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // 初回レンダリング時に現在のいいね状態を取得
    const getLikeStatus = async () => {
      const status = await fetchLikeStatus(resumeId);
      setLiked(status);  //statusにはresponse.data.likedが格納（true/false）
    };

    getLikeStatus();
  }, [resumeId]);

  const handleClick = async () => {
    if (liked) {  //likedには初期レンダリング時の状態(true/false）
      const newStatus = await unlikeResume(resumeId);
      setLiked(newStatus);  //newStatusにはresponse.data.likedが格納（true/false）
    } else {
      const newStatus = await likeResume(resumeId);
      setLiked(newStatus);
    }
  };

  return (
    <button onClick={handleClick}>
      {liked ? <MdFavorite /> : <MdFavoriteBorder /> }
    </button>
  );
};

export default ResumeLikeButton;
