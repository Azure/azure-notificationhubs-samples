import { api, getAuthHeaders, post, get, update, error, del } from './services.common';
import AsyncStorage from '@react-native-community/async-storage';

export const sendNotificationAPI = async (userInfo) => {
  let url = `${api}notification/send`;
  let authHeader = await getAuthHeaders();
  return await post(url, userInfo, { ...authHeader });
};

export const getNotificationsAPI = async () => {
  let url = `${api}notification/get`;
  let authHeader = await getAuthHeaders();
  return await get(url, { ...authHeader });
};

export const saveNotificationTokenAPI = async (token) => {
  await AsyncStorage.setItem('NOTIFICATION_TOKEN', JSON.stringify(token));
}

export const registerDeviceAPI = async (registrationRequest) => {
  let url = `${api}notification/installations`;
  let authHeader = await getAuthHeaders();
  let response = await update(url, registrationRequest, { ...authHeader });
  return response;
};

export const deregisterDeviceAPI = async (deviceId) => {
  let url = `${api}notification/installations/${deviceId}`;
  let authHeader = await getAuthHeaders();
  let response = await del(url, { ...authHeader });
  return response;
};

export const updateClientAPI = async () => {
  let token = await AsyncStorage.getItem('NOTIFICATION_TOKEN');
  let tokenJSON = {};
  if (token !== null) {
    tokenJSON = JSON.parse(token);
  } else {
    return error('Token not found...');
  }

  let notificationHandle = await AsyncStorage.getItem('NOTIFICATION_HANDLE');
  if (notificationHandle !== null) {
    let url = `${api}notification/updateclient?id=${notificationHandle}`;
    let authHeader = await getAuthHeaders();
    let postBody = {
      platform: tokenJSON.os === 'android' ? 'fcm' : 'apns',
      handle: notificationHandle,
      tags: ['site-manager']
    }
    let response = await update(url, postBody, { ...authHeader });
    return response;
  } else {
    return error('Register device first...');
  }
}
