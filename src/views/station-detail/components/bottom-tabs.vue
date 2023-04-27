<template>
  <div class="bottom-tabs">
    <div
      class="tab"
      :class="[{ active: item.value === activeTab }]"
      v-for="(item, index) in dataR"
      :key="index"
      @mouseover="handleHover(item)"
      @mouseout="handleOut(item)"
      @click="handleClick(item)"
    >
      <icon :icon="`svg-icon:${item.icon}`" />
      <span class="label">{{ item.label }}</span>
      <div
        class="sub-tab"
        v-if="item.children && item.children?.length"
        :class="[
          {
            active: item.isHover
          }
        ]"
      >
        <div
          class="sub-item"
          @click.stop="handleClick(item, sub)"
          v-for="(sub, ii) in item.children"
          :key="ii"
          :class="[{ active: sub.value === selectIndex }]"
        >
          {{ sub.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, toRef, inject } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import { tabCameraInfo } from '../config.js';
import bus from '@/utils/bus';
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const props = defineProps({
  data: {
    type: Array,
    default: () => [
      {
        label: '视角漫游',
        value: '1',
        icon: 'camera',
        isHover: false,
        children: [
          {
            label: '休息区',
            value: '1-1'
          },
          {
            label: '车行视角',
            value: '1-2'
          },
          {
            label: '停车场入口',
            value: '1-3'
          },
          {
            label: '停车场出口',
            value: '1-4'
          },
          {
            label: '默认视角',
            value: '1-5'
          }
        ]
      },
      {
        label: '站内设施',
        value: '2',
        icon: 'device'
      },
      {
        label: '车辆充电',
        value: '3',
        icon: 'charting'
      },
      {
        label: '电流流转',
        value: '4',
        icon: 'electric'
      },
      {
        label: '运营商分布',
        value: '5',
        icon: 'operator'
      }
    ]
  }
});
const emit = defineEmits('handleSelect');
const { data } = toRefs(props);
const dataR = ref(data.value);
const selectIndex = ref(null);
const activeTab = ref();
const handleHover = (tab) => {
  tab.isHover = true;
};
const handleOut = (tab) => {
  tab.isHover = false;
};
const handleRoaming = (value) => {
  // __g.camera.getAnimationList();// 获取导航列表
  if (value === '1-1') {
    __g.camera.set(504688.403125, 2499655.846718, 113.203554, -28.484086, 143.718093, 2); //休息区
  } else if (value === '1-2') {
    //参数：录制导览的索引序号，从0开始
    __g.camera.playAnimation(2);
  } else if (value === '1-3') {
    __g.camera.set(504690.2866015625, 2499779.48125, 105.225283203125, -41.8230018, 45.9391136, 2); //入口
  } else if (value === '1-4') {
    __g.camera.set(504782.055390625, 2499525.1625, 105.1740625, -27.37429, -76.997833, 2); //出口
  } else if (value === '1-5') {
    //参数：录制导览的索引序号，从0开始
    __g.camera.playAnimation(1);
  }
};
const handleClick = (item, sub) => {
  if (sub) {
    item.isHover = false;
    if (sub.value === selectIndex.value) {
      selectIndex.value = null;
      activeTab.value = null;
    } else {
      selectIndex.value = sub.value;
      activeTab.value = item.value;
      handleRoaming(sub.value);
    }
    emit('handleSelect', sub);
  } else {
    if (item.children && item.children.length) return;
    selectIndex.value = null;
    if (item.value === activeTab.value) {
      activeTab.value = null;
    } else {
      activeTab.value = item.value;
    }
    handleTabView(item.label);
    bus.emit('handleTabSelect', item);
    emit('handleSelect', item);
  }
};

//一级菜单栏切换
const handleTabView = (label: string) => {
  let cameraInfo = tabCameraInfo()[label];
  if (typeof cameraInfo === 'number') {
    __g.camera.playAnimation(cameraInfo);
  } else {
    __g.camera.set(cameraInfo, 2);
  }
};
</script>
<style lang="less" scoped>
.bottom-tabs {
  width: 1537px;
  height: 65px;
  background: url(./images/bottom-bgc.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  .tab {
      display: flex;
      align-items: center;
      margin-right: 34px;
      position: relative;
      cursor: pointer;
      padding-top: 10px;
    &:last-of-type {
      margin-right: 0;
    }
    &.active {
      
      .label {
        color: #fff;
      }
      &::before {
        content: '';
        position: absolute;
        width: 161px;
        height: 58px;
        background: url(./images/tab-active-bgc.png) no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;
      }
    }
    .el-icon {
      font-size: 24px;
    }
    .label {
      margin-left: 6px;
      font-size: 18px;
      line-height: 20px;
      color: rgba(255, 255, 255, 0.6);
    }
    .sub-tab {
      position: absolute;
      width: 144px;
      bottom: 57px;
      left: 50%;
      transform: translateX(-50%);
      height: 0;
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.3s;
      &.active {
        height: auto;
        opacity: 1;
        background: rgba(18, 40, 73, 0.85);
        box-shadow: inset 0px 0px 8px rgba(10, 167, 255, 0.8);
        border-radius: 2px;
        border: 2px solid;
        border-image: linear-gradient(
            360deg,
            rgba(75, 179, 255, 0.53) -12.24%,
            rgba(75, 222, 255, 0) 111.61%
          )
          2;
        padding: 8px 0;
      }
      .sub-item {
        line-height: 32px;
        padding-left: 14px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        &.active {
          background: rgba(84, 181, 255, 0.7);
        }
        &:hover {
          background: rgba(84, 181, 255, 0.7);
        }
      }
    }
  }
}
</style>
