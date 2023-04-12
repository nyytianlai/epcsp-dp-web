<template>
  <div class="title-column">
    <span class="title">{{ title }}</span>
    <div class="bottom-bgc"></div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: '我是标题'
});
const { title } = toRefs(props);
</script>
<style lang="less" scoped>
.title-column {
  position: relative;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 27px;
  color: #ffffff;
}
.title {
  position: absolute;
  left: 44px;
  bottom: 24px;
  transform: matrix(1, 0, -0.34, 0.94, 0, 0);
}
.bottom-bgc {
  width: 429px;
  height: 38px;
  background: url(./images/title-column-bgc.png) no-repeat;
  background-size: 100% 100%;
}
</style>
