import ztsyl from './images/ztsyl.png';

import { merge } from 'lodash';
import dayjs from 'dayjs';
export const pageNumFun = (data = {}) => {
  return [
    {
      name: '累计充电量',
      num: data?.cumulativeCharge,
      unit: '亿度'
    },
    {
      name: '累计充电次数',
      num: data?.cumChargeCount,
      unit: '万次'
    },
    {
      name: '累计充电时长',
      num: data?.cumChargeTime,
      unit: '小时'
    },
    {
      name: '本年充电总量',
      num: data?.yearTotalCharge,
      unit: '亿度'
    }
  ];
};
export const hotChargingDataFun = () => {
  return [
    {
      num: 6399,
      unit: 'KW',
      name: '充电站总量'
    },
    {
      num: 201,
      unit: 'KW',
      name: '已接入运营企业总量'
    },
    {
      num: 48,
      unit: 'KW',
      name: '新能源汽车总量'
    },
    {
      num: 201,
      unit: 'KW',
      name: '已接入运营企业总量'
    },
    {
      num: 48,
      unit: 'KW',
      name: '新能源汽车总量'
    }
  ]; 
}

export const deviceDataFun = (data={}) => {
  return [
    {
      img: ztsyl,
      num: data?.equipmentCount,
      name: '充电桩总数/个',
      classStyleType:'leftRightStyleGreen6656'
    },
    {
      img: ztsyl,
      num: data?.gunCount,
      name: '充电枪总数/个',
      classStyleType:'leftRightStyleGreen6656'
    }
  ];
}

export const chargingTypesTabsFun = ()=>{
  return [
    {
      code: 'pile',
      label: '充电桩'
    },
    {
      code: 'gun',
      label: '充电枪'
    }
  ];
}

export const chargingTypePieDataFun = (code = 'pile',data={})=>{
  if(code === 'pile'){
    return [
      { value: data?.offLine, name: '离线',extraName:'离线充电桩', unit: '个' },
      { value: data?.occupy, name: '占用', extraName:'占用充电桩',unit: '个' },
      { value: data?.malfunction, name: '故障',  extraName:'故障充电桩',unit: '个' },
      { value: data?.free, name: '闲置',  extraName:'闲置充电桩',unit: '个' }
    ]
  }else{
    return [
      { value: data?.offLine, name: '离线',extraName:'离线充电枪', unit: '个' },
      { value: data?.occupy, name: '占用', extraName:'占用充电枪',unit: '个' },
      { value: data?.malfunction, name: '故障',  extraName:'故障充电枪',unit: '个' },
      { value: data?.free, name: '闲置',  extraName:'闲置充电枪',unit: '个' }
    ]
  }
}

export const monthRateDataFun = () => {
  return [
    {
      num: 6399,
      unit: '个',
      name: '南山区'
    },
    {
      num: 201,
      unit: '个',
      name: '宝安区'
    },
    {
      num: 48,
      unit: '个',
      name: '罗湖区'
    },
    {
      num: 201,
      unit: '个',
      name: '龙华区'
    },
    {
      num: 48,
      unit: '个',
      name: '龙岗区'
    },
    {
      num: 6399,
      unit: '个',
      name: '南山区'
    },
    {
      num: 201,
      unit: '个',
      name: '宝安区'
    },
    {
      num: 48,
      unit: '个',
      name: '罗湖区'
    },
    {
      num: 201,
      unit: '个',
      name: '龙华区'
    },
    {
      num: 48,
      unit: '个',
      name: '大鹏新区'
    },
  ];
}