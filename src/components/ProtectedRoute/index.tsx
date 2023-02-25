import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isAllowed: boolean;
  redirectPath: string;
  children?: ReactNode;
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath,
  children,
}: Props): JSX.Element => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
