import React, { useState } from "react"; // 作成フォームをインポート
import ResumesCreate from "../components/resumes/ResumesCreate";

const MyResumePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>MyResumePageです</h1>
      <p>今から実装します</p>
      {/* モーダルを開くボタン */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        履歴書作成
      </button>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <ResumesCreate onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResumePage;
