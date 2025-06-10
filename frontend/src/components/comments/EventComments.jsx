import React, { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../hooks/AuthContext";
import { MdDelete, MdEdit } from "react-icons/md";

const EventComments = ({ eventId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const [editCommentId, setEditCommentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDelete = async (commentId) => {
    try {
      await apiClient.delete(`/events/${eventId}/event_comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("コメントの削除に失敗しました", error);
    }
  };

  const handleEdit = (commentId, currentContent) => {
    setEditCommentId(commentId);
    setContent(currentContent);
    setIsModalOpen(true);
  };

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
      setIsModalOpen(false);
    } catch (error) {
      console.error("コメントの編集に失敗しました", error);
    }
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          className="relative bg-stone-100 dark:bg-stone-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-96"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-xl font-bold text-black dark:text-white"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="text-white">
      <h3 className="text-2xl font-semibold mb-4">コメント</h3>

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border-b border-stone-600 py-4 flex justify-between items-center"
        >
          <p className="text-lg flex-1 text-white">
            <strong>{comment.user.name}</strong>: {comment.content}
          </p>
          {user && user.id === comment.user_id && (
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => handleEdit(comment.id, comment.content)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => handleDelete(comment.id)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <MdDelete />
              </button>
            </div>
          )}
        </div>
      ))}

      {user && (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-stone-600 bg-stone-800 text-white rounded-lg"
            rows="3"
            placeholder="コメントを入力..."
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              投稿
            </button>
          </div>
        </form>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h4 className="text-xl font-semibold mb-2">コメント編集</h4>
        <form onSubmit={handleEditSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-stone-600 bg-stone-800 text-white rounded-lg"
            rows="3"
          />
          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-stone-500 hover:bg-stone-600 text-white px-4 py-2 rounded-lg"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
