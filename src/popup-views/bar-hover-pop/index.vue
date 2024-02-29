<template>
  <div id="pop-panel">
    <div class="title">
      <img src="./images/position.png" class="tooltip-img" />
      <span class="title-word">{{ paramsValue.quName }}</span>
      <div class="title-bg"></div>
    </div>
    <div class="content">
      <li>
        充电站
        <div class="liRight">
          <span class="num num3" style="color: #00b3ff">
            {{ paramsValue.chargingStation || 0 }}
          </span>
          个
        </div>
      </li>
      <li>
        储能站
        <div class="liRight">
          <sapn class="num num1" style="color: #f6fb2b">
            {{ paramsValue.energyStorageStation || 0 }}
          </sapn>
          个
        </div>
      </li>
      <li>
        光伏站
        <div class="liRight">
          <span class="num num2" style="color: #99b1ff">{{ paramsValue.photovoltaic || 0 }}</span>
          个
        </div>
      </li>
      <li>
        充换电柜
        <div class="liRight">
          <span class="num num4" style="color: #00f7ff">{{ paramsValue.cabinet || 0 }}</span>
          个
        </div>
      </li>
      <li>
        换电站
        <div class="liRight">
          <span class="num num5" style="color: #ffa800">{{ paramsValue.powerStation || 0 }}</span>
          个
        </div>
      </li>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUrlParam } from '@sutpc/zebra';
const paramsValue = JSON.parse(getUrlParam('value') || '{}');
</script>

<style scoped lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  background-color: aquamarine;
}
#pop-panel {
  width: 100%;
  height: 100%;
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
  /* left: 3PX; */
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
li {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.8);
}
.liRight {
  display: flex;
}
.num {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 2px;
}
</style>
