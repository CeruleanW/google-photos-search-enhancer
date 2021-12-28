export const controller = new AbortController();
const signal = controller.signal;

export function createBaseInit(accessToken) {
  let myHeaders = {} as any;
  Object.assign(myHeaders, { 'Content-Type': 'application/json' });
  Object.assign(myHeaders, { Authorization: `Bearer ${accessToken}` });

  const baseInit = {
    headers: myHeaders,
    mode: 'cors',
    signal,
  };

  return baseInit;
}
