<template>
  <div class="time-weather-wrap">
    <div class="time">
      <span class="yyyy-mm-dd">
        {{ dayjs(sday).format('YYYY-MM-DD') }}
      </span>
      <span class="hh-mm-ss">
        {{ dayjs(sday).format('HH:mm:ss') }}
      </span>
    </div>
    <!-- <div class="weather">
            weather
        </div> -->
  </div>
</template>
<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import dayjs from 'dayjs';
const timeId = ref();
const sday = ref();
timeId.value = setInterval(() => {
  sday.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
}, 1000);
onBeforeUnmount(() => {
  clearInterval(timeId.value);
});
</script>
<style lang="less" scoped>
.time-weather-wrap {
  margin-right: 20px;
  .time {
    font-family: 'LCD';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 21px;
    /* identical to box height */

    text-align: center;
    letter-spacing: 0.1em;

    color: #ffffff;
    .hh-mm-ss {
      // font-size: 24px;
    }
    .yyyy-mm-dd {
      padding-right: 24px;
    }
  }
}
</style>
