import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";
//  https://titantrust-bank.onrender.com
export const baseUrl = "http://localhost:5000";

export const login = createAsyncThunk(
  "auth/login",
  async(values, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, values);
      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "SignIn failed! please try again");
    }
  }
);

export const fetchAdminUser = createAsyncThunk(
  "auth/fetchAdminUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("please login again");
      }
      const response = await axios.get(`${baseUrl}/admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching admin user data");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    admin: null,
    user: null,
    token: null,
    loginStatus: "idle",
    adminStatus: "idle",
    loginMessage: null,
    adminMessage: null
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.admin= null;
      state.user = null;
      state.token = null;
      state.loginStatus = "idle";
      state.adminStatus = "idle";
      state.loginMessage = null;
      state.adminMessage = null;
    },
    clearAdmin: (state) => {
      state.admin = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.isLoggedIn = true;
        state.loginMessage = action.payload.message;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.isLoggedIn = false;
        state.loginMessage = action.payload;
      })
      .addCase(fetchAdminUser.pending, (state) => {
        state.adminStatus = "loading";
      })
      .addCase(fetchAdminUser.fulfilled, (state, action) => {
        state.adminStatus = "succeeded";
        state.admin = action.payload;
      })
      .addCase(fetchAdminUser.rejected, (state, action) => {
        state.adminStatus = "failed";
        state.adminMessage = action.payload;
      });
  }
});

export const { logout, clearAdmin } = authSlice.actions;
export default authSlice.reducer;