import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { ALBUM_SONGS } from "../selectlists/songData";

const Accordion = ({ albums, openAlbums, toggleAlbum, onSelectSong }) => (
  <div className="space-y-3 overflow-y-auto max-h-[95vh] pr-2">
    {albums.map(([album, tracks]) => (
      <div key={album} className="border rounded-md bg-stone-700 shadow-sm">
        <button
          type="button"
          className="w-full text-left p-3 font-semibold bg-stone-600 hover:bg-stone-500 text-stone-100 flex justify-between items-center"
          onClick={() => toggleAlbum(album)}
        >
          {album}
          <span className="select-none">{openAlbums.has(album) ? "−" : "+"}</span>
        </button>
        {openAlbums.has(album) && (
          <ul className="bg-stone-800 max-h-96 overflow-y-auto border-t border-stone-500">
            {tracks.map(({ id, title }) => (
              <li
                key={id}
                onClick={() => onSelectSong(title)}
                className="cursor-pointer px-4 py-2 hover:bg-orange-500 text-stone-100"
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

const SongInput = ({ song, onChange, inputRef, onDelete, onFocus }) => (
  <div className="mb-4 flex items-center space-x-2">
    <input
      ref={inputRef}
      type="text"
      name="title"
      value={song.title}
      onChange={onChange}
      onFocus={onFocus}
      placeholder="曲名を入力、または右のリストから選択"
      className="flex-grow p-2 rounded-md border border-stone-600 bg-stone-900 text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
    <button
      type="button"
      onClick={onDelete}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm select-none"
      aria-label="曲名をクリア"
    >
      ✕
    </button>
  </div>
);

const SetlistEditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  const initialSongs = event.setlists
  .filter((s) => !String(s.order).startsWith("En-"))
  .sort((a, b) => Number(a.order) - Number(b.order));

const initialEncoreSongs = event.setlists
  .filter((s) => String(s.order).startsWith("En-"))
  .sort((a, b) => {
    const getNum = (order) => parseInt(order.replace("En-", ""), 10);
    return getNum(a.order) - getNum(b.order);
  });

  const [songs, setSongs] = useState(initialSongs);
  const [encoreSongs, setEncoreSongs] = useState(initialEncoreSongs);
  const [openAlbums, setOpenAlbums] = useState(new Set());
  const [focusedField, setFocusedField] = useState({ type: "main", index: 0 });

  const songInputRefs = useRef([]);
  const encoreInputRefs = useRef([]);

  const toggleAlbum = (album) => {
    setOpenAlbums((prev) => {
      const newSet = new Set(prev);
      newSet.has(album) ? newSet.delete(album) : newSet.add(album);
      return newSet;
    });
  };

  const handleSongChange = (index, e) => {
    const updated = [...songs];
    updated[index][e.target.name] = e.target.value;
    setSongs(updated);
  };

  const handleEncoreChange = (index, e) => {
    const updated = [...encoreSongs];
    updated[index][e.target.name] = e.target.value;
    setEncoreSongs(updated);
  };

  const addSong = () => {
    setSongs((prev) => [...prev, { title: "", order: prev.length + 1 }]);
  };

  const addEncoreSong = () => {
    setEncoreSongs((prev) => [...prev, { title: "", order: `En-${prev.length + 1}` }]);
  };

  const onSelectSong = (title) => {
    const isMain = focusedField.type === "main";
    const currentState = isMain ? songs : encoreSongs;
    const setCurrentState = isMain ? setSongs : setEncoreSongs;
    const refs = isMain ? songInputRefs : encoreInputRefs;
    const addFunc = isMain ? addSong : addEncoreSong;

    setCurrentState((prev) => {
      const updated = [...prev];
      if (updated[focusedField.index]) {
        updated[focusedField.index].title = title;
      } else {
        updated.push({ title, order: updated.length + 1 });
      }

      if (!updated.some((s) => s.title === "")) {
        addFunc();
      }

      return updated;
    });

    const nextIndex = focusedField.index + 1;
    setTimeout(() => {
      refs.current[nextIndex]?.focus();
      setFocusedField({ type: focusedField.type, index: nextIndex });
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        const updatedOrder = i + 1;
        if (song.id) {
          await apiClient.put(`/events/${event.id}/setlists/${song.id}`, {
            setlist: { title: song.title, order: updatedOrder },
          });
        } else if (song.title.trim()) {
          await apiClient.post(`/events/${event.id}/setlists`, {
            setlist: { title: song.title, order: updatedOrder },
          });
        }
      }
      for (let i = 0; i < encoreSongs.length; i++) {
        const encoreSong = encoreSongs[i];
        const updatedOrder = `En-${i + 1}`;
        if (encoreSong.id) {
          await apiClient.put(`/events/${event.id}/setlists/${encoreSong.id}`, {
            setlist: { title: encoreSong.title, order: updatedOrder },
          });
        } else if (encoreSong.title.trim()) {
          await apiClient.post(`/events/${event.id}/setlists`, {
            setlist: { title: encoreSong.title, order: updatedOrder },
          });
        }
      }
      navigate(`/events/${event.id}`);
    } catch (error) {
      console.error("Error updating setlists:", error);
    }
  };

  const clearSongTitleAtIndex = (type, index) => {
  const setState = type === "main" ? setSongs : setEncoreSongs;
  const refs = type === "main" ? songInputRefs : encoreInputRefs;

  setState((prev) => {
    const updated = [...prev];
    updated[index].title = "";
    return updated;
  });

  setTimeout(() => {
    refs.current[index]?.focus();
    setFocusedField({ type, index });
  }, 50);
};


  const albums = Object.entries(ALBUM_SONGS);

  return (
    <div>
      <header className="flex justify-between items-center my-6 max-w-6xl mx-auto">
  <h1 className="text-4xl font-bold text-stone-100">セットリスト編集</h1>
  <div className="flex gap-3">
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="bg-stone-600 hover:bg-stone-500 text-white px-4 py-2 rounded-md"
    >
      戻る
    </button>
    <button
      type="button"
      onClick={handleSubmit}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold"
    >
      セットリスト更新
    </button>
  </div>
</header>
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[80vh] bg-stone-800 rounded-lg shadow-lg text-stone-100"
    >

      <section>
        <h2 className="text-3xl font-bold border-b border-stone-700 pb-2 mb-4">本番曲</h2>
        {songs.map((song, i) => (
          <SongInput
            key={song.id || `main-${i}`}
            song={song}
            onChange={(e) => handleSongChange(i, e)}
            inputRef={(el) => (songInputRefs.current[i] = el)}
            onDelete={() => clearSongTitleAtIndex("main", i)}
            onFocus={() => setFocusedField({ type: "main", index: i })}
          />
        ))}
        <button
          type="button"
          onClick={addSong}
          className="mb-8 bg-orange-600 hover:bg-orange-700 rounded-md px-5 py-2 transition"
        >
          曲を追加
        </button>

        <h2 className="text-3xl font-bold border-b border-stone-700 pb-2 mb-4">アンコール曲</h2>
        {encoreSongs.map((song, i) => (
          <SongInput
            key={song.id || `encore-${i}`}
            song={song}
            onChange={(e) => handleEncoreChange(i, e)}
            inputRef={(el) => (encoreInputRefs.current[i] = el)}
            onDelete={() => clearSongTitleAtIndex("encore", i)}
            onFocus={() => setFocusedField({ type: "encore", index: i })}
          />
        ))}
        <button
          type="button"
          onClick={addEncoreSong}
          className="mb-10 bg-orange-600 hover:bg-orange-700 rounded-md px-5 py-2 transition"
        >
          アンコール曲を追加
        </button>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-md py-3 text-white font-semibold transition"
        >
          セットリスト更新
        </button>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 border-b border-stone-700 pb-2">楽曲リスト</h2>
        <Accordion
          albums={albums}
          openAlbums={openAlbums}
          toggleAlbum={toggleAlbum}
          onSelectSong={onSelectSong}
        />
        <p className="mt-4 text-sm text-stone-400">
          ※ 曲名をクリックすると、左の選択中の入力欄に反映され、次の欄に移動します。
        </p>
      </section>
    </form>
    </div>
  );
};

export default SetlistEditForm;
