<template>
  <panel>
    <div class="photovoltaic-station-overview">
      <title-column :title="$t('photovoltaic-station.panelTitle.gfzztxx')" icon="photovoltaic" />
      <div class="num-wrap">
        <template v-for="(item, index) in cardData" :key="index">
          <num-card :data="item" classStyleType="bottomDown" />
        </template>
      </div>
    </div>
    <!-- <div class="surf-sort">
        <num-tile-card :data="unitTotal" />
      </div> -->
    <div class="company-rank">
      <title-column :title="$t('photovoltaic-station.panelTitle.gfzpm')" icon="photovoltaic" />
      <tabs :data="companyRank" @changeTab="handleCompany" />
      <!-- <area-rank-list :data="companyRankData" :totalNum="companyRankTotal" height="2.54rem" /> -->
      <rank-list :data="companyRankData" :totalNum="companyRankTotal" />
    </div>
  </panel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { cdzzlFun, companyRank } from '../../config';

import { capacityRanking, projectRanking } from '../../api.js';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

//光伏电站总览数据
const cardData = ref(cdzzlFun());
// 企业排名
const companyRankData = ref([]);
// 站点排名信息
const stationRnk = ref([]);
// 光伏排名信息
const lightRank = ref([]);
// 企业排名总量
const companyRankTotal = ref<number>(0);
// 企业排名tab点击
const handleCompany = (item) => {
  // console.log('item', item);
  companyRankData.value = item.code === 1 ? stationRnk.value : lightRank.value;
  companyRankTotal.value = companyRankData.value[0].num;
};

// 获取站点容量排名
const loadCapacityRanking = async () => {
  const res = await capacityRanking();
  console.log('获取站点容量排名', res);
  stationRnk.value = res.data.map((i) => {
    return {
      num: i.doubleAmount,
      unit: 'kW',
      name: i.rankingName
    };
  });
  companyRankData.value = stationRnk.value;
  companyRankTotal.value = companyRankData.value[0].num;
};
// 获取光伏站数量排名
const loadProjectRanking = async () => {
  const res = await projectRanking();
  console.log('获取光伏站数量排名', res);
  lightRank.value = res.data.map((i) => {
    return {
      num: i.integerAmount,
      unit: t(`overview.config.ecOptionFun.unitGe`), // '个',
      name: i.rankingName
    };
  });
};

onMounted(() => {
  loadCapacityRanking();
  loadProjectRanking();
});
</script>

<style lang="less" scoped>
.photovoltaic-station-overview {
  .num-wrap {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    margin-top: 16px;
    background: linear-gradient(
      255.75deg,
      rgba(37, 177, 255, 0.02) 23.33%,
      rgba(37, 177, 255, 0.2) 100%
    );
    mix-blend-mode: normal;
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(41, 76, 179, 0.2);
    border-radius: 4px;
    resize: horizontal;
    container-type: inline-size;
    container-name: numWrap;
    > div {
      flex: 1;
      min-width: 0;
    }
  }
}

@container numWrap (min-width: 500px) {
  .num-card.top-down {
    flex-direction: row;
    @{deep} {
      .icon {
        width: 70px;
        margin-right: 10px;
      }
    }
  }
}

.surf-sort {
  margin-top: 26px;

  :deep(.pie-wrap) {
    margin-top: 22px;
  }
}

.company-rank {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @{deep} {
    .tabs {
      margin-top: 16px;
    }

    .area-rank-wrap {
      margin-top: 20px;
      width: 430px;

      .unit {
        color: #fff;
      }
    }
    .rank-list-wrap {
      flex: 1;
      height: 0;
    }
  }
}
</style>
