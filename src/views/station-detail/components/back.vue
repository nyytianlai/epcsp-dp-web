<template>
  <div class="station-back">
    <icon icon="svg-icon:back" class="icon"/>
    <div>{{ name }}</div>
  </div>
</template>
<script lang="ts" setup>
import Icon from '@sutpc/vue3-svg-icon'
const props = defineProps({
  name: {
    type: String,
    default: ''
  }
});
</script>
<style lang="less" scoped>
.station-back{
  background: rgba(4, 22, 43, 0.5);
  border: 1px solid rgba(148, 148, 148, 0.3);
  display: flex;
  align-items: center;
  padding: 7px 12px;
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
  .icon {
    margin-right: 15px;
  }
  cursor: pointer;
}
</style>