<template>
  <div class="dispatcher-operation">
    <!-- ddyxqk: '调度运行情况' -->
    <title-column :title="t(`${tHead}.ddyxqk`)" />
    <div class="card-row" v-for="(o, i) in type" :key="o.code">
      <div class="static-type">{{ o.name }}</div>
      <div class="top-card-item" v-for="item in cardConfig" :key="item.name">
        <img :src="item.icon" class="icon" />
        <div class="card-data">
          <div class="card-value">
            <span class="value fontSize32DIN">
              {{ formatWithToLocalString(totalData[item.code[o.code]]) ?? '--' }}
            </span>
            <span class="unit">{{ item.displayUnit || item.unit || '' }}</span>
          </div>
          <div class="card-name">{{ item.displayName || item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { formatWithToLocalString } from '@/global/commonFun.js';
import Api from '../api';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `special-scene.virtual-electric.components`;

const loading = ref(true);
const totalData = ref({});
const props = defineProps({
  adjustDate: {
    type: String,
    default: ''
  }
});
watch(
  () => props.adjustDate,
  () => {
    if (props.adjustDate) {
      let date = props.adjustDate.replaceAll('0', '').split('-');
      type.value[0].name = `${date[1]}月${date[2]}日`;
      console.log('type :>> ', type);
      getData();
    }
  }
);

const type = ref([
  { name: '今日', code: 0, displayName: t(`${tHead}.today`) },
  { name: '累计', code: 1, displayName: t(`${tHead}.lj`) }
]);
const cardConfig = [
  {
    name: '调节次数',
    code: ['dispatchNumToday', 'dispatchNumAcc'],
    unit: '次',
    icon: new URL('../images/xftjcs.png', import.meta.url).href,
    displayName: t(`${tHead}.xftjcs`),
    displayUnit: t(`${tHead}.unitCi`)
  },
  {
    name: '调节量',
    code: ['dispatchAmountToday', 'dispatchAmountAcc'],
    unit: 'MW',
    icon: new URL('../images/xftjl.png', import.meta.url).href,
    displayName: t(`${tHead}.xftjl`)
  }
];

const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.dispatchInfo({ dataTime: props.adjustDate });
    totalData.value = res?.data || {};
  } catch (error) {}
  loading.value = false;
};
</script>

<style scoped lang="less">
.dispatcher-operation {
  width: 100%;
  height: 50%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .card-row {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    padding: 12px;
    border-radius: 4px;
    overflow: hidden;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );
    gap: 6px;
    &:first-of-type {
      margin-bottom: 10px;
    }

    .static-type {
      position: absolute;
      left: 0;
      top: 0;
      width: 116px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(5, 160, 255);
      font-size: 14px;
      color: #fff;
      transform: translate(-30%, 40%) rotate(-30deg);
    }
  }
}
.top-card-item {
  flex: calc(50% - 3px);
  min-width: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: 6px;

  .icon {
    width: 60px;
    flex: 0 0 60px;
  }

  .card-data {
    display: flex;
    flex-flow: column nowrap;
  }

  .card-name {
    font-size: 16px;
    color: #c6d1db;
  }

  .card-value {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    line-height: 30px;
    .value {
      font-weight: 700;
      color: rgb(0, 247, 255);
    }

    .unit {
      font-size: 14px;
      color: rgb(0, 247, 255);
    }
  }
}
</style>
