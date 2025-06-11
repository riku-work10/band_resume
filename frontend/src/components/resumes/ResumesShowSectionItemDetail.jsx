const ResumesShowSectionItemDetail = ({ resume }) => {
  return (
    <div className="space-y-12 px-6 py-10 bg-black min-h-screen">
      {resume.resume_sections.map((section) => {
        const songTitles = section.resume_items
          .map((item) => item.song_title?.trim())
          .filter((title) => title);

        return (
          <div key={section.id} className="max-w-3xl mx-auto relative text-center">
            {/* 本文ボックス */}
            <div className="bg-stone-800/95 backdrop-blur-md text-stone-200 px-10 pt-16 pb-6 rounded-xl shadow-lg relative z-0 space-y-3">
              
              {/* song titles - タグ風表示 */}
              {songTitles.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-start text-left">
                  {songTitles.map((title, idx) => (
                    <span
                      key={idx}
                      className="bg-stone-600 text-white text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              )}

              {/* 各 content の表示 */}
              {section.resume_items.map((item) => (
                <p
                  key={item.id}
                  className="text-base leading-relaxed whitespace-pre-wrap"
                >
                  {item.content}
                </p>
              ))}
            </div>

            {/* タイトル（本文ボックスと半分被る） */}
            <div
              className="inline-block bg-stone-400 text-black px-10 py-3 rounded-full font-bold shadow-xl absolute left-1/2 -top-5 transform -translate-x-1/2 z-10"
              style={{ minWidth: "180px" }}
            >
              {section.title || "No Title"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResumesShowSectionItemDetail;
