<template>
  <div class="bottom-menu-tabs">
    <div
      class="tab"
      v-for="(item, index) in data"
      :class="[{ active: activeValue ? item.code === activeValue : item.code === activeTab }]"
      @click="handleSelect(item)"
      :key="index"
    >
      <!-- <span class="label">
        {{ item.displayLabel || item.label }}
      </span> -->
      <tooltip-over
        class="label"
        :className="['bottom-menu-label-tooltip', item.code === activeTab ? 'bottom-menu-label-active' : '']"
        :content="item.displayLabel || item.label"
        :ref-name="item.displayLabel || item.displayLabel"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref } from 'vue';
import TooltipOver from '@/components/tooltip-over.vue';
interface Idata {
  code: string | number;
  label: string;
  displayLabel?: string;
}
interface Props {
  data: Idata[];
  modelValue?: string | number;
  activeValue?: string | number;
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
.bottom-menu-tabs {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 1364px;
  height: 111px;
  background: url(./images/bottom-bgc.png) no-repeat;
  background-size: 100% 56px;
  background-position: bottom left;
  pointer-events: none;
  .tab {
    width: 105px;
    height: 83px;
    background: url(./images/normal.png) no-repeat;
    background-size: 100% 75px;
    background-position: bottom left;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-right: 108px;
    cursor: pointer;
    position: relative;

    pointer-events: all;
    &.active {
      background-image: url(./images/active.png);
      &::before {
        content: '';
        width: 90px;
        height: 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 26px;
        background: linear-gradient(180deg, rgba(9, 226, 245, 0) 5.08%, rgba(9, 226, 245) 86%);
        clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 18px 100%, 0 0);
        animation: activeAnimate 1s infinite alternate;
        z-index: -1;
      }
      .label {
        font-weight: 600;
        background: linear-gradient(180deg, #ffffff 62.5%, #0ae3f1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        transform: translateY(8px);
        font-size: 20px;
      }
    }
    &:last-of-type {
      margin-right: 0;
    }
    .label {
      font-size: 18px;
      line-height: 30px;
      transform: translateY(18px);
      transition: all 0.5s;
      color: #e7e7e7;
    }
  }
}
@keyframes activeAnimate {
  from {
    /* pushes the sun down past the viewport */
    height: 0;
    width: 90px;
  }
  to {
    /* returns the sun to its default position */
    height: 56px;
    width: 100px;
  }
}
</style>
