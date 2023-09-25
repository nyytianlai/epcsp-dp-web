/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 09:55:35
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-10 12:45:42
 * @FilePath: \epcsp-dp-web\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupRouter } from './router/index.js';
// 请求和loading的配置
import '@/global/js/request';
import ElementPlus from 'element-plus';
import zhLocale from 'element-plus/es/locale/lang/zh-cn'
import '@/global/style/main.less';
import registerComponents from '@/global/js/components';
import themeLib from '@sutpc/theme-lib';
import { createPinia } from 'pinia'
// import { setConfig } from '@sutpc/config';

import { setToken } from '@/utils/auth';
import { getUrlParam, getHashParam } from '@sutpc/zebra';

import '@purge-icons/generated';
import 'virtual:svg-icons-register';
import '@/router/permission'
import dayjs from 'dayjs';
import { dayjs as elDayjs } from 'element-plus';
import zhcn from 'dayjs/locale/zh-cn'

dayjs.locale(zhcn);
// 构建后，element-plus是script引入，它里面也有打包一个dayjs
// 需要给这个dayjs也设置中文，否则可能出现日期格式化显示英文的情况
elDayjs.locale(zhcn);
const pinia = createPinia()

const urlToken = getUrlParam('token') || getHashParam('token');

if (urlToken) {
  setToken(urlToken);
}

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhLocale
}).use(pinia);
registerComponents(app);

setupRouter(app);

themeLib.configTheme(['dark']);

themeLib.changeTheme({
  theme: 'dark'
}).then(() => {
  app.mount('#app');
});