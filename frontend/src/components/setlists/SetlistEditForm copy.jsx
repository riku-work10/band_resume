import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

const SetlistEditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  // 本番曲とアンコール曲を分けて管理
  const initialSongs = event.setlists.filter((s) => !String(s.order).startsWith("En-"));
  const initialEncoreSongs = event.setlists.filter((s) => String(s.order).startsWith("En-"));

  const [songs, setSongs] = useState(initialSongs);
  const [encoreSongs, setEncoreSongs] = useState(initialEncoreSongs);

  // 本番曲の変更処理
  const handleSongChange = (index, e) => {
    const updatedSongs = [...songs];
    updatedSongs[index][e.target.name] = e.target.value;
    setSongs(updatedSongs);
  };

  // アンコール曲の変更処理
  const handleEncoreChange = (index, e) => {
    const updatedEncoreSongs = [...encoreSongs];
    updatedEncoreSongs[index][e.target.name] = e.target.value;
    setEncoreSongs(updatedEncoreSongs);
  };

  // 本番曲の追加
  const addSong = () => {
    setSongs([...songs, { title: "", order: songs.length + 1 }]);
  };

  // アンコール曲の追加
  const addEncoreSong = () => {
    setEncoreSongs([...encoreSongs, { title: "", order: `En-${encoreSongs.length + 1}` }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 本番曲の更新（タイトルが空なら削除扱い）
      for (const song of songs) {
        if (song.id) {
          await apiClient.put(`/events/${event.id}/setlists/${song.id}`, {
            setlist: { title: song.title, order: song.order },
          });
        } else if (song.title.trim() !== "") {
          await apiClient.post(`/events/${event.id}/setlists`, {
            setlist: { title: song.title, order: song.order },
          });
        }
      }
  
      // アンコール曲の更新（タイトルが空なら削除扱い）
      for (const encoreSong of encoreSongs) {
        const formattedOrder = String(encoreSong.order).startsWith("En-")
          ? encoreSong.order
          : `En-${encoreSong.order}`;

        if (encoreSong.id) {
          await apiClient.put(`/events/${event.id}/setlists/${encoreSong.id}`, {
            setlist: { title: encoreSong.title, order: formattedOrder },
          });
        } else if (encoreSong.title.trim() !== "") {
          await apiClient.post(`/events/${event.id}/setlists`, {
            setlist: { title: encoreSong.title, order: formattedOrder },
          });
        }
      }
  
      // 更新後のイベントページにリダイレクト
      navigate(`/events/${event.id}`);
    } catch (error) {
      console.error("Error updating setlists:", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h1>セットリスト編集</h1>

      {/* 本番曲の入力フォーム */}
      <h2>本番曲</h2>
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
      <button type="button" onClick={addSong}>本番曲を追加</button>

      {/* アンコール曲の入力フォーム */}
      <h2>アンコール曲</h2>
      {encoreSongs.map((encoreSong, index) => (
        <div key={index}>
          <label>アンコール曲名</label>
          <input
            type="text"
            name="title"
            value={encoreSong.title}
            onChange={(e) => handleEncoreChange(index, e)}
          />
        </div>
      ))}
      <button type="button" onClick={addEncoreSong}>アンコール曲を追加</button>

      <button type="submit">セットリスト更新</button>
    </form>
  );
};

export default SetlistEditForm;
