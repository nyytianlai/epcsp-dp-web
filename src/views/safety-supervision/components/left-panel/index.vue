<template>
  <panel>
    <div class="left-panel-wrap flex-v">
      <div class="total-warning-num flex-v-1 flex-v">
        <!-- ljgjsjxx: '累计告警数据信息' -->
        <title-column :title="t(`${tHead}.ljgjsjxx`)" />
        <tabs
          :data="totalWarningTabs"
          @changeTab="(data) => handleChangeTab(data, 'total-warning')"
          v-model="messageWarningType"
        >
          <!-- ckgd: '查看更多' -->
          <button-base @handleClick="handleClickMessageBtn">{{ t(`${tHead}.ckgd`) }}</button-base>
        </tabs>
        <scroll-table :scrollTableData="scrollTableData" :columnKeyList="columnKeyList" />
      </div>
      <div class="area-warning-num flex-v-1 flex-v">
        <!-- xzqgjsjqk: "行政区告警数据情况' -->
        <title-column
          :title="t(`${tHead}.xzqgjsjqk`)"
          :showTabBtn="true"
          :tabList="[
            { value: 1, name: '日', displayName: t(`${tHead}.tabList.day`) },
            { value: 2, name: '月', displayName: t(`${tHead}.tabList.month`) },
            { value: 3, name: '年', displayName: t(`${tHead}.tabList.year`) }
          ]"
          @handleTabBtn="handleWarmYearBtn"
        />
        <area-rank-list class="flex-v-1" :data="areaRankData" :totalNum="areaTotalNum" />
      </div>
    </div>
  </panel>
  <warn-count-list-dialog
    v-if="dialogTableMessageVisible"
    :visible="dialogTableMessageVisible"
    :messageWarningType="messageWarningType"
    @close="handleClose"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, toRefs } from 'vue';
import { totalWarningTabsFun, columnKeyListFun } from '../../config.js';
import { safetySupervisionAccumulated, districtAlarmStatics } from '../../api.js';
import ScrollTable from '../scroll-table.vue';
import WarnCountListDialog from '../warn-count-list-dialog.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `safety-supervision.left-panel`;
const props = defineProps({
  bottomCode: {
    type: Number,
    default: 1
  }
});
const { bottomCode } = toRefs(props);
// 累计告警数据信息
const totalWarningTabs = ref(totalWarningTabsFun());
const scrollTableData = ref([]);
const columnKeyList = ref(columnKeyListFun());
// 累计告警数据信息弹窗显隐
const dialogTableMessageVisible = ref(false);
const messageWarningType = ref(1);
// 左二的时间类型
const dayTypeWarn = ref(1);

const handleChangeTab = async (data, type) => {
  if (type === 'total-warning') {
    columnKeyList.value = columnKeyListFun(data.code);
    scrollTableData.value = [];
    //累计告警数据信息
    scrollTableData.value = (await getSafetySupervisionAccumulated(data.code))?.dataList || [];
  }
};
// 左二行政区
const handleWarmYearBtn = (value) => {
  dayTypeWarn.value = value.value;
  console.log('dataType.value', dayTypeWarn.value);
  getDistrictAlarmStatics();
};

//行政区告警数据
// const areaRankData = ref(areaRankDataFun())
const areaRankData = ref([]);
// const areaTotalNum = ref(6399);
const areaTotalNum = ref(0);
const getDistrictAlarmStatics = async () => {
  let { data } = await districtAlarmStatics({ dayType: dayTypeWarn.value });
  let newData = data?.map((item) => {
    return {
      ...item,
      unit: t(`${tHead}.unitCi`), // || '次'
      num: item.cnt,
      name: item.areaName
    };
  });
  areaRankData.value = newData || [];
  areaTotalNum.value = Math.max(...newData.map((item) => item.cnt)) || 0;
};

const getSafetySupervisionAccumulated = async (
  type,
  pageOffset = 1,
  pageSize = 10000,
  input = null,
  sort = 0,
  sortType = 2
) => {
  const params = {
    type,
    pageOffset,
    pageSize,
    name: input,
    sort,
    sortType
  };
  let { data } = await safetySupervisionAccumulated(params);
  return data;
};
const handleClickMessageBtn = async () => {
  dialogTableMessageVisible.value = true;
};
const handleClose = () => {
  dialogTableMessageVisible.value = false;
};

onMounted(async () => {
  getDistrictAlarmStatics();
  scrollTableData.value = (await getSafetySupervisionAccumulated(1))?.dataList || [];
});
</script>

<style lang="less" scoped>
.left-panel-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.total-warning-num {
  .tabs {
    margin-top: 16px;
    position: relative;
    .button-base {
      position: absolute;
      bottom: 7px;
      right: 0;
    }
  }
  .el-table {
    margin-top: 12px;
  }
}
.area-warning-num {
  margin-top: 20px;
  .area-rank-wrap {
    margin-top: 16px;
  }
}
</style>
