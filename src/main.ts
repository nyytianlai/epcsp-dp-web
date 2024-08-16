import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupRouter } from './router/index.js';
// 请求和loading的配置
import '@/global/js/request';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import zhLocale from 'element-plus/es/locale/lang/zh-cn';
import '@/global/style/main.less';
import registerComponents from '@/global/js/components';
import themeLib from '@sutpc/theme-lib';
import { createPinia } from 'pinia';
// import { setConfig } from '@sutpc/config';

import { setToken } from '@/utils/auth';
import { getUrlParam, getHashParam } from '@sutpc/zebra';

import '@purge-icons/generated';
import 'virtual:svg-icons-register';
import '@/router/permission';
import dayjs from 'dayjs';
import { dayjs as elDayjs } from 'element-plus';
import zhcn from 'dayjs/locale/zh-cn';

import { setConfig } from '@sutpc/config';
import { debounce } from 'lodash-es';
// import { createI18n } from 'vue-i18n';
// import messages from '@/locales/index';
import i18n from '@/locales/i18n';

dayjs.locale(zhcn);
elDayjs.locale(zhcn);
const pinia = createPinia();

const urlToken = getUrlParam('token') || getHashParam('token');

// const curLang = localStorage.getItem('lang') || navigator.language;
// const i18n = createI18n({
//   legacy: false, // 设置为 false，启用 composition API 模式
//   messages,
//   locale: curLang || navigator.language, // zh-CN, en-US
//   availableLocales: ['zh-CN', 'en-US'],
//   sync: true,
//   silentTranslationWarn: true,
//   missingWarn: false,
//   silentFallbackWarn: true
// });

console.log(navigator.language, 'navigator.language');

/**
 * import { useI18n } from "vue-i18n";
 
const { locale } = useI18n();
 
// 切换语言
const changeLocale = (lang) => {
  locale.value = lang;
};

 * 
 */

if (urlToken) {
  setToken(urlToken);
}

themeLib.configTheme(['dark'], {
  loadElCss: false
});

function createRootApp() {
  const app = createApp(App);

  app.use(ElementPlus, {
    locale: zhLocale
  });

  app.use(i18n);

  registerComponents(app);

  setupRouter(app);

  themeLib
    .changeTheme({
      theme: 'dark'
    })
    .then(() => {
      app.mount('#app');
    });

  return app;
}

let app = createRootApp();

const resetScale = () => {
  // 假定1920 1080尺寸的屏幕，在pc端显示器上看，文字需要小一点才合适，一般14px是比较正常的文字大小
  // 但是14px的文字在1920 1080的大屏幕上看时，需要把字放大一些，至于放大多少是在跟设计师讨论之后定的一个倍数
  let commonScale = 1.2;

  let echartsScale = 1.1667;

  if (window.innerWidth <= 1920) {
    commonScale = 1;
    echartsScale = 1;
  }

  const urlScale = getUrlParam('scale') || getHashParam('scale');
  if (urlScale) {
    commonScale = Number(urlScale);
  }

  setConfig({
    // 业务代码中，凡是用设计稿的尺寸来写的，包括style echarts等，都使用config.sizeScale来做缩放
    // 比如某文字在设计稿是32px，则style的fontSize就是：32 * config.sizeScale + 'px'
    sizeScale: (window.innerHeight / 1080) * commonScale,
    // 下面这个配置项请不要使用，它是给默认的echarts尺寸做缩放用的
    echarts: {
      /**
       * 1.1667 = 12 / 14，因为echarts的轴字体大小默认是12，在pc端屏幕看是合适的
       * 但是在大屏端需要放大一些，放大到差不多14像素，然后再做缩放，效果会更好
       **/
      sizeScale: (window.innerHeight / 1080) * commonScale * echartsScale,
      fontSizeScale: (window.innerHeight / 1080) * commonScale * echartsScale
    }
  });

  const rootFontSize = (window.innerHeight / 10) * commonScale;
  document.documentElement.style.fontSize = rootFontSize + 'px';
};
resetScale();

window.addEventListener(
  'resize',
  debounce(() => {
    app.unmount();
    resetScale();
    app = createRootApp();
  }, 500)
);
