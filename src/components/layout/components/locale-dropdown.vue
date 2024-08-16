<script setup>
import Icon from '@sutpc/vue3-svg-icon';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();

const langMap = [
  { lang: 'zh-CN', name: '中文' },
  { lang: 'en-US', name: 'English' },
]; 

const currentLang = ref(langMap.find(item => item.lang === locale.value));

const setLang = (lang) => {
  locale.value = lang;
  currentLang.value = langMap.find((item) => item.lang === lang);
  localStorage.setItem('lang', lang);
}
</script>

<template>
  <el-dropdown trigger="click" @command="setLang">
    <icon icon="svg-icon:switch-lang" class="ml-1" />
    <!-- <span class="ml-1">{{ currentLang.name }}</span> -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langMap"
          :key="item.lang"
          :command="item.lang"
          :style="{ color: item.lang === currentLang.lang ? '#007dff' : '#CFD3DC' }"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style lang="less" scoped>
.locale-dropdown-active {
  color: #007dff;
}

.ml-1:hover{
  cursor: pointer;
}
</style>
