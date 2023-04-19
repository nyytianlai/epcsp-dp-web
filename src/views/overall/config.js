import cdzzl from '@/assets/images/overall/cdzzl.png';
import xnyqczl from '@/assets/images/overall/xnyqczl.png';
import yjryyqyzl from '@/assets/images/overall/yjryyqyzl.png';

import zlcd from '@/assets/images/overall/zlcd.png';
import jlcd from '@/assets/images/overall/jlcd.png';
import fast from '@/assets/images/overall/fast.png';
import slow from '@/assets/images/overall/slow.png';
import speed from '@/assets/images/overall/speed.png';
import v2g from '@/assets/images/overall/v2g.png';
import ztsyl from '@/assets/images/overall/ztsyl.png';
import zxzl from '@/assets/images/overall/zxzl.png';

import zgl from '@/assets/images/overall/zgl.png';
import ssgl from '@/assets/images/overall/ssgl.png';

import dayjs from 'dayjs';

export const cdsszlFun = (data={}) => {
  return [
    {
      img: cdzzl,
      num: data?.totalChargingStations,
      unit: '个',
      name: '充电站总量'
    },
    {
      img: xnyqczl,
      num: data?.totalOperating,
      unit: '个',
      name: '已接入运营企业总量'
    },
    {
      img: yjryyqyzl,
      num: data?.totalNewEnergyVehicles,
      unit: '万辆',
      name: '新能源汽车总量'
    }
  ];
};

export const projectListFun = () => {
  return [
    {
      num: 6399,
      unit: '个',
      name: '充电站总量'
    },
    {
      num: 5555,
      unit: '个',
      name: '已接入运营企业总量'
    },
    {
      num: 666,
      unit: '个',
      name: '新能源汽车总量'
    },
    {
      num: 2010,
      unit: '个',
      name: '已接入运营企业总量'
    },
    {
      num: 4800,
      unit: '个',
      name: '新能源汽车总量'
    },{
      num: 6399,
      unit: '个',
      name: '充电站总量'
    },
    {
      num: 2010,
      unit: '个',
      name: '已接入运营企业总量'
    },
    {
      num: 4800,
      unit: '个',
      name: '新能源汽车总量'
    },
    {
      num: 2010,
      unit: '个',
      name: '已接入运营企业总量'
    },
    {
      num: 4800,
      unit: '个',
      name: '新能源汽车总量'
    }
  ];
};

export const tabDataFun = () => {
  return [
    {
      code: 'pile',
      label: '充电桩总量'
    },
    {
      code: 'gun',
      label: '充电枪总量'
    }
  ];
};

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

export const pileChargerFun = (code = 'pile',data={}) => {
  if (code === 'pile') {
    return [
      {
        img: zlcd,
        num: data?.directEquCount,
        unit: '个',
        name: '直流桩总量'
      },
      {
        img: jlcd,
        num: data?.exchangeEquCount,
        unit: '个',
        name: '交流桩总量'
      },
      {
        img: fast,
        num: data?.fastChargeEquCount,
        unit: '个',
        name: '快充桩总量'
      },
      {
        img: slow,
        num: data?.slowChargeEquCount,
        unit: '个',
        name: '慢充桩总量'
      },
      {
        img: speed,
        num: data?.overchargeEquCount,
        unit: '个',
        name: '超充桩总量'
      },
      {
        img: v2g,
        num: data?.v2GEquCount,
        unit: '个',
        name: 'V2G桩总量'
      }
    ];
  } else {
    return [
      {
        img: zlcd,
        num: data?.directEquCount,
        unit: '个',
        name: '直流枪总量'
      },
      {
        img: jlcd,
        num: data?.exchangeEquCount,
        unit: '个',
        name: '交流枪总量'
      },
      {
        img: fast,
        num: data?.fastChargeEquCount,
        unit: '个',
        name: '快充枪总量'
      },
      {
        img: slow,
        num: data?.slowChargeEquCount,
        unit: '个',
        name: '慢充枪总量'
      },
      {
        img: speed,
        num: data?.overchargeEquCount,
        unit: '个',
        name: '超充枪总量'
      },
      {
        img: v2g,
        num: data?.v2GEquCount,
        unit: '个',
        name: 'V2G枪总量'
      }
    ];
  }
};

export const operatingTabsFun = () => {
  return [
    {
      code: 'station',
      label: '充电站'
    },
    {
      code: 'pile',
      label: '充电桩'
    },
    {
      code: 'gun',
      label: '充电枪'
    }
  ];
};

export const todayTabsFun = () => {
  return [
    {
      code: 'pile',
      label: '充电桩信息'
    },
    {
      code: 'gun',
      label: '充电枪信息'
    }
  ];
};

export const todayInfoNumDataFun = (data={}) => {
  return [
    {
      img: ztsyl,
      num: data?.overallUtilization,
      name: '整体使用率',
      classStyleType:'leftRightStyleGreen'
    },
    {
      img: zxzl,
      num: data?.totalOnline,
      unit: '个',
      name: '在线总量',
      classStyleType:'leftRightStyleYellow'
    }
  ];
};

export const powerInfoNumDataFun = (data={}) => {
  return [
    {
      img: zgl,
      num: data?.totalPower,
      name: '总功率/kw',
      classStyleType:'leftRightStyleGreen'
    },
    {
      img: ssgl,
      num: data?.realTimePower,
      name: '实时功率/kw',
      classStyleType:'leftRightStyleYellow'
    }
  ];
};
// const timeData = ()=>(new Array(25).fill(0)).map((item,index)=>[dayjs().hour(index).format('YYYY-MM-DD HH:00'),Math.ceil(Math.random() * 100)])
export const lineTimeDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ')
  return [{
    data:data.map(item=>[ yearMonthDay + item.timeDim,item.ratedPower]),
    type: 'line',
    smooth: true,
    name:'额定功率'
  },{
    data:data.map(item=>[yearMonthDay + item.timeDim,item.realTimePower]),
    type: 'line',
    smooth: true,
    name:'实时功率'
  }]
}

export const warningTabsDataFun = (data={}) => {
  return [
    {
      label: '一级人身安全',
      icon: 'first-level',
      num: data?.firstLevel,
      code: 1,
      color: '#FA2A2D'
    },
    {
      label: '二级设备安全',
      icon: 'second-level',
      num: data?.secondLevel,
      code: 2,
      color: '#FF7500'
    },
    {
      label: '三级告警提示',
      icon: 'third-level',
      num: data?.thirdLevel,
      code: 3,
      color: '#FFBF00'
    },
  ]
}

export const warningListFun = () => {
  return [
    {
      date: '12:30:12',
      message: '充电桩排队人数过多充电桩排队人数过多',
      area:'南山区充电桩排队人数过多'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area:'南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area:'南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area:'南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area:'南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多充电桩排队人数过多',
      area:'南山区充电桩排队人数过多'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area:'南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area:'南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area:'南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area:'南山区'
    }
  ]
}

export const bottomTabDataFun = () => {
  return [
    {
      code: 1,
      label: '充电设施'
    },
    {
      code: 2,
      label: '充电功率'
    }
  ];
};

export const columnDataFun = () => {
  return [
    {
      prop: 'operatorName',
      label: '运营商名称',
      width:'250'
    },
    {
      prop: 'stationName',
      label: '充电站名称',
      width:'150'
    },
    {
      prop: 'alarmLevel',
      label: '告警级别',
      width:'120'
    },
    {
      prop: 'alarmDesc',
      label: '告警描述',
      width:'300'
    },
    {
      prop: 'alarmType',
      label: '告警类型',
      width:'100'
    },
    {
      prop: 'alarmTime',
      label: '告警时间',
      width:'150'
    },
    {
      prop: 'contactPerson',
      label: '安全负责人',
      width:'100'
    },
    {
      prop: 'contactTel',
      label: '联系电话',
      width:''
    },
  ]
}