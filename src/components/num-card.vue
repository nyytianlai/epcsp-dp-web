<template>
  <div class="num-card" :class="type">
    <img class="icon" :src="data.img" alt="" :style="styleImgFont?.icon" />
    <div class="info">
      <span class="num">
        <span class="value" :style="styleImgFont?.num">
          <!-- {{ formatWithToLocalString(data.num) }} -->
          {{
            data.digits
              ? formatWithToLocalString(data.num, data.digits)
              : formatWithToLocalString(data.num)
          }}
          <!-- <tooltip-over
            :is-inline="true"
            :className="['num-card-value-tooltip']"
            :content="
              data.digits
                ? formatWithToLocalString(data.num, data.digits)
                : formatWithToLocalString(data.num)
            "
          /> -->
        </span>
        <span class="unit" v-if="data.displayUnit || data.unit">
          <!-- {{ data.displayUnit || data.unit }} -->
          <tooltip-over
            :is-inline="true"
            :className="['num-card-unit-tooltip']"
            :content="data.displayUnit || data.unit"
            :ref-name="data.displayUnit || data.unit"
          />
        </span>
      </span>
      <span class="name" :style="styleImgFont?.name">
        <!-- {{ data.displayName || data.name }} -->
        <tooltip-over
          :is-inline="true"
          :className="['num-card-name-tooltip']"
          :content="data.displayName || data.name"
          :ref-name="data.displayName || data.name"
        />
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { formatWithToLocalString } from '@/global/commonFun.js';
import TooltipOver from '@/components/tooltip-over.vue';
interface Idata {
  img: string;
  name: string;
  num: string | number;
  unit?: string;
  digits?: number;
  iconStyle?: object;
  numStyle?: object;
  nameStyle?: object;
  displayName?: string;
  displayUnit?: string;
}
type Itype = 'top-down' | 'left-right';

interface IimageSize {
  width: string;
  height: string;
}
type IclassStyleType = 'bottomDown' | 'leftRightStyleYellow';

interface Props {
  data: Idata;
  type?: Itype;
  classStyleType?: IclassStyleType;
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
  bottomDown: {
    num: {
      background: 'linear-gradient(180deg, #0080ff 0%, #ffffff 52.08%, #007cf8 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text'
    }
  },
  leftRightStyleYellow: {
    icon: {
      width: '0.78rem',
      height: '0.58rem'
    },
    num: {
      lineHeight: '0.32rem',
      fontSize: '0.32rem',
      background: 'linear-gradient(180deg, #F9E900 0%, #FFFFFF 52.08%, #F9E900 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text'
    },
    name: {
      fontSize: '0.16rem',
      lineHeight: '0.22rem'
    }
  },
  leftRightStyleYellow5858: {
    icon: {
      width: '0.58rem',
      height: '0.58rem'
    },
    num: {
      lineHeight: '0.32rem',
      fontSize: '0.32rem',
      background: 'linear-gradient(180deg, #F9E900 0%, #FFFFFF 52.08%, #F9E900 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text'
    },
    name: {
      fontSize: '0.16rem',
      lineHeight: '0.22rem'
    }
  },
  leftRightStyleGreen: {
    icon: {
      width: '0.78rem',
      height: '0.58rem'
    },
    num: {
      lineHeight: '0.32rem',
      fontSize: '0.32rem',
      background: 'linear-gradient(180deg, #00F7FF 0%, #D5FEFF 52.08%, #00F7FF 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text'
    },
    name: {
      fontSize: '0.16rem',
      lineHeight: '0.22rem'
    }
  },
  leftRightStyleGreen6656: {
    icon: {
      width: '0.66rem',
      height: '0.56rem'
    },
    num: {
      lineHeight: '0.32rem',
      fontSize: '0.32rem',
      background: 'linear-gradient(180deg, #00F7FF 0%, #D5FEFF 52.08%, #00F7FF 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text'
    },
    name: {
      fontSize: '0.16rem',
      lineHeight: '0.22rem'
    }
  },
  leftRightStyleGray6656: {
    icon: {
      width: '0.66rem',
      height: '0.56rem'
    },
    num: {
      lineHeight: '0.32rem',
      fontSize: '0.32rem',
      background: 'linear-gradient(180deg, #BFBFBF 0%, #FFFFFF 52.08%, #BFBFBF 100%)',
      textFillColor: 'transparent',
      '-webkit-background-clip': 'text'
    },
    name: {
      fontSize: '0.16rem',
      lineHeight: '0.22rem'
    }
  }
};

const { data, type, classStyleType } = toRefs(props);
interface IStyleImgFont {
  icon?: Partial<CSSStyleDeclaration>;
  num?: Partial<CSSStyleDeclaration>;
  name?: Partial<CSSStyleDeclaration>;
}
const styleImgFont = computed<IStyleImgFont>(() => {
  if (classStyleType.value) {
    return styleObj[classStyleType.value];
  } else {
    return {
      icon: data.value?.iconStyle,
      num: data.value?.numStyle,
      name: data.value?.nameStyle
    };
  }
});
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
      width: 100%;
      .num {
        width: 100%;
        text-align: center;
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
      flex: 1;
      min-width: 0;
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
