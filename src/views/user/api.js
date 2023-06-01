import request from '@sutpc/axios';

export function login(data) {
  return request.post({
    baseURL: import.meta.env.VITE_API_BASEMID,
    url: '/tpaas-auth/login',
    data
  });
}

export function getProfile() {
  return request.get({
    baseURL: import.meta.env.VITE_API_BASEMID,
    url: '/tpaas-auth/profile/initialize'
  });
}
