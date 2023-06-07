/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-05-16 15:52:44
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-16 15:53:08
 * @FilePath: \epcsp-dp-web\src\global\js\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useUserStore } from '@/stores/user';
// import { ElMessage } from 'element-plus';
import { Message } from './message';
import { getToken } from '@/utils/auth';
import Cookies from 'js-cookie';
import request, {
  // 如果有自定义拦截器的需求，可以用它
  axios
} from '@sutpc/axios';
import pinia from '@/stores/index';
import GlobalConfig from '@/global/config.js';
const store = useUserStore(pinia);
request.config({
  requestPre: import.meta.env.VITE_API_BASEPATH,
  contentType: 'json',
  loading: false,
  // 如果要自定义返回的拦截器，记得把它设置为false
  interceptor: false
});
axios.interceptors.request.use(
  (config) => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    config.headers['sutpc-login-app'] = GlobalConfig.app;
    config.headers['sutpc-login-tenant'] = GlobalConfig.tenant;
    config.headers['login-mode'] = import.meta.env.VITE_LOGIN_MODE;
    const username = sessionStorage.getItem('login-username');
    if (username) {
      config.headers['sutpc-login-username'] = username;
    }
    const profile = sessionStorage.getItem('profile');
    if (getToken() && profile && import.meta.env.VITE_LOGIN_MODE) {
      let profiles = JSON.parse(profile);
      Cookies.set('sutpc-sso-language', profiles.__language);
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// 允许业务自定义返回的拦截器
// axios.interceptors.request.use();
const err = (error) => {
  console.log(error);
  if (error.response) {
    const data = error.response.data;
    // const token = getToken()
    console.log('------异常响应------', error.response.status);
    switch (error.response.status) {
      case 403:
        Message({ type: 'error', message: '用户得到授权，但是访问是被禁止的' });
        break;
      case 500:
        console.log('------error.response------', error.response);
        Message({ type: 'error', message: '服务器错误,请联系管理员' });
        break;
      case 510:
        console.log('------error.response------', error.response);
        if (data.message.includes('认证权限异常')) {
          Message({ type: 'error', message: '很抱歉，登录已过期，请重新登录!' });
          setTimeout(() => {
            sessionStorage.removeItem('profile');
            // removeToken()
            store.removeTokens().then(() => {
              location.reload();
            });
          }, 1000);
        } else {
          Message({ type: 'error', message: error.message });
        }
        break;
      case 404:
        Message({ type: 'error', message: '很抱歉，资源未找到!' });
        break;
      case 504:
        Message({ type: 'error', message: '网络超时' });
        break;
      case 401:
        Message({ type: 'error', message: '用户没有权限（令牌、用户名、密码错误），请重新登录！' });
        store.removeTokens().then(() => {
          location.reload();
        });
        break;
      default:
        Message({ type: 'error', message: data.message });
        break;
    }
  } else if (error.message) {
    if (error.message.includes('timeout')) {
      Message({ type: 'error', message: '网络超时' });
    } else {
      Message({ type: 'error', message: error.message });
    }
  }
  return Promise.reject(error);
};
axios.interceptors.response.use((response) => {
  const res = response;
  if (res && res.status != 200) {
    const type = response.request.responseType;
    if (type === 'blob') {
      return res;
    }
    if (res.status === 510 && res.message.includes('认证权限异常')) {
      Message({ type: 'error', message: '很抱歉，登录已过期，请重新登录!' });
      setTimeout(() => {
        store.removeTokens().then(() => {
          location.reload();
        });
      }, 100);
    } else {
      Message({ type: 'error', message: res.message || 'Error' });
    }
    return Promise.reject(new Error(res.message || 'Error'));
  } else {
    return res.data;
  }
}, err);
