import { createI18n } from 'vue-i18n';
import messages from '@/locales/index';

// 创建 i18n 实例
const curLang = localStorage.getItem('lang') || navigator.language;
// const curLang = 'zh-CN';
const i18n = createI18n({
  legacy: false, // 设置为 false，启用 composition API 模式
  messages,
  locale: curLang || navigator.language, // zh-CN, en-US
  availableLocales: ['zh-CN', 'en-US'],
  sync: true,
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true
});

export default i18n;
