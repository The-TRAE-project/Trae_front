import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';

interface Props {
  isAllowed: boolean;
  redirectPath: string;
}

const ProtectedRoute = ({ isAllowed, redirectPath }: Props): JSX.Element => {
  const location = useLocation();
  const { accessToken } = useAppSelector((store) => store.auth);

  return accessToken && isAllowed ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
