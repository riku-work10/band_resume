import apiClient from './apiClient';


//履歴書一覧を取得する
export const getEvents = async () => {
  try {
    const response = await apiClient.get(`/events`);
    return response.data; // 取得したデータを返す
  } catch (error) {
    throw new Error('イベントの取得に失敗しました');
  }
};

// 特定の履歴書を取得する
export const getEvent = async (id) => {
  try {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('イベントの取得に失敗しました');
  }
};

// 特定の履歴書を更新する
export const putEvent = async (eventId, data) => {
  try {
    const response = await apiClient.put(`/events/${eventId}`, { event: data });
    return response.data;
  } catch (error) {
    throw new Error('イベントの更新に失敗しました');
  }
};

// 履歴書を新規作成する
export const createEvent = async (eventData) => {
  try {
    const response = await apiClient.post(`/events`, { event: eventData });
    return response.data;
  } catch (error) {
    throw new Error('イベントの作成に失敗しました');
  }
};

//履歴書を削除する
export const deleteEvent = async (id) => {
  try {
    await apiClient.delete(`/events/${id}`); // apiClientを使用
  } catch (error) {
    throw new Error('イベントの削除に失敗しました');
  }
};

