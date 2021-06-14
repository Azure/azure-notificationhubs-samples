import { api, getAuthHeaders, get } from './services.common';

export const getDashboardInsightsAPI = async (duration) => {
  let url = `${api}dashboard/insights?duration=${duration}`;
  let authHeader = await getAuthHeaders();
  return await get(url, { ...authHeader });
};
