<template>
  <div class="charging-wrap">
    <ul class="content">
      <li v-for="(item, index) in data" :key="index" :class="stateFormate(item.status)?.code" @click="handleClick(item)">
        <span class="type">{{ typeFormate(item.chargingType).code }}</span>
        <icon :icon="`svg-icon:${stateFormate(item.status)?.code}`" />
        <span class="power text-ellipsis-1">{{ item.equipmentName }}</span>
        <span class="state">
          <span class="text">{{ stateFormate(item.status).name }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted,toRefs,inject } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const props = defineProps({
  data: {
    type: Object,
    default:[]
  }
})
const {data} = toRefs(props)
const stateFormate = (state) => {
  return {
    0: {
      code: 'offline-work',
      name:'离线'
    },
    1: {
      code: 'no-work',
      name:'空闲'
    },
    2: {
      code: 'charging-work',
      name:'占用'
    },
    3: {
      code: 'charging-work',
      name:'占用'
    },
    4: {
      code: 'charging-work',
      name:'占用'
    },
    5: {
      code: 'charging-work',
      name:'占用'
    },
    255: {
      code: 'error-work',
      name:'故障'
    },
    
  }[state];
};
const typeFormate = (type) => {
  return {
    1: {
      code: '快充'
    },
    2: {
      code: '慢充'
    },
    3: {
      code: '超充'
    },
    4: {
      code: 'V2G'
    }
  }[type];
};
const barListFun = () => {
  return [
    {
      state: '充电中',
      type: '快',
      power: '60KW'
    },
    {
      state: '空闲',
      type: '光',
      power: '60KW'
    },
    {
      state: '故障',
      type: '超',
      power: '60KW'
    },
    {
      state: '离线',
      type: 'V2G',
      power: '60KW'
    },
    {
      state: '充电中',
      type: '快',
      power: '60KW'
    },
    {
      state: '充电中',
      type: '快',
      power: '60KW'
    },
    {
      state: '充电中',
      type: '快',
      power: '60KW'
    },
    {
      state: '充电中',
      type: '快',
      power: '60KW'
    },
    {
      state: '充电中',
      type: '快',
      power: '60KW'
    },
    {
      state: '充电中',
      type: '快',
      power: '60KW'
      },
      {
      state: '充电中',
      type: '快',
      power: '60KW'
    },
    {
      state: '充电中',
      type: '快',
      power: '60KW'
    },
    {
      state: '充电中',
      type: '快',
      power: '60KW'
    },
    {
      state: '充电中',
      type: '快',
      power: '60KW'
    },
    {
      state: '充电中',
      type: '快',
      power: '60KW'
    }
  ];
};
const barData = ref(barListFun());
const handleClick = (item) => {
  //定位过去
  __g?.tileLayer?.focusActor("7CED6A4A4F00FFA1B7273C9511B55B85", item.eid, 2, 2, [-25, 0, 0])
  //清除绿色高亮
  __g.tileLayer.stopHighlightAllActors()
  //故障高亮
  if (+item.status === 255) {
    __g.tileLayer.getActorInfo({
            id: '7CED6A4A4F00FFA1B7273C9511B55B85',
            objectIds: [item.eid]
    }, (res) => {
      const {location} = res.data[0]
      __g.tileLayer.setLocation('1E0DA98D4A4DA1E3106E69AE5469D860', location);
      //Xy坐标在获取的基础上都加0.1
      __g.tileLayer.setRotation('1E0DA98D4A4DA1E3106E69AE5469D860', [0,58,0]);
      // __g.tileLayer.setScale('1E0DA98D4A4DA1E3106E69AE5469D860', [0.0001,0.0001,0.0001]);
      __g.misc.callBPFunction({             
              objectName: 'BP_Warning_2',
              functionName: 'UnpauseTimer',
          });
      // __g.tileLayer.focus('1E0DA98D4A4DA1E3106E69AE5469D860')
    });
  } else {
    //设置高亮颜色（全局生效）
    __g.settings.highlightColor(Color.Green);
    __g.tileLayer.highlightActor('7CED6A4A4F00FFA1B7273C9511B55B85', item.eid);
  }
    
   
}
</script>
<style lang="less" scoped>
.charging-wrap {
  overflow: hidden auto;
  height: 345px;
  margin-top: 12px;
  .content {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    mix-blend-mode: normal;
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(21, 85, 113, 0.2);
    backdrop-filter: blur(1px);
    border-radius: 1px;
    width: 84px;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-right: 16px;
    margin-bottom: 12px;
    cursor: pointer;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .type {
      position: absolute;
      top: 5px;
      left: 0;
      padding: 0 2px;
      min-width: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
    }
    .power {
      width: 100%;
      font-size: 12px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 4px;
      margin-bottom: 3px;
    }
    .el-icon {
      font-size: 34px;
    }
    .state {
      width: 100%;
      line-height: 32px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      mix-blend-mode: normal;
      box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(21, 113, 46, 0.2);
      border-radius: 1px;
    }
  }
  .text-font-style {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .charging-work {
    background: linear-gradient(
      255.75deg,
      rgba(37, 177, 255, 0.03) 23.33%,
      rgba(10, 52, 75, 0.3) 100%
    );
    .type {
      background: linear-gradient(
        270deg,
        rgba(79, 193, 255, 0.5) 2.5%,
        rgba(79, 193, 255, 0) 162.5%
      );
    }
    .state {
      background: linear-gradient(
        180deg,
        rgba(37, 177, 255, 0.04) 0%,
        rgba(58, 184, 255, 0.4) 100%
      );
      .text {
        background: linear-gradient(180deg, #4bdeff 3.12%, #ffffff 48.96%, #4bdeff 100%);
        .text-font-style;
      }
    }
  }
  .no-work {
    background: linear-gradient(
      255.75deg,
      rgba(37, 255, 150, 0.03) 23.33%,
      rgba(10, 75, 13, 0.3) 100%
    );
    .type {
      background: linear-gradient(
        270deg,
        rgba(79, 255, 139, 0.5) 2.5%,
        rgba(79, 255, 223, 0) 162.5%
      );
    }
    .state {
      background: linear-gradient(
        180deg,
        rgba(37, 177, 255, 0.04) 0%,
        rgba(58, 255, 172, 0.4) 100%
      );
      .text {
        background: linear-gradient(180deg, #4bff5d 3.12%, #ffffff 48.96%, #4bff5d 100%);
        .text-font-style;
      }
    }
  }
  .error-work {
    background: linear-gradient(
      255.75deg,
      rgba(255, 37, 37, 0.03) 23.33%,
      rgba(75, 10, 10, 0.3) 100%
    );
    .type {
      background: linear-gradient(270deg, rgba(255, 79, 79, 0.5) 2.5%, rgba(255, 79, 79, 0) 162.5%);
    }
    .state {
      background: linear-gradient(180deg, rgba(255, 37, 37, 0.04) 0%, rgba(255, 58, 58, 0.4) 100%);
      .text {
        background: linear-gradient(180deg, #ff4b4b 3.12%, #ffffff 48.96%, #ff4b4b 100%);
        .text-font-style;
      }
    }
  }
  .offline-work {
    background: linear-gradient(
      255.75deg,
      rgba(255, 255, 255, 0.03) 23.33%,
      rgba(70, 70, 70, 0.3) 100%
    );
    .type {
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 0.5) 2.5%,
        rgba(255, 255, 255, 0) 162.5%
      );
    }
    .state {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.4) 100%
      );
      .text {
        background: linear-gradient(180deg, #b3b3b3 3.12%, #ffffff 48.96%, #a2a2a2 100%);
        .text-font-style;
      }
    }
  }
}
</style>
