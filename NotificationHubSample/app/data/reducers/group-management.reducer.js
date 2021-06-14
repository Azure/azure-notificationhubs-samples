import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSurveyGroupsAPI,
  createSurveyGroupAPI,
  updateSurveyGroupAPI,
} from '../services/group-management.service';

export const getSurveyGroups = createAsyncThunk(
  'groupManagement/getSurveyGroups',
  async (payload, thunkAPI) => {
    const response = await getSurveyGroupsAPI();
    if (response.isSuccessful === true) {
      return response.data;
    } else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  },
);

export const createSurveyGroup = createAsyncThunk(
  'groupManagement/createSurveyGroup',
  async (payload, thunkAPI) => {
    const response = await createSurveyGroupAPI(payload);
    if (response.isSuccessful === true) {
      return response.data;
    } else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  },
);

export const updateSurveyGroup = createAsyncThunk(
  'groupManagement/updateSurveyGroup',
  async (payload, thunkAPI) => {
    const response = await updateSurveyGroupAPI(payload);
    if (response.isSuccessful === true) {
      return response.data;
    } else {
      thunkAPI.rejectWithValue(response.message);
      throw new Error(response.message);
    }
  },
);

export const updateSurveyGroups = createAsyncThunk(
  'groupManagement/updateSurveyGroups',
  async (payload, thunkAPI) => {
    payload.forEach(async (group) => {
      let response = await updateSurveyGroupAPI(group);
      if (response.isSuccessful === true) {
      } else {
        thunkAPI.rejectWithValue(response.message);
        throw new Error(response.message);
      }
    });
  },
);

const groupManagementSlice = createSlice({
  name: 'groupManagement',
  initialState: {
    groups: [],
  },
  reducers: {
    addUserToGroup: (state, action) => {
      let selectedGroup = state.groups.find(
        (group) => group.id === action.payload.id,
      );
      selectedGroup.applicationUserIds.push(action.payload.userId);
      selectedGroup.modified = true;
    },
    removeUserFromGroup: (state, action) => {
      let selectedGroup = state.groups.find(
        (group) => group.id === action.payload.id,
      );
      selectedGroup.applicationUserIds = selectedGroup.applicationUserIds.filter(
        (id) => id !== action.payload.userId,
      );
      selectedGroup.modified = true;
    },
  },
  extraReducers: {
    [getSurveyGroups.fulfilled]: (state, action) => {
      state.groups = action.payload;
    },
    [createSurveyGroup.fulfilled]: (state, action) => {
      state.groups.push(action.payload);
    },
    [updateSurveyGroup.fulfilled]: (state, action) => {
      let filteredGroups = state.groups.filter(
        (group) => group.id !== action.payload.id,
      );
      state.groups = [...filteredGroups, action.payload];
    },
    [updateSurveyGroups.fulfilled]: (state, action) => {
      let filteredGroups = state.groups.filter(
        (group) => group.modified === true,
      );
      filteredGroups.forEach((group) => (group.modified = false));
    },
  },
});

export const {
  addUserToGroup,
  removeUserFromGroup,
} = groupManagementSlice.actions;
export default groupManagementSlice.reducer;
