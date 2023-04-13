<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 09:55:35
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-13 09:31:23
 * @FilePath: \epcsp-dp-web\src\views\default-demo\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="index-wrap">
    <div class="index-btn-wrap">
      <el-space wrap>
        <el-button type="primary" @click="gotoEchartsDemo">查看echarts示例</el-button>
        <el-button @click="gotoComDemo">查看自定义组件示例</el-button>
        <el-button @click="gotoRequest">查看http请求示例</el-button>
        <el-button @click="gotoIcon">查看icon示例</el-button>
        <el-button @click="gotoLoading">查看loading示例</el-button>
      </el-space>
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
