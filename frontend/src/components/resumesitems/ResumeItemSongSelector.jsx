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
        }
      );
      setItemList([...itemList, response.data]);
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-1 sm:space-y-4">
        {albums.map((album) => (
          <div
            key={album}
            className="border border-stone-600 rounded-lg overflow-hidden bg-stone-700"
          >
            {/* アルバム名ヘッダー */}
            <button
              onClick={() => handleAlbumToggle(album)}
              aria-label={`アルバム ${album} の楽曲表示切り替え`}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 text-left hover:bg-stone-600 transition-colors flex items-center justify-between text-white border-b border-stone-600 text-sm sm:text-base"
            >
              <span className="font-medium truncate">{album}</span>
              <span
                className={`transform transition-transform duration-200 ${
                  expandedAlbums.has(album) ? 'rotate-90' : ''
                }`}
              >
                ▶
              </span>
            </button>

            {/* 楽曲リスト */}
            {expandedAlbums.has(album) && (
              <div className="bg-stone-800 divide-y divide-stone-600">
                {ALBUM_SONGS[album].map((song) => (
                  <button
                    key={song.id}
                    onClick={() => handleSongSelect(song)}
                    aria-label={`楽曲「${song.title}」を追加`}
                    className="w-full px-4 sm:px-6 py-2 text-left hover:bg-orange-600 transition-colors flex items-center justify-between group text-white text-sm sm:text-base"
                  >
                    <span className="truncate group-hover:text-white">{song.title}</span>
                    <span className="text-orange-100 opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm">
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
