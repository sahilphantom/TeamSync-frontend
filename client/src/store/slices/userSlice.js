import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchUsers as searchUsersApi, getOnlineUsers as getOnlineUsersApi } from '../../services/users';

// Async thunks
export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchUsersApi(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOnlineUsers = createAsyncThunk(
  'users/getOnlineUsers',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await getOnlineUsersApi(workspaceId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    searchResults: [],
    onlineUsers: [],
    isLoading: false,
    error: null
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    addOnlineUser: (state, action) => {
      const user = action.payload;
      const exists = state.onlineUsers.some(u => u._id === user._id);
      if (!exists) {
        state.onlineUsers.push(user);
      }
    },
    removeOnlineUser: (state, action) => {
      const userId = action.payload;
      state.onlineUsers = state.onlineUsers.filter(user => user._id !== userId);
    },
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;
      const userIndex = state.onlineUsers.findIndex(user => user._id === userId);
      if (userIndex !== -1) {
        state.onlineUsers[userIndex].status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Search users
      .addCase(searchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get online users
      .addCase(getOnlineUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOnlineUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.onlineUsers = action.payload;
      })
      .addCase(getOnlineUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  clearSearchResults, 
  clearError, 
  addOnlineUser, 
  removeOnlineUser, 
  updateUserStatus 
} = userSlice.actions;
export default userSlice.reducer;