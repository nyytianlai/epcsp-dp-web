/**
 * 本hook将inject逻辑封装, 主要是提升代码语义, 便于阅读, 如下
 *    const { t } = useLocale();
 *    t('home.close');
 */
import { inject, InjectionKey } from 'vue';

export const LOCAL_I18N_KEY: InjectionKey<any> = Symbol('i18n');

export const useLocale = () => {
  const i18n = inject(LOCAL_I18N_KEY);
  console.log(i18n, 'i18n in share')
  const { t, te, ...methods } = i18n;
  console.log(t, 't1111')
  return {
    ...i18n,
  };
};
