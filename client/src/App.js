import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import store from './store/store';
import { AuthProvider } from './hooks/useAuth';
import { SocketProvider } from './hooks/useSocket';
import ProtectedRoute from './components/common/ProtectedRoute';
import AuthPage from './pages/Auth';
import WorkspacePage from './pages/Workspace';
import ChannelPage from './pages/Channel';
import DirectMessagePage from './pages/DirectMessage';
import NotFoundPage from './pages/NotFound';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <WorkspacePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/channel/:channelId" element={
                    <ProtectedRoute>
                      <ChannelPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/dm/:userId" element={
                    <ProtectedRoute>
                      <DirectMessagePage />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Toaster position="top-right" />
              </div>
            </Router>
          </SocketProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;