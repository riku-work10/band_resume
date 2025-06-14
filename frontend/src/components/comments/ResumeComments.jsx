import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../hooks/AuthContext';

function ResumeComments({ resumeId }) {
  const [comments, setComments] = useState([]);
  const [newContent, setNewContent] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    apiClient
      .get(`/resumes/${resumeId}/resume_comments`)
      .then((response) => setComments(response.data || []))
      .catch((error) => console.error('コメントの取得に失敗しました', error));
  }, [resumeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(`/resumes/${resumeId}/resume_comments`, {
        content: newContent,
      });
      setComments([...comments, response.data]);
      setNewContent('');
    } catch (error) {
      console.error('コメントの投稿に失敗しました', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await apiClient.delete(`/resumes/${resumeId}/resume_comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('コメントの削除に失敗しました', error);
    }
  };

  const handleEdit = (commentId, currentContent) => {
    setEditCommentId(commentId);
    setEditContent(currentContent);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put(
        `/resumes/${resumeId}/resume_comments/${editCommentId}`,
        { content: editContent }
      );
      const updated = comments.map((comment) =>
        comment.id === editCommentId ? response.data : comment
      );
      setComments(updated);
      setEditCommentId(null);
      setEditContent('');
    } catch (error) {
      console.error('コメントの編集に失敗しました', error);
    }
  };

  const handleKeyDown = (e, onSubmit) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div className="text-white">
      <h3 className="text-2xl font-semibold mb-4">コメント</h3>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border-b border-stone-600 py-4"
        >
          {editCommentId === comment.id ? (
            <form onSubmit={handleEditSubmit}>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleEditSubmit)}
                required
                className="w-full p-2 border border-stone-600 bg-stone-800 text-white rounded-lg"
                rows="3"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditCommentId(null)}
                  className="bg-stone-500 hover:bg-stone-600 text-white px-4 py-1 rounded"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
                >
                  更新
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-start">
              <p className="text-lg flex-1 text-white">
                <strong>{comment.user.name}</strong>: {comment.content}
              </p>
              {user && user.id === comment.user_id && (
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(comment.id, comment.content)}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {user && (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
            required
            className="w-full p-2 border border-stone-600 bg-stone-800 text-white rounded-lg"
            rows="3"
            placeholder="コメントを入力..."
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            投稿
          </button>
        </form>
      )}
    </div>
  );
}

export default ResumeComments;
