import apiClient from './apiClient';


//履歴書一覧を取得する
export const getResumes = async () => {
  try {
    const response = await apiClient.get(`/resumes`);
    return response.data; // 取得したデータを返す
  } catch (error) {
    throw new Error('履歴書の取得に失敗しました');
  }
};

// 特定の履歴書を取得する
export const getResume = async (id) => {
  try {
    const response = await apiClient.get(`/resumes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('履歴書の取得に失敗しました');
  }
};

// 特定の履歴書を更新する
export const putResume = async (resumeId, data) => {
  try {
    const response = await apiClient.put(`/resumes/${resumeId}`, { resume: data });
    return response.data;
  } catch (error) {
    throw new Error('履歴書の取得に失敗しました');
  }
};

// 履歴書を新規作成する
export const createResume = async (resumeData) => {
  try {
    const response = await apiClient.post(`/resumes`, { resume: resumeData });
    return response.data;
  } catch (error) {
    throw new Error('履歴書の作成に失敗しました');
  }
};

//履歴書を削除する
export const ResumeDelete = async (id) => {
  try {
    await apiClient.delete(`/resumes/${id}`); // apiClientを使用
  } catch (error) {
    throw new Error('履歴書の削除に失敗しました');
  }
};

//自分の履歴書のみ取得
export const getResumesByUserId = async (userId) => {
  try {
    const response = await apiClient.get(`/resumes?user_id=${userId}`);
    return response.data; // フィルタリングされたデータを返す
  } catch (error) {
    throw new Error('履歴書の取得に失敗しました');
  }
};
