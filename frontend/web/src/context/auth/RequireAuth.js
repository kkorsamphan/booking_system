import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import useAuth from './useAuth';

const RequireAuth = ({ children }) => {
  const { userId } = useAuth();
  const location = useLocation();

  if (!userId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
