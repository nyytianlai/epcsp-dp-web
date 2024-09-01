<template>
  <div class="virtual-power-plant-announcement">
    <!-- jrddzl: '今日调度总览' -->
    <title-column :title="'虚拟电厂公告'" />
    <div class="distributed-content">
      <div class="left-data">
        <div
          class="left-card-item"
          v-for="item in noticeList"
          :key="item.adjustDate"
          @click="handleClick(item)"
          :class="{ active: item.adjustDate === active }"
        >
          <div class="icon">
            <img :src="icon" />
          </div>
          <div class="card-data">
            <div class="name">
              {{ item.date[1] }}月{{ item.date[2] }}日{{ item.beginHour }}时-{{ item.endHour }}时
              日前精准响应
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { scale } from '@sutpc/config';
import GaugeChart from '@/components/gauge-chart/index.vue';
import { formatWithToLocalString } from '@/global/commonFun.js';
import Api from '../api';
import { useI18n } from 'vue-i18n';
import bus from '@/utils/bus';
const emit = defineEmits(['activeChange']);
const { t } = useI18n();
const tHead = `special-scene.virtual-electric.components`;
const icon = new URL('../images/ad-icon.png', import.meta.url).href;
const loading = ref(true);
const active = ref('');
const noticeList = ref([]);
const getData = async () => {
  loading.value = true;
  try {
    const { data } = await Api.vppNotice();
    data.forEach((item) => {
      item.date = item.adjustDate.split('-');
    });
    noticeList.value = data;
    active.value = data[0].adjustDate;
    bus.emit('getVppAdjustTime', active.value);
    emit('activeChange', active.value);
    const param = {
      adjustTime: '',
      dataTime: active.value,
      districtCode: ''
    };
    await Api.getVppAdjustTime(param);
  } catch (error) {}
  loading.value = false;
};
getData();

const handleClick = async (item) => {
  console.log('item :>> ', item);
  active.value = item.adjustDate;
  emit('activeChange', active.value);
  bus.emit('getVppAdjustTime', active.value);
};
</script>

<style scoped lang="less">
.virtual-power-plant-announcement {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .distributed-content {
    flex: 1;
    min-height: 0;
    border-radius: 4px;
    display: flex;
    flex-flow: row nowrap;
    padding: 20px;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );
  }

  .left-data {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    row-gap: 14px;
    flex: 1;

    .active {
      border: 2px solid rgba(0, 255, 249, 0.6) !important;
      .icon {
        background: rgba(0, 255, 249, 0.21) !important;
      }
    }
    .left-card-item {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 6px;
      border-radius: 4px;
      position: relative;
      background: rgba(196, 196, 196, 0.2);
      cursor: pointer;

      .icon {
        background: rgba(196, 196, 196, 0.21);
        width: 30px;
        height: 30px;
        border-radius: 4px;
        justify-content: center;
        display: flex;
        align-items: center;
        margin-right: 7px;
        img {
          width: 18px;
          height: 18px;
        }
      }

      .card-data {
        display: flex;
        flex-flow: column nowrap;
        white-space: nowrap;
      }

      .name {
        color: rgb(255, 255, 255);
        font-family: 思源黑体 CN;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0%;
      }
    }
  }

  .right-guage {
    flex: 1;
    min-width: 0;
  }
}
</style>
