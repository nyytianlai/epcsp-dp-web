<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 14:44:53
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-18 15:00:47
 * @FilePath: \epcsp-dp-web\src\components\layout\components\time-weather.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="time-weather-wrap">
        <div class="time">
            <span class="hh-mm-ss">
                {{dayjs(sday).format('HH:mm:ss')}}
            </span>
            <span class="yyyy-mm-dd">
                {{dayjs(sday).format('YYYY.MM.DD')}}
            </span>
        </div>
        <!-- <div class="weather">
            weather
        </div> -->
    </div>
</template>
<script setup>
import dayjs from 'dayjs'
const timeId = ref()
const sday = ref()
timeId.value = setInterval(()=>{
    sday.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
}, 1000);
onBeforeUnmount(() => {
    clearInterval(timeId.value)
})
</script>
<style lang="less" scoped>
    .time-weather-wrap{
        .time{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .hh-mm-ss{
                font-size: 24px;
            }
            .yyyy-mm-dd{
                font-size: 14px;
            }
        }
    }
</style>