import React, { useState } from "react";

const tags = ["フェス", "ワンマン", "対バン", "ツアー"];

const TagSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false); // タグリストの開閉状態を管理

  const handleToggleTag = (tag) => {
    let updatedTags;
    if (value.includes(tag)) {
      updatedTags = value.filter((selectedTag) => selectedTag !== tag); // タグを選択解除
    } else {
      updatedTags = [...value, tag]; // タグを選択
    }
    onChange(updatedTags);
  };

  return (
    <div>
      {/* タグタブ（開閉ボタン） */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
      >
        タグを選択
      </button>

      {/* タグリスト */}
      {isOpen && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleToggleTag(tag)}
              className={`px-4 py-2 rounded ${value.includes(tag) ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} hover:bg-blue-700`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSelect;
