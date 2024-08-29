<template>
  <div class="brand-support">
    <title-column title="品牌支持" />
    <div class="brand-support-content" v-loading="loading">
      <div class="left">
        <div
          class="item"
          :class="{ 'mid-left': index == 1 }"
          v-for="(item, index) in leftData"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div class="right">
        <div
          class="item"
          :class="{ 'mid-right': index == 1 }"
          v-for="(item, index) in rightData"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Api from '../api';

const loading = ref(true);
const data = ['比亚迪', '蔚来汽车', '哪吒汽车', '广汽埃安', '大众汽车', '通用汽车'];
const leftData = ref([]);
const rightData = ref([]);

const getData = async () => {
  loading.value = true;
  try {
    data.forEach((v, i) => {
      // 奇数在左
      if (i % 2 === 0) {
        leftData.value.push(v);
      } else {
        rightData.value.push(v);
      }
    });
  } catch (error) {}
  loading.value = false;
};

onMounted(async () => {
  await getData();
});
</script>

<style scoped lang="less">
.brand-support {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;

  .brand-support-content {
    position: relative;
    flex: 1;
    min-height: 0;
    border-radius: 4px;
    background: url('../images/brand-support-bg.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 25px;
    .item {
      width: 100px;
      height: 28px;
      background: rgb(8, 45, 129);
      border: 1px solid rgba(255, 255, 255, 0.41);
      border-radius: 50px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
    }
    .mid-left {
      transform: translateX(-25%);
    }

    .mid-right {
      transform: translateX(25%);
    }
  }
}
</style>
