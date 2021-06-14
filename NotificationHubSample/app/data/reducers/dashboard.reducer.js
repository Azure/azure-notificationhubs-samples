import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardInsightsAPI } from "../services/dashboard.service";

export const getDashboardInsights = createAsyncThunk(
  'dashboard/getDashboardInsights',
  async (payload, thunkAPI) => {
    const response = await getDashboardInsightsAPI(payload);
    if (response.isSuccessful === true) {
      console.log(response.data);
      return response.data;
    } else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardInsight: {
      totalNotificationsSent: 0,
      totalGroups: 0,
      totalUsers: 0,
      notificationTrends: [],
      deviceTrends: [],
    },
  },
  extraReducers: {
    [getDashboardInsights.fulfilled]: (state, action) => {
      state.dashboardInsight = { ...action.payload };
    },
  },
});

export default dashboardSlice.reducer;
