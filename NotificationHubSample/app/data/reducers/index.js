import { combineReducers } from 'redux';

// reducers
import authReducer from './auth.reducer';
import userManagementReducer from './user-management.reducer';
import groupManagementReducer from './group-management.reducer';
import notificationReducer from './notification.reducer';
import dashboardReducer from './dashboard.reducer';

const rootReducer = combineReducers({
  authReducer,
  userManagementReducer,
  groupManagementReducer,
  notificationReducer,
  dashboardReducer,
});

export default rootReducer;
