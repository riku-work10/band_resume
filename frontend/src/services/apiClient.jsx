import axios from 'axios';

// axiosインスタンスを作成　user認証用のaxiosみたいなイメージ
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/${process.env.REACT_APP_API_VERSION}`, // APIのベースURL
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストを送るたびに、トークンを自動で追加する
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');

  // トークンがあればヘッダーに追加
  if (token && client && uid) {
    config.headers['access-token'] = token;
    config.headers['client'] = client;
    config.headers['uid'] = uid;
  }

  return config;
});

export default apiClient;