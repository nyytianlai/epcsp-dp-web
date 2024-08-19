<template>
  <panel>
    <div class="chargings-replacement-cabinet-overview">
      <title-column
        :title="$t('chargings-replacement-cabinet.panelTitle.chdgztxx')"
        icon="chargings-replacement"
      />
      <div class="num-wrap">
        <template v-for="(item, index) in cardData" :key="index">
          <num-tile-card :data="item" />
        </template>
      </div>
    </div>
    <div class="charging-type">
      <tabs :data="chargingType" />
      <pie-chart
        :data="chargingTypeData"
        :totalName="$t('chargings-replacement-cabinet.panelTitle.totalName')"
        :colors="chargingColor"
      />
    </div>
    <div class="company-facilities-rank">
      <title-column
        :title="$t('chargings-replacement-cabinet.panelTitle.jrzdhcdcspm')"
        icon="chargings-replacement"
      />
      <!-- <area-rank-list
          :data="facilitiesRankData"
          :totalNum="facilitiesRankTotal"
          height="2.54rem"
          :showPer="false"
        /> -->

      <rank-list :data="facilitiesRankData" :totalNum="facilitiesRankTotal" height="3.34rem" />
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { chdsszlFun, chargingType, chargingTypeDataFun, facilitiesRankData } from '../../config';
import { totalStatistics, typeAndNumber } from '../../api.js';
const chargingColor = ['#E5CC48', '#3254DD', '#4BDEFF', '#CEF6FF'];
//充换电设施总量统计数据
const cardData = ref(chdsszlFun());
// 充换电设施类型
const chargingTypeData = ref(chargingTypeDataFun());

// 获取企业总量
const loadTotalStatistics = async () => {
  const res = await totalStatistics();
  cardData.value = chdsszlFun(res.data);
};
// 获取充换电柜类型
const loadTypeAndNumber = async () => {
  const res = await typeAndNumber();
  console.log('获取充换电柜类型', res.data);
  chargingTypeData.value = chargingTypeDataFun(res.data);
};
// 企业排名总量
const facilitiesRankTotal = ref<number>(facilitiesRankData[0].num);
onMounted(() => {
  loadTotalStatistics();
  loadTypeAndNumber();
});
</script>

<style lang="less" scoped>
.chargings-replacement-cabinet-overview {
  container-name: overview;
  container-type: inline-size;
  .num-wrap {
    margin-top: 10px;
    @{deep} {
      img {
        width: 74px;
      }
      .name {
        margin-left: 28px;
      }
      .num-box {
        width: 110px;
        margin-left: 41px;
        text-align: right;
      }
      .num-tile-card {
        &:nth-of-type(n + 1) {
          margin-top: 12px;
        }
      }
    }
  }
  @container overview (min-width: 500px) {
    .num-wrap {
      display: flex;
      gap: 20px;
      @{deep} {
        .num-tile-card {
          justify-content: flex-start;
        }
        .num-box {
          margin-left: 0;
          width: 0;
          flex: 1;
        }
      }
    }
  }
}

.charging-type {
  height: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  @{deep} {
    .pie-wrap {
      flex: 1;
      height: 0;
      margin-top: 20px;
    }
  }
}
.company-facilities-rank {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  @{deep} {
    .area-rank-wrap {
      flex: 1;
      height: 0;
      .unit {
        color: #fff;
      }
    }
  }
}
</style>
