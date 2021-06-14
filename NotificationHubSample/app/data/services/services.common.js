import axios from 'axios';
import { constants } from '../../config.js';
import AsyncStorage from '@react-native-community/async-storage';

export const api = constants.endpoint;
export const error = (e) => {
  return { status: 'error', isSuccessful: false, message: e };
};
export const success = (data) => {
  return { status: 'success', isSuccessful: true, data: data };
};

export const getAuthHeaders = async () => {
  return {
    Authorization:
      'Bearer ' + (await AsyncStorage.getItem(constants.KEY_AUTH_TOKEN)),
  };
};

export const get = async (url, headers) => {
  try {
    console.log('HTTP GET: ', url);
    let response = await axios.get(url, { headers });
    return success(response.data);
  } catch (e) {
    console.log('HTTP GET: ', url);
    console.log(e);
    return error(e);
  }
};

export const post = async (url, data, headers) => {
  try {
    console.log('HTTP POST: ', url, data);
    let response = await axios.post(url, data, { headers });
    return success(response.data);
  } catch (e) {
    console.log('HTTP POST: ', url, data);
    console.log(e);
    return error(e);
  }
};

export const download = async (url, data, headers) => {
  try {
    console.log('HTTP DOWNLOAD: ', url, data);
    let response = await axios.post(url, data, {
      headers,
      responseType: 'blob',
    });
    return success(response.data);
  } catch (e) {
    console.log('HTTP DOWNLOAD: ', url, data);
    console.log(e);
    return error(e);
  }
};

export const update = async (url, data, headers) => {
  try {
    console.log('HTTP PUT: ', url, data);
    let response = await axios.put(url, data, { headers });
    return success(response.data);
  } catch (e) {
    console.log('HTTP PUT: ', url, data);
    console.log(e);
    return error(e);
  }
};

export const del = async (url, headers) => {
  try {
    console.log('HTTP DELETE: ', url);
    let response = await axios.delete(url, { headers });
    return success(response.data);
  } catch (e) {
    console.log('HTTP DELETE: ', url);
    console.log(e);
    return error(e);
  }
};
