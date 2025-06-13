import { useState, useRef } from 'react';

export const useSetlistFormLogic = (initialMainCount = 5) => {
  const [songs, setSongs] = useState(
    Array(initialMainCount)
      .fill()
      .map((_, i) => ({ title: '', order: i + 1 })),
  );
  const [encoreSongs, setEncoreSongs] = useState([]);
  const [focusedField, setFocusedField] = useState({ type: 'main', index: 0 });

  const songRefs = useRef([]);
  const encoreRefs = useRef([]);

  const updateSongList = (type, updater) => {
    if (type === 'main') {
      setSongs(updater);
    } else {
      setEncoreSongs(updater);
    }
  };

  return {
    songs,
    encoreSongs,
    setSongs,
    setEncoreSongs,
    focusedField,
    setFocusedField,
    songRefs,
    encoreRefs,
    updateSongList,
  };
};
