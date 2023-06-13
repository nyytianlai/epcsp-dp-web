<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-26 11:35:17
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-04 14:09:50
 * @FilePath: \epcsp-dp-web\src\views\station-detail\components\bottom-tabs.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="bottom-tabs" :class="[`bg-${tabData.length}`]">
    <div
      class="tab"
      :class="[{ active: item.viewOrder === activeTab }]"
      v-for="(item, index) in tabData"
      :key="index"
      @mouseover="handleHover(item)"
      @mouseout="handleOut(item)"
      @click="handleClick(item, '')"
      ref="list"
    >
      <icon :icon="`svg-icon:${item.icon}`" />
      <span class="label">{{ item.viewName }}</span>
      <div
        class="sub-tab"
        v-if="item.secondMenuList && item.secondMenuList?.length"
        :class="[
          {
            active: item.isHover
          }
        ]"
      >
        <div
          class="sub-item"
          @click.stop="handleClick(item, sub)"
          v-for="(sub, ii) in item.secondMenuList"
          :key="ii"
          :class="[{ active: sub.viewOrder === selectIndex }]"
        >
          <div class="sub-item-name" v-if="sub.viewName.length < 7">{{ sub.viewName }}</div>
          <el-tooltip :content="sub.viewName || ''" placement="right" v-else>
            <div class="sub-item-name">{{ sub.viewName }}</div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, toRef, inject } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import bus from '@/utils/bus';
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
interface SubMenu {
  viewName: string;
  viewOrder: string;
  isHover?: boolean;
}
type PropsType = {
  tabData: TabElement[];
};
type TabElement = {
  icon?: string;
  isHover?: boolean;
  viewCode: string;
  viewName: string;
  viewOrder: number;
  viewInfoType: string;
  viewInfo: string;
  secondMenuList: SubMenu[] | null;
};
const props = withDefaults(defineProps<PropsType>(), {
  tabData: () => []
});

const emit = defineEmits('handleSelect');
const { tabData } = toRefs(props);
console.log('传过来的底部菜单数据', tabData);

const selectIndex = ref(null);
const activeTab = ref();
const handleHover = (tab) => {
  tab.isHover = true;
};
const handleOut = (tab) => {
  tab.isHover = false;
};
const tourFun = async (viewArr: []) => {
  await __g.cameraTour.delete('1');
  //通过接口添加导览并播放
  let frames = [];
  //注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
  viewArr.forEach((element) => {
    frames.push(new CameraTourKeyFrame(...element));
  });
  let o = new CameraTourData('1', 'test', frames);
  await __g.cameraTour.add(o);
  __g.cameraTour.play('1');
};
const handleRoaming = async (value) => {
  // if (value.viewOrder === 5) {
  //   __g.camera.set(...JSON.parse(value.viewInfo), 6); //休息区
  // } else if (value.viewOrder === 4) {
  //   tourFun(JSON.parse(value.viewInfo));
  // } else if (value.viewOrder === 3) {
  //   __g.camera.set(...JSON.parse(value.viewInfo), 6); //入口
  // } else if (value.viewOrder === 2) {
  //   __g.camera.set(...JSON.parse(value.viewInfo), 6); //出口
  // } else if (value.viewOrder === 1) {
  //   tourFun(JSON.parse(value.viewInfo));
  // }
  // console.log('ffffffff',JSON.parse(value.iconIdList));

  // console.log(111111111,await __g.marker.get(JSON.parse(value.iconIdList)))
  value.iconIdList ? await __g.marker.show(JSON.parse(value.iconIdList)) : '';
  if (value.viewInfoType === 't1') {
    let time = value.viewName == '车辆充电' ? 3 : 6;
    __g.camera.set(...JSON.parse(value.viewInfo), time);
  } else if (value.viewInfoType === 't2') {
    tourFun(JSON.parse(value.viewInfo));
  }
};
const handleClick = async (item, sub) => {
  await __g.marker.hideByGroupId('stationFacilitiesLabel');
  await __g.cameraTour.pause();
  if (sub) {
    item.isHover = false;
    if (sub.viewOrder === selectIndex.value) {
      bus.emit('resetTab3dt');
      selectIndex.value = null;
      activeTab.value = null;
      return;
    } else {
      selectIndex.value = sub.viewOrder;
      activeTab.value = item.viewOrder;
      handleRoaming(sub);
    }
    bus.emit('handleTabSelect');
  } else {
    if (item.secondMenuList && item.secondMenuList.length) return;
    selectIndex.value = null;
    if (item.viewOrder === activeTab.value) {
      bus.emit('resetTab3dt');
      activeTab.value = null;
      return;
    } else {
      activeTab.value = item.viewOrder;
    }
    handleRoaming(item);
    bus.emit('handleTabSelect', item);
  }
};
</script>
<style lang="less" scoped>
.bottom-tabs {
  width: 1537px;
  height: 65px;
  background: none no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 1001;
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
        :deep(.el-popper) {
          white-space: nowrap;
        }
        .sub-item-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

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

.bg-5 {
  background: url(./images/bottom-bgc.png) no-repeat;
  background-size: 100% 100%;
}

.bg-2 {
  background: url(./images/bg-2.png) no-repeat;
  background-size: 100% 100%;
}
</style>
