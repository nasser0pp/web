import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner'; // Assuming you have this

interface ProtectedRouteProps {
  // children?: React.ReactNode; // Outlet is preferred for nested routes
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { currentUser, loadingAuth } = useAuth();
  const location = useLocation();

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner message="Checking authentication..." />
      </div>
    );
  }

  if (!currentUser) {
    // Redirect them to the /auth page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />; // Render the child route component
};

export default ProtectedRoute;
