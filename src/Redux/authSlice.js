import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";

const baseUrl = "http://localhost:5000"

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
      return rejectWithValue("SignIn failed! please try again");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    status: "idle",
    message: null,
    user: null,
    token: null
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.status = "idle";
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isLoggedIn = false;
        state.message = action.payload;
      })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;