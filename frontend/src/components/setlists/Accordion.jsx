import React from 'react';

function Accordion({ albums, openAlbums, toggleAlbum, onSelectSong }) {
  return (
    <div className="space-y-3 overflow-y-auto max-h-[95vh] pr-2">
      {albums.map(([album, tracks]) => (
        <div key={album} className="border rounded-md bg-stone-700 shadow-sm">
          <button
            type="button"
            className="w-full text-left p-3 font-semibold bg-stone-600 hover:bg-stone-500 text-stone-100 flex justify-between items-center"
            onClick={() => toggleAlbum(album)}
          >
            {album}
            <span className="select-none">{openAlbums.has(album) ? '−' : '+'}</span>
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
}

export default Accordion;
