<template>
  <div class="warning-list" :style="{ height: height }">
    <ul class="content" v-if="data && data.length">
      <li
        class="warning-info"
        :class="{ 'click-item': item.isClick, grey: Number(item.isInvalid) }"
        v-for="(item, index) in data"
        :key="index"
        @click="handleClick(item)"
      >
        <span class="date">{{ item.date ? dayjs(item.date).format('HH:mm:ss') : '--' }}</span>
        <span class="message text-ellipsis-1" v-if="item?.message.length > 12">
          <el-tooltip :content="item.message || ''" placement="top">
            {{ item.message || '' }}
          </el-tooltip>
        </span>
        <span class="message text-ellipsis-1" v-else>
          {{ item.message || '' }}
        </span>
        <span class="area text-ellipsis-1" v-if="item?.area.length > 6">
          <el-tooltip :content="item.area || ''" placement="top">
            {{ item.area || '' }}
          </el-tooltip>
        </span>
        <span class="area" v-else>
          {{ item.area || '' }}
        </span>
      </li>
    </ul>
    <no-data v-else />
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import dayjs from 'dayjs';

interface Idata {
  date: string;
  message: string;
  area: string;
  isClick?: boolean;
  isInvalid?: number | string;
}
interface Props {
  data: Idata[];
  height?: string;
}
const props = withDefaults(defineProps<Props>(), {
  height: ''
});
const emit = defineEmits(['handleClick']);
const { data } = toRefs(props);
const handleClick = (item) => {
  emit('handleClick', item);
};
</script>
<style lang="less" scoped>
.warning-list {
  overflow: hidden auto;
  padding-left: 12px;

  .content {
    padding-left: 14px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 1px;
      border-left: 1px dashed #505050;
    }
  }

  .warning-info {
    line-height: 20px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    position: relative;

    &:last-of-type {
      margin-bottom: 0;
    }

    &::before {
      content: '';
      position: absolute;
      left: -13px;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 4px;
      height: 4px;
      background: #f5af5f;
      border-radius: 50%;
    }

    &.click-item {
      .message {
        cursor: pointer;

        &:hover {
          color: #42aff8;
        }
      }
    }

    .date {
      font-family: 'Helvetica';
      font-style: italic;
      font-weight: 700;
      font-size: 16px;
      color: #86e9ff;
      margin-right: 20px;
    }

    .message {
      flex: 1;
      width: 0;
      // max-width: 140px;
      // min-width: 140px;
      margin-right: 22px;
      color: #fff;
    }

    .area {
      flex: 1;
      width: 0;
      // max-width: 150px;
      // min-width: 120px;
      color: #fff;
    }
  }
}

.warning-list {
  .grey {
    pointer-events: none;
    cursor: not-allowed;
    filter: grayscale(100%);

    .message {
      color: rgba(255, 255, 255, 0.8);
    }

    .area {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
