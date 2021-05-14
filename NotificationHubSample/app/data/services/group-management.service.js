import { PushNotificationIOS } from 'react-native';
import { api, getAuthHeaders, post, get, update } from './services.common';

export const createSurveyGroupAPI = async (groupInfo) => {
  let url = `${api}SurveyGroup/creategroup`;
  let authHeader = await getAuthHeaders();
  return await post(url, groupInfo, { ...authHeader });
};

export const updateSurveyGroupAPI = async (groupInfo) => {
  let url = `${api}SurveyGroup/updategroup`;
  let authHeader = await getAuthHeaders();
  return await update(url, groupInfo, { ...authHeader });
};

export const getSurveyGroupsAPI = async () => {
  let url = `${api}SurveyGroup/getgroups`;
  let authHeader = await getAuthHeaders();
  return await get(url, { ...authHeader });
};
