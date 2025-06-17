import LoginHeader from './LoginHeader';
import NotLoginHeader from './NotLoginHeader';
import { useAuth } from '../../hooks/AuthContext';

function Header() {
  const { user } = useAuth();
  return (
    <div className="fixed top-0 left-0 w-full bg-stone-800 shadow-md z-40 px-4 py-3 h-14 sm:h-16">
      {user ? <LoginHeader /> : <NotLoginHeader />}
    </div>
  );
}

export default Header;
