const genderOptions = ['男', '女', '秘密', 'その他'];

function SelectGender({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-stone-600 bg-stone-900 text-white p-2 rounded"
    >
      <option value="">性別を選択</option>
      {genderOptions.map((gender) => (
        <option key={gender} value={gender}>
          {gender}
        </option>
      ))}
    </select>
  );
}

export default SelectGender;
