import { getToken, removeToken } from '@/utils/auth';
import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    token: getToken(),
    name: '',
    phone: '',
    tenant: '',
    profile: {}
  });
  function changeToken(token) {
    state.token = token;
  }
  function changeName(name) {
    state.name = name;
  }
  function changePhone(phone) {
    state.phone = phone;
  }
  function changeTenant(tenant) {
    state.tenant = tenant;
  }

  function changeProfile(profile) {
    state.profile = profile;
  }
  function removeTokens() {
    return new Promise((resolve) => {
      removeToken();
      resolve();
    });
  }
  return {
    state,
    changeToken,
    changeName,
    changePhone,
    changeTenant,
    changeProfile,
    removeTokens
  };
});
