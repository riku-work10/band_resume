import { useLocation } from 'react-router-dom';

const GetPageName = () => {
  const location = useLocation();

  switch (location.pathname) {
    case '/events':
      return 'ライブ一覧';
    case '/myresumes':
      return 'マイ履歴書';
    case '/resumes':
      return '履歴書一覧';
    case '/chat':
      return 'オープンチャット';
    case '/mypage':
      return 'マイページ';
    case '/contact':
      return 'お問い合わせ';
    case '/privacypolicy':
      return 'プライバシーポリシー';
    case '/termspfservice':
      return '利用規約';
    default:
      return 'ハルカミライ';
  }
};

export default GetPageName;
