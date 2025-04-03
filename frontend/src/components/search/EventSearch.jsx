import { useState } from "react";

const EventSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const availableTags = ["フェス", "ワンマン", "対バン", "ツアー"];
  const availableLocations = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ];

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value, startDate, closeDate, selectedTags, selectedLocations);
  };

  const handleAgeChange = (type, value) => {
    if (type === "start") setStartDate(value);
    if (type === "close") setCloseDate(value);
    onSearch(query, type === "start" ? value : startDate, type === "close" ? value : closeDate, selectedTags, selectedLocations);
  };

  const handleCheckboxChange = (type, value) => {
    const updateSelection = (prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];

    if (type === "tag") setSelectedTags(updateSelection);
    if (type === "location") setSelectedLocations(updateSelection);

    onSearch(query, startDate, closeDate,
      type === "tag" ? updateSelection(selectedTags) : selectedTags,
      type === "location" ? updateSelection(selectedLocations) : selectedLocations
    );
  };

  return (
    <div className="mb-4 flex items-center gap-4 flex-wrap">
      {/* テキスト検索 */}
      <input
        type="text"
        placeholder="履歴書を検索..."
        value={query}
        onChange={handleChange}
        className="p-2 border rounded w-40 text-white"
      />

      {/* 日付範囲フィルタ */}
      <div className="flex items-center gap-2">
        <h3 className="text-white">日付</h3>
        <input
          type="date"
          placeholder="前"
          value={startDate}
          onChange={(e) => handleAgeChange("start", e.target.value)}
          className="p-1 border rounded w-34 text-white"
        />
        <span className="text-white">~</span>
        <input
          type="date"
          placeholder="後"
          value={closeDate}
          onChange={(e) => handleAgeChange("close", e.target.value)}
          className="p-1 border rounded w-34 text-white"
        />
      </div>



      {/* タグフィルタ（プルダウン + チェックボックス） */}
      <div className="relative">
        <button
          onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
          className="px-4 py-2 bg-gray-200 text-black rounded-lg focus:outline-none w-40 text-left"
        >
          タグを選択 ▼
        </button>

        {isTagDropdownOpen && (
          <div className="absolute mt-1 w-40 bg-white border rounded-lg shadow-lg p-2 z-10">
            {availableTags.map((tag) => (
              <label key={tag} className="block px-2 py-1 text-black whitespace-nowrap">
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleCheckboxChange("tag", tag)}
                  className="mr-2"
                />
                {tag}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 場所フィルタ（プルダウン + チェックボックス） */}
      <div className="relative">
        <button
          onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          className="px-4 py-2 bg-gray-200 text-black rounded-lg focus:outline-none w-40 text-left"
        >
          場所を選択 ▼
        </button>

        {isLocationDropdownOpen && (
          <div className="absolute mt-1 w-40 bg-white border rounded-lg shadow-lg p-2 z-10 max-h-60 overflow-y-auto">
            {availableLocations.map((location) => (
              <label key={location} className="block px-2 py-1 text-black whitespace-nowrap">
                <input
                  type="checkbox"
                  value={location}
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleCheckboxChange("location", location)}
                  className="mr-2"
                />
                {location}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSearch;
