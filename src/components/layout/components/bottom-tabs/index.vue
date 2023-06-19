<template>
  <div class="bottom-tabs">
    <div
      class="tab"
      :class="[tab.type, { active: activeTab === tab.name }]"
      v-for="tab in tabs"
      :key="tab.type"
      @click="handleTabClick(tab)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
    type: 'overview',
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
    type: 'energy-station',
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
  width: 548px;
  display: flex;
}
.tab {
  width: 76px;
  height: 75px;
  margin-right: 42px;
  background-repeat: no-repeat;
  background-size: 100%;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
}
.overview {
  background-image: url('./images/overview.png');
  &.active {
    background-image: url('./images/overview-active.png');
  }
}
.charging-station {
  background-image: url('./images/charging-station.png');
  &.active {
    background-image: url('./images/charging-station-active.png');
  }
}
.energy-station {
  background-image: url('./images/energy-station.png');
  &.active {
    background-image: url('./images/energy-station-active.png');
  }
}
.photovoltaic-station {
  background-image: url('./images/photovoltaic-station.png');
  &.active {
    background-image: url('./images/photovoltaic-station-active.png');
  }
}
.chargings-replacement-cabinet {
  background-image: url('./images/chargings-replacement-cabinet.png');
  &.active {
    background-image: url('./images/chargings-replacement-cabinet-active.png');
  }
}
.power-exchange-station {
  background-image: url('./images/power-exchange-station.png');
  &.active {
    background-image: url('./images/power-exchange-station-active.png');
  }
}
</style>
