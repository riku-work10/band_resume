const ResumesShowSectionItemDetail = ({ resume }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">セクション一覧</h3>

      <div className="space-y-6">
        {resume.resume_sections.map((section) => (
          <div key={section.id} className="bg-white p-5 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
              {section.title || "No Title"}
            </h4>
            <ul className="space-y-2">
              {section.resume_items.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm inline-block"
                >
                  {item.content}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumesShowSectionItemDetail;
