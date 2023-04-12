<template>
  <div class="index-wrap">
    <div class="index-btn-wrap">
      <el-button type="primary" @click="gotoEchartsDemo">查看echarts示例</el-button>
      <el-button @click="gotoComDemo">查看自定义组件示例</el-button>
      <el-button @click="gotoRequest">查看http请求示例</el-button>
      <el-button @click="gotoIcon">查看icon示例</el-button>
      <el-button @click="gotoLoading">查看loading示例</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const gotoEchartsDemo = () => {
  router.push('/default-demo/demo/echarts');
};

const gotoComDemo = () => {
  router.push('/default-components');
};

const gotoRequest = () => {
  router.push('/default-demo/demo/request');
};

const gotoIcon = () => {
  router.push('/default-demo/demo/icon');
};

const gotoLoading = () => {
  router.push('/default-demo/demo/loading');
};
</script>

<style lang="less" scoped>
.index-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header-wrap {
  padding-left: 20px;
  line-height: 60px;
  font-size: 20px;
}
.index-btn-wrap {
  flex: 1;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
