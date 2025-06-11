const ResumesShowSectionItemDetail = ({ resume }) => {
  return (
    <div className="space-y-12 px-6 py-10 bg-black min-h-screen">
      {resume.resume_sections.map((section) => (
        <div
          key={section.id}
          className="max-w-3xl mx-auto relative text-center"
        >
          {/* 本文ボックス */}
          <div className="bg-stone-800/95 backdrop-blur-md text-stone-200 px-10 py-10 rounded-xl shadow-lg relative z-0">
            {section.resume_items.map((item) => (
              <p
                key={item.id}
                className="mb-5 text-base leading-relaxed whitespace-pre-wrap"
              >
                {item.content}
                {item.song_title}
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
      ))}
    </div>
  );
};

export default ResumesShowSectionItemDetail;
