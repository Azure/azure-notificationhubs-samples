import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getNotificationsAPI,
  sendNotificationAPI,
  registerDeviceAPI,
  deregisterDeviceAPI,
  updateClientAPI,
} from '../services/notification.service';

export const getNotifications = createAsyncThunk(
  'notification/getNotifications',
  async (payload, thunkAPI) => {
    const response = await getNotificationsAPI();
    if (response.isSuccessful === true) {
      return response.data;
    } else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  },
);

export const sendNotification = createAsyncThunk(
  'notification/sendNotification',
  async (payload, thunkAPI) => {
    const response = await sendNotificationAPI(payload);
    if (response.isSuccessful === true) {
      return response.data;
    } else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  },
);

export const registerDevice = createAsyncThunk(
  'notification/registerDevice',
  async (payload, thunkAPI) => {
    const response = await registerDeviceAPI(payload);
    if (response.isSuccessful === true) {
      return response.data;
    }
    else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  }
);

export const deleteDevice = createAsyncThunk(
  'notification/deleteDevice',
  async (payload, thunkAPI) => {
    const response = await deregisterDeviceAPI(payload);
    if (response.isSuccessful === true) {
      return response.data;
    }
    else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  }
)

export const updateDevice = createAsyncThunk(
  'notification/updateDevice',
  async (_, thunkAPI) => {
    const response = await updateClientAPI();
    if (response.isSuccessful === true) {
      return response.data;
    }
    else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
  },
  extraReducers: {
    [getNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload;
    },
    [sendNotification.fulfilled]: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
});

export default notificationSlice.reducer;
