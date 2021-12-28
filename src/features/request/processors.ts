export function converObjectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}