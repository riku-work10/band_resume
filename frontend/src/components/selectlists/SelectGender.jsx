const genderOptions = ["男", "女", "秘密", "その他"];

const SelectGender = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-stone-700 text-white border border-stone-600 focus:outline-none"
    >
      <option value="">性別を選択</option>
      {genderOptions.map((gender) => (
        <option key={gender} value={gender}>
          {gender}
        </option>
      ))}
    </select>
  );
};

export default SelectGender;
