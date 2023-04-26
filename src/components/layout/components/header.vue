<!--
 * @Author: niyayong
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @Date: 2022-04-18 17:27:54
 * @LastEditTime: 2023-04-21 14:05:21
 * @FilePath: \zndd-web\src\components\layout\components\header.vue
 * @Description: FilePath
-->
<template>
  <div class="header-bgc">

  </div>
  <div class="subject-header">
    <div class="header-title ioc-text-heavy"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    activeName: {
      type: String,
      default: ''
    },
    buttomList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    navTabName: {
      type: String,
      default: ''
    }
  },
  methods: {
    headerButtomClick(item) {
      if (item.click) {
        item.click.apply(this);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header-bgc {
  background: linear-gradient(
    180deg,
    #000f2b 0%,
    #001428 22.32%,
    rgba(0, 20, 41, 0.5) 44.46%,
    rgba(0, 15, 43, 0) 95.21%
  );
  border-radius: 4px;
  position: absolute;
  width: 100%;
  height: 240px;
  top: 0;
  left: 0;
  z-index: 19;
}
.subject-header {
  height: 80px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  background-image: url(@/assets/images/layout/header.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.breadcrumb {
  position: absolute;
  left: 3.1%;
  top: 16%;
}

.buttom-group {
  display: flex;
  position: absolute;
  font-size: 22px;
  top: 40%;
  right: 3.2%;
  flex-direction: row;
  justify-content: space-between;
  width: 135px;
}

.header-title {
  -webkit-line-clamp: 2;
  background-image: -webkit-linear-gradient(bottom, #5e7eda, #ffffff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 33.79px;
  font-weight: bolder;
  font-family: 'PingFangSC';
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
}

.header-buttom-icon {
  cursor: pointer;
}
</style>
