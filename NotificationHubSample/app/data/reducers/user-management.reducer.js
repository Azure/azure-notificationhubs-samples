import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUsersAPI,
  createUserAPI,
} from '../services/user-management.service';

export const getUsers = createAsyncThunk(
  'userManagement/getUsers',
  async (payload, thunkAPI) => {
    const response = await getUsersAPI();
    if (response.isSuccessful === true) {
      return response.data;
    } else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  },
);

export const createUser = createAsyncThunk(
  'userManagement/createUser',
  async (payload, thunkAPI) => {
    const response = await createUserAPI(payload);
    if (response.isSuccessful === true) {
      return response.data;
    } else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  },
);

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState: {
    users: [],
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [createUser.fulfilled]: (state, action) => {},
  },
});

export default userManagementSlice.reducer;
