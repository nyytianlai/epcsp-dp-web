<template>
  <locale-provider>
    <div class="subject-layout" :class="{ 'layout-no-header': !showHeader }">
      <header-area v-if="showHeader" />
      <!-- 在h=0不显示头部，飞渡地图头部中间会显示aircity的logo，用这个标记给他遮挡住 -->
      <div class="layout-header-mask"></div>
      <div class="my-tab-wrap">
        <nav-tab ref="navTab" :nav-drop-list="navDropList" v-if="isShowMenu" />
      </div>
      <time-weather v-if="showHeader" />
      <!-- <locale-dropdown class="locale-dropdown-wrap"></locale-dropdown> -->
      <div class="subject-container">
        <div class="main-content">
          <div class="base-ac-wrap">
            <base-ac @aircityObjReady="handleAircityObjReady" />
          </div>

          <expand-btn />
          <!-- <div class="backBox" v-show="currentPosition === '深圳市' && isShowMenu">
            <img src="./images/back.png" alt="" @click="router.push('/overview')" />
          </div> -->
          <Goback
            v-show="currentPosition === '深圳市' && isShowMenu"
            @click="
              router.push({
                path: '/overview',
                query: { h: getHashParam('h') || getUrlParam('h') }
              })
            "
          />
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
          <div
            class="bottom-tabs-box"
            v-if="($route.meta.dropDownList || !isShowMenu) && !showDetail"
          >
            <bottom-tabs />
            <div class="bottom-tabs-bg"></div>
          </div>
        </div>
      </div>

      <PromotionVideo v-if="showPromitionVideo" />
      <UeVideo v-if="showUeVideo" :station="station" />
    </div>
  </locale-provider>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, provide, nextTick } from 'vue';
import { routes, specialRoutes } from '@/router';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMapStore } from '@/stores/map';
import { useUeStore } from '@/stores/ue';
import HeaderArea from './components/header.vue';
import NavTab from './components/nav-tab/index.vue';
import BottomTabs from './components/bottom-tabs/index.vue';
import BaseAc from '@/components/map-layer/layer.vue';
import HawkEye from '@/components/map-layer/hawk-eye.vue';
import TimeWeather from './components/time-weather.vue';
import StationDetail from '@/views/station-detail/index.vue';
import ExpandBtn from './components/expand-btn/index.vue';
import PromotionVideo from '@/components/promotion-video/index.vue';
import UeVideo from '@/components/ue-video/index.vue';
import Goback from '@/components/goback/index.vue';
import LocaleDropdown from '@/components/layout/components/locale-dropdown.vue';
import localeProvider from '@/locales/locale-provider.vue';

import { getHashParam, getUrlParam } from '@sutpc/zebra';

// 当url带参数h=0时，不显示头部
const showHeader = !(getHashParam('h') == '0' || getUrlParam('h') == '0');

const mapStore = useMapStore();
const currentPosition = computed(() => mapStore.currentPosition); //所在位置 深圳市 xx区 xx街道 xx站(取值'')
const store = useVisibleComponentStore();
const uestore = useUeStore();
const wrapperMap = new Map();
const router = useRouter();
const routed = useRoute();
// const navDropList = ref(routes.slice(0, routes.length));
const navDropList = computed(() => {
  return routed.meta.dropDownList
    ? specialRoutes
    : [routes, specialRoutes].find((item) =>
        item.some((o) => o.children.some((el) => el.name === routed.name))
      );
});
const excludeViews = ref([]);
const includeViews = ref([]);
const showComponent = computed(() => store.showComponent);
const showDetail = computed(() => store.showDetail);
const showPromitionVideo = computed(() => store.showPromitionVideo);
const showUeVideo = computed(() => uestore.showUeVideo);
const station = ref('');
const aircityObj = ref(null);
provide('aircityObj', aircityObj);
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
const handleAircityObjReady = (val) => {
  aircityObj.value = val;
};
const routesName = [...routes, ...specialRoutes].map((item) => item.children[0]?.name);
const isShowMenu = computed(
  () =>
    routed.meta.dropDownList ||
    (routed.name && [...routesName].includes(routed.name as string) && !showDetail.value)
);
onMounted(async () => {
  await nextTick();
  getkeepAliveList(routes);
  if (sessionStorage.getItem('promition')) {
    store.changeShowPromitionVideo(false);
  } else {
    store.changeShowPromitionVideo(true);
  }
});
</script>

<style lang="less" scoped>
.subject-layout {
  width: 100%;
  height: 100%;
  background-color: #000317;
  --header-height: 40px;

  --left-width: 21%;
  --right-width: 21%;
  &.layout-no-header {
    --header-height: 0px;

    :deep(.map-left-btn) {
      top: 100px !important;
    }
  }
}

.layout-header-mask {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  // height: 80px;
  // background: #02080b;
  z-index: 18;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.subject-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.time-weather-wrap {
  position: absolute;
  top: 38px;
  right: 20px;
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
  position: relative;
  height: 100%;
  width: 100%;
}
.base-ac-wrap {
  position: relative;
  height: calc(100% + 50px);
  width: 100%;
  transform: translateY(-50px);
}

.my-tab-wrap {
  position: absolute;
  top: calc(var(--header-height));
  left: 50%;
  transform: translateX(-50%) translateY(30px);
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
// .backBox {
//   position: absolute;
//   height: 19.5px;
//   left: 86px;
//   top: 75px;
//   display: flex;
//   background: rgba(4, 22, 43, 0.4);
//   color: #ffffff;
//   z-index: 20;

//   img {
//     height: 24px;
//     width: 24px;
//     border-radius: 1px;
//     cursor: pointer;
//   }
// }
.name {
  position: absolute;
  height: 36px;
  left: 146px;
  top: 68px;
  display: flex;
  background: rgba(4, 22, 43, 0.4);
  border: 1px solid rgba(148, 148, 148, 0.3);
  color: #ffffff;
  z-index: 20;
  padding: 7px 16px;
  color: #fff;
}

.bottom-tabs-box {
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 11;
  .bottom-tabs-bg {
    width: 100%;
    height: 41px;
    background-image: url('./images/bottom-tabs-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }
  :deep(.bottom-tabs) {
    margin: auto;
    position: relative;
    bottom: -4px;
  }
}

.locale-dropdown-wrap {
  position: absolute;
  top: 38px;
  // right: 290px;
  right: 10px;
  width: 20px;
  height: 20px;
  // background: #089be4;
  text-align: center;
  z-index: 100;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
