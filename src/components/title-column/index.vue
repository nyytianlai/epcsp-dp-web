<template>
  <!-- <div class="title-column">
    <span class="title">{{ title }}</span>
    <button-base v-if="showBtn" @handleClick="handleClick">{{btnText}}</button-base>
  </div> -->
  <div class="title-column">
    <div class="left-bgc">
      <div class="bgc"></div>
      <icon icon="svg-icon:arrow" class="arrow" />
      <span class="title">{{ title }}</span>
      <icon :icon="`svg-icon:${icon}`" class="car" />
    </div>
    <div class="right-bgc">
      <div class="bevel-edge"></div>
      <div class="line"></div>
      <!-- 详情 xq: '详情' -->
      <span class="detail-btn" v-if="showBtn" @click="handleClick">{{ t(`${tHead}.xq`)  }}</span>
    </div>
    <div class="right-tab-btn" v-if="showTabBtn">
      <div
        v-for="item in tabList"
        class="tab-btn"
        :class="{ active: curBtn === item.value }"
        @click="handleTabBtn(item)"
      >
        <tooltip-over
          :is-inline="true"
          class="tab-btn-title"
          :content="item.displayName || item.name"
          :ref-name="item.displayName || item.name"
        />
        <!-- {{ item.displayName || item.name }} -->
      </div>
    </div>
    <!-- <button-base v-if="showBtn" @handleClick="handleClick">{{btnText}}</button-base> -->
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import TooltipOver from '@/components/tooltip-over.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `common`;
interface TabList {
  value: string | number;
  name: string;
  displayName?: string;
}
interface Props {
  title: string;
  btnText?: string;
  showBtn?: boolean;
  showTabBtn?: boolean;
  tabList?: TabList[];
  icon?: string;
}
const titleText = t(`${tHead}.title`);
const checkText = t(`${tHead}.check`);
const props = withDefaults(defineProps<Props>(), {
  title: '我是标题',
  btnText: '查看更多',
  showBtn: false,
  showTabBtn: false,
  // 按钮 [{value:'xxx',name:'xxx'}]
  tabList: () => [],
  icon: 'car'
});
const curBtn = ref(props.showTabBtn ? props.tabList?.[0].value : '');
const emit = defineEmits(['handleClick', 'handleTabBtn']);
const { title, btnText } = toRefs(props);
const handleClick = () => {
  emit('handleClick');
};
const handleTabBtn = (item) => {
  curBtn.value = item.value;
  emit('handleTabBtn', item);
};
</script>
<style lang="less" scoped>
.title-column {
  position: relative;
  color: #ffffff;
  display: flex;
  align-items: flex-end;
}
.left-bgc {
  display: flex;
  align-items: center;
  width: fit-content;
  padding-bottom: 3px;
  border-bottom: 1.5px solid;
  border-image: linear-gradient(to right, rgba(0, 106, 207, 0) 0, rgba(0, 163, 233, 1) 100%) 1.5;
  position: relative;
  .bgc {
    position: absolute;
    height: 13px;
    top: 15px;
    left: 0;
    width: calc(100% - 30px);
    z-index: 0;
    background-image: linear-gradient(270deg, #00b2ff, rgba(0, 133, 255, 0.0001));
    // clip-path: polygon(
    //   0 0,
    //   100% 0,
    //   calc(100% - 3px) 1px,
    //   calc(100% - 4px) 2px,
    //   calc(100% - 4px) 11px,
    //   calc(100% - 3px) 12px,
    //   100% 100%,
    //   0 100%
    // );
  }
  .arrow {
    position: relative;
    z-index: 10;
    font-size: 12px;
  }
  .car {
    position: relative;
    z-index: 10;
    font-size: 30px;
    margin-left: 30px;
    padding-top: 8px;
  }
}
.right-bgc {
  flex: 1;
  height: 21px;
  display: flex;
  position: relative;
  .bevel-edge {
    width: 21px;
    height: 21px;
    background-image: linear-gradient(
      135deg,
      transparent 0,
      transparent 46%,
      rgba(0, 163, 233, 1) 46%,
      rgba(0, 163, 233, 1) 52%,
      transparent 52%,
      transparent 100%
    );
  }
  .line {
    flex: 1;
    border-top: 1.5px solid;
    border-image: linear-gradient(to left, rgba(0, 106, 207, 0) 0, rgba(0, 163, 233, 1) 100%) 1.5;
  }
}
.border-out {
  position: absolute;
  top: 2px;
  right: 12px;
}
.title {
  font-weight: 600px;
  font-size: 20px;
  line-height: 28px;
  margin-left: 8px;
  position: relative;
  z-index: 10;
}
.detail-btn {
  font-size: 14px;
  line-height: 22px;
  color: #54b5ff;
  display: flex;
  align-items: center;
  position: absolute;
  top: 2px;
  right: 0px;
  cursor: pointer;
  &::after {
    content: '';
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    border: 7px solid transparent;
    border-left-color: #54b5ff;
    margin-left: 8px;
  }
}
.right-tab-btn {
  display: flex;
  background: rgba(21, 69, 105, 0.5);
  border: 1px solid #486785;
  position: relative;
  top: 10px;
  .tab-btn {
    width: 28px;
    height: 28px;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    border-left: 1px solid #486785;
    &:nth-of-type(1) {
      border: none;
    }
  }
}
.active {
  background: rgba(84, 181, 255, 0.8);
  color: #ffffff;
}
</style>
