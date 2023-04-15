import stateBlueB from '@/assets/images/safetySupervision/state-blue-b.png';
import stateBlueS from '@/assets/images/safetySupervision/state-blue-s.png';
import stateGrayB from '@/assets/images/safetySupervision/state-gray-b.png';
import stateGrayS from '@/assets/images/safetySupervision/state-gray-s.png';
import stateGreenS from '@/assets/images/safetySupervision/state-green-s.png';
import stateYellowB from '@/assets/images/safetySupervision/state-yellow-b.png';
import stateYellowS from '@/assets/images/safetySupervision/state-yellow-s.png';
import { merge } from 'lodash';
import dayjs from 'dayjs';
export const pageNumFun = () => {
  return [
    {
      name: '充电站总量',
      num: 6399,
      unit: '个'
    },
    {
      name: '充电桩总量',
      num: 125639,
      unit: '个'
    },
    {
      name: '充电枪总量',
      num: 125639,
      unit: '个'
    },
    {
      name: '充电总功率',
      num: 281887.3,
      unit: 'KW'
    }
  ];
};

export const totalWarningTabsFun = () => {
  return [
    {
      code: 1,
      label: '运营商'
    },
    {
      code: 2,
      label: '充电站'
    }
  ];
};

export const areaRankDataFun = () => {
  return [
    {
      num: 6399,
      unit: '次',
      name: '南山区'
    },
    {
      num: 201,
      unit: '次',
      name: '宝安区'
    },
    {
      num: 48,
      unit: '次',
      name: '罗湖区'
    },
    {
      num: 201,
      unit: '次',
      name: '龙华区'
    },
    {
      num: 48,
      unit: '次',
      name: '龙岗区'
    },
    {
      num: 6399,
      unit: '次',
      name: '南山区'
    },
    {
      num: 201,
      unit: '次',
      name: '宝安区'
    },
    {
      num: 48,
      unit: '次',
      name: '罗湖区'
    },
    {
      num: 201,
      unit: '次',
      name: '龙华区'
    },
    {
      num: 48,
      unit: '次',
      name: '大鹏新区'
    }
  ];
};

export const warningMonitorTabsFun = () => {
  return [
    {
      code: 1,
      label: '告警级别'
    },
    {
      code: 2,
      label: '告警类型'
    }
  ];
};
export const warningMonitorPieDataFun = (code = 1) => {
  if (code === 1) {
    return [
      { value: 1048, name: '一级人身安全', extraName: '人身安全', unit: '个' },
      { value: 735, name: '二级设备安全', extraName: '设备安全', unit: '个' },
      { value: 580, name: '三级告警提示', extraName: '告警提示', unit: '个' }
    ];
  } else {
    return [
      { value: 1048, name: '充电系统', unit: '个' },
      { value: 735, name: '电池系统', unit: '个' },
      { value: 580, name: '配电系统', unit: '个' }
    ];
  }
};

export const realtimeStateTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电站'
    },
    {
      code: 2,
      label: '充电桩'
    },
    {
      code: 3,
      label: '充电枪'
    }
  ];
};

const formatStyle = (style = {}) => {
  const styleDefault = {
    iconStyle: {
      width: '1.03rem',
      height: '1.08rem'
    },
    numStyle: {
      fontFamily: 'DIN Condensed',
      color: '#00F7FF',
      fontSize: '0.28rem',
      background: 'transparent'
    },
    nameStyle: {
      color: 'rgba(255, 255, 255, 0.8)'
    }
  };
  style = merge(styleDefault, style);
  return style;
};

export const realtimeStateDataFun = (code = 1) => {
  if (code === 1) {
    return [
      {
        img: stateBlueB,
        num: 2203,
        name: '正常/个',
        ...formatStyle()
      },
      {
        img: stateYellowB,
        num: 201,
        name: '预警/个',
        ...formatStyle({
          numStyle: {
            color: '#FFB713'
          }
        })
      },
      {
        img: stateGrayB,
        num: 48,
        name: '未上线/个',
        ...formatStyle({
          numStyle: {
            color: '#FFFFFF'
          }
        })
      }
    ];
  }
};
const timeData = () =>
  new Array(25)
    .fill(0)
    .map((item, index) => [
      dayjs().hour(index).format('YYYY-MM-DD HH:00'),
      Math.ceil(Math.random() * 100)
    ]);

export const realtimeTrendFun = () => {
  return [
    {
      data: timeData(),
      type: 'line',
      smooth: true,
      name: '告警数'
    }
  ];
};
