import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', () => {
  const rootFontSize = ref(100);
  const vHeight = ref(1080);
  function changeRootFontSize({ fontSize, height }) {
    rootFontSize.value = fontSize;
    vHeight.value = height;
  }

  return { rootFontSize, vHeight, changeRootFontSize };
});
