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

const SetlistForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = location.state || {};

  const [songs, setSongs] = useState(
    Array(5).fill(null).map((_, index) => ({ title: "", order: index + 1 }))
  );
  const [encoreSongs, setEncoreSongs] = useState([]);

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
    const newSongs = [...songs];
    newSongs[index].title = e.target.value;
    setSongs(newSongs);
  };

  const handleEncoreChange = (index, e) => {
    const newEncoreSongs = [...encoreSongs];
    newEncoreSongs[index].title = e.target.value;
    setEncoreSongs(newEncoreSongs);
  };

  const addSong = () => {
    setSongs((prev) => [...prev, { title: "", order: prev.length + 1 }]);
  };

  const addEncoreSong = () => {
    setEncoreSongs((prev) => [...prev, { title: "", order: prev.length + 1 }]);
  };

const onSelectSong = (title) => {
  const isMain = focusedField.type === "main";
  const songState = isMain ? songs : encoreSongs;
  const setSongState = isMain ? setSongs : setEncoreSongs;
  const inputRefs = isMain ? songInputRefs : encoreInputRefs;
  const addSongFunc = isMain ? addSong : addEncoreSong;

  setSongState((prev) => {
    const newArr = [...prev];
    if (newArr[focusedField.index]) {
      newArr[focusedField.index].title = title;
    } else {
      newArr.push({ title, order: newArr.length + 1 });
    }

    // ✅ 空欄がなければ自動追加
    if (!newArr.some((s) => s.title === "")) {
      newArr.push({ title: "", order: newArr.length + 1 });
    }

    return newArr;
  });

  const nextIndex = focusedField.index + 1;
  setTimeout(() => {
    inputRefs.current[nextIndex]?.focus();
    setFocusedField({ type: focusedField.type, index: nextIndex });
  }, 50);
};


  const clearSongAtIndex = (index) => {
    setSongs((prev) => {
      const newArr = [...prev];
      newArr[index].title = "";
      return newArr;
    });
    setTimeout(() => {
      songInputRefs.current[index]?.focus();
      setFocusedField({ type: "main", index });
    }, 50);
  };

  const clearAllSongs = () => {
    setSongs(Array(5).fill(null).map((_, i) => ({ title: "", order: i + 1 })));
    setEncoreSongs([]);
    setTimeout(() => {
      songInputRefs.current[0]?.focus();
      setFocusedField({ type: "main", index: 0 });
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const song of songs) {
        if (song.title.trim() !== "") {
          await apiClient.post(`/events/${eventId}/setlists`, {
            setlist: { title: song.title, order: song.order },
          });
        }
      }
      for (const encoreSong of encoreSongs) {
        if (encoreSong.title.trim() !== "") {
          await apiClient.post(`/events/${eventId}/setlists`, {
            setlist: { title: encoreSong.title, order: `En-${encoreSong.order}` },
          });
        }
      }
      setSongs(Array(5).fill(null).map((_, i) => ({ title: "", order: i + 1 })));
      setEncoreSongs([]);
      navigate(`/events/${eventId}`);
    } catch (error) {
      console.error("Error posting setlists:", error);
    }
  };

  const albums = Object.entries(ALBUM_SONGS);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[80vh] bg-stone-800 rounded-lg shadow-lg text-stone-100"
    >
      <header className="col-span-full mb-6">
        <h1 className="text-4xl font-bold text-orange-500 border-b-4 border-orange-600 pb-2">
          セトリ作成
        </h1>
      </header>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold border-b border-stone-700 pb-2">
            本番曲
          </h2>
          <button
            type="button"
            onClick={clearAllSongs}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm font-semibold select-none"
          >
            一括クリア
          </button>
        </div>

        {songs.map((song, i) => (
          <SongInput
            key={`song-${i}`}
            song={song}
            onChange={(e) => handleSongChange(i, e)}
            inputRef={(el) => (songInputRefs.current[i] = el)}
            onDelete={() => clearSongAtIndex(i)}
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

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold border-b border-stone-700 pb-2">
            アンコール曲
          </h2>
          <button
            type="button"
            onClick={() => setEncoreSongs([])}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm font-semibold select-none"
          >
            一括クリア
          </button>
        </div>

        {encoreSongs.map((encore, i) => (
          <div key={`encore-${i}`} className="mb-4 flex items-center space-x-2">
            <input
              ref={(el) => (encoreInputRefs.current[i] = el)}
              type="text"
              name="title"
              value={encore.title}
              onChange={(e) => handleEncoreChange(i, e)}
              onFocus={() => setFocusedField({ type: "encore", index: i })}
              placeholder="アンコール曲名を入力"
              className="flex-grow p-2 rounded-md border border-stone-600 bg-stone-900 text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="button"
              onClick={() => {
                setEncoreSongs((prev) => {
                  const copy = [...prev];
                  copy.splice(i, 1);
                  return copy;
                });
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm select-none"
              aria-label="アンコール曲を削除"
            >
              ✕
            </button>
          </div>
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
          セットリスト投稿
        </button>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 border-b border-stone-700 pb-2">
          楽曲リスト
        </h2>
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
  );
};

export default SetlistForm;
