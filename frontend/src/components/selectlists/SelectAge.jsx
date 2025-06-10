const ageOptions = [
  { label: "年齢を選択", value: "" },
  ...Array.from({ length: 55 }, (_, i) => ({
    label: `${i + 1}歳`,
    value: `${i + 1}歳`,
  })),
  { label: "10〜14歳", value: "10-14歳" },
  { label: "15〜19歳", value: "15-19歳" },
  { label: "20〜24歳", value: "20-24歳" },
  { label: "25〜29歳", value: "25-29歳" },
  { label: "30〜34歳", value: "30-34歳" },
  { label: "35〜39歳", value: "35-39歳" },
  { label: "40〜49歳", value: "40-49歳" },
  { label: "50歳以上", value: "50歳以上" },
  { label: "非公開", value: "非公開" },
  { label: "秘密", value: "秘密" },
];

const SelectAge = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-stone-700 text-white border border-stone-600 focus:outline-none"
    >
      {ageOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectAge;
