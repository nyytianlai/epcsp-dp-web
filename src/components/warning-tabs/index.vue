<template>
  <div class="warning-tabs">
    <div
      class="tab"
      v-for="(item, index) in data"
      :key="index"
      :class="[{ active: item.code === activeTab }]"
      @click="handleSelect(item)"
      :style="{ borderBottomColor: item.code === activeTab ? item.color : 'transparent' }"
    >
      <span class="label">
        {{ item.label }}
      </span>
      <span class="bottom-info">
        <icon :icon="`svg-icon:${item.icon}`" />
        <span class="num" :style="{ color: item.color }">
          {{ formatWithToLocalString(item.num) }}
        </span>
      </span>
      <i
        v-if="item.code === activeTab"
        class="triangle"
        :style="{ borderTopColor: item.color }"
      ></i>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref, watch } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import { formatWithToLocalString } from '@/global/commonFun.js';
interface Idata {
  code: string | number;
  label: string;
  icon: string;
  num: string | number;
  color: string;
}
interface Props {
  data: Idata[];
  modelValue?: string | number;
}
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['update:modelValue', 'changeTab']);
const { data, modelValue } = toRefs(props);
const activeTab = ref(modelValue.value ? modelValue.value : data.value[0]?.code);
const handleSelect = (item) => {
  activeTab.value = item.code;
  emit('update:modelValue', item.code);
  emit('changeTab', item);
};
watch(data, (newVal) => {
  const filterItem = newVal.filter((item) => item.num);
  if (filterItem && filterItem?.length) {
    handleSelect(filterItem[0]);
  }
});
</script>
<style lang="less" scoped>
.warning-tabs {
  display: flex;
  // width: 429px;
  width: 100%;
  justify-content: space-around;
  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 6px;
    cursor: pointer;
    &.active {
      position: relative;
      border-bottom: 1.5px solid;
      .triangle {
        content: '';
        position: absolute;
        bottom: -14px;
        left: 50%;
        transform: translateX(-50%);
        border: 7px solid transparent;
      }
    }
    .label {
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      color: #949494;
    }
    .bottom-info {
      margin-top: 5px;
      .el-icon {
        font-size: 22px;
        margin-right: 6px;
      }
      .num {
        font-family: 'DIN Condensed';
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 20px;

        text-align: center;

        color: #fa2a2d;
      }
    }
  }
}
</style>
