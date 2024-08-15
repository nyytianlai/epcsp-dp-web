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
      <div class="text">{{ tab.text }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Icon from '@sutpc/vue3-svg-icon';
interface Tab {
  type: string;
  text?: string;
  path?: string;
}
const router = useRouter();
const route = useRoute();
const tabs = [
  {
    text: '总览',
    name: 'Overview',
    type: 'overview-all',
    path: '/overview'
  },
  {
    text: '充电站',
    name: 'ChargingStation',
    type: 'charging-station',
    path: '/charging/station'
  },
  {
    text: '储能站',
    name: 'EnergyStation',
    type: 'energy-station-page',
    path: '/energy-station'
  },
  {
    text: '光伏站',
    name: 'PhotovoltaicStation',
    type: 'photovoltaic-station',
    path: '/photovoltaic-station'
  },
  {
    text: '充换电柜',
    name: 'ChargingsReplacementCabinet',
    type: 'chargings-replacement-cabinet',
    path: '/chargings-replacement-cabinet'
  },
  {
    text: '换电站',
    name: 'PowerExchangeStation',
    type: 'power-exchange-station',
    path: '/power-exchange-station'
  },
  {
    text: '亮点场景',
    name: '/super-charging/building',
    type: 'special-scene',
    path: '/super-charging/building'
  }
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
}
.tab {
  position: relative;
  width: 94px;
  height: 93px;
  margin-right: 20px;
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

  .icon {
    font-size: 76px;
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
