<template>
  <div class="super-station-overview">
    <title-column title="超充总览" />
    <div class="overview-content">
      <div
        class="card-item"
        v-for="item in cardConfig1"
        :key="`${item.name}${item.type}${item.unit}`"
      >
        <img class="card-icon" draggable="false" :src="item.icon" />
        <div class="card-info">
          <div class="card-data">
            <template v-for="(child, i) in item.children" :key="child.name">
              <span class="fontSize28DIN">{{ child.value ?? '--' }}</span>
              <p>{{ child.seprate || '' }}</p>
            </template>
            {{ item.unit || '' }}
          </div>
          <div class="card-name">
            {{ item.name }}
            <template v-for="(child, i) in item.children" :key="child.name">
              <span>{{ child.name ?? '--' }}</span>
              {{ child.seprate || '' }}
            </template>
            {{ item.type }}
          </div>
        </div>
      </div>
      <div
        class="card-item"
        v-for="item in cardConfig2"
        :key="`${item.name}${item.type}${item.unit}`"
      >
        <img class="card-icon" draggable="false" :src="item.icon" />
        <div class="card-info">
          <div class="card-data">
            <template v-for="(child, i) in item.children" :key="child.name">
              <span class="fontSize28DIN">{{ child.value ?? '--' }}</span>
              <p>{{ child.seprate || '' }}</p>
            </template>
            {{ item.unit || '' }}
          </div>
          <div class="card-name">
            {{ item.name }}
            <template v-for="(child, i) in item.children" :key="child.name">
              <span>
                {{ child.name ?? '--' }}
              </span>
              <p>{{ child.seprate || '' }}</p>
            </template>
            {{ item.type }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCardConfig1, getCardConfig2 } from '../config.js';
import Api from '../api.js';
const cardConfig1 = ref(getCardConfig1());
const cardConfig2 = ref(getCardConfig2());
const getData = async () => {
  const res = await Api.getSuperChargeStationCount();
  cardConfig1.value = getCardConfig1(res?.data || {});
  cardConfig2.value = getCardConfig2(res?.data || {});
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
    border-radius: 4px;

    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.04), inset 0px 0px 35px 0px rgba(41, 76, 179, 0.2);
    background: linear-gradient(
      219.05deg,
      rgba(37, 177, 255, 0.02) 16.882%,
      rgba(37, 177, 255, 0.2) 100%
    );

    display: flex;
    flex-flow: column nowrap;
    padding: 22px;
    justify-content: space-between;

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
          color: #00f7ff;
          -webkit-background-clip: text;
          background-clip: text;
          background: linear-gradient(
              rgb(0, 247, 255) 0%,
              rgb(213, 254, 255) 52.08%,
              rgb(0, 247, 255) 100%
            )
            text;
          -webkit-text-fill-color: transparent;
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
