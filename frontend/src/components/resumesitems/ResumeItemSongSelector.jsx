import React, { useState } from 'react';
import apiClient from '../../services/apiClient';
import { ALBUM_SONGS } from '../selectlists/songData';

export function ResumeItemSongSelector({ itemList, setItemList, resumeSection, resumeId }) {
  const [expandedAlbums, setExpandedAlbums] = useState(new Set());
  const albums = Object.keys(ALBUM_SONGS);

  const handleAlbumToggle = (album) => {
    const newExpandedAlbums = new Set(expandedAlbums);
    if (expandedAlbums.has(album)) {
      newExpandedAlbums.delete(album);
    } else {
      newExpandedAlbums.add(album);
    }
    setExpandedAlbums(newExpandedAlbums);
  };

  const handleSongSelect = async (song) => {
    try {
      const response = await apiClient.post(
        `resumes/${resumeId}/resume_sections/${resumeSection.id}/resume_items`,
        {
          resume_item: {
            content: '',
            song_title: song.title,
          },
        },
      );
      setItemList([...itemList, response.data]);
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-2">
        {albums.map((album) => (
          <div
            key={album}
            className="border border-stone-600 rounded-lg overflow-hidden bg-stone-700"
          >
            {/* アルバム名ヘッダー */}
            <button
              onClick={() => handleAlbumToggle(album)}
              className="w-full px-4 py-3 text-left hover:bg-stone-600 transition-colors flex items-center justify-between text-white border-b border-stone-600"
            >
              <span className="font-medium">{album}</span>
              <span
                className={`transform transition-transform ${expandedAlbums.has(album) ? 'rotate-90' : ''}`}
              >
                ▶
              </span>
            </button>

            {/* 楽曲リスト */}
            {expandedAlbums.has(album) && (
              <div className="bg-stone-800">
                {ALBUM_SONGS[album].map((song) => (
                  <button
                    key={song.id}
                    onClick={() => handleSongSelect(song)}
                    className="w-full px-6 py-2 text-left hover:bg-orange-600 transition-colors flex items-center justify-between group text-white"
                  >
                    <span className="group-hover:text-white">{song.title}</span>
                    <span className="text-orange-100 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      追加 →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
