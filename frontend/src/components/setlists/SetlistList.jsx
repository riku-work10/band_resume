const SetlistList = ({event}) => {

  return (
    <div>
      <h2>セットリスト一覧</h2>
        {/* 通常の曲を表示 */}
        <h4>通常の曲</h4>
        <ul>
          {event.setlists
            .filter((setlist) => !String(setlist.order).includes("En")) // Encoreを含まない曲
            .map((setlist) => (
              <li key={setlist.id}>
                {setlist.order}. {setlist.title}
              </li>
            ))}
        </ul>

        {/* アンコール曲を表示 */}
        <h4>アンコール曲</h4>
        <ul>
          {event.setlists
            .filter((setlist) => String(setlist.order).includes("En")) // Encoreを含む曲
            .map((setlist) => (
              <li key={setlist.id}>
                {setlist.order}. {setlist.title}
              </li>
            ))}
        </ul>
    </div>
  );
};

export default SetlistList;