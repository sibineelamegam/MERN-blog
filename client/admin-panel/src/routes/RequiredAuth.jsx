

import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequiredAuth = ({ allowedRoles }) => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    console.log('RequiredAuth: Still loading, returning null.');
    return null; // Don't render anything while authentication is being checked
  }

  if (!auth) {
    console.log('RequiredAuth: Not authenticated, redirecting to /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Ensure auth.role is accessed safely
  const userRole = auth?.role;
  const userHasRequiredRole = allowedRoles.includes(userRole);

  
  if (userHasRequiredRole) {
    console.log('RequiredAuth: User has required role, rendering Outlet.');
    return <Outlet />;
  }

  console.log('RequiredAuth: User does NOT have required role, redirecting to /unauthorized.');
  return <Navigate to="/unauthorized" replace />;
};

export default RequiredAuth;