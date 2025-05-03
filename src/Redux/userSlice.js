import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 
import { baseUrl } from './authSlice';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/user/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data.message || 'Error fetching user data');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Server error! Please try again');
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
   }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;