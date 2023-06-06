import chdzsszl from './images/chdzsszl.png'
import jrqyzs from './images/jrqyzs.png'
import ztsyl from './images/ztsyl.png'
import zxzl from './images/zxzl.png'
import edzgl from './images/edzgl.png'
import sszgl from './images/sszgl.png'
export const pageNumFun = (data = {}) => {
  return [
    {
      name: '年累计充电量',
      // num: data?.cumulativeCharge,
      num: 1.25,
      unit: '亿kWh'
    },
    {
      name: '年累计充电次数',
      // num: data?.cumChargeCount,
      num: 1.14,
      unit: '亿次'
    },
    {
      name: '年累计充电时长',
      // num: data?.cumChargeTime,
      num: 7.39,
      unit: '亿h'
    },
    {
      name: '年累计换电次数',
      // num: data?.cumChargeTime,
      num: 5641,
      unit: '万次'
    }
  ]
}
export const chdsszlFun = (data = {}) => {
  return [
    {
      img: chdzsszl,
      num: 151769,
      unit: '个',
      name: '充换电站设施总量'
    },
    {
      img: jrqyzs,
      num: 12,
      unit: '个',
      name: '接入企业总数'
    },
  ];
};
export const chargingType = [
  {
    code: 1,
    label: '充换电设施类型'
  }
]
export const chargingTypeDataFun = (data={})=>{
  return [
    {
      value: 120625,
      name: '充电桩',
      unit: '个'
    },
    {
      value: 10583,
      name: '充电柜',
      unit: '个'
    },
    {
      value: 19802,
      name: '换电柜',
      unit: '个'
    },
    {
      value: 759,
      name: '其他',
      unit: '个'
    },
  ];
}
export const  todayFacilities = [
  {
    code: 1,
    label: '充电桩'
  },
  {
    code: 2,
    label: '充电柜'
  },
  {
    code: 3,
    label: '换电柜'
  },
]
export const todayFacilitiesCardFun = (data = {}) => {
  return [
    {
      img: ztsyl,
      num: 67.03,
      unit: '%',
      name: '整体使用率',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: zxzl,
      num: 80855,
      unit: '',
      name: '在线总量',
      classStyleType: 'leftRightStyleYellow'
    }
  ];
};
export const powerTodayCardFun = (data = {}) => {
  return [
    {
      img: edzgl,
      num: 45531,
      unit: '/kw',
      name: '额定总功率',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: sszgl,
      num: 29595,
      unit: '/kw',
      name: '实时总功率',
      classStyleType: 'leftRightStyleYellow'
    }
  ];
};
export const linePowerDataFun = (data = []) => {
  return [
    {
      data: data.map((item) => [item.time, item.onlineCount]),
      type: 'line',
      smooth: true,
      name: '额定功率'
    },
    {
      data: data.map((item) => [item.time, item.onlineCount]),
      type: 'line',
      smooth: true,
      name: '实时功率'
    },
  ];
};