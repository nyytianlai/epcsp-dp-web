<template>
  <div class="legend-wrap" :class="[{panelShow:!panelShow}]">
    <div class="legend-name">
      {{ legendName }}
    </div>
    <ul class="legend-list">
      <li v-if="legendType ==='normal'"  class="legend" v-for="(item, index) in legendList" :key="index">
        <span class="icon" :style="{background:item.color}"></span>
        <span class="name">{{ item?.name }}</span>
      </li>
      <div class="hot-bar" v-else>
        <span class="min-num">{{hotRange[0]}}</span>
        <span class="max-num">{{hotRange[1]}}</span>
      </div>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { toRefs,computed } from 'vue'
import { useStore } from 'vuex';
const store = useStore();
interface ILegendList {
  color: string;
  name: string;
}
type ILegendType = 'normal' | 'hot'
interface Props {
  legendName: string;
  legendList?: ILegendList[];
  legendType?: ILegendType;
  hotRange?: number|string[]
}
const props = withDefaults(defineProps<Props>(), {
  legendName: '充电数量(个)',
  legendType:'normal',
  legendList: () => [
        {
            color: 'linear-gradient(178.17deg, #59FFFF 4.74%, #002E2D 95.4%)',
            name:'充电站'
        },
        {
            color: 'linear-gradient(178.21deg, #5678F9 6.05%, #003077 94.76%)',
            name:'充电桩'
        },
        {
            color: 'linear-gradient(178.1deg, #4AD9FC 3.02%, #003077 97.03%)',
            name:'充电枪'
        }
  ],
  hotRange:()=>['10万','500万']
});
const { legendName, legendList, legendType } = toRefs(props);
const panelShow = computed(()=>store.getters.panelShow)
</script>
<style lang="less" scoped>
    .legend-wrap{
        padding: 8px 16px 6px 8px;
        background: rgba(23, 73, 122, 0.3);
        position: absolute;
        bottom: 85px;
        left: 498px;
        z-index: 999;
        transition: all 0.3s;
        &.panelShow{
          left: 96px;
        }
        .legend-name{
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
        }
        .legend-list{
            margin-top: 6px;
            padding-top: 8px;
            border-top: 1px dashed rgba(255, 255, 255, 0.5);
            .hot-bar{
              width: 200px;
              height: 10px;
              background: linear-gradient(90deg, #415BE4 0%, #10FFC3 26.04%, #C1FF10 49.48%, #FFCA10 75.52%, #FF1010 97.92%);
              position: relative;
              margin-bottom: 37px;
              .min-num,.max-num{
                position: absolute;
                top: 14px;
              }
              .min-num{
                left: 0;
              }
              .max-num{
                right: 0;
              }
            }
            .legend{
                display: flex;
                align-items: center;
                margin-bottom: 6px;
                &:last-of-type{
                  margin-bottom: 6px;
                }
                .icon{
                    width: 22px;
                    height: 12px;
                    transform: matrix(-1, 0, 0, 1, 0, 0);
                }
                .name{
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    white-space: nowrap;
                    margin-left: 8px;
                }
            }
        }
    }
</style>
