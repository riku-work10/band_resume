import React from "react";

const genderOptions = ["男", "女", "秘密", "その他"];

const SelectGender = ({ value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="border border-gray-300 p-2 w-full rounded text-white">
      <option value="">性別を選択</option>
      {genderOptions.map((gender) => (
        <option key={gender} value={gender} >
          {gender}
        </option>
      ))}
    </select>
  );
};

export default SelectGender;
