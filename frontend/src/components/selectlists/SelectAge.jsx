import React from "react";

const SelectAge = ({ value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="border border-gray-300 p-2 w-full rounded  text-white">
      <option value="">年齢を選択</option>
      {[...Array(80)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}歳
        </option>
      ))}
    </select>
  );
};

export default SelectAge;
