<template>
  <div class="pop-panel" :style="{ left: data.left + 'px', top: data.top + 'px' }">
    <div class="title">
      <img src="../images/position.png" class="tooltip-img" />
      <span class="title-word">{{ data.name }}</span>
      <div class="title-bg"></div>
    </div>
    <div class="content">
      <div class="box">
        充电站
        <div class="box-right">
          <span class="num num3" style="color: #00b3ff">{{ data.chargingStation }}</span>
          个
        </div>
      </div>
      <div class="box">
        储能站
        <div class="box-right">
          <span class="num num1" style="color: #f6fb2b">{{ data.energyStorageStation }}</span>
          个
        </div>
      </div>
      <div class="box">
        光伏站
        <div class="box-right">
          <span class="num num2" style="color: #99b1ff">{{ data.photovoltaic }}</span>
          个
        </div>
      </div>
      <div class="box">
        充换电柜
        <div class="box-right">
          <span class="num num4" style="color: #00f7ff">{{ data.cabinet }}</span>
          个
        </div>
      </div>
      <div class="box">
        换电站
        <div class="box-right">
          <span class="num num5" style="color: #ffa800">{{ data.powerStation }}</span>
          个
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
});
const { data } = toRefs(props);
</script>
<style lang="less" scoped>
.pop-panel {
  width: 188px;
  height: 160px;
  position: fixed;
}
.tooltip-img {
  margin-left: 6px;
}
.title {
  position: relative;
  height: 24px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
}
.title-word {
  z-index: 99;
  position: relative;
  bottom: 5px;
  /* left: 3px; */
}

.title-bg {
  clip-path: polygon(0 0, 79% 0, 100% 100%, 0% 100%);
  position: relative;
  top: -15px;
  left: 0;
  background: rgba(0, 255, 249, 1);
  width: 70%;
  height: 15px;
  z-index: -10;
}
.content {
  clip-path: polygon(90% 0, 100% 13%, 100% 100%, 10% 100%, 0 87%, 0 0);
  background: rgba(0, 48, 71, 0.95);
  box-shadow: inset 0px 0px 16px rgba(75, 223, 255, 1);
  padding: 12px;
}
.box {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.8);
}
.box-right {
  display: flex;
}
.num {
  font-family: 'DIN Condensed';
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 2px;
}
.num1 {
  color: #f6fb2b;
}
.num2 {
  color: #99b1ff;
}
.num3 {
  color: #00b3ff;
}
.num4 {
  color: #00f7ff;
}
.num5 {
  color: #ffa800;
}
</style>
