<template>
  <panel>
    <div class="total-charging-facilities">
      <title-column title="整体接入信息" />
      <div class="num-wrap">
        <template v-for="(item, index) in cardData" :key="index">
          <num-card :data="item" classStyleType="bottomDown" />
        </template>
      </div>
    </div>
    <div class="pile-charger">
      <div class="pile-charger-header">
        <tabs
          :data="curBtn === 1 ? chargingStationTabs : chargingStationGunTabs"
          @changeTab="(data) => handleChangeTab(data, 'charger')"
        />
        <div class="right-tab-btn">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            class="tab-btn"
            :class="{ active: curBtn === item.value }"
            @click="handleTabBtn(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="num-wrap">
        <template v-for="(item, index) in pileChargerData" :key="index">
          <num-card :data="item" type="left-right" classStyleType="leftRightStyle1" />
        </template>
      </div>
    </div>
    <div class="operating-company">
      <title-column title="运营企业排名" :showBtn="true" @handleClick="handleDetailClick" />
      <tabs :data="operatingTabsData" @changeTab="(data) => handleChangeTab(data, 'operating')" />
      <rank-list class="operating-company__list"
        :data="projectList"
        :totalNum="projectTotalNum"
      />
    </div>
  </panel>
  <enterprise-rank-list-dialog :visible="dialogRankVisible" @closed="handleCloseRankDialog" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {
  cdsszlFun,
  chargingStationTabsFun,
  chargingStationGunTabsFun,
  pileChargerFun,
  operatingTabsFun
} from '../../config.js';
import { totalFacilities, totalEquipment, stationOpeTop10 } from '../../api.js';
import EnterpriseRankListDialog from '../enterprise-rank-list-dialog.vue';
// 运营企业排名弹窗显示标识
const dialogRankVisible = ref(false);
// 左二图的tab
const curBtn = ref(1);
const tabList = ref([
  { value: 1, name: '桩', index: 'pile' },
  { value: 2, name: '枪', index: 'gun' }
]);
//充电设施总量数据
const cardData = ref(cdsszlFun());
// 充电类型
const chargingStationTabs = ref(chargingStationTabsFun());
const chargingStationGunTabs = ref(chargingStationGunTabsFun());
const totalChargerIndex = ref(1);
const chargingType = ref('speed');
const typeCharge = ref('pile');
// 切换充电桩总量和充电枪总量数据
const pileChargerData = ref(pileChargerFun());

// 运营企业全年TOP10类型切换tab
const operatingTabsData = ref(operatingTabsFun());
// 运营企业全年TOP10类型运营企业数据
const projectList = ref([]);
const projectTotalNum = ref(0);
const handleChangeTab = (data, type) => {
  if (type === 'charger') {
    //切换充电桩总量和充电枪总量
    console.log('data', data);
    totalChargerIndex.value = data.code;
    chargingType.value = data.chargingType;
    typeCharge.value = data.typeCharge;
    getTotalEquipment();
  } else if (type === 'operating') {
    // 切换运营企业全年TOP10类型
    getStationOpeTop10(data.code);
  }
};

// 左二的右侧tab切换
const handleTabBtn = (item) => {
  console.log('item');
  curBtn.value = item.value;
  typeCharge.value = item.index;
  getTotalEquipment();
};
//充电设施总量
const getTotalFacilities = async () => {
  const res = await totalFacilities();
  const data = {
    totalChargingStations: res.data.totalChargingStations,
    totalOperating: res.data.totalOperating,
    totalNewEnergyVehicles: res.data.totalNewEnergyVehicles
  };
  cardData.value = cdsszlFun(data);
};
//充电桩总量：pile，充电枪总量：gun
const getTotalEquipment = async () => {
  const res = await totalEquipment({ chargingType: chargingType.value, type: typeCharge.value });

  pileChargerData.value = pileChargerFun(totalChargerIndex.value, res?.data, curBtn.value);
};

//运营企业年度TOP10-充电桩:pile,充电枪:gun,充电站:station
const getStationOpeTop10 = async (type) => {
  const res = await stationOpeTop10(type);
  // console.log(res);
  if (res?.data) {
    const data = res.data.map((item) => {
      return {
        num: item.amount,
        unit: '个',
        name: item.operatorName
      };
    });
    projectList.value = data;
    projectTotalNum.value = data[0].num || 0;
  } else {
    projectList.value = [];
    projectTotalNum.value = 0;
  }
};

// 运营企业排名详情点击
const handleDetailClick = () => {
  dialogRankVisible.value = true;
};
const handleCloseRankDialog = () => {
  dialogRankVisible.value = false;
};
onMounted(() => {
  getTotalFacilities();
  getTotalEquipment();
  getStationOpeTop10('station');
});
</script>

<style lang="less" scoped>
.total-charging-facilities {
  .num-wrap {
    display: flex;
    justify-content: space-between;
    // height: 160px;
    padding: 5px 22px;
    margin-top: 16px;
    background: linear-gradient(
      255.75deg,
      rgba(37, 177, 255, 0.02) 23.33%,
      rgba(37, 177, 255, 0.2) 100%
    );
    mix-blend-mode: normal;
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    border-radius: 4px;
    container-type: inline-size;
    container-name: numCard;
    @container numCard (min-width: 500px) {
      .num-card {
        flex-direction: row;
      }
    }
  }
}
.operating-company {
  // margin-top: 23px;
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  .tabs {
    margin-top: 16px;
  }

  .rank-list-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}

.pile-charger {
  // margin-top: 16px;

  .num-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;

    .num-card {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
.pile-charger-header {
  display: flex;
  justify-content: space-between;
}
.right-tab-btn {
  display: flex;
  background: rgba(21, 69, 105, 0.5);
  border: 1px solid #486785;

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
.operating-company__list {
  flex: 1;
  height: 0;
}
</style>
