<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="(item, index) in data"
      :key="index"
      :class="[{ active: item.code === activeTab }]"
      @click="handleSelect(item)"
    >
      <span class="label">
        {{ item.label }}
      </span>
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref } from 'vue';
interface Idata {
  code: string | number;
  label: string;
}
interface Props {
  data: Idata[];
  modelValue?: string | number;
}
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['update:modelValue', 'changeTab']);
const { data, modelValue } = toRefs(props);
const activeTab = ref(data.value[0]?.code);
const handleSelect = (item) => {
  activeTab.value = item.code;
  emit('update:modelValue', item.code);
  emit('changeTab', item);
};
</script>
<style lang="less" scoped>
.tabs {
  height: 28px;
  background: url(./images/tabs-bgc.png) no-repeat;
  background-size: 100% 25px;
  background-position: 0 3px;
  display: flex;
  align-items: flex-end;
  padding-left: 25px;
  padding-bottom: 3px;
  .tab {
    margin-right: 40px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    white-space: nowrap;
    &:last-of-type {
      margin-right: 0;
    }
    &.active {
      position: relative;
      .label {
        font-size: 18px;
        line-height: 25px;
        color: #ffffff;
      }
      &::after {
        content: '';
        position: absolute;
        width: 112px;
        height: 2px;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(
          270deg,
          rgba(37, 177, 255, 0) 4.73%,
          rgba(255, 255, 255, 0.8) 39.86%,
          rgba(255, 255, 255, 0.8) 51.13%,
          rgba(37, 177, 255, 0) 91.22%
        );
      }
    }
    .label {
      font-size: 16px;
      font-weight: 500;
      line-height: 22px;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
    }
  }
}
</style>
