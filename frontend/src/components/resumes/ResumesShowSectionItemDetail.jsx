function ResumesShowSectionItemDetail({ resume }) {
  return (
    <div className="space-y-12 px-4 sm:px-6 py-8 sm:py-12 bg-black min-h-[300px]">
      {resume.resume_sections.map((section) => {
        const songTitles = section.resume_items
          .map((item) => item.song_title?.trim())
          .filter((title) => title);

        return (
          <div key={section.id} className="max-w-3xl w-full mx-auto relative text-center">
            {/* 本文ボックス */}
            <div className="bg-stone-800/95 backdrop-blur-md text-stone-200 px-2 sm:px-10 pt-8 sm:pt-12 pb-4 sm:pb-6 rounded-xl shadow-lg relative z-0 space-y-3">
              {/* song titles */}
              {songTitles.length > 0 && (
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-start text-left">
                  {songTitles.map((title, idx) => (
                    <span
                      key={idx}
                      className="bg-stone-600 text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              )}

              {/* content 本文 */}
              {section.resume_items.map((item) => (
                <p
                  key={item.id}
                  className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap"
                >
                  {item.content}
                </p>
              ))}
            </div>

            {/* タイトル */}
            <div
              className="inline-block bg-stone-400 text-black px-4 sm:px-6 py-2 sm:py-2 rounded-full font-bold shadow-xl absolute left-1/2 -top-5 transform -translate-x-1/2 z-10 max-w-[90vw] sm:max-w-[60%] text-center whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ fontSize: 'clamp(0.75rem, 4vw, 1.25rem)' }}
            >
              {section.title || 'No Title'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResumesShowSectionItemDetail;
