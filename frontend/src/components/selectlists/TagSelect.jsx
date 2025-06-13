import React, { useState } from 'react';

const tags = ['フェス', 'ワンマン', '対バン', 'ツアー'];

function TagSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleTag = (tag) => {
    const updatedTags = value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag];
    onChange(updatedTags);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 px-4 py-2 bg-stone-600 text-white rounded hover:bg-stone-500"
      >
        タグを選択
      </button>

      {isOpen && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = value.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleToggleTag(tag)}
                className={`px-4 py-2 rounded transition-colors ${
                  isSelected
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-stone-700 text-white hover:bg-stone-600'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TagSelect;
