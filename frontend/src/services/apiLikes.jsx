import apiClient from "./apiClient";

//履歴書
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

//イベント
// いいね状態を取得するAPIリクエスト
export const fetchLikeStatusEvent = async (eventId) => {
  try {
    const response = await apiClient.get(`/events/${eventId}/liked_by_current_user`);
    return response.data.liked; // APIのレスポンスからいいね状態を取得
  } catch (error) {
    console.error('Failed to fetch like status:', error);
    return false; // エラー時はデフォルトで false
  }
};

// いいねを追加
export const likeEvent = async (eventId) => {
  try {
    const response = await apiClient.post(`/events/${eventId}/event_likes`);
    return response.data.liked;
  } catch (error) {
    console.error('Failed to like the event:', error);
    return false;
  }
};

// いいねを削除
export const unlikeEvent = async (eventId) => {
  try {
    const response = await apiClient.delete(`/events/${eventId}/event_likes`);
    return response.data.liked;
  } catch (error) {
    console.error('Failed to unlike the event:', error);
    return true; // エラー時に状態が変わらないようにする
  }
};