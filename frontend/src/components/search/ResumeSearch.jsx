import React, { useState } from "react";

const ResumeSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-lg p-2 w-full max-w-md">
      <input
        type="text"
        placeholder="検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 outline-none text-gray-700"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        検索
      </button>
    </form>
  );
};

export default ResumeSearch;
