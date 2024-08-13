<template>
  <div class="super-station-overview">
    <title-column title="超充总览" />
    <div class="overview-content" v-loading="loading">
      <div class="top-card-item" v-for="item in cardConfig1" :key="`${item.name}`">
        <div class="card-type-name" :style="{ backgroundColor: item.color }">{{ item.name }}</div>
        <div class="card-item-content" v-for="card in item.children" :key="card.name">
          <img draggable="false" :src="card.icon" class="icon" />
          <div class="card-data">
            <div class="card-value">
              <span class="value fontSize32DIN">{{ card.value ?? '--' }}</span>
              <span class="unit">{{ card.unit || '' }}</span>
            </div>
            <div class="card-name">{{ card.name }}</div>
          </div>
        </div>
      </div>
      <div class="bottom-card-wrapper">
        <div
          class="card-item"
          v-for="item in cardConfig2"
          :key="`${item.name}${item.type}${item.unit}`"
        >
          <img class="card-icon" draggable="false" :src="item.icon" />
          <div class="card-info">
            <div class="card-data">
              <template v-for="(child, i) in item.children" :key="child.name">
                <span class="fontSize28DIN" :style="{ color: child.color }">
                  {{ child.value ?? '--' }}
                </span>
                <p>{{ child.seprate || '' }}</p>
              </template>
              {{ item.unit || '' }}
            </div>
            <div class="card-name">
              {{ item.name }}
              <span>{{ item.typeName }}</span>
              <template v-for="(child, i) in item.children" :key="child.name">
                {{ child.name ?? '--' }}
                <p>{{ child.seprate || '' }}</p>
              </template>
              {{ item.type }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCardConfig2, getOperatCardConfig } from '../config.js';
import Api from '../api.js';
const cardConfig1 = ref(getOperatCardConfig());
const cardConfig2 = ref(getCardConfig2());
const loading = ref(true);
const getData = async () => {
  loading.value = true;
  try {
    const res = await Api.getSuperChargeStationCount();
    cardConfig1.value = getOperatCardConfig(res?.data || {});
    cardConfig2.value = getCardConfig2(res?.data || {});
  } catch (err) {
    cardConfig1.value = getOperatCardConfig({});
    cardConfig2.value = getCardConfig2({});
  } finally {
    loading.value = false;
  }
};
getData();
</script>

<style scoped lang="less">
.super-station-overview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 12px;

  .overview-content {
    flex: 1;
    min-height: 0;

    display: flex;
    flex-flow: column nowrap;
    row-gap: 6px;

    .top-card-item {
      position: relative;
      width: 100%;
      padding: 12px 30px;
      display: flex;
      flex-flow: row wrap;
      border-radius: 4px;
      overflow: hidden;
      gap: 6px;

      box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04),
        inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
      background: linear-gradient(
        219.05deg,
        rgba(37, 177, 255, 0.02) 16.882%,
        rgba(37, 177, 255, 0.2) 100%
      );

      .card-type-name {
        position: absolute;
        left: 0;
        top: 0;
        width: 116px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(5, 160, 255);
        font-size: 14px;
        color: #fff;
        transform: translate(-30%, 40%) rotate(-30deg);
      }

      .card-item-content {
        flex: calc(50% - 3px);
        min-width: 0;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        column-gap: 6px;
      }

      .icon {
        width: 60px;
        flex: 0 0 60px;
      }

      .card-data {
        display: flex;
        flex-flow: column nowrap;
      }

      .card-name {
        font-size: 16px;
        color: #c6d1db;
      }

      .card-value {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        line-height: 30px;
        .value {
          font-weight: 700;
          color: rgb(0, 247, 255);
        }

        .unit {
          font-size: 14px;
          color: rgb(0, 247, 255);
        }
      }
    }

    .bottom-card-wrapper {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 16px;
      padding: 12px 30px;
      display: flex;
      flex-flow: row wrap;
      border-radius: 4px;
      overflow: hidden;
      gap: 6px;

      box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04),
        inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
      background: linear-gradient(
        219.05deg,
        rgba(37, 177, 255, 0.02) 16.882%,
        rgba(37, 177, 255, 0.2) 100%
      );
    }

    .card-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      column-gap: 16px;

      .card-icon {
        flex: 0 0 90px;
        width: 90px;
        user-select: none;
      }

      .card-info {
        display: flex;
        flex-flow: column nowrap;
        row-gap: 2px;
      }

      .card-data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        line-height: 30px;
        font-size: 14px;
        color: rgb(243, 246, 250);
        span {
          font-weight: 700;
        }

        p {
          margin: 0 4px;
        }
      }

      .card-name {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        line-height: 20px;
        font-size: 14px;
        color: rgb(198, 209, 219);
        span {
          color: rgb(84, 170, 255);
        }
      }
    }
  }
}
</style>
