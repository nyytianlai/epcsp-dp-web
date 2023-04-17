import ztsyl from '@/assets/images/publicService/ztsyl.png';

import { merge } from 'lodash';
import dayjs from 'dayjs';
export const pageNumFun = () => {
  return [
    {
      name: '累计充电量',
      num: 6399,
      unit: '亿度'
    },
    {
      name: '累计充电次数',
      num: 125639,
      unit: '万次'
    },
    {
      name: '累计充电时长',
      num: 125639,
      unit: '万次'
    },
    {
      name: '本年充电总量',
      num: 281887.3,
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

export const deviceDataFun = () => {
  return [
    {
      img: ztsyl,
      num: '80855',
      name: '充电桩总数/个',
      classStyleType:'leftRightStyleGreen6656'
    },
    {
      img: ztsyl,
      num: 80855,
      name: '充电枪总数/个',
      classStyleType:'leftRightStyleGreen6656'
    }
  ];
}

export const chargingTypesTabsFun = ()=>{
  return [
    {
      code: 1,
      label: '充电桩'
    },
    {
      code: 2,
      label: '充电枪'
    }
  ];
}

export const chargingTypePieDataFun = (code = 1)=>{
  if(code === 1){
    return [
      { value: 33256, name: '离线',extraName:'离线充电桩', unit: '个' },
      { value: 58552, name: '占用', extraName:'占用充电桩',unit: '个' },
      { value: 67000, name: '故障',  extraName:'故障充电桩',unit: '个' },
      { value: 3540, name: '闲置',  extraName:'闲置充电桩',unit: '个' }
    ]
  }else{
    return [
      { value: 33256, name: '离线',extraName:'离线充电枪', unit: '个' },
      { value: 58552, name: '占用', extraName:'占用充电枪',unit: '个' },
      { value: 67000, name: '故障',  extraName:'故障充电枪',unit: '个' },
      { value: 3540, name: '闲置',  extraName:'闲置充电枪',unit: '个' }
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