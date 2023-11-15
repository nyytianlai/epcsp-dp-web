<template>
  <div class="border-out button-base" @click="handleClick">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref } from 'vue';
interface IYearData {
  label: string | number;
  value: string | number;
}
type Itype = 'primary' | 'year';
interface Props {
  type?: Itype;
  yearData?: IYearData[];
}
const props = withDefaults(defineProps<Props>(), {
  type: 'primary'
});
const emit = defineEmits(['handleClick']);
const { type } = toRefs(props);
const handleClick = () => {
  emit('handleClick');
};
</script>
<style lang="less" scoped>
.border-out {
  margin: auto;
  width: 80px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 2px transparent;
  border-radius: 4px;
  background-image: linear-gradient(to right, rgba(84, 181, 255, 0.7) 5%, rgba(84, 181, 255, 0)),
    linear-gradient(to right, #54b5ff, rgba(84, 181, 255, 0));
  background-origin: border-box;
  background-clip: content-box, border-box;
  font-size: 14px;
  cursor: pointer;
  font-family: 'PingFang SC';
}
</style>
