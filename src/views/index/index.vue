<template>
  <div class="index-wrap">
    <el-button type="primary" @click="gotoDemo">
      查看图表、地图、请求、图标等示例代码
    </el-button>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

const gotoDemo = () => {
  router.push('/default-demo');
}

</script>

<style lang="less" scoped>
.index-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}
</style>
