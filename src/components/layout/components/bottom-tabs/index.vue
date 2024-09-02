<template>
  <div class="bottom-tabs">
    <div
      class="tab"
      :class="[tab.type, { active: activeTab === tab.name }]"
      v-for="tab in tabs"
      :key="tab.type"
      @click="handleTabClick(tab)"
    >
      <div class="icon">
        <Icon :icon="`svg-icon:${activeTab !== tab.name ? tab.type : `${tab.type}-active`}`" />
      </div>
      <!-- <div class="text">{{ tab.text }}</div> -->
      <tooltip-over
        :is-inline="true"
        class="bottom-tab-name text"
        :className="['bottom-tab-name-tooltip', activeTab === tab.name ? 'bottom-tab-active' : '']"
        :content="tab.text"
        :ref-name="tab.text"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Icon from '@sutpc/vue3-svg-icon';
import { useI18n } from 'vue-i18n';
import TooltipOver from '@/components/tooltip-over.vue';
interface Tab {
  type: string;
  text?: string;
  path?: string;
}
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const tabs = [
  {
    // text: '总览',
    text: t('menu.overview'),
    name: 'Overview',
    type: 'overview-all',
    path: '/overview'
  },
  {
    // text: '充电站',
    text: t('menu.charging-station'),
    name: 'ChargingStation',
    type: 'charging-station',
    path: '/charging/station'
  },
  {
    // text: '储能站',
    text: t('menu.energy-station'),
    name: 'EnergyStation',
    type: 'energy-station-page',
    path: '/energy-station'
  },
  {
    // text: '光伏站',
    text: t('menu.photovoltaic-station'),
    name: 'PhotovoltaicStation',
    type: 'photovoltaic-station',
    path: '/photovoltaic-station'
  },
  {
    // text: '充换电柜',
    text: t('menu.chargings-replacement-cabinet'),
    name: 'ChargingsReplacementCabinet',
    type: 'chargings-replacement-cabinet',
    path: '/chargings-replacement-cabinet'
  },
  {
    // text: '换电站',
    text: t('menu.power-exchange-station'),
    name: 'PowerExchangeStation',
    type: 'power-exchange-station',
    path: '/power-exchange-station'
  }
  // {
  //   // text: '亮点场景',
  //   text: t('menu.special-scene'),
  //   name: '/super-charging/building',
  //   type: 'special-scene',
  //   path: '/super-charging/building'
  // }
];
const activeTab = computed(() => route.name);
const handleTabClick = (tab: Tab) => {
  // store.changeHomeTab(tab.type);
  if (tab.path) {
    router.push(tab.path);
  }
};
</script>

<style lang="less" scoped>
.bottom-tabs {
  width: 664px;
  display: flex;
  justify-content: space-around;
}
.tab {
  flex: 0 0 80px;
  position: relative;
  width: 80px;
  height: 93px;
  margin-right: 24px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }

  &.active {
    .text {
      font-size: 14px;
      color: #fff;
      text-shadow: 0 0 4px #ffa115;
    }
    .bottom-tab-name {
      span {
        color: #fff !important;
        text-shadow: 0 0 4px #ffa115 !important;
      }
    }

    .icon {
      color: #f8b44e;
    }
  }

  .text {
    position: absolute;
    left: 0;
    bottom: 14px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: rgba(#fff, 0.8);
    font-style: italic;
    font-family: 'PingFang SC';
    font-weight: 600;
    letter-spacing: 1px;
  }
  .bottom-tab-name {
    span {
      color: rgba(#fff, 0.8) !important;
      font-size: 14px;
      font-style: italic !important;
      font-family: 'PingFang SC';
      font-weight: 600 !important;
      letter-spacing: 1px;
      text-align: center;
    }
  }

  .icon {
    font-size: 84px;
    padding-top: 8px;
  }
}
// .overview {
//   background-image: url('./images/overview.png');
//   &.active {
//     background-image: url('./images/overview-active.png');
//   }
// }
// .charging-station {
//   background-image: url('./images/charging-station.png');
//   &.active {
//     background-image: url('./images/charging-station-active.png');
//   }
// }
// .energy-station {
//   background-image: url('./images/energy-station.png');
//   &.active {
//     background-image: url('./images/energy-station-active.png');
//   }
// }
// .photovoltaic-station {
//   background-image: url('./images/photovoltaic-station.png');
//   &.active {
//     background-image: url('./images/photovoltaic-station-active.png');
//   }
// }
// .chargings-replacement-cabinet {
//   background-image: url('./images/chargings-replacement-cabinet.png');
//   &.active {
//     background-image: url('./images/chargings-replacement-cabinet-active.png');
//   }
// }
// .power-exchange-station {
//   background-image: url('./images/power-exchange-station.png');
//   &.active {
//     background-image: url('./images/power-exchange-station-active.png');
//   }
// }
// .special-scene {
//   background-image: url('./images/special-scene.png');
//   &.active {
//     background-image: url('./images/special-scene-active.png');
//   }
// }
</style>
