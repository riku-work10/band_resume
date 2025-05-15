const SetlistList = ({ event }) => {
  return (
    <div className="flex flex-col items-center mt-6">

      {/* 通常の曲を表示 */}
      <ul className="space-y-2 text-center text-base">
        {event.setlists
          .filter((setlist) => !String(setlist.order).toLowerCase().includes("en")) // Encoreを含まない曲
          .map((setlist) => (
            <li key={setlist.id} className="tracking-wide">
              <span className="font-semibold">{setlist.order < 10 ? `0${setlist.order}` : setlist.order}.</span>{' '}
              {setlist.title}
            </li>
          ))}
      </ul>

      {/* アンコール区切り */}
      <div className="mt-6 mb-2 text-lg font-medium">Encore</div>

      {/* アンコール曲を表示 */}
      <ul className="space-y-2 text-center text-base">
        {event.setlists
          .filter((setlist) => String(setlist.order).toLowerCase().includes("en")) // Encoreを含む曲
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
