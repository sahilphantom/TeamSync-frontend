import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getChannels, 
  createChannel, 
  getChannel, 
  updateChannel, 
  addChannelMember 
} from '../../services/channels';

// Async thunks
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await getChannels(workspaceId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ workspaceId, channelData }, { rejectWithValue }) => {
    try {
      const response = await createChannel(workspaceId, channelData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchChannel = createAsyncThunk(
  'channels/fetchChannel',
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await getChannel(channelId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateChannelDetails = createAsyncThunk(
  'channels/updateChannel',
  async ({ channelId, data }, { rejectWithValue }) => {
    try {
      const response = await updateChannel(channelId, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addMemberToChannel = createAsyncThunk(
  'channels/addMember',
  async ({ channelId, userId }, { rejectWithValue }) => {
    try {
      const response = await addChannelMember(channelId, userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannel: null,
    isLoading: false,
    error: null
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addMessageToChannel: (state, action) => {
      // This will be handled by message slice
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch channels
      .addCase(fetchChannels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add channel
      .addCase(addChannel.fulfilled, (state, action) => {
        state.channels.push(action.payload.channel);
      })
      // Fetch channel
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.currentChannel = action.payload;
      })
      // Update channel
      .addCase(updateChannelDetails.fulfilled, (state, action) => {
        const index = state.channels.findIndex(
          c => c._id === action.payload.channel._id
        );
        if (index !== -1) {
          state.channels[index] = action.payload.channel;
        }
        if (state.currentChannel && state.currentChannel._id === action.payload.channel._id) {
          state.currentChannel = action.payload.channel;
        }
      })
      // Add member to channel
      .addCase(addMemberToChannel.fulfilled, (state, action) => {
        if (state.currentChannel && state.currentChannel._id === action.payload.channel._id) {
          state.currentChannel = action.payload.channel;
        }
      });
  }
});

export const { setCurrentChannel, clearError } = channelSlice.actions;
export default channelSlice.reducer;