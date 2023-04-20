<template>
  <div class="num-card" :class="type">
    <img class="icon" :src="data.img" alt="" :style="styleImgFont?.icon" />
    <div class="info">
      <span class="num">
        <span class="value" :style="styleImgFont?.num">{{ formatWithToLocalString(data.num) }}</span>
        <span class="unit">&nbsp;{{ data.unit }}</span>
      </span>
      <span class="name" :style="styleImgFont?.name">{{ data.name }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import {toRefs,computed } from 'vue'
import type { CSSProperties } from 'vue'
import { formatWithToLocalString } from '@/global/commonFun.js'
interface Idata {
  img: string;
  name: string;
  num: string | number;
  unit?: string;
  iconStyle?:object;
  numStyle?:object;
  nameStyle?:object;
}
type Itype = 'top-down' | 'left-right';

interface IimageSize {
  width: string;
  height: string;
}
type IclassStyleType = 'bottomDown'|'leftRightStyleYellow';

interface Props {
  data: Idata;
  type: Itype;
  classStyleType: IclassStyleType;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {
      img: '',
      name: '',
      num: '',
      unit: ''
    };
  },
  type: 'top-down'
});

const styleObj = {
  bottomDown:{
    num: {
      background: 'linear-gradient(180deg, #0080ff 0%, #ffffff 52.08%, #007cf8 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text',
    }
  },
  leftRightStyleYellow: {
    icon: {
      width: '0.78rem',
      height: '0.58rem'
    },
    num: {
      lineHeight: '0.32rem',
      fontSize:'0.32rem',
      background: 'linear-gradient(180deg, #F9E900 0%, #FFFFFF 52.08%, #F9E900 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text',
    },
    name: {
      fontSize: '0.16rem',
      lineHeight:'0.22rem'
    }
  },
  leftRightStyleGreen: {
    icon: {
      width: '0.78rem',
      height: '0.58rem'
    },
    num: {
      lineHeight: '0.32rem',
      fontSize:'0.32rem',
      background: 'linear-gradient(180deg, #00F7FF 0%, #D5FEFF 52.08%, #00F7FF 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text',
    },
    name: {
      fontSize: '0.16rem',
      lineHeight:'0.22rem'
    }
  },
  leftRightStyleGreen6656: {
    icon: {
      width: '0.66rem',
      height: '0.56rem'
    },
    num: {
      lineHeight: '0.32rem',
      fontSize:'0.32rem',
      background: 'linear-gradient(180deg, #00F7FF 0%, #D5FEFF 52.08%, #00F7FF 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text',
    },
    name: {
      fontSize: '0.16rem',
      lineHeight:'0.22rem'
    }
  },
  leftRightStyleGray6656: {
    icon: {
      width: '0.66rem',
      height: '0.56rem'
    },
    num: {
      lineHeight: '0.32rem',
      fontSize:'0.32rem',
      background: 'linear-gradient(180deg, #BFBFBF 0%, #FFFFFF 52.08%, #BFBFBF 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text',
    },
    name: {
      fontSize: '0.16rem',
      lineHeight:'0.22rem'
    }
  }
};

const { data, type, classStyleType } = toRefs(props);
interface IStyleImgFont{
  icon?: CSSProperties;
  num?: CSSProperties;
  name?: CSSProperties;
}
const styleImgFont = computed<IStyleImgFont>(()=>{
  
  if(classStyleType.value){
    return styleObj[classStyleType.value]
  }else{
    return {
      icon:data.value?.iconStyle,
      num:data.value?.numStyle,
      name:data.value?.nameStyle
    }
  }

})
</script>
<style lang="less" scoped>
.num-card {
  display: flex;
  &.top-down {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      object-fit: cover;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .num {
        .value {
          font-family: 'DIN Alternate';
          font-size: 30px;
          line-height: 30px;
          font-weight: 700;
        }
        .unit {
          font-size: 14px;
        }
      }
      .name {
        font-size: 14px;
        white-space: nowrap;
        color: #c6d1db;
      }
    }
  }
  &.left-right {
    align-items: center;
    .icon {
      margin-right: 16px;
      width: 61px;
      height: 64px;
      object-fit: cover;
    }
    .info {
      display: flex;
      flex-direction: column-reverse;
      .name {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        margin-bottom: 4px;
      }
      .num {
        line-height: 32px;
        display: flex;
        align-items: baseline;
        .value {
          font-family: 'DIN Condensed';
          font-size: 28px;
          line-height: 32px;
          font-weight: 700;
          color: #00f7ff;
          -webkit-background-clip: text;
          background-clip: text;
        }
        .unit {
          font-size: 12px;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
}
</style>
