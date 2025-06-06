const ResumesShowSectionItemDetail = ({ resume }) => {
  return (
    <div className="space-y-8">
      {resume.resume_sections.map((section) => (
        <div key={section.id} className="text-center">
          {/* タイトル */}
          <div className="inline-block bg-white px-4 py-1 rounded-full shadow text-sm font-semibold text-gray-800 mb-2">
            {section.title || "No Title"}
          </div>

          {/* 本文ボックス */}
          <div className="bg-white/60 backdrop-blur-md text-gray-800 px-6 py-4 rounded-xl mx-auto max-w-2xl shadow">
            {section.resume_items.map((item) => (
              <p key={item.id} className="mb-2 text-base leading-relaxed whitespace-pre-wrap">
                {item.content}
                {item.song_title}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumesShowSectionItemDetail;
