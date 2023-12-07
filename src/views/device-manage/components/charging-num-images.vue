<template>
  <div class="images-outer-wrap">
    <div class="images-wrap">
      <template v-if="data && data?.length">
        <div
          class="img-content"
          v-for="(item, index) in data"
          :key="index"
          @click="handleClick(item)"
        >
          <div class="img-content__inner">
            <img :src="item.stationPic" alt="" />
            <!-- <span class="type">{{ item.stationType }}</span> -->
            <span class="name text-ellipsis-1">
              <el-tooltip class="box-item" :content="item.stationName" placement="top">
                {{ item.stationName }}
              </el-tooltip>
            </span>
          </div>
        </div>
      </template>
      <no-data v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import bus from '@/utils/bus';

const store = useVisibleComponentStore();
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});
const handleClick = (item) => {
  item['isHr'] = 0;
  bus.emit('toHr', item);
  store.changeShowComponent(false);
  store.changeShowDetail({
    show: true,
    params: item
  });
};
</script>
<style lang="less" scoped>


.images-wrap {
  width: 100%;
  overflow: hidden auto;
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  .img-content {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
    .type {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      line-height: 20px;
      font-weight: 500;
      font-size: 12px;
      background: linear-gradient(90deg, #11467b 0%, rgba(17, 70, 123, 0) 100%);
      padding-left: 8px;
    }
    .name {
      width: 100%;
      height: 36px;
      font-weight: 600;
      font-size: 12px;
      line-height: 36px;
      color: #4bdeff;
      text-align: center;
      background: linear-gradient(10.77deg, #11467b 33.72%, rgba(17, 70, 123, 0) 102.11%);
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
    }
  }
  

  .img-content__inner {
    position: relative;
    width: 100%;
    height: 120px;
  }
}

.images-outer-wrap {
  container-type: inline-size;
  container-name: imageWrap;
}
  @container imageWrap (min-width: 600px) {
    .images-wrap {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr;
    }
  }
</style>
