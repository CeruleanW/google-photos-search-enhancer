import axios from 'axios';

export async function fetchData(url: string, options?: any) {
  const res = await axios.get(url, options);
  return res?.data;
}

export async function sendPost(url: string, options?: any) {
  const res = await axios.post(url, options);
  return res?.data;
}

/**
 * @description set default axios header for all axios requests
 * @param  {string} token
 */
export function setAxiosDefaultAuthHeader(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function getAxiosDefaultAuthHeader() {
  return axios?.defaults?.headers?.common['Authorization'];
}
