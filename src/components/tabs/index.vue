<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="(item, index) in data"
      :class="[{ active: item.code === activeTab }]"
      @click="handleSelect(item)"
    >
      <span class="label">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Idata {
  code: string | number;
  label: string;
}
interface Props {
  data: Idata[];
  modelValue: string | number;
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
  width: 425px;
  height: 28px;
  background: url(./images/tabs-bgc.png) no-repeat;
  background-size: 100% 21px;
  background-position: 0 7px;
  display: flex;
  align-items: flex-end;
  padding-left: 14px;
  padding-bottom: 3px;
  .tab {
    width: 112px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    cursor: pointer;
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
        width: 100%;
        height: 2px;
        bottom: -3px;
        left: 0;
        background: url(./images/tab-active-bgc.png) no-repeat;
        background-size: 100% 100%;
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
