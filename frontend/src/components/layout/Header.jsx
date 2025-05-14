import LoginHeader from "./LoginHeader";
import NotLoginHeader from "./NotLoginHeader";
import { useAuth } from '../../hooks/AuthContext';

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="fixed top-0 left-0 w-full bg-stone-600 shadow-md z-50 p-4 h-14">
      { user ? <LoginHeader /> : <NotLoginHeader />}
    </div>
  )
};

export default Header;