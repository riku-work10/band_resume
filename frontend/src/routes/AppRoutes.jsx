import { useAuth } from '../hooks/AuthContext';
import ProctedAppRoutes from './ProctedAppRoutes';
import PublicAppRoutes from './PublicAppRoutes.';

function AppRoutes() {
  const { user } = useAuth();
  return <div>{user ? <ProctedAppRoutes /> : <PublicAppRoutes />}</div>;
}

export default AppRoutes;
