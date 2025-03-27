import React, { useState, useEffect } from 'react';
import { MdFavorite, MdFavoriteBorder  } from "react-icons/md";
import { fetchLikeStatusEvent, likeEvent, unlikeEvent } from '../../services/apiLikes';

const EventLikeButton = ({ eventId }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // 初回レンダリング時に現在のいいね状態を取得
    const getLikeStatus = async () => {
      const status = await fetchLikeStatusEvent(eventId);
      setLiked(status);  //statusにはresponse.data.likedが格納（true/false）
    };

    getLikeStatus();
  }, [eventId]);

  const handleClick = async () => {
    if (liked) {  //likedには初期レンダリング時の状態(true/false）
      const newStatus = await unlikeEvent(eventId);
      setLiked(newStatus);  //newStatusにはresponse.data.likedが格納（true/false）
    } else {
      const newStatus = await likeEvent(eventId);
      setLiked(newStatus);
    }
  };

  return (
    <button onClick={handleClick}>
      {liked ? <MdFavorite /> : <MdFavoriteBorder /> }
    </button>
  );
};

export default EventLikeButton;
