<template>
  <div class="expand-btn" @click="handleClick" :class="[{ collapse: isCollapsed }]">
    <div class="down-wrap"></div>
    <div class="up-wrap"></div>
    <icon :icon="`svg-icon:${isCollapsed ? 'expand' : 'collapse'}`" />
    <span class="text">{{ isCollapsed ? '一键展开' : '一键收起' }}</span>
  </div>
  <div
    class="expand-btn-search expand-btn-right"
    @mouseenter="() => (isSearchCollapsed = true)"
    @mouseleave="() => (isSearchCollapsed = false)"
  >
    <div class="down-wrap"></div>
    <div class="up-wrap"></div>
    <el-autocomplete
      v-if="isSearchCollapsed"
      v-model="searchInput"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入站点名称"
      @select="handleSearch"
      placement="bottom-end"
      class="autocomplete"
      :teleported="false"
      popper-class="popper"
    >
      <!-- <template #suffix>
        <Icon icon="ep:search" color="#fff"/>
      </template> -->
    </el-autocomplete>
    <Icon icon="ep:search" class="search-icon" v-else />
    <!-- <el-input v-model="searchInput" placeholder="请输入站点名称" /> -->
    <!-- <el-button type="primary" @click="handleSearch">搜索</el-button> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import { infoObj, toSingleStation, showStationDetailPanel } from '@/global/config/map';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { stationSearch } from './api.js';

const store = useVisibleComponentStore();
const isCollapsed = ref(false);
const aircityObj = inject<any>('aircityObj');
const searchInput = ref('');
const isSearchCollapsed = ref(false);
// const __g = aircityObj.value?.acApi;
const handleClick = () => {
  isCollapsed.value = !isCollapsed.value;
  store.changeShowPanel(!isCollapsed.value);
  if (store.showDetail) return;
  isCollapsed.value
    ? aircityObj.value?.acApi.camera.set(infoObj.szViewFull, 0.2)
    : aircityObj.value?.acApi.camera.set(infoObj.szView, 0.2);
};

// 远程搜索方法
const querySearchAsync = async (queryString, cb) => {
  if (!queryString) {
    return cb([]);
  }
  let { data: rep } = await stationSearch(queryString);
  console.log('搜索返回的数据', rep);
  if (rep.length) {
    rep.forEach((item) => {
      item.value = `${item.stationName}-${item.operatorName}`;
    });
  } else {
    rep = [{ value: '无匹配结果' }];
  }
  cb(rep);
};

const handleSearch = async (value) => {
  if (value === '无匹配结果') {
    return;
  }
  console.log('搜索框选择数据', value);
  searchInput.value = '';
  isSearchCollapsed.value = false;
  showStationDetailPanel(store, value);
  toSingleStation(aircityObj.value?.acApi, value);
};
</script>
<style lang="less">
.layout-no-header {
  .expand-btn {
    top: 27px;
  }
  .expand-btn-search {
    top: 27px;
  }
}
.expand-btn {
  width: 63px;
  height: auto;
  position: absolute;
  top: 67px;
  left: 0;
  z-index: 999;
  overflow-x: hidden;
  overflow-y: visible;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    width: 122px;
    .text {
      opacity: 1;
    }
  }
  .el-icon {
    font-size: 16px;
    position: absolute;
    top: 11px;
    left: 16px;
  }
  .text {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    position: absolute;
    top: 9px;
    left: 40px;
    white-space: nowrap;
    opacity: 0;
  }
  .down-wrap {
    width: 100%;
    height: 32px;
    background: url(./images/down-bgc.png);
    background-size: 122px 32px;
    background-position: bottom right;
  }
  .up-wrap {
    width: 100%;
    height: 32px;
    background: url(./images/up-bgc.png);
    background-size: 119px 32px;
    background-position: bottom right;
    transform: translate(-3px, -29px);
  }
}
.expand-btn-right {
  .expand-btn();
  &:hover {
    width: 180px;
  }
  right: 0;
  left: unset;
  .down-wrap {
    background-size: 180px 32px;
    transform: rotateY(180deg);
  }
  .up-wrap {
    background-size: 177px 32px;
    transform: rotateY(180deg) translate(-3px, -29px);
  }
  .search-icon {
    position: absolute;
    right: -10px;
    top: 50%;
    font-size: 18px;
    transform: translateY(-14px);
  }
}
.expand-btn-search {
  // height: auto;
  position: absolute;
  top: 67px;
  right: 0;
  z-index: 999;
  overflow-x: visible;
  overflow-y: visible;
  cursor: pointer;
  transition: all 0.5s;
}
.autocomplete {
  width: 145px;
  position: absolute;
  top: 2px;
  right: 5px;
  background: rgba(84, 181, 255, 0.1);
  border-radius: 2px;
  .el-input__wrapper {
    box-shadow: none;
  }
  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
}
.popper {
  width: fit-content;
}
</style>
