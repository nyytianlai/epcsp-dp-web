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
import { setConfig } from '@sutpc/config';
import store from './store'

import '@purge-icons/generated';
import 'virtual:svg-icons-register';

import dayjs from 'dayjs';
import { dayjs as elDayjs } from 'element-plus';
import zhcn from 'dayjs/locale/zh-cn'

dayjs.locale(zhcn);
// 构建后，element-plus是script引入，它里面也有打包一个dayjs
// 需要给这个dayjs也设置中文，否则可能出现日期格式化显示英文的情况
elDayjs.locale(zhcn);

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhLocale
}).use(store);
registerComponents(app);

setupRouter(app);

themeLib.configTheme(['dark']);

themeLib.changeTheme({
  theme: 'dark'
}).then(() => {
  app.mount('#app');
});

// 通过setConfig修改图表的文字缩放倍数
// setConfig({
//   echarts: {
//     fontSizeScale: 2
//   }
// });
// 通过设置根节点文字大小，修改整体的rem尺寸
// document.documentElement.style.fontSize = '24px';