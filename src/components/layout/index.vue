<!--
 * @Author: qinyushan
 * @Date: 2021-09-07 16:47:01
 * @LastEditTime: 2023-04-18 15:01:25
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @FilePath: \zndd-web\src\components\layout\index.vue
 * @Description:
-->
<template>
  <div class="subject-layout">
    <header-area
      :title="title"
      :buttom-list="headerButtomList"
      :show-breadcrumb="showBreadcrumb"
      :active-name="activeName"
      :nav-tab-name="navTabName"
    />
    <div class="my-tab-wrap">
      <nav-tab
        ref="navTab"
        :nav-drop-list="navDropList"
        :active-name="activeName"
        :nav-tab-name="navTabName"
      />
    </div>
    <time-weather/>
    <div class="subject-container">
      <div class="main-content">
        <base-ac :cloudHost=cloudHost>
          <router-view v-slot="{ Component, route }">
            <keep-alive :exclude="excludeViews">
              <component :is="wrap(route.fullPath, Component)" :key="route.fullPath" />
            </keep-alive>
          </router-view>
        </base-ac>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderArea from './components/header.vue';
import NavTab from './components/nav-tab/index.vue';
import BaseAc from '@sutpc/vue3-aircity';
import TimeWeather from './components/time-weather.vue'
import { routes } from '@/router';
import { h } from 'vue';
const wrapperMap = new Map();
export default {
  components: {
    HeaderArea,
    NavTab,
    BaseAc
    TimeWeather
  },
  props: {
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
  },
  data() {
<<<<<<< HEAD
    console.log(routes);
    console.log(routes.slice(0, routes.length));
    const cloudHost=import.meta.env.VITE_FD_URL
=======
>>>>>>> a12a6fe9f72ab9cf24fb63c3d89270b9ac73ae23
    return {
      currentTab: 0,
      navDropList: routes.slice(0, routes.length),
      excludeViews: [],
      includeViews: [],
      cloudHost
    };
  },
  computed: {
    aliveViews() {
      const names = [];
      routes.forEach((item) => {
        if (item.children?.length) {
          item.children.forEach((child) => {
            if (child.meta.keepAlive) {
              names.push(child.name);
            }
          });
        } else {
          if (item.meta?.keepAlive) {
            names.push(item.name);
          }
        }
      });
      return names;
    }
  },
  mounted() {
    // this.initCanvas()
    this.$nextTick(() => this.getkeepAliveList(routes));
  },
  methods: {
    getkeepAliveList(list, flag = false) {
      list.forEach((item) => {
        const isDropChildren = flag || item?.meta?.isDropChildren;
        if (item.children?.length) {
          this.getkeepAliveList(item.children, isDropChildren);
        } else {
          if (!item.meta?.keepAlive) {
            this.excludeViews.push(item.realPath || item.path);
          } else {
            if (flag) {
              this.excludeViews.push(item.realPath || item.path);
            } else {
              this.includeViews.push(item.realPath || item.path);
            }
          }
        }
      });
    },
    wrap(fullPath, component) {
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
              return h(
                'div',
                { className: 'vaf-page-wrapper', style: { width: '100%', height: '100%' } },
                component
              );
            }
          };
          wrapperMap.set(wrapperName, wrapper);
        }
        return h(wrapper);
      }
    },
    testRoute(route) {
      console.log(route, this.includeViews, this.includeViews.includes(route), '0100101');
    }
  }
};
</script>

<style lang="less" scoped>
.subject-layout {
  width: 100%;
  height: 100%;

  // background-color: #000527;
  background-color: #000317;

  // background-image: url("~@/assets/images/layout/index/background.png");
  // background-repeat: no-repeat;
  // background-position: center center;
  // background-size: 100% 100%;
}

.subject-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

}
.time-weather-wrap{
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
  &::before {
    content: '';
    position: absolute;
    z-index: 50;
    right: 10px;
    bottom: 10px;
    width: 259px;
    height: 260px;
    background: url(@/assets/images/layout/corner-bgc.png) no-repeat;
    background-size: 100% 100%;
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    z-index: 50;
    left: 10px;
    bottom: 10px;
    width: 259px;
    height: 260px;
    background: url(@/assets/images/layout/corner-bgc.png) no-repeat;
    background-size: 100% 100%;
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    transform-origin: center;
    pointer-events: none;
  }
}
.my-tab-wrap {
  position: absolute;
  top: 44px;
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
</style>
