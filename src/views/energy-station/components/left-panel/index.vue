<template>
  <panel>
    <div class="energy-station-overview">
      <title-column title="储能站整体信息" icon="energy-station" />
      <div class="num-wrap">
        <template v-for="(item, index) in cardData" :key="index">
          <num-card :data="item" classStyleType="bottomDown" />
        </template>
      </div>
      <tabs :data="tabType" />
      <pie-chart :data="tabTypeData" totalName="储能站/个" :colors="tabTypeColor" />
    </div>
    <div class="company-rank">
      <title-column title="储能站排名" icon="energy-station" />
      <tabs :data="rankTabType" @changeTab="handleRank" />
      <!-- <area-rank-list :data="companyRankData" :totalNum="companyRankTotal" height="2.54rem" :showPer="false" /> -->
      <rank-list :data="companyRankData" :totalNum="companyRankTotal"  />
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { cndzyxzlFun, tabType, tabTypeDataFun, rankTabType } from '../../config.js';
import { capacityRanking } from '../../api.js';
const tabTypeColor = ['#E5CC48', '#3254DD', '#4BDEFF'];
// 储能电站运行总览
const cardData = ref(cndzyxzlFun());

// 电网位置
const tabTypeData = ref(tabTypeDataFun());
// const tabPie = ref(1);
// 站点装机容量排名
const stationRank = ref([]);
// 企业排名
const companyRankData = ref([] as any[]);
// 企业排名总量
const companyRankTotal = ref<number>(0);
// 左三排名点击
const handleRank = (item) => {
  console.log('item', item);
  switch (item.code) {
    case 1:
      companyRankData.value = stationRank.value;
      break;
    case 2:
      companyRankData.value = [
        {
          num: 97.85,
          unit: '%',
          name: '南山热电厂储能项目'
        },
        {
          num: 95.22,
          unit: '%',
          name: '南网电动正本公明充电站'
        },
        {
          num: 92.57,
          unit: '%',
          name: '瑞华泰储能'
        },
        {
          num: 92.46,
          unit: '%',
          name: '深圳宝清储能站'
        },
        {
          num: 91.96,
          unit: '%',
          name: '广东天劲充电站'
        },
        {
          num: 91.55,
          unit: '%',
          name: '华润电力30MW储能辅助调频电站'
        }
      ];
      break;
  }
  companyRankTotal.value = companyRankData.value[0].num;
};
// 获取站点排名
const loadCapacityRanking = async () => {
  const res = await capacityRanking();
  console.log('loadCapacityRanking', res);
  stationRank.value = res.data.map((i) => {
    return {
      num: i.doubleAmount,
      unit: 'MW',
      name: i.rankingName
    };
  });
  companyRankData.value = stationRank.value;
  companyRankTotal.value = companyRankData.value[0].num;
};
onMounted(() => {
  loadCapacityRanking();
});
</script>

<style lang="less" scoped>
.energy-station-overview {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  .num-wrap {
    display: flex;
    justify-content: space-between;
    height: 160px;
    padding: 0 22px;
    margin-top: 16px;
    background: linear-gradient(
      255.75deg,
      rgba(37, 177, 255, 0.02) 23.33%,
      rgba(37, 177, 255, 0.2) 100%
    );
    mix-blend-mode: normal;
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    border-radius: 4px;
  }

  :deep(.pie-wrap) {
    margin-top: 22px;
    flex: 1;
    height: 0;
  }
}

.company-rank {
  flex: 1;
  height: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  :deep(.tabs) {
    margin-top: 22px;
  }

  :deep(.area-rank-wrap) {
    margin-top: 20px;

    .unit {
      color: #fff;
    }
  }
}
</style>
