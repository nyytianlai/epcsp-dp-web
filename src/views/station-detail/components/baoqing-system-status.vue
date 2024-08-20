<template>
  <div class="charging-wrap" >
    <ul class="content four-column-wrap" v-if="data && data.length">
      <li class="four-column-item" v-for="(item, index) in data" :key="index" :class="stateFormate(item.status)?.code" @click="handleClick(item)">
        <icon :icon="`svg-icon:${stateFormate(item.status)?.code}`" />
        <!-- <span class="power text-ellipsis-1">{{ item.value }}</span> -->
        <span class="state">
          <span class="text">{{ item.value }}</span>
        </span>
      </li>
    </ul>
    <no-data v-else />
  </div>
</template>
<script lang="ts" setup>
import { toRefs, onBeforeUnmount } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.baoqing-system-status`;
const props = defineProps({
  data: {
    type: Object,
    default: []
  }
});
const emits = defineEmits(['card-click'])
const { data } = toRefs(props);

const stateFormate = (state) => {
  return {
    0: {
      code: '',
      name: t(`${tHead}.state.offline`) || '离线'
    },
    1: {
      code: 'baoqing-online',
      name: t(`${tHead}.state.online`) || '在线'
    }
  }[state];
};
const handleClick = (item)=>{
  emits('card-click',item)
}
onBeforeUnmount(() => { });
</script>
<style lang="less" scoped>
.charging-wrap {
  overflow: hidden auto;
  height: 345px;
  margin-top: 12px;

  // .content {
  //   display: grid;
  //   grid-template-columns: 1fr 1fr 1fr 1fr;
  // }

  li {
    // margin: 0 auto;
    background: linear-gradient(255.75deg, rgba(37, 255, 150, 0.03) 23.33%, rgba(10, 75, 13, 0.3) 100%);
    mix-blend-mode: normal;
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(21, 85, 113, 0.2);
    backdrop-filter: blur(1px);
    border-radius: 1px;
    // width: 50%;
    // min-width: 84px;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    // margin-bottom: 16px;
    cursor: pointer;

    &.baoqing-online {
      .state {
        .text {
          background: linear-gradient(180deg, #4BFF5D 3.12%, #FFFFFF 48.96%, #4BFF5D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }
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
      text-align: center;
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
      background: linear-gradient(180deg,
          rgba(37, 177, 255, 0.04) 0%,
          rgba(58, 184, 255, 0.4) 100%);
      box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(21, 113, 46, 0.2);
      border-radius: 1px;

      .text {
        background: linear-gradient(180deg, #4bdeff 3.12%, #ffffff 48.96%, #4bdeff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }

  .text-font-style {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .charging-work {
    background: linear-gradient(255.75deg,
        rgba(37, 177, 255, 0.03) 23.33%,
        rgba(10, 52, 75, 0.3) 100%);

    .type {
      background: linear-gradient(270deg,
          rgba(79, 193, 255, 0.5) 2.5%,
          rgba(79, 193, 255, 0) 162.5%);
    }

    .state {
      background: linear-gradient(180deg,
          rgba(37, 177, 255, 0.04) 0%,
          rgba(58, 184, 255, 0.4) 100%);

      .text {
        background: linear-gradient(180deg, #4bdeff 3.12%, #ffffff 48.96%, #4bdeff 100%);
        .text-font-style;
      }
    }
  }

  .no-work {
    background: linear-gradient(255.75deg,
        rgba(37, 255, 150, 0.03) 23.33%,
        rgba(10, 75, 13, 0.3) 100%);

    .type {
      background: linear-gradient(270deg,
          rgba(79, 255, 139, 0.5) 2.5%,
          rgba(79, 255, 223, 0) 162.5%);
    }

    .state {
      background: linear-gradient(180deg,
          rgba(37, 177, 255, 0.04) 0%,
          rgba(58, 255, 172, 0.4) 100%);

      .text {
        background: linear-gradient(180deg, #4bff5d 3.12%, #ffffff 48.96%, #4bff5d 100%);
        .text-font-style;
      }
    }
  }

  .error-work {
    background: linear-gradient(255.75deg,
        rgba(255, 37, 37, 0.03) 23.33%,
        rgba(75, 10, 10, 0.3) 100%);

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
    background: linear-gradient(255.75deg,
        rgba(255, 255, 255, 0.03) 23.33%,
        rgba(70, 70, 70, 0.3) 100%);

    .type {
      background: linear-gradient(270deg,
          rgba(255, 255, 255, 0.5) 2.5%,
          rgba(255, 255, 255, 0) 162.5%);
    }

    .state {
      background: linear-gradient(180deg,
          rgba(255, 255, 255, 0.04) 0%,
          rgba(255, 255, 255, 0.4) 100%);

      .text {
        background: linear-gradient(180deg, #b3b3b3 3.12%, #ffffff 48.96%, #a2a2a2 100%);
        .text-font-style;
      }
    }
  }
}</style>
