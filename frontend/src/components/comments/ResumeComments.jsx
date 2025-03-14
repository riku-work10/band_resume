import React, { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../hooks/AuthContext";


const ResumeComments = ({ resumeId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const [editCommentId, setEditCommentId] = useState(null);

  // コメント一覧を取得
  useEffect(() => {
    apiClient
      .get(`/resumes/${resumeId}/resume_comments`)
      .then((response) => {
        setComments(response.data || [] ); //コメントがまだ作成されていない場合にエラーが出ないように[]
      })
      .catch((error) => {
        console.error("コメントの取得に失敗しました", error);
      });
  }, [resumeId]);

  // コメントを投稿
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(`/resumes/${resumeId}/resume_comments`, {
        content,
      });

      // 成功したらコメントリストを更新
      setComments([...comments, response.data]);
      setContent("");
    } catch (error) {
      console.error("コメントの投稿に失敗しました", error);
    }
  };

  // コメント削除
  const handleDelete = async (commentId) => {
    try {
      await apiClient.delete(`/resumes/${resumeId}/resume_comments/${commentId}`);

      // 削除後にコメントリストからそのコメントを除外
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("コメントの削除に失敗しました", error);
    }
  };


  //コメントを編集
  const handleEdit = (commentId, currentContent) => {
    setEditCommentId(commentId);
    setContent(currentContent);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.put(`/resumes/${resumeId}/resume_comments/${editCommentId}`, {
        content,
      });

      // 編集後にコメントを更新
      const updatedComments = comments.map((comment) =>
        comment.id === editCommentId ? response.data : comment
      );
      setComments(updatedComments);
      setContent("");
      setEditCommentId(null); // 編集モードを解除
    } catch (error) {
      console.error("コメントの編集に失敗しました", error);
    }
  };

  return (
    <div>
      <h3>コメント</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>
            <strong>{comment.user.name}</strong>: {comment.content}
          </p>
            <div>
                <button onClick={() => handleEdit(comment.id, comment.content)}>
                  編集
                </button>
                <button onClick={() => handleDelete(comment.id)}>削除</button>
              </div>
        </div>
      ))}

      {user && (
        <form onSubmit={editCommentId ? handleEditSubmit : handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">{editCommentId ? "更新" : "投稿"}</button>
        </form>
      )}
    </div>
  );
};

export default ResumeComments;