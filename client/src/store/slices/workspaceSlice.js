import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getWorkspaces, 
  createWorkspace, 
  getWorkspace, 
  updateWorkspace, 
  inviteToWorkspace,
  joinWorkspace 
} from '../../services/workspaces';

// Async thunks
export const fetchWorkspaces = createAsyncThunk(
  'workspaces/fetchWorkspaces',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWorkspaces();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addWorkspace = createAsyncThunk(
  'workspaces/addWorkspace',
  async (workspaceData, { rejectWithValue }) => {
    try {
      const response = await createWorkspace(workspaceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchWorkspace = createAsyncThunk(
  'workspaces/fetchWorkspace',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await getWorkspace(workspaceId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateWorkspaceDetails = createAsyncThunk(
  'workspaces/updateWorkspace',
  async ({ workspaceId, data }, { rejectWithValue }) => {
    try {
      const response = await updateWorkspace(workspaceId, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const inviteUserToWorkspace = createAsyncThunk(
  'workspaces/inviteUser',
  async ({ workspaceId, email }, { rejectWithValue }) => {
    try {
      const response = await inviteToWorkspace(workspaceId, email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const joinWorkspaceWithCode = createAsyncThunk(
  'workspaces/joinWorkspace',
  async (inviteCode, { rejectWithValue }) => {
    try {
      const response = await joinWorkspace(inviteCode);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState: {
    workspaces: [],
    currentWorkspace: null,
    isLoading: false,
    error: null
  },
  reducers: {
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addMemberToWorkspace: (state, action) => {
      if (state.currentWorkspace) {
        state.currentWorkspace.members.push(action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch workspaces
      .addCase(fetchWorkspaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workspaces = action.payload;
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add workspace
      .addCase(addWorkspace.fulfilled, (state, action) => {
        state.workspaces.push(action.payload.workspace);
      })
      // Fetch workspace
      .addCase(fetchWorkspace.fulfilled, (state, action) => {
        state.currentWorkspace = action.payload;
      })
      // Update workspace
      .addCase(updateWorkspaceDetails.fulfilled, (state, action) => {
        const index = state.workspaces.findIndex(
          w => w._id === action.payload.workspace._id
        );
        if (index !== -1) {
          state.workspaces[index] = action.payload.workspace;
        }
        if (state.currentWorkspace && state.currentWorkspace._id === action.payload.workspace._id) {
          state.currentWorkspace = action.payload.workspace;
        }
      })
      // Invite user
      .addCase(inviteUserToWorkspace.fulfilled, (state, action) => {
        if (state.currentWorkspace && state.currentWorkspace._id === action.payload.workspace._id) {
          state.currentWorkspace = action.payload.workspace;
        }
      });
  }
});

export const { setCurrentWorkspace, clearError, addMemberToWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;