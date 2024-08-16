import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { t } = useI18n();

    // 使用 computed 属性来获取翻译文本
    // const welcomeMessage = computed(() => t('welcome'));

    // ...
    return { t };
  }
});
