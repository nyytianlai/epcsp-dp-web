<template>
  <el-dialog class="pile-dialog" destroy-on-close align-center width="8.45rem">
    <template #header>
      <div class="detail-header">
        <icon icon="svg-icon:house" class="house" />
        <div class="detail-info">
          <div class="info-name">{{ baseMsg?.operatorName }}</div>
          <!-- tyshxym: '统一社会信用码：' -->
          <div class="inifo-code">{{ t(`${tHead}.tyshxym`) }}{{ baseMsg?.operatorId }}</div>
        </div>
      </div>
    </template>
    <div class="detail-maintain">
      <div class="maintain-tab">
        <div class="tab" :class="{ active: current === 'msg' }" @click="handleTab('msg')">
          <!-- jbxx: '基本信息' -->
          <!-- {{ t(`${tHead}.jbxx`) }} -->
          <tooltip-over
            :is-inline="true"
            :className="['maintain-tab-name-tooltip', current === 'msg'? 'maintain-tab-name-active' : '']"
            :content="t(`${tHead}.jbxx`)"
            :ref-name="t(`${tHead}.jbxx`)"
          />
        </div>
        <div class="tab" :class="{ active: current === 'charge' }" @click="handleTab('charge')">
          <!-- cdss: '充电设施' -->
          <!-- {{ t(`${tHead}.cdss`) }} -->
          <tooltip-over
            :is-inline="true"
            :className="['maintain-tab-name-tooltip', current === 'charge'? 'maintain-tab-name-active' : '']"
            :content="t(`${tHead}.cdss`)"
            :ref-name="t(`${tHead}.cdss`)"
          />
        </div>
      </div>
      <div class="msg-container" v-if="current === 'msg'">
        <div class="base-msg" v-for="(item, index) in baseMsg" :key="index">
          <div class="msg-box">
            <!-- <span class="msg-name">{{ BASE_MSG_SEETING[index] }} ：</span> -->
            <tooltip-over
              :is-inline="true"
              :className="['msg-name-tooltip']"
              :content="BASE_MSG_SEETING[index]+':' "
              :ref-name="BASE_MSG_SEETING[index]+ ':' "
            />
            <el-popover placement="top" trigger="hover" :content="item" v-if="item.length > 14">
              <template #reference>
                <div class="msg">{{ item }}</div>
              </template>
            </el-popover>
            <div class="msg" v-else>{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="charge-container" v-else>
        <div class="charge-top-box">
          <div class="charge-top" v-for="(item, index) in CHARGE_SETTING" :key="index">
            <icon class="charge-icon" :icon="`svg-icon:${item.icon}`" />
            <div class="charge-detail">
              <tooltip-over
                :is-inline="true"
                :className="['charge-detail-name-tooltip']"
                :content="item.displayName || item.name "
                :ref-name="item.displayName || item.name "
              />
              <!-- <div class="charge-detail-name">{{ item.displayName || item.name }}</div> -->
              <div class="charge-detail-num">
                {{ charge[item.index] }}
                <span class="unit">{{ item.displayUnit || item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
        <el-table
          :data="tableData"
          height="2.67rem"
          style="width: 100%"
          class="custom-dialog-table"
        >
          <el-table-column
            v-for="(item, index) in columnData"
            :key="index"
            v-bind="item"
            :show-overflow-tooltip="true"
            :formatter="tableColumnFun"
          >
            <template #default="scope"></template>
          </el-table-column>
          <!-- cz: '操作' -->
          <el-table-column :label="t(`${tHead}.cz`)" key="operation" minWidth="1.5">
            <template #default="scope">
              <!-- xq: '详情' -->
              <a href="javascript:;" class="detail" @click="handleDetail(scope.row)">{{ t(`${tHead}.xq`) }}</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagiantion-detail"
          :page-size="pageObj.pageSize"
          layout="prev, pager, next"
          :total="pageObj.total"
          :background="true"
          :current-page="pageObj.currentPage"
          @current-change="handPageChange"
        />
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import Icon from '@sutpc/vue3-svg-icon';
import { ref, inject, reactive } from 'vue';
import { tableColumnFun } from '@/global/commonFun.js';
import { columnDataChargeFun } from '../config';
import { operatorBasicInfo, equInfo, stationInfoList } from '../api';
import TooltipOver from '@/components/tooltip-over.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `charging-station.rank-detail`;
const emit = defineEmits(['goDetail']);
// 当前tab
const current = ref('msg');
const operatorId = inject('operatorId');
const operatorName = inject('operatorName');
// 基本信息
const baseMsg = ref();
// 充电设施
const charge = ref();
// 分页
const pageObj = reactive({
  pageSize: 5,
  total: 0,
  currentPage: 1
});
// 表格
const tableData = ref([]);
const columnData = ref(columnDataChargeFun());
// 基本信息配置表

const BASE_MSG_SEETING = {
  areaName: t(`${tHead}.BASE_MSG_SEETING.areaName`) || '企业注册行政区',
  chargeSafePersonTel:  t(`${tHead}.BASE_MSG_SEETING.chargeSafePersonTel`) || '安全负责电话',
  companySize:  t(`${tHead}.BASE_MSG_SEETING.companySize`) || '企业规模',
  companyType:  t(`${tHead}.BASE_MSG_SEETING.companyType`) || '企业类型',
  contactEmail:  t(`${tHead}.BASE_MSG_SEETING.contactEmail`) || '联系人邮箱',
  contactPerson:  t(`${tHead}.BASE_MSG_SEETING.contactPerson`) || '安全负责人',
  contactTel:  t(`${tHead}.BASE_MSG_SEETING.contactTel`) || '联系人电话',
  foundDate:  t(`${tHead}.BASE_MSG_SEETING.foundDate`) || '成立日期',
  operatorId:  t(`${tHead}.BASE_MSG_SEETING.operatorId`) || '社会信用码',
  operatorName:  t(`${tHead}.BASE_MSG_SEETING.operatorName`) || '运营商名称',
  operatorRegAddress:  t(`${tHead}.BASE_MSG_SEETING.operatorRegAddress`) || '注册地',
  regCapital:  t(`${tHead}.BASE_MSG_SEETING.regCapital`) || '注册资本(万元)',
  serviceTel:  t(`${tHead}.BASE_MSG_SEETING.serviceTel`) || '客服电话',
  streetName:  t(`${tHead}.BASE_MSG_SEETING.streetName`) || '企业注册街道'
};
// 充电设施配置表

const CHARGE_SETTING = [
  {
    name: '充电站总量',
    index: 'stationCount',
    icon: 'stationCount',
    unit: '座',
    displayName: t(`${tHead}.CHARGE_SETTING.cdzhanzl`),
    displayUnit: t(`${tHead}.CHARGE_SETTING.unitZ`)
  },
  {
    name: '充电桩总量',
    index: 'equipmentCount',
    icon: 'equipmentCount',
    unit: '个',
    displayName: t(`${tHead}.CHARGE_SETTING.cdzhuangzl`),
    displayUnit: t(`${tHead}.CHARGE_SETTING.unitGe`)
  },
  {
    name: '充电枪总量',
    index: 'gunCount',
    icon: 'gunCount',
    unit: '个',
    displayName: t(`${tHead}.CHARGE_SETTING.cdqzl`),
    displayUnit: t(`${tHead}.CHARGE_SETTING.unitGe`)
  },
  {
    name: '今日告警总量',
    index: 'alarmCount',
    icon: 'alarmCount',
    unit: '次',
    displayName: t(`${tHead}.CHARGE_SETTING.jrgjzl`),
    displayUnit: t(`${tHead}.CHARGE_SETTING.unitCi`)
  }
];
// 获取基本信息
const loadOperatorBasicInfo = async () => {
  const res = await operatorBasicInfo({
    operatorId: operatorId.value,
    operatorName: operatorName.value
  });
  baseMsg.value = res.data;
};
// 获取充电设施
const loadEquInfo = async () => {
  const res = await equInfo({ operatorId: operatorId.value, operatorName: operatorName.value });
  charge.value = res.data;
};
// 获取充电设施列表
const loadStationInfoList = async () => {
  if (columnData.value.findIndex((i) => i.type === 'index') === -1) {
    const temp = {
      type: 'index',
      label: t(`${tHead}.xh`) || '序号',
      index: (index) => (pageObj.currentPage - 1) * pageObj.pageSize + index + 1,
      minWidth: 1
    };
    columnData.value.unshift(temp);
  }
  const res = await stationInfoList({
    operatorId: operatorId.value,
    operatorName: operatorName.value,
    pageNum: pageObj.currentPage,
    pageSize: pageObj.pageSize
  });
  tableData.value = res.data.list;
  pageObj.total = res.data.total;
  // console.log('pageres', res);
};
// 点击tab
const handleTab = (str) => {
  current.value = str;
};

// 运营商分页
const handPageChange = (value) => {
  pageObj.currentPage = value;
  loadStationInfoList();
};
//初始化
const init = async () => {
  loadOperatorBasicInfo();
  loadEquInfo();
  loadStationInfoList();
};
// 点击详情
const handleDetail = (item) => {
  console.log('item', item);
  emit('goDetail', item);
};
defineExpose({
  init
});
</script>
<style lang="less" scoped>
.pile-dialog.el-dialog {
  background: rgba(18, 40, 73, 0.85);
  box-shadow: inset 0px 0px 16px rgba(10, 167, 255, 0.8);
  height: 582px;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    20px 100%,
    0 calc(100% - 20px),
    0 0
  );
}

.charge-container {
  :deep(.el-pagination) {
    margin-top: -20px;
  }
}

.house {
  font-size: 56px;
}

.detail-header {
  display: flex;

  .detail-info {
    margin-left: 16px;
  }

  .info-name {
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
  }

  .inifo-code {
    color: rgba(166, 214, 249, 0.7);
    font-size: 16px;
  }
}

.maintain-tab {
  display: flex;
  width: 200px;
  justify-content: space-between;

  .tab {
    color: rgba(166, 214, 249, 0.5);
    padding-bottom: 4px;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }

  .tab.active {
    color: #ffffff;
    border-bottom: 2px solid #0aa7ff;
  }
}

.msg-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .base-msg {
    margin-top: 20px;
    width: 380px;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    display: flex;
  }

  .msg-box {
    display: flex;
  }

  .msg-name {
    color: rgba(255, 255, 255, 0.7);
  }

  .msg {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 240px;
  }
}

.charge-top-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 26px;

  .charge-top {
    background: #375374;
    width: 186px;
    height: 71px;
    display: flex;
    align-items: center;
    padding-left: 12px;

    .charge-icon {
      font-size: 36px;
      margin-right: 12px;
    }

    .charge-detail {
      .charge-detail-name {
        color: #ffffff;
        font-size: 14px;
      }

      .charge-detail-num {
        color: #00fff9;
        font-size: 24px;
        font-weight: bold;
        font-family: 'DIN Alternate';
      }

      .unit {
        font-size: 14px;
        font-weight: 400;
        font-family: 'PingFang SC';
      }
    }
  }
}

.custom-dialog-table {
  margin-top: 16px;

  :deep(td.el-table__cell) {
    padding: 11px 0;
  }
}

.detail {
  color: #4bdeff;
  text-decoration: none;
}

.pagiantion-detail {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px !important;
}
</style>
