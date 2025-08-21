import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Pages
import AuthPage from './pages/Auth/Auth';
import WorkspacePage from './pages/Workspace/Workspace';
import ChannelPage from './pages/Channel/Channel';
import DirectMessagePage from './pages/DirectMessage/DirectMessage';
import NotFoundPage from './pages/NotFound/NotFound';

// Components
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex-center" style={{ height: '100vh' }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/auth" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />
        } 
      />
      
      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <WorkspacePage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/workspace/:workspaceId"
        element={
          <ProtectedRoute>
            <WorkspacePage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/channel/:channelId"
        element={
          <ProtectedRoute>
            <ChannelPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/dm/:userId"
        element={
          <ProtectedRoute>
            <DirectMessagePage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <WorkspacePage />
          </ProtectedRoute>
        }
      />
      
      {/* Catch all route - 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;