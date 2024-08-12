<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { provide } from 'vue';
import { useI18n } from 'vue-i18n';
import { LOCAL_I18N_KEY } from './use-locale'; 
import messages from './index';

const i18n = useI18n({
  useScope: 'local',
  messages,
})

provide(LOCAL_I18N_KEY, i18n);

</script>

<style lang="less" scoped></style>
