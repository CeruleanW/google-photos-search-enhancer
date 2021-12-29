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
export function getAxiosDefaultHeader() {
  return axios.defaults.headers;
}

// return the value in Authorization header
export function getAxiosDefaultAuthHeader() {
  const header = getAxiosDefaultHeader();
  return header.common['Authorization'];
}

export function addAxiosInterceptor(errorCallback: Function) {
  return axios.interceptors.response.use(
    function (response) {
      // console.log(response.request._url);
      // console.log(response?.headers);
      // console.log(response?.request?._headers?.authorization);
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // TODO: if it is invalid token error
      errorCallback(error);
      return Promise.reject(error);
    }
  );
}
