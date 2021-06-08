import axios from 'axios';
import { constants } from '../../config';
import { api, success, error } from './services.common';
import AsyncStorage from '@react-native-community/async-storage';

export const checkLoginAPI = async () => {
  let token = await AsyncStorage.getItem(constants.KEY_AUTH_TOKEN);
  if (token === undefined || token === null) {
    console.log('token null or undefined');
    return {
      loggedIn: false,
    };
  } else {
    // check if token is expired
    try {
      let jsonToken = jwt_decode(token, { header: false });
      if (jsonToken.exp < (new Date().getTime() + 1) / 1000) {
        return {
          loggedIn: false,
        };
      } else {
        return {
          loggedIn: true,
          username: await AsyncStorage.getItem(constants.KEY_USER_NAME),
          role: await AsyncStorage.getItem(constants.KEY_USER_ROLE),
        };
      }
    } catch (e) {
      console.log(e);
    }
  }
};


export const loginAuthenticationAPI = async (username, password) => {
  try {
    let response = await axios.post(`${api}authenticate/login`, {
      username,
      password,
    });
    const credentials = response.data;

    // save token
    await AsyncStorage.setItem(constants.KEY_AUTH_TOKEN, credentials.token);
    
    return success(credentials);
  } catch (e) {
    console.log(e);
    if (e.response.status === 401) {
      return error('Invalid username and password');
    } else {
      return error(e);
    }
  }
};

export const logoutUserAPI = async () => {
  await AsyncStorage.clear();
  return true;
};
