// @mui
// components
// assets
//
import { Navigate, useLocation } from 'react-router';
import { useAuthContext } from './useAuthContext';
import { isPathAuthorized } from './utils';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  children: React.ReactNode;
};

export default function RoleBasedGuard({ children }: RoleBasedGuardProp) {
  // Logic here to get current user role
  const { roles: currentRoles } = useAuthContext();
  const location = useLocation();
  const isAuthorized = isPathAuthorized(currentRoles, location.pathname);
  if (!isAuthorized) {
    return <Navigate to="/not-allowed" />;
  }

  return <>{children}</>;
}
