import { useContext, createContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  login as loginAction, 
  register as registerAction, 
  logout as logoutAction, 
  fetchCurrentUser as fetchCurrentUserAction 
} from '../store/slices/authSlice';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector(state => state.auth);

  const login = useCallback((credentials) => {
    return dispatch(loginAction(credentials)).unwrap();
  }, [dispatch]);

  const register = useCallback((userData) => {
    return dispatch(registerAction(userData)).unwrap();
  }, [dispatch]);

  const logout = useCallback(() => {
    return dispatch(logoutAction()).unwrap();
  }, [dispatch]);

  const fetchCurrentUser = useCallback(() => {
    return dispatch(fetchCurrentUserAction()).unwrap();
  }, [dispatch]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    fetchCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};