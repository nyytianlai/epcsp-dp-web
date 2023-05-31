<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 10:23:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-10 11:13:17
 * @FilePath: \epcsp-dp-web\src\components\layout\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="subject-layout">
    <header-area />
    <time-weather />
    <div class="subject-container iframe-container">
      <div class="main-content">
        <!-- <base-ac :cloudHost=cloudHost :connectCloudManger=false iid="1690982686647"> -->
        <!-- <base-ac :cloudHost="cloudHost" @map-ready="handleMapReady"></base-ac> -->
        <expand-btn />
        <router-view v-slot="{ Component, route }">
          <keep-alive :exclude="excludeViews">
            <Transition>
              <component
                v-show="showComponent"
                :is="wrap(route.fullPath, Component)"
                :key="route.fullPath"
              />
            </Transition>
          </keep-alive>
        </router-view>
        <Transition>
          <station-detail v-if="showDetail" />
        </Transition>
      </div>
    </div>
    <PromotionVideo v-if="showPromitionVideo" />
    <UeVideo v-if="showUeVideo" :station="station" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, provide, nextTick } from 'vue';
import HeaderArea from '@/components/layout/components/header.vue';
import NavTab from '@/components/layout/components/nav-tab/index.vue';
import PromotionVideo from '@/components/promotion-video/index.vue';
import UeVideo from '@/components/ue-video/index.vue';
import BaseAc from '@sutpc/vue3-aircity';
import TimeWeather from '@/components/layout/components/time-weather.vue';
import StationDetail from '@/views/station-detail/index.vue';
import ExpandBtn from '@/components/layout/components/expand-btn/index.vue';
import bus from '@/utils/bus';
import { routes } from '@/router';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useUeStore } from '@/stores/ue';
import { useMapStore } from '@/stores/map';
import { storeToRefs } from 'pinia';
import { h } from 'vue';

const store = useVisibleComponentStore();
const uestore = useUeStore();
const { treeInfo } = storeToRefs(useMapStore());
const wrapperMap = new Map();
const props = defineProps({
  title: {
    type: String,
    default: '电力充储放一张图'
  },
  activeName: {
    type: String,
    default: ''
  },
  headerButtomList: {
    type: Array,
    default: () => {
      return [];
    }
  },
  width: {
    type: Number,
    default: 1920
  },
  height: {
    type: Number,
    default: 1080
  },
  showBreadcrumb: {
    type: Boolean,
    default: true
  },
  navTabName: {
    type: String,
    default: ''
  }
});
const currentTab = ref(0);
const navDropList = ref(routes.slice(0, routes.length));
const excludeViews = ref([]);
const includeViews = ref([]);
const cloudHost = ref(import.meta.env.VITE_FD_URL);
const aircityObj = ref(null);
const showComponent = computed(() => store.showComponent);
const showPromitionVideo = computed(() => store.showPromitionVideo);
const showUeVideo = computed(() => uestore.showUeVideo);
const showDetail = computed(() => store.showDetail);
const station = ref('');
onMounted(async () => {
  await nextTick();
  getkeepAliveList(routes);
  bus.on('changeStation', (val) => {
    console.log(val);
    station.value = val;
  });
});
onUnmounted(() => {
  bus.off('changeStation');
});
const getkeepAliveList = (list, flag = false) => {
  list.forEach((item) => {
    const isDropChildren = flag || item?.meta?.isDropChildren;
    if (item.children?.length) {
      getkeepAliveList(item.children, isDropChildren);
    } else {
      if (!item.meta?.keepAlive) {
        excludeViews.value.push(item.realPath || item.path);
      } else {
        if (flag) {
          excludeViews.value.push(item.realPath || item.path);
        } else {
          includeViews.value.push(item.realPath || item.path);
        }
      }
    }
  });
};
const wrap = (fullPath, component) => {
  let wrapper;
  // 重点就是这里，这个组件的名字是完全可控的，
  // 只要自己写好逻辑，每次能找到对应的外壳组件就行，完全可以写成任何自己想要的名字
  // 这就能配合 keep-alive 的 include 属性可控地操作缓存
  if (component) {
    const wrapperName = fullPath;
    if (wrapperMap.has(wrapperName)) {
      wrapper = wrapperMap.get(wrapperName);
    } else {
      wrapper = {
        name: wrapperName,
        render() {
          return h('div', { className: 'vaf-page-wrapper' }, component);
        }
      };
      wrapperMap.set(wrapperName, wrapper);
    }
    return h(wrapper);
  }
};
const handleMapReady = async (obj) => {
  aircityObj.value = obj;
  window.aircityObj = obj;
  const ref = await aircityObj.value.acApi.infoTree.get();
  treeInfo.value = ref.infotree;
  console.log('图层树数据', treeInfo.value);
};
provide('aircityObj', aircityObj);
</script>

<style lang="less" scoped>
.vaf-page-wrapper {
  width: 100%;
  height: 100%;
}
.subject-layout {
  width: 100%;
  height: 100%;
  background-color: #000317;
}

.subject-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.iframe-container {
  z-index: 20;
}
.time-weather-wrap {
  position: absolute;
  top: 52px;
  right: 40px;
  z-index: 999;
}

#subject-layout-wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}
.main-content {
  height: 100%;
  width: 100%;
}
.my-tab-wrap {
  position: absolute;
  top: 68px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  .date-picker {
    position: absolute;
    flex: 0 0 1.8rem;
    height: 0.36rem;
    background: rgba(84, 181, 255, 0.1);
    border-radius: 2px;

    :deep(.ant-input) {
      height: 0.36rem;
      color: #fff;
      font-size: 0.18rem;
      line-height: 0.36rem;
      background: rgba(84, 181, 255, 0.1);
      border: 1px solid rgba(84, 181, 255, 0.3);
    }

    svg,
    :deep(.ant-calendar-picker-icon) {
      color: rgba(84, 181, 255, 0.5);
    }
  }

  .search {
    position: absolute;
    top: 0;
    right: 0.6rem;
    width: 1.8rem;
    :deep(.ioc-input) {
      height: 0.36rem;
      color: #fff;
      font-size: 0.18rem;
      line-height: 0.36rem;
      background: rgba(84, 181, 255, 0.1);
      border: 1px solid rgba(84, 181, 255, 0.3);
    }
  }
}
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.button-close {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
