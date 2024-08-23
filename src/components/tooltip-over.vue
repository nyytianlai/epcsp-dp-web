<template>
  <el-tooltip effect="dark" :disabled="isShowTooltip" :content="content" placement="top">
    <p
      :class="['line1', className, isInline ? 'inline-display' : '']"
      @mouseover="onMouseOver(refName)"
    >
      <span :ref="setItemRef">{{ content || '-' }}</span>
    </p>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  // 显示的文字内容
  content: {
    type: String,
    default: ''
  },
  // 外层框的样式，在传入的这个类名中设置文字显示的宽度
  className: {
    type: String || Array,
    default: 'w100'
  },
  // 为页面文字标识（如在同一页面中调用多次组件，此参数不可重复）
  refName: {
    type: String,
    default: ''
  },
  isInline: {
    type: Boolean,
    default: false
  }
});

const iframeRefs = ref({});
const setItemRef = (el, key) => {
  if (el) {
    iframeRefs.value[props.refName] = el;
  }
};
const isShowTooltip = ref(true);
const onMouseOver = (str) => {
  let parentWidth = iframeRefs.value[str].parentNode.offsetWidth;
  let contentWidth = iframeRefs.value[str].offsetWidth;
  // 判断是否开启tooltip功能
  if (contentWidth > parentWidth) {
    isShowTooltip.value = false;
  } else {
    isShowTooltip.value = true;
  }
};
</script>

<style lang="less" scoped>
.w86 {
  width: 86%;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
}
.w100 {
  width: 100%;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
}
span {
  // padding: 0 15px;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
}
.inline-display {
  display: inline;
  margin-left: 10px;
}
.unit {
  font-size: 12px;
  width: 20px;
}
.label {
  display: inline-block;
  width: 112px;
  // margin-right: 16px;
  color: rgba(238, 253, 255, 0.8);
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
}
.content {
  display: inline-block;
  // width: 112px;
  margin-left: 10px;
  margin-right: 10px;
  color: rgba(238, 253, 255, 0.8);
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
}

.col1 {
  flex: 0 0 87px;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
}

.title-column-title {
  font-weight: 600px;
  font-size: 20px;
  line-height: 28px;
  margin-left: 8px;
  position: relative;
  z-index: 10;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  max-width: 225px;
}

.name-card-name {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 4px;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  width: 95px;
  display: inline-block;
  margin-left: 0px;
  // text-align: center;
}
.top-bottom-card-name {
  text-align: center;
}
.name-card-unit {
  font-size: 12px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  // width: 50px;
  max-width: 75px;
  display: inline-block;
  margin-left: 5px;
}
.tabs-label {
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  max-width: 115px;
  display: inline-block;
}
.tabs-active-label {
  font-size: 18px;
  line-height: 25px;
  color: #ffffff;
}
.title-box-title {
  font-size: 20px;
  font-weight: bold;
  margin-right: 8px;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
}

.page-num-name {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #64def6;
  transform: matrix(1, 0, -0.25, 0.97, 0, 0);
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  max-width: 100px;
  margin-left: 0;
}

.page-num-unit {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  max-width: 60px;
  margin-left: 0;
}
.pie-chart-name {
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  max-width: 120px;
  margin-left: 0;
}

.tab-btn-title {
  font-size: 14px;
  line-height: 28px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  border-left: 1px solid #486785;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  max-width: 150px;
  margin-left: 0;
}

.tab-left-title {
  font-size: 20px;
  line-height: 28px;
  margin-left: 8px;
  position: relative;
  z-index: 10;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  max-width: 250px;
  margin-left: 8px;
}
.num-card-value-tooltip {
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  max-width: 60px;
  width: 100%;
  margin-left: 0px;
}
.num-card-unit-tooltip {
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  max-width: 36px;
  width: 100%;
  margin-left: 0px;
}
.num-title-card-name-tooltip{
  font-weight: bold;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  // max-width: 36px;
  width: 100%;
  margin-left: 0px;
}
.num-title-card-unit-tooltip{
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  // max-width: 36px;
  width: 100%;
  margin-left: 0px;
  font-family: 'DIN Alternate';
}
.num-card-name-tooltip {
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  max-width: 90px;
  width: 100%;
  margin-left: 0px;
  // background: linear-gradient(258.38deg, rgba(37, 177, 255, 0.1) 2.46%, rgba(37, 177, 255, 0) 100%);
  // background-image: linear-gradient(258.38deg, rgba(37, 177, 255, 0.1) 2.46%, rgba(37, 177, 255, 0) 100%);
  // /* 将背景应用到文本上 */
  // -webkit-background-clip: text;
  // /* 设置文本颜色为透明，使背景可见 */
  // -webkit-text-fill-color: transparent;
}
.station-name-tooltip {
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  max-width: 350px;
  margin-left: 0px;
}
.page-num-name-tooltip{
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  max-width: 150px;
  margin-left: 0px;
}
.tab-label-tooltip{
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 150px;
}
.tab-label-active{
  font-size: 18px;
  line-height: 25px;
  color: #ffffff;
  text-align: center;
  text-align: center;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 150px;
}
.bottom-tab-label-tooltip{
  font-size: 14px;
  line-height: 22px;
}
.bottom-tab-name-tooltip{
  font-size: 14px;
  // text-shadow: 0 0 4px #ffa115;
  text-align: center;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  margin-left: 0px;
  position: absolute !important;
  top: 63px; 
  color: rgba(#fff, 0.8);
  font-style: italic;
  font-family: 'PingFang SC';
}
.bottom-tab-active{
  font-size: 14px;
  color: #fff;
  text-shadow: 0 0 4px #ffa115;
}
.baoqing-child-label-tooltip{
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 150px;
}
.active-message-name-tooltip{
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 100px;
}
.top-tab-name-tooltip{
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  // display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 120px;
}
.maintain-tab-name-tooltip{
  color: rgba(166, 214, 249, 0.5);
  padding-bottom: 4px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  // display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 100px;
}
.maintain-tab-name-active{
  color: #ffffff;
  border-bottom: 2px solid #0aa7ff;
}
.msg-name-tooltip{
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  // display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 150px;
}
.charge-detail-name-tooltip{
  color: #ffffff;
  font-size: 14px;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 120px;
}
.warning-tab-label-tooltip{
  font-size: 12px;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 120px;
  color: #949494;
}
.warning-tab-label-active{
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #949494;
}

.bottom-menu-label-tooltip{
  font-size: 18px;
  line-height: 30px;
  transform: translateY(18px);
  transition: all 0.5s;
  color: #e7e7e7;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 120px;
  color: #949494;
}
.bottom-menu-label-active{
  font-weight: 600;
  background: linear-gradient(180deg, #ffffff 62.5%, #0ae3f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  transform: translateY(8px);
  font-size: 20px;
}
.left-info-label-tooltip{
  margin-left: 9px;
  white-space: nowrap;
  white-space: nowrap; /* 禁止文字换行 */
  overflow: hidden; /* 超出容器宽度时隐藏内容 */
  text-overflow: ellipsis; /* 超出容器宽度时显示省略号 */
  display: inline-block;
  width: 100%;
  margin-left: 0px;
  max-width: 105px;
}
</style>
