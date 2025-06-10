const SelectAge = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-stone-700 text-white border border-stone-600 focus:outline-none"
    >
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
