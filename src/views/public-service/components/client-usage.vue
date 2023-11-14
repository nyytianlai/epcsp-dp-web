<template>
  <div class="charging-realtime-power">
    <icon icon="svg-icon:client-usage" />
    <div class="num-info">
      <span class="num">
        {{ formatWithToLocalString(data) }}
      </span>
      <span class="unit-info">客户端注册用户/人</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import { formatWithToLocalString } from '@/global/commonFun.js';

const props = defineProps({
  data: {
    type: [String, Number],
    default: 0
  }
});
const { data } = toRefs(props);
</script>
<style lang="less" scoped>
.charging-realtime-power {
  display: flex;
  justify-content: center;
  height: 100px;
  background: linear-gradient(
    255.75deg,
    rgba(37, 177, 255, 0.02) 23.33%,
    rgba(37, 177, 255, 0.2) 100%
  );
  mix-blend-mode: normal;
  box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(41, 76, 179, 0.2);
  border-radius: 4px;
  padding: 12px 0 0 24px;
  .el-icon {
    font-size: 82px;
  }
  .num-info {
    margin-left: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .num {
      font-family: 'DIN Condensed';
      font-style: normal;
      font-weight: 700;
      font-size: 42px;
      background: linear-gradient(180deg, #0080ff 0%, #ffffff 50%, #007cf8 100%), #59ffff;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      letter-spacing: 0.1em;
    }
    .unit-info {
      width: 237px;
      height: 41px;
      background: url(../images/power-bgc.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      padding-top: 9px;
      font-weight: 500;
      line-height: 20px;
      color: #c6d1db;
    }
  }
}
</style>
