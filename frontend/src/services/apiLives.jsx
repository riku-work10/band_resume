import apiClient from './apiClient';

//タグ付きのイベント一覧を取得
export const getEvents = async () => {
  try {
    const response = await apiClient.get(`/events`);
    return response.data; // 取得したデータを返す
  } catch (error) {
    throw new Error('イベントの取得に失敗しました');
  }
};

//特定のイベントを取得
export const getEvent = async (id) => {
  try {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('イベントの取得に失敗しました');
  }
};

//特定のタグが付いたイベントを取得
export const getEventsByTag = async (tagName) => {
  try {
    const response = await apiClient.get(`/events/tagged_events`, {
      params: { tag_name: tagName },
    });
    return response.data;
  } catch (error) {
    throw new Error('タグでのイベント取得に失敗しました');
  }
};

//イベントを新規作成（タグを含む）
export const createEvent = async (eventData, tagNames) => {
  try {
    const response = await apiClient.post(`/events`, {
      event: eventData,
      tag_names: tagNames, // タグも送信
    });
    return response.data;
  } catch (error) {
    throw new Error('イベントの作成に失敗しました');
  }
};

//特定のイベントを更新（タグも更新）
export const putEvent = async (eventId, eventData, tagNames) => {
  try {
    const response = await apiClient.put(`/events/${eventId}`, {
      event: eventData,
      tag_names: tagNames, // タグも送信
    });
    return response.data;
  } catch (error) {
    throw new Error('イベントの更新に失敗しました');
  }
};

//イベントを削除
export const deleteEvent = async (id) => {
  try {
    await apiClient.delete(`/events/${id}`);
  } catch (error) {
    throw new Error('イベントの削除に失敗しました');
  }
};
