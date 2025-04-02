import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from "../../services/apiClient";

const SetlistForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = location.state || {}; 
  const [songs, setSongs] = useState(
    Array(5)
      .fill(null)
      .map((_, index) => ({ title: "", order: index + 1 })) // 順番を1, 2, 3, 4, 5に設定
  );
  const [encoreSongs, setEncoreSongs] = useState([]); // アンコール用の曲の状態管理

  const handleSongChange = (index, e) => {
    const newSongs = [...songs];
    newSongs[index][e.target.name] = e.target.value;
    setSongs(newSongs);
  };

  const handleEncoreChange = (index, e) => {
    const newEncoreSongs = [...encoreSongs];
    newEncoreSongs[index][e.target.name] = e.target.value;
    setEncoreSongs(newEncoreSongs);
  };

  const addSong = () => {
    setSongs([...songs, { title: "", order: songs.length + 1 }]);
  };

  const addEncoreSong = () => {
    setEncoreSongs([...encoreSongs, { title: "", order: encoreSongs.length + 1 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 空でない曲のみ送信
      for (const song of songs) {
        if (song.title.trim() !== "") {
          await apiClient.post(`/events/${eventId}/setlists`, {
            setlist: { title: song.title, order: song.order },
          });
        }
      }
  
      // 空でないアンコール曲のみ送信
      for (const encoreSong of encoreSongs) {
        if (encoreSong.title.trim() !== "") {
          await apiClient.post(`/events/${eventId}/setlists`, {
            setlist: { title: encoreSong.title, order: `En-${encoreSong.order}` },
          });
        }
      }
  
      // フォームのリセット
      setSongs(Array(5).fill(null).map((_, index) => ({ title: "", order: index + 1 }))); 
      setEncoreSongs([]);
    } catch (error) {
      console.error("Error posting setlists:", error);
    }
    navigate(`/events/${eventId}`);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      {/* 曲の入力フォーム */}
      <h1>本番曲</h1>
      {songs.map((song, index) => (
        <div key={index}>
          <label>曲名</label>
          <input
            type="text"
            name="title"
            value={song.title}
            onChange={(e) => handleSongChange(index, e)}
          />
        </div>
      ))}
      <button type="button" onClick={addSong}>
        曲を追加
      </button>

      {/* アンコール曲の入力フォーム */}
      <div>
        <h1>アンコール曲</h1>
        {encoreSongs.map((encoreSong, index) => (
          <div key={index}>
            <div>
              <label>アンコール曲名</label>
              <input
                type="text"
                name="title"
                value={encoreSong.title}
                onChange={(e) => handleEncoreChange(index, e)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addEncoreSong}>
          アンコール曲を追加
        </button>
      </div>

      <button type="submit">セットリスト投稿</button>
    </form>
  );
};

export default SetlistForm;
