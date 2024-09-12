<template>
  <panel type="right">
    <div class="warning-monitor">
      <!-- gjlb: '告警列表' -->
      <!-- jrsbgjjk: '今日设备告警监控' -->
      <title-column
        :title="t(`${tHead}.jrsbgjjk`)"
        :showBtn="true"
        :btnText="t(`${tHead}.gjlb`)"
        @handleClick="handleClick"
      />
      <tabs
        :data="warningMonitorTabs"
        @changeTab="(data) => handleChangeTab(data, 'warning-monitor')"
      />
      <pie-chart
        :data="warningMonitorPieData"
        :mode="totalCurCode === 1 && bottomCode === 1 ? 'canChoose' : 'default'"
        @choose="handleChoose"
        :colors="warningMonitorColors"
      />
    </div>
    <div class="realtime-state">
      <!-- ssztqk: '实时状态情况' -->
      <title-column :title="t(`${tHead}.ssztqk`)" />
      <tabs
        :data="realtimeStateTabs"
        @changeTab="(data) => handleChangeTab(data, 'realtime-state')"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in realtimeStateData" :key="index">
          <num-card
            :data="item"
            @click="handleBall(item)"
            :class="{ 'ball-active': nowStatus === 3 && item.isChoose, cursor: nowStatus === 3 }"
          />
        </template>
      </div>
    </div>
    <div class="realtime-trend">
      <!-- ssgjqsqk: '实时告警趋势情况' -->
      <!-- tabList: {day: '日', month: '月', year: '年'}  -->
      <title-column
        :title="t(`${tHead}.ssgjqsqk`)"
        :showTabBtn="true"
        :tabList="[
          { value: 1, name: '日', displayName: t(`${tHead}.tabList.day`) },
          { value: 2, name: '周', displayName: t(`${tHead}.tabList.month`) },
          { value: 3, name: '月', displayName: t(`${tHead}.tabList.year`) }
        ]"
        @handleTabBtn="handleYearBtn"
      />
      <line-time-chart
        :data="realtimeTrend"
        :colors="['#FF6B4B']"
        mode="haveTab"
        :chartStyle="{
          width: '100%',
          height: '1.89rem'
        }"
      />
    </div>
  </panel>
  <warn-info-list-dialog
    v-if="dialogTableVisible"
    :visible="dialogTableVisible"
    @closed="handleCloseWarnInfoDialog"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, watch, toRefs } from 'vue';
import {
  warningMonitorTabsFun,
  warningMonitorPieDataFun,
  realtimeStateTabsFun,
  realtimeStateDataFun,
  realtimeTrendFun
} from '../../config.js';
import { alarmLevelAndTypeByTime, periodAlarmStaticsByTime, getOnlineStatus } from '../../api.js';
import dayjs from 'dayjs';
import WarnInfoListDialog from '../warn-info-list-dialog.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `safety-supervision.right-panel`;

const props = defineProps({
  bottomCode: {
    type: Number,
    default: 1
  },
  totalCurCode: {
    type: Number,
    default: 1
  }
});
const emit = defineEmits(['handleChargeTypeChange', 'handleTotalCurCodeChange']);
const { bottomCode, totalCurCode } = toRefs(props);
const dialogTableVisible = ref(false);

// 充电桩实时按钮
const nowStatus = ref(3);
const warningMonitorColors = ['#E10105', '#DD6701', '#FAF102'];
//今日设备告警监控
const warningMonitorTabs = ref(warningMonitorTabsFun());
const warningMonitorPieData = ref([] as any[]);
// 告警趋势
const dayTypeAlarm = ref(1);
// 左侧球的数据
const realtimeState = ref([]);
// 实时告警趋势情况
const realtimeTrend = ref(realtimeTrendFun());
//实时状态情况
const realtimeStateTabs = ref(realtimeStateTabsFun());
const realtimeStateData = ref(realtimeStateDataFun());

const getAlarmLevelAndTypeByTime = async (param) => {
  let { data } = await alarmLevelAndTypeByTime(param);
  let type1 = {
    1: '一级人身安全',
    2: '二级设备安全',
    3: '三级告警提示'
  };
  let extraName = {
    1: '人身安全',
    2: '设备安全',
    3: '告警提示'
  };
  let type2 = {
    1: '充电系统',
    2: '电池系统',
    3: '配电系统'
  };

  const dataObj = {};
  data?.map((item) => {
    if (param.type === 1) {
      dataObj[item.alarmLevel] = item.cnt;
    } else {
      dataObj[item.alarmType] = item.cnt;
    }
  });
  let newData = warningMonitorPieDataFun(param.type, dataObj);

  warningMonitorPieData.value = newData;
};
const getPeriodAlarmStaticsByTime = async () => {
  let { data } = await periodAlarmStaticsByTime({ dayType: dayTypeAlarm.value });
  // console.log('data', data);
  // console.log('dayTypeAlarm', dayTypeAlarm.value);
  realtimeTrend.value = realtimeTrendFun(data || [], dayTypeAlarm.value);
  // realtimeTrendOption.series = realtimeTrend.value;
  // console.log(realtimeTrend);
};
const handleChangeTab = async (data, type) => {
  console.log('走这里了嘛', data, type);
  if (type === 'warning-monitor') {
    // 今日设备告警监控
    // warningMonitorPieData.value = warningMonitorPieDataFun(data.code);

    emit('handleTotalCurCodeChange', data.code);
    let obj = {
      type: data.code,
      startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    };
    getAlarmLevelAndTypeByTime(obj);
  } else if (type === 'realtime-state') {
    // 实时状态情况
    nowStatus.value = data.code;
    getOnlineStatusData(data.code);
  }
};
// 右三日周年点击
const handleYearBtn = (value) => {
  console.log(value);
  dayTypeAlarm.value = value.value;
  getPeriodAlarmStaticsByTime();
};

const getOnlineStatusData = async (type) => {
  const res = await getOnlineStatus(type);
  // console.log(res, '------online');
  realtimeState.value = res.data;
  realtimeStateData.value = realtimeStateDataFun(type, res.data);
};

// 告警选中
const handleChoose = (item) => {
  console.log('告警选中', item);
  if (bottomCode.value !== 1) {
    return;
  }
  // bottomCode.value = 1;
  // 今日设备告警交互，实时状态变false
  realtimeStateData.value.forEach((i) => {
    i.isChoose = false;
  });
  emit('handleChargeTypeChange', item);
};
// 实时状态球选中
const handleBall = (item) => {
  if (bottomCode.value !== 2) {
    return;
  }
  if (nowStatus.value !== 3) return;
  item.isChoose = !item.isChoose;
  // bottomCode.value = 2;
  // 实时状态情况交互，今日设备告警监控变false
  warningMonitorPieData.value.forEach((i) => {
    i.isChoose = false;
  });
  console.log('ball', item);
  emit('handleChargeTypeChange', item);
};
const handleClick = () => {
  dialogTableVisible.value = true;
};
const handleCloseWarnInfoDialog = () => {
  dialogTableVisible.value = false;
};
watch(
  () => bottomCode.value,
  (newVal) => {
    warningMonitorPieData.value.forEach((i) => {
      // 切换底部icon饼图全部高亮
      i.isChoose = newVal === 1;
    });
    // 切换为充电站状态则全部高亮
    realtimeStateData.value.forEach((i) => {
      i.isChoose = newVal === 2;
    });
  }
);
onMounted(async () => {
  let obj = {
    type: 1,
    startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
  };
  getAlarmLevelAndTypeByTime(obj);
  getPeriodAlarmStaticsByTime();
  getOnlineStatusData(3);
});
</script>

<style lang="less" scoped>
.warning-monitor {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  .tabs {
    margin-top: 16px;
  }
  .pie-wrap {
    flex: 1;
    height: 0;
    margin-top: 10px;
    :deep(.legend-wrap) {
      .legend {
        width: 230px;
      }
      .right-info {
        width: fit-content;
      }
    }
  }
}
.realtime-state {
  margin-top: 16px;
  .tabs {
    margin-top: 16px;
  }
  :deep(.num-wrap) {
    // height: 157px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  :deep(.num-wrap > .ball-active) {
    img {
      transform: scale(1.2);
    }
  }
  :deep(.num-wrap > .cursor) {
    cursor: pointer;
  }
}
.realtime-trend {
  flex: 1;
  height: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  .ec-wrap {
    flex: 1;
    height: 0;
    margin-top: 10px;
  }
}
.num-wrap {
  container-type: inline-size;
  container-name: numWrap;
  @container numWrap (min-width: 500px) {
    .num-card {
      flex-direction: row;
    }
  }
}
</style>
