import { useState } from "react";

const ResumeSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const availableGenders = ["男", "女", "秘密", "その他"];
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
    onSearch(e.target.value, minAge, maxAge, selectedGenders, selectedLocations);
  };

  const handleAgeChange = (type, value) => {
    if (type === "min") setMinAge(value);
    if (type === "max") setMaxAge(value);
    onSearch(
      query,
      type === "min" ? value : minAge,
      type === "max" ? value : maxAge,
      selectedGenders,
      selectedLocations
    );
  };

  const handleCheckboxChange = (type, value) => {
    const updateSelection = (prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];

    if (type === "gender") setSelectedGenders(updateSelection);
    if (type === "location") setSelectedLocations(updateSelection);

    onSearch(
      query,
      minAge,
      maxAge,
      type === "gender" ? updateSelection(selectedGenders) : selectedGenders,
      type === "location" ? updateSelection(selectedLocations) : selectedLocations
    );
  };

  return (
    <div className="mb-4 flex items-center gap-4 flex-wrap text-stone-100">
      {/* 検索 */}
      <input
        type="text"
        placeholder="履歴書を検索..."
        value={query}
        onChange={handleChange}
        className="p-2 bg-stone-800 border border-stone-600 rounded w-40 text-stone-100 placeholder-stone-400"
      />

      {/* 年齢範囲 */}
      <div className="flex items-center gap-2">
        <h3 className="text-stone-300">年齢</h3>
        <input
          type="number"
          placeholder="最小"
          value={minAge}
          onChange={(e) => handleAgeChange("min", e.target.value)}
          className="p-1 bg-stone-800 border border-stone-600 rounded text-stone-100 w-20 placeholder-stone-500"
        />
        <span className="text-stone-400">~</span>
        <input
          type="number"
          placeholder="最大"
          value={maxAge}
          onChange={(e) => handleAgeChange("max", e.target.value)}
          className="p-1 bg-stone-800 border border-stone-600 rounded text-stone-100 w-20 placeholder-stone-500"
        />
      </div>

      {/* 性別選択 */}
      <div className="relative">
        <button
          onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
          className="px-4 py-2 bg-stone-700 text-stone-100 rounded-lg focus:outline-none w-40 text-left hover:bg-stone-600 transition"
        >
          性別を選択 ▼
        </button>

        {isGenderDropdownOpen && (
          <div className="absolute mt-1 w-40 bg-stone-800 border border-stone-600 rounded-lg shadow-lg p-2 z-10">
            {availableGenders.map((gender) => (
              <label
                key={gender}
                className={`block px-2 py-1 rounded whitespace-nowrap cursor-pointer ${
                  selectedGenders.includes(gender)
                    ? "bg-orange-600 text-white font-medium"
                    : "text-stone-200 hover:bg-stone-700"
                }`}
              >
                <input
                  type="checkbox"
                  value={gender}
                  checked={selectedGenders.includes(gender)}
                  onChange={() => handleCheckboxChange("gender", gender)}
                  className="mr-2 accent-orange-500"
                />
                {gender}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 場所選択 */}
      <div className="relative">
        <button
          onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          className="px-4 py-2 bg-stone-700 text-stone-100 rounded-lg focus:outline-none w-40 text-left hover:bg-stone-600 transition"
        >
          場所を選択 ▼
        </button>

        {isLocationDropdownOpen && (
          <div className="absolute mt-1 w-40 bg-stone-800 border border-stone-600 rounded-lg shadow-lg p-2 z-10 max-h-60 overflow-y-auto">
            {availableLocations.map((location) => (
              <label
                key={location}
                className={`block px-2 py-1 rounded whitespace-nowrap cursor-pointer ${
                  selectedLocations.includes(location)
                    ? "bg-orange-600 text-white font-medium"
                    : "text-stone-200 hover:bg-stone-700"
                }`}
              >
                <input
                  type="checkbox"
                  value={location}
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleCheckboxChange("location", location)}
                  className="mr-2 accent-orange-500"
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

export default ResumeSearch;
