/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-05-16 15:52:44
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-16 15:53:08
 * @FilePath: \epcsp-dp-web\src\global\js\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useUserStore } from '@/stores/user';
import pinia from '@/stores/index';
import { setToken } from '@/utils/auth';
import Cookies from 'js-cookie';
import request, {
  // 如果有自定义拦截器的需求，可以用它
  axios
} from '@sutpc/axios';
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
    if (profile && import.meta.env.VITE_LOGIN_MODE) {
      let profiles = JSON.parse(profile);
      setToken(profiles.__token);
      Cookies.set('sutpc-sso-language', profiles.__language);
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// // 将参数转成md5
// function setObject(obj){
//   let temp = JSON.parse(obj)
//   for(let i in temp){
//     temp[i] = md5(temp[i])
//   }
//   return temp
// }
// 允许业务自定义返回的拦截器
// axios.interceptors.request.use();
// axios.interceptors.response.use();
