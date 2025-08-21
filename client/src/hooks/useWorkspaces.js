import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchWorkspaces as fetchWorkspacesAction, 
  addWorkspace as addWorkspaceAction,
  fetchWorkspace as fetchWorkspaceAction,
  updateWorkspaceDetails as updateWorkspaceAction,
  inviteUserToWorkspace as inviteUserAction,
  joinWorkspaceWithCode as joinWorkspaceAction
} from '../store/slices/workspaceSlice';

export const useWorkspaces = () => {
  const dispatch = useDispatch();
  const { workspaces, currentWorkspace, isLoading, error } = useSelector(state => state.workspaces);

  const fetchWorkspaces = useCallback(() => {
    return dispatch(fetchWorkspacesAction()).unwrap();
  }, [dispatch]);

  const addWorkspace = useCallback((workspaceData) => {
    return dispatch(addWorkspaceAction(workspaceData)).unwrap();
  }, [dispatch]);

  const fetchWorkspace = useCallback((workspaceId) => {
    return dispatch(fetchWorkspaceAction(workspaceId)).unwrap();
  }, [dispatch]);

  const updateWorkspace = useCallback((workspaceId, data) => {
    return dispatch(updateWorkspaceAction({ workspaceId, data })).unwrap();
  }, [dispatch]);

  const inviteUser = useCallback((workspaceId, email) => {
    return dispatch(inviteUserAction({ workspaceId, email })).unwrap();
  }, [dispatch]);

  const joinWorkspace = useCallback((inviteCode) => {
    return dispatch(joinWorkspaceAction(inviteCode)).unwrap();
  }, [dispatch]);

  return {
    workspaces,
    currentWorkspace,
    isLoading,
    error,
    fetchWorkspaces,
    addWorkspace,
    fetchWorkspace,
    updateWorkspace,
    inviteUser,
    joinWorkspace
  };
};