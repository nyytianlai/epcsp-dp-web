import ztsyl from '@/views/charging-station/images/ztsyl.png';
import ncd from './images/ncd.png';
import nfdl from './images/nfdl.png';
import gfzzs from './images/gfzzs.png';
import cnzzs from './images/cnzzs.png';
import sszs from './images/sszs.png';

// 'photovoltaic-station': [
//   {
//     name: '年累计发电量',
//     // num: data?.cumulativeCharge,
//     num: 5.06,
//     unit: '亿kWh'
//   },
//   {
//     name: '年累计生产绿证',
//     // num: data?.cumChargeCount,
//     num: 50.6,
//     unit: '万个'
//   },
//   {
//     name: '全社会用电量比例',
//     // num: data?.cumChargeTime,
//     num: 0.95,
//     unit: '%'
//   }
// ],
// 'chargings-replacement-cabinet': [
//   {
//     name: '年累计充电量',
//     // num: data?.cumulativeCharge,
//     num: 1.25,
//     unit: '亿kWh'
//   },
//   {
//     name: '年累计充电次数',
//     // num: data?.cumChargeCount,
//     num: 1.14,
//     unit: '亿次'
//   },
//   {
//     name: '年累计充电时长',
//     // num: data?.cumChargeTime,
//     num: 7.39,
//     unit: '亿h'
//   },
//   {
//     name: '年累计换电次数',
//     // num: data?.cumChargeTime,
//     num: 5641,
//     unit: '万次'
//   }
// ]
export const pageNumFun = (data = {}) => {
  return [
    {
      name: '年累计生产绿电',
      // num: data?.cumulativeCharge,
      num: 5.06,
      unit: data?.cumulativeChargeUnit || '亿kWh'
    },
    {
      name: '年累计CO²减排量',
      // num: data?.cumChargeCount,
      num: 56.96,
      unit: data?.cumChargeCountUnit || '万吨'
    },
    {
      name: '本年累计削峰电量',
      // num: data?.cumChargeTime,
      num: 6.94,
      unit: data?.cumChargeTimeUnit || '亿kWh'
    }
  ];
};

export const chargingStationsFun = (data = {}) => {
  return [
    {
      img: ztsyl,
      num: 6399,
      unit: '个',
      name: '充电站总数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: ncd,
      num: 2.66,
      unit: '亿KWh',
      name: '年充电量',
      classStyleType: 'leftRightStyleYellow5858'
    }
  ];
};

export const energyStationFun = (data = {}) => {
  return [
    {
      img: cnzzs,
      num: 2036,
      unit: '个',
      name: '储能站总数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: ncd,
      num: 4328,
      unit: '次',
      name: '年充放电数',
      classStyleType: 'leftRightStyleYellow5858'
    }
  ];
};
export const photovoltaicStationFun = (data = {}) => {
  return [
    {
      img: gfzzs,
      num: 1952,
      unit: '个',
      name: '光伏站总数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: nfdl,
      num: 5.06,
      unit: '亿KWh',
      name: '年发电量',
      classStyleType: 'leftRightStyleYellow5858'
    }
  ];
};
export const chargingsReplacementCabinetFun = (data = {}) => {
  return [
    {
      img: sszs,
      num: 12431,
      unit: '个',
      name: '设施总数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: ncd,
      num: 7.49,
      unit: '亿KWh',
      name: '年充电量',
      classStyleType: 'leftRightStyleYellow5858'
    }
  ];
};
export const digitalTwinSiteFun = () => {
  return [
    {
      id: 1,
      img: '',
      type: '充电站',
      name: '民乐充电站'
    },
    {
      id: 2,
      img: '',
      type: '光伏',
      name: '莲花西地铁光伏站'
    },
    {
      id: 3,
      img: '',
      type: '5G',
      name: '红荔西5G示范站'
    },
    {
      id: 4,
      img: '',
      type: '充电站',
      name: '特来电深圳国际低碳城站'
    },
    {
      id: 5,
      img: '',
      type: '光储充放',
      name: '奥特迅电力大厦充电站'
    },
    {
      id: 6,
      img: '',
      type: '储能站',
      name: '深圳宝清储能站'
    }
  ];
};
