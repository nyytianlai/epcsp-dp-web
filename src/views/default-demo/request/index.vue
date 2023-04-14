<template>
  <div>请求结果：{{ requestResult }}</div>
</template>

<script setup>
import { ref } from 'vue';
import api from './api';

const requestResult = ref('');

api
  .getPage({
    params: {
      id: '2bf5b3533afe856b858a251021e78dab'
    }
  })
  .then((res) => {
    requestResult.value = JSON.stringify(res);
  });
</script>
