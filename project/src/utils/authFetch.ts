export const authFetch = async (
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem('token');

  const headers = {
    ...(init.headers || {}),
    ...(token ? { Authorization: token } : {}),
    'Content-Type': 'application/json'
  };

  const updatedInit: RequestInit = {
    ...init,
    headers
  };

  return fetch(input, updatedInit);
};
