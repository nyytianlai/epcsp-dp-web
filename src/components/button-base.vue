<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-12 11:03:37
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-12 14:44:59
 * @FilePath: \epcsp-dp-web\src\components\button.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="border-out">
    <button class="button-wrap" v-if="type === 'primary'" @click="handleClick">
      <slot />
    </button>
  </div>
</template>
<script setup lang="ts">
interface IYearData {
  label: string | number;
  value: string | number;
}
type Itype = 'primary' | 'year';
interface Props {
  type: Itype;
  yearData: IYearData[];
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
  border-radius: 4px;
  padding: 2px;
  background: linear-gradient(to right, #54b5ff, rgba(84, 181, 255, 0));
  cursor: pointer;
}
.button-wrap {
  cursor: pointer;
  padding: 1px 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  white-space: nowrap;
  border: 0;
  background: linear-gradient(96.34deg, rgba(84, 181, 255, 0.7) 0%, rgba(84, 181, 255, 0) 95%);

  background-clip: padding-box;
  border: 4px;
}
</style>
