import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers as searchUsersAction } from '../store/slices/userSlice';

export const useUsers = () => {
  const dispatch = useDispatch();
  const { searchResults, isLoading, error } = useSelector(state => state.users);

  const searchUsers = useCallback((query) => {
    return dispatch(searchUsersAction(query)).unwrap();
  }, [dispatch]);

  return {
    searchResults,
    isLoading,
    error,
    searchUsers
  };
};