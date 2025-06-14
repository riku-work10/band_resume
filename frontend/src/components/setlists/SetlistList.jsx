function SetlistList({ event }) {
  const encoreSetlists = event.setlists.filter((setlist) =>
    String(setlist.order).toLowerCase().includes('en')
  );
  const normalSetlists = event.setlists.filter(
    (setlist) => !String(setlist.order).toLowerCase().includes('en')
  );

  return (
    <div className="flex flex-col items-center mt-6">
      {/* 通常の曲を表示 */}
      <ul className="space-y-2 text-center text-base">
        {normalSetlists.map((setlist) => (
          <li key={setlist.id} className="tracking-wide">
            <span className="font-semibold">
              {setlist.order < 10 ? `0${setlist.order}` : setlist.order}.
            </span>{' '}
            {setlist.title}
          </li>
        ))}
      </ul>

      {/* アンコール曲があるときだけ区切りとリストを表示 */}
      {encoreSetlists.length > 0 && (
        <>
          <div className="mt-6 mb-2 text-lg font-medium">Encore</div>
          <ul className="space-y-2 text-center text-base">
            {encoreSetlists.map((setlist) => (
              <li key={setlist.id}>
                {setlist.order}. {setlist.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default SetlistList;
