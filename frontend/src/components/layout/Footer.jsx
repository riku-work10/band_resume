import LoginFooter from './LoginFooter';
import { useAuth } from '../../hooks/AuthContext';
import NotLoginFooter from './NotLoginFooter';

function Footer() {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-stone-800 text-white shadow-md z-40 h-16">
        <LoginFooter />
      </div>
    );
  }
  return <NotLoginFooter />;
}

export default Footer;
