// src/components/ResumeComments.jsx
import React, { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../hooks/AuthContext";
import { MdDelete, MdEdit } from "react-icons/md";

const EventComments = ({ eventId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const [editCommentId, setEditCommentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態を管理

  // コメント一覧を取得
  useEffect(() => {
    apiClient
      .get(`/events/${eventId}/event_comments`)
      .then((response) => {
        setComments(response.data || []);
      })
      .catch((error) => {
        console.error("コメントの取得に失敗しました", error);
      });
  }, [eventId]);

  // コメントを投稿
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(`/events/${eventId}/event_comments`, {
        content,
      });

      setComments([...comments, response.data]);
      setContent("");
    } catch (error) {
      console.error("コメントの投稿に失敗しました", error);
    }
  };

  // コメント削除
  const handleDelete = async (commentId) => {
    try {
      await apiClient.delete(`/events/${eventId}/event_comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("コメントの削除に失敗しました", error);
    }
  };

  // コメント編集
  const handleEdit = (commentId, currentContent) => {
    setEditCommentId(commentId);
    setContent(currentContent);
    setIsModalOpen(true); // 編集モーダルを開く
  };

  // 編集フォームの送信
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.put(`/events/${eventId}/event_comments/${editCommentId}`, {
        content,
      });

      const updatedComments = comments.map((comment) =>
        comment.id === editCommentId ? response.data : comment
      );
      setComments(updatedComments);
      setContent("");
      setEditCommentId(null);
      setIsModalOpen(false); // 編集後にモーダルを閉じる
    } catch (error) {
      console.error("コメントの編集に失敗しました", error);
    }
  };

  // モーダルコンポーネント
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold">×</button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold">コメント</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-300 py-4 flex justify-between items-center">
          <p className="text-lg flex-1">
            <strong>{comment.user.name}</strong>: {comment.content}
          </p>
          <div className="flex space-x-4 ml-4">
          {user && user.id === comment.user_id && (
            <div className="flex space-x-4 ml-4">
              <button
                onClick={() => handleEdit(comment.id, comment.content)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <MdEdit />
              </button>
              <button
                onClick={() => handleDelete(comment.id)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
                <MdDelete />
              </button>
            </div>
          )}
          </div>
        </div>
      ))}

      {user && (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="コメントを入力..."
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            投稿
          </button>
        </form>
      )}

      {/* 編集モーダル */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h4 className="text-xl font-semibold">コメント編集</h4>
        <form onSubmit={handleEditSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="3"
          />
          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              更新
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventComments;
