import apiClient from "./apiClient";

// いいね状態を取得するAPIリクエスト
export const fetchLikeStatus = async (resumeId) => {
  try {
    const response = await apiClient.get(`/resumes/${resumeId}/liked_by_current_user`);
    return response.data.liked; // APIのレスポンスからいいね状態を取得
  } catch (error) {
    console.error('Failed to fetch like status:', error);
    return false; // エラー時はデフォルトで false
  }
};

// いいねを追加
export const likeResume = async (resumeId) => {
  try {
    const response = await apiClient.post(`/resumes/${resumeId}/resume_likes`);
    return response.data.liked;
  } catch (error) {
    console.error('Failed to like the resume:', error);
    return false;
  }
};

// いいねを削除
export const unlikeResume = async (resumeId) => {
  try {
    const response = await apiClient.delete(`/resumes/${resumeId}/resume_likes`);
    return response.data.liked;
  } catch (error) {
    console.error('Failed to unlike the resume:', error);
    return true; // エラー時に状態が変わらないようにする
  }
};
