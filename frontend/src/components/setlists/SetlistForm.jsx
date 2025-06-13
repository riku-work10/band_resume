import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ALBUM_SONGS } from '../selectlists/songData';
import apiClient from '../../services/apiClient';
import { useSetlistFormLogic } from './useSetlistFormLogic';
import SongInput from './SongInput';
import Accordion from './Accordion';

function SetlistForm() {
  const { eventId } = useLocation().state || {};
  const navigate = useNavigate();
  const [openAlbums, setOpenAlbums] = useState(new Set());

  const {
    songs,
    encoreSongs,
    setSongs,
    setEncoreSongs,
    focusedField,
    setFocusedField,
    songRefs,
    encoreRefs,
  } = useSetlistFormLogic();

  const toggleAlbum = (album) => {
    setOpenAlbums((prev) => {
      const next = new Set(prev);
      next.has(album) ? next.delete(album) : next.add(album);
      return next;
    });
  };

  const onSelectSong = (title) => {
    const isMain = focusedField.type === 'main';
    const state = isMain ? songs : encoreSongs;
    const setState = isMain ? setSongs : setEncoreSongs;
    const refs = isMain ? songRefs : encoreRefs;

    setState((prev) => {
      const next = [...prev];
      if (next[focusedField.index]) next[focusedField.index].title = title;
      else next.push({ title, order: next.length + 1 });
      if (!next.some((s) => s.title === '')) next.push({ title: '', order: next.length + 1 });
      return next;
    });

    setTimeout(() => {
      refs.current[focusedField.index + 1]?.focus();
      setFocusedField({ type: focusedField.type, index: focusedField.index + 1 });
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const song of songs) {
        if (song.title.trim()) {
          await apiClient.post(`/events/${eventId}/setlists`, {
            setlist: { title: song.title, order: song.order },
          });
        }
      }
      for (const song of encoreSongs) {
        if (song.title.trim()) {
          await apiClient.post(`/events/${eventId}/setlists`, {
            setlist: { title: song.title, order: `En-${song.order}` },
          });
        }
      }
      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error('投稿エラー:', err);
    }
  };

  const albums = Object.entries(ALBUM_SONGS);

  return (
    <div>
      <header className="flex justify-between items-center my-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-stone-100">セトリ作成</h1>
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
            セットリスト投稿
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
              key={`main-${i}`}
              song={song}
              onChange={(e) => {
                const next = [...songs];
                next[i].title = e.target.value;
                setSongs(next);
              }}
              inputRef={(el) => (songRefs.current[i] = el)}
              onDelete={() => {
                const next = [...songs];
                next[i].title = '';
                setSongs(next);
                setTimeout(() => {
                  songRefs.current[i]?.focus();
                  setFocusedField({ type: 'main', index: i });
                }, 50);
              }}
              onFocus={() => setFocusedField({ type: 'main', index: i })}
            />
          ))}
          <button
            type="button"
            onClick={() => setSongs([...songs, { title: '', order: songs.length + 1 }])}
            className="mb-8 bg-orange-600 hover:bg-orange-700 px-5 py-2 rounded-md transition"
          >
            曲を追加
          </button>

          <h2 className="text-3xl font-bold border-b border-stone-700 pb-2 mb-4">アンコール曲</h2>
          {encoreSongs.map((song, i) => (
            <SongInput
              key={`encore-${i}`}
              song={song}
              onChange={(e) => {
                const next = [...encoreSongs];
                next[i].title = e.target.value;
                setEncoreSongs(next);
              }}
              inputRef={(el) => (encoreRefs.current[i] = el)}
              onDelete={() => {
                const next = [...encoreSongs];
                next.splice(i, 1);
                setEncoreSongs(next);
              }}
              onFocus={() => setFocusedField({ type: 'encore', index: i })}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setEncoreSongs([...encoreSongs, { title: '', order: encoreSongs.length + 1 }])
            }
            className="mb-10 bg-orange-600 hover:bg-orange-700 px-5 py-2 rounded-md transition"
          >
            アンコール曲を追加
          </button>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-md text-white font-semibold transition"
          >
            セットリスト投稿
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
}

export default SetlistForm;
