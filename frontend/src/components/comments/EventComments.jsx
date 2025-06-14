import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../hooks/AuthContext';

function EventComments({ eventId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const { user } = useAuth();

  // コメント取得
  useEffect(() => {
    apiClient
      .get(`/events/${eventId}/event_comments`)
      .then((response) => {
        setComments(response.data || []);
      })
      .catch((error) => {
        console.error('コメントの取得に失敗しました', error);
      });
  }, [eventId]);

  // コメント投稿
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(`/events/${eventId}/event_comments`, {
        content,
      });
      setComments([...comments, response.data]);
      setContent('');
    } catch (error) {
      console.error('コメントの投稿に失敗しました', error);
    }
  };

  // コメント削除
  const handleDelete = async (commentId) => {
    try {
      await apiClient.delete(`/events/${eventId}/event_comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('コメントの削除に失敗しました', error);
    }
  };

  // 編集開始
  const handleEdit = (commentId, currentContent) => {
    setEditCommentId(commentId);
    setEditContent(currentContent);
  };

  // 編集送信
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put(`/events/${eventId}/event_comments/${editCommentId}`, {
        content: editContent,
      });
      const updatedComments = comments.map((comment) =>
        comment.id === editCommentId ? response.data : comment
      );
      setComments(updatedComments);
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
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditCommentId(null)}
                  className="bg-stone-500 text-white px-4 py-2 rounded-lg hover:bg-stone-600"
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
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-lg flex-1">
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
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
    </div>
  );
}

export default EventComments;
