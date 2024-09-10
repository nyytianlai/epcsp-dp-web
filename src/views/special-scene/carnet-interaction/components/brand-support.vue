<template>
  <div class="brand-support">
    <title-column title="品牌支持" />
    <div class="brand-support-content" v-loading="loading">
      <div class="brand">
        <div class="left">
          <div
            class="item"
            :class="{ 'mid-left': index == 1 }"
            v-for="(item, index) in leftData"
            :key="index"
          >
            <img :src="item.icon" />
            <span>{{ item.label }}</span>
          </div>
        </div>
        <div class="right">
          <div
            class="item"
            :class="{ 'mid-right': index == 1 }"
            v-for="(item, index) in rightData"
            :key="index"
          >
            <img :src="item.icon" />
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Api from '../api';

const loading = ref(true);
const data = ['比亚迪', '广汽', '北汽', '长城', '大众', '蔚来'];
const imgData = [
  new URL('../images/byd-icon.png', import.meta.url).href,
  new URL('../images/gq-icon.png', import.meta.url).href,
  new URL('../images/bq-icon.png', import.meta.url).href,
  new URL('../images/cc-icon.png', import.meta.url).href,
  new URL('../images/dz-icon.png', import.meta.url).href,
  new URL('../images/wl-icon.png', import.meta.url).href
];
const leftData = ref([]);
const rightData = ref([]);

const getData = async () => {
  loading.value = true;
  try {
    data.forEach((v, i) => {
      // 奇数在左
      if (i % 2 === 0) {
        leftData.value.push({
          label: v,
          icon: imgData[i]
        });
      } else {
        rightData.value.push({
          label: v,
          icon: imgData[i]
        });
      }
    });
    console.log('leftData :>> ', leftData.value);
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
    .brand {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 5px;
      animation: rotateParent 15s linear infinite;
      .item {
        width: 60px;
        height: 60px;
        background: rgb(8, 45, 129);
        border: 4px solid rgba(255, 255, 255, 0.41);
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 12px;
        animation: rotateItem 15s linear infinite;
        img {
          scale: 0.8;
        }
      }
      .left,
      .right {
        margin: 0 12px;
      }
      // .left:nth-child(1) {
      //   transform: rotate(0deg) translateY(-85px);
      // }
      // .left:nth-child(2) {
      //   transform: rotate(45deg) translateY(-85px);
      // }
      // .left:nth-child(3) {
      //   transform: rotate(90deg) translateY(-85px);
      // }
      // .right:nth-child(1) {
      //   transform: rotate(135deg) translateY(-85px);
      // }
      // .right:nth-child(2) {
      //   transform: rotate(180deg) translateY(-85px);
      // }
      // .right:nth-child(3) {
      //   transform: rotate(225deg) translateY(-85px);
      // }
      .mid-left {
        animation: rotateMidLeftItem 15s linear infinite;
      }

      .mid-right {
        animation: rotatemidRightItem 15s linear infinite;
      }
    }
  }
}
// @media screen and (min-width: 3200px) {
//   .brand-support {
//     height: 26%;
//     .brand-support-content {
//       .item {
//         margin-bottom: 20px;
//       }
//     }
//   }
// }

@keyframes rotateParent {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotateItem {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
@keyframes rotateMidLeftItem {
  from {
    transform: translateX(-40px) rotate(360deg);
  }
  to {
    transform: translateX(-40px) rotate(0deg);
  }
}
@keyframes rotatemidRightItem {
  from {
    transform: translateX(40px) rotate(360deg);
  }
  to {
    transform: translateX(40px) rotate(0deg);
  }
}
</style>
