import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage, selectIsAuthenticated, selectAuth } from "../../store/slices/authSlice";

/**
 * Protects authenticated routes.
 * - Loads auth from localStorage on first mount to support page refresh.
 * - Redirects to /login if not authenticated.
 */
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { status } = useSelector(selectAuth);

  useEffect(() => {
    // On first mount, ensure state matches localStorage
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // While we "load" from storage, avoid a redirect flicker (optional UX nicety)
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
