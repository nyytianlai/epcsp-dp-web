import { createApp } from 'vue';
import { getUrlParam } from '@sutpc/zebra';
import { setConfig } from '@sutpc/config';
import '@/global/style/popup.less';

const com = getUrlParam('com');
const fontSize = getUrlParam('fontSize');
const sizeScale = Number(getUrlParam('sizeScale'));
const echartsScale = Number(getUrlParam('echartsScale'));

setConfig({
  sizeScale,
  echarts: {
    sizeScale: echartsScale
  }
});

document.documentElement.style.fontSize = fontSize;

const loadCom = (comName) => {
  return import(`./popup-views/${comName}/index.vue`);
};

loadCom(com).then((res) => {
  createApp(res.default).mount('#app');
});
