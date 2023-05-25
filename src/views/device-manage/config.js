import dqzx from './images/dqzx.png';
import dqlx from './images/dqlx.png';
import dqsyl from './images/dqsyl.png';
import dqgzl from './images/dqgzl.png';
import dayjs from 'dayjs';

export const pageNumFun = (data={}) => {
  return [
    {
      name: '充电站总量',
      num: data?.stationCount,
      unit: '个'
    },
    {
      name: '充电桩总量',
      num: data?.equipmentCount,
      unit: '个'
    },
    {
      name: '充电枪总量',
      num: data?.gunCount,
      unit: '个'
    },
    {
      name: '充电总功率',
      num: data?.chargeTotalRate,
      unit: 'KW'
    }
  ];
};

export const chargingStationTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电桩类型'
    },
    {
      code: 2,
      label: '充电桩电流类型'
    }
  ];
};
export const chargingStationGunTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电枪类型'
    },
    {
      code: 2,
      label: '充电枪电流类型'
    }
  ];
};
export const chargingStationPieDataFun = (code = 1,data={})=>{
  if(code === 1){
    return [
      { value: data?.chargeCountByChargeTypeDto?.quickCount, name: '快充桩',  unit: '个',isChoose: true },
      { value: data?.chargeCountByChargeTypeDto?.noQuickCount, name: '慢充桩', unit: '个',isChoose: true },
      { value:  data?.chargeCountByChargeTypeDto?.superCount, name: '超充桩',  unit: '个',isChoose: true },
      { value: data?.chargeCountByChargeTypeDto?.v2GCount, name: 'V2G桩',  unit: '个',isChoose: true }
    ]
  }else{
    return [
      { value: data?.chargeCountByElectricityTypeDto?.directCurrentCount, name: '直流桩',  unit: '个' },
      { value:  data?.chargeCountByElectricityTypeDto?.exchangeCount, name: '交流桩', unit: '个' }
    ]
  }
}

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
    },
  ];
}

export const chargingTypesTabsFun = ()=>{
  return [
    {
      code: 1,
      label: '充电桩状态'
    },
    {
      code: 2,
      label: '充电枪状态'
    }
  ];
}

export const chargingTypesFun = (data={})=>{
  return [
    {
      img: dqzx,
      num: data?.onlineCount,
      unit: '个',
      name: '当前在线',
      classStyleType:'leftRightStyleGreen6656'
    },
    {
      img: dqlx,
      num: data?.offlineCount,
      unit: '个',
      name: '当前离线',
      classStyleType:'leftRightStyleGray6656'
    }
  ];
}

export const lineStateDataFun = (data=[]) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ')
  return [{
    data:data.map(item=>[ yearMonthDay + item.time,item.onlineCount]),
    type: 'line',
    smooth: true,
    name:'在线'
  },{
    data:data.map(item=>[ yearMonthDay + item.time,item.offlineCount]),
    type: 'line',
    smooth: true,
    name:'离线'
  }]
}

export const chargingRunTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电桩运行情况'
    },
    {
      code: 2,
      label: '充电枪运行情况'
    }
  ];
};

export const chargingRunDataFun = (data={})=>{
  return [
    {
      img: dqsyl,
      num: data?.useRate,
      name: '当前使用率',
      classStyleType:'leftRightStyleGreen6656'
    },
    {
      img: dqgzl,
      num: data?.troubleRate,
      name: '当前故障率',
      classStyleType:'leftRightStyleGray6656'
    }
  ];
}

export const lineRunDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ')
  return [{
    data:data.map(item=>[ yearMonthDay + item.time,item.useRate]),
    type: 'line',
    smooth: true,
    name:'桩使用率'
  },{
    data:data.map(item=>[ yearMonthDay + item.time,item.troubleRate]),
    type: 'line',
    smooth: true,
    name:'桩故障率'
  }]
}

export const bottomTabDataFun = () => {
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
};
