import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './authSlice';

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if(!token) {
        return rejectWithValue('Authentication token not found. Please log in again.');
      }
      const response = await axios.get(`${baseUrl}/admin/allUsers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status) {
        return response.data.user;
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        return rejectWithValue('Unauthorized. Please login again.');
      }
      return rejectWithValue(error.response?.data?.message || 'Server error! Please try again');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete( `${baseUrl}/admin/deleteUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "server error! pls try again" });
    }
  }
);

export const topUpUserBalance = createAsyncThunk(
  'admin/topUpUserBalance',
  async ({ userId, type, amount, desc, date }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(`${baseUrl}/admin/updateBalance/${userId}`, { type, amount, desc, date }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "server error! pls try again" });
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    fetchStatus: "idle",
    fetchError: null,
    actionStatus: null,
    actionError: null
  },
  reducers: {
    addUserToState: (state, action) => {
      state.users.push(action.payload);
    },
    clearUsers: (state) => {
      state.users = [];
      state.status = "idle";
      state.error = null;
      state.actionStatus = null;
      state.actionError = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.fetchStatus = "loading";
    })
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.fetchStatus = "succeeded";
      state.users = action.payload;
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
      state.fetchStatus = "failed";
      state.fetchError = action.payload;
    })
    .addCase(deleteUser.pending, (state) => {
      state.actionStatus = "loading";
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.actionStatus = "succeeded";
      state.users = state.users.filter(user => user._id !== action.payload.userId);
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.actionStatus = "failed";
      state.actionError = action.payload;
    })
    .addCase(topUpUserBalance.pending, (state) => {
      state.actionStatus = "loading";
    })
    .addCase(topUpUserBalance.fulfilled, (state, action) => {
      state.actionStatus = "succeeded";
      const { userId, newBalance } = action.payload;
      const user = state.users.find(user => user._id === userId);
      if (user) {
        user.balance = newBalance;
      } 
    })
    .addCase(topUpUserBalance.rejected, (state, action) => {
      state.actionStatus = "failed";
      state.actionError = action.payload;
    });
   }
});

export const { addUserToState, clearUsers } = adminSlice.actions;
export default adminSlice.reducer;