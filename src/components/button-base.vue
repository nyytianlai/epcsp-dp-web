<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-12 11:03:37
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-17 18:38:36
 * @FilePath: \epcsp-dp-web\src\components\button.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
