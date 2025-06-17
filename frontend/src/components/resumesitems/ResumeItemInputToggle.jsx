import React, { useState } from 'react';
import { MdMusicNote, MdEdit, MdAdd } from 'react-icons/md';
import { ResumeItemAddInput } from './ResumeItemAddInput';
import { ResumeItemSongSelector } from './ResumeItemSongSelector';
import { ResumeItemAddSongInput } from './ResumeItemAddSongInput'; // 追加したコンポーネントをインポート

export function ResumeItemInputToggle({ itemList, setItemList, resumeSection, resumeId }) {
  const [inputMode, setInputMode] = useState('text');
  const [inputText, setInputText] = useState('');

  const handleModeChange = (mode) => {
    setInputMode(mode);
  };

  return (
    <div className="space-y-4">
      {/* 切り替えボタン */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => handleModeChange('text')}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            inputMode === 'text'
              ? 'bg-orange-600 text-white shadow-md'
              : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
          }`}
        >
          <MdEdit />
          テキスト入力
        </button>

        <button
          onClick={() => handleModeChange('song')}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            inputMode === 'song'
              ? 'bg-orange-600 text-white shadow-md'
              : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
          }`}
        >
          <MdMusicNote />
          楽曲選択
        </button>

        <button
          onClick={() => handleModeChange('songInput')}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            inputMode === 'songInput'
              ? 'bg-orange-600 text-white shadow-md'
              : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
          }`}
        >
          <MdAdd />
          楽曲入力
        </button>
      </div>

      <p className="text-sm text-stone-400 italic">
        ※テキスト入力と楽曲選択、楽曲入力では表示のされ方が異なります
      </p>

      {/* 入力コンポーネント */}
      {inputMode === 'text' && (
        <ResumeItemAddInput
          inputText={inputText}
          setInputText={setInputText}
          itemList={itemList}
          setItemList={setItemList}
          resumeSection={resumeSection}
          resumeId={resumeId}
        />
      )}

      {inputMode === 'song' && (
        <ResumeItemSongSelector
          itemList={itemList}
          setItemList={setItemList}
          resumeSection={resumeSection}
          resumeId={resumeId}
        />
      )}

      {inputMode === 'songInput' && (
        <ResumeItemAddSongInput
          itemList={itemList}
          setItemList={setItemList}
          resumeSection={resumeSection}
          resumeId={resumeId}
        />
      )}
    </div>
  );
}
