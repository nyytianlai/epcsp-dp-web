<!--
 * @Author: niyayong
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @Date: 2022-04-18 17:27:54
 * @LastEditTime: 2023-04-12 15:28:54
 * @FilePath: \zndd-web\src\components\layout\components\header.vue
 * @Description: FilePath
-->
<template>
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
.subject-header {
  height: 86px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
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
