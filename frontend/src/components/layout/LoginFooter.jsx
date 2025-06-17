import { Link, useLocation } from 'react-router-dom';
import { MdPerson, MdChat, MdMenuBook, MdOutlinePersonAddAlt1, MdMic } from 'react-icons/md';

function LoginFooter() {
  const location = useLocation();

  return (
    <nav aria-label="ログインユーザーフッターナビ">
      <ul className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-2 text-xs sm:text-base">
        {[
          { to: '/events', icon: <MdMic className="text-xl sm:text-2xl" />, label: 'ライブ一覧' },
          { to: '/myresumes', icon: <MdOutlinePersonAddAlt1 className="text-xl sm:text-2xl" />, label: 'マイ履歴書' },
          { to: '/resumes', icon: <MdMenuBook className="text-xl sm:text-2xl" />, label: '履歴書一覧' },
          { to: '/chat', icon: <MdChat className="text-xl sm:text-2xl" />, label: 'オープンチャット' },
          { to: '/mypage', icon: <MdPerson className="text-xl sm:text-2xl" />, label: 'マイページ' },
        ].map(({ to, icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`flex flex-col items-center gap-1 ${
                location.pathname === to ? 'text-orange-500' : 'text-stone-300 hover:text-orange-400'
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LoginFooter;
