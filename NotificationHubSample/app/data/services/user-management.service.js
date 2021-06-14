import { api, getAuthHeaders, post, get } from './services.common';

export const getUsersAPI = async () => {
  let url = `${api}users/getusers`;
  let authHeader = await getAuthHeaders();
  return await get(url, { ...authHeader });
};

export const createUserAPI = async (userInfo) => {
  let url = `${api}authenticate/register`;
  let authHeader = await getAuthHeaders();
  return await post(url, userInfo, { ...authHeader });
};
