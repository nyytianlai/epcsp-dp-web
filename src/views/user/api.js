import request from '@sutpc/axios';
export function login(data) {
  return request.post({
    // baseURL: '/web',
    baseURL: import.meta.env.VITE_BASE_PATH + 'web',
    url: '/tpaas-auth/login',
    data
  });
}

export function getProfile() {
  return request.get({
    // baseURL: '/web',
    baseURL: import.meta.env.VITE_BASE_PATH + 'web',
    url: '/tpaas-auth/profile/initialize'
  });
}
