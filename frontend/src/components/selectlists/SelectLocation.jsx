const prefectures = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
  '秘密',
  '非公開',
  '宇宙',
  'ヨーロビル',
  'ライブ会場',
  '海外',
  'その他',
];

function SelectLocation({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-stone-600 bg-stone-900 text-white p-2 rounded"
    >
      <option value="">都道府県を選択</option>
      {prefectures.map((pref) => (
        <option key={pref} value={pref}>
          {pref}
        </option>
      ))}
    </select>
  );
}

export default SelectLocation;
