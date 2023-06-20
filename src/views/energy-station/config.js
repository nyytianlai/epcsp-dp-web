import cnzzs from './images/cnzzs.png';
import jrqys from './images/jrqys.png';
import xtyxxl from './images/xtyxxl.png';
import zjzrl from './images/zjzrl.png';
import jrcdl from './images/jrcdl.png';
import jrfdl from './images/jrfdl.png';
import jrcdcs from './images/jrcdcs.png';
import jrfdcs from './images/jrfdcs.png';
import nxfdl from './images/nxfdl.png';
import ntgdl from './images/ntgdl.png';
import nco2jpl from './images/nco2jpl.png';
import dayjs from 'dayjs';
import { deepClone } from '@/utils/index';

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '年累计充电量',
      // num: data?.cumulativeCharge,
      num: 2297.16,
      unit: '万kWh'
    },
    {
      name: '年累计放电量',
      // num: data?.cumChargeCount,
      num: 2127.17,
      unit: 'kWh'
    },
    {
      name: '累计充放电次数',
      // num: data?.cumChargeTime,
      num: 1196,
      unit: '次'
    }
  ];
};
export const cndzyxzlFun = (data = {}) => {
  return [
    {
      img: cnzzs,
      num: 15,
      unit: '/个',
      name: '储能站总数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: jrqys,
      num: 10,
      unit: '/个',
      name: '接入企业数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: zjzrl,
      num: 1309.75,
      unit: '/MW',
      name: '装机总容量',
      classStyleType: 'leftRightStyleYellow'
    },
    {
      img: xtyxxl,
      num: 75.72,
      unit: '/%',
      name: '系统运行效率',
      classStyleType: 'leftRightStyleYellow'
    }
  ];
};
export const tabType = [
  {
    code: 1,
    label: '电网位置'
  },
];
export const tabTypeDataFun = (data = {}, code = 1) => {
  if (code === 1) {
    return [
      {
        value: 9,
        name: '用户侧',
        unit: '个'
      },
      {
        value: 4,
        name: '电网侧',
        unit: '个'
      },
      {
        value: 2,
        name: '电源侧',
        unit: '个'
      }
    ];
  } else {
    return [
      {
        value: 2035,
        name: '电化学储能站',
        unit: '个'
      },
      {
        value: 1,
        name: '抽水储能站',
        unit: '个'
      }
    ];
  }
};
export const rankTabType = [
  {
    code: 1,
    label: '站点装机容量'
  },
  {
    code: 2,
    label: '系统运行效率'
  }
];
export const runingFun = (data = {}) => {
  return [
    {
      img: jrcdl,
      num: 3697,
      unit: 'MWh',
      name: '今日充电量'
    },
    {
      img: jrfdl,
      num: 2814,
      unit: 'MWh',
      name: '今日放电量'
    },
    {
      img: jrcdcs,
      num: 32,
      unit: '次',
      name: '今日充电次数'
    },
    {
      img: jrfdcs,
      num: 28,
      unit: '次',
      name: '今日放电次数'
    }
  ];
};
export const todayLine = [
  {
    code: 1,
    label: '今日深圳市储放能功率及负荷曲线'
  }
];
export const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  const nowTime = dayjs().format('HH:00')
  data = [
    {
      timeDim: '00:00',
      ratedPower: 14382.1,
      realTimePower: -63.5
    },
    {
      timeDim: '01:00',
      ratedPower: 14258.43,
      realTimePower: -53.5
    },
    {
      timeDim: '02:00',
      ratedPower: 13597.2,
      realTimePower: -50
    },
    {
      timeDim: '03:00',
      ratedPower: 13059.55,
      realTimePower: 0
    },
    {
      timeDim: '04:00',
      ratedPower: 12874.07,
      realTimePower: 0
    },
    {
      timeDim: '05:00',
      ratedPower: 12718.86,
      realTimePower: 0
    },
    {
      timeDim: '06:00',
      ratedPower: 13052.68,
      realTimePower: 0
    },
    {
      timeDim: '07:00',
      ratedPower: 14201.88,
      realTimePower: 0
    },
    {
      timeDim: '08:00',
      ratedPower: 16922.46,
      realTimePower: 0
    },
    {
      timeDim: '09:00',
      ratedPower: 18879.06,
      realTimePower: 63.2
    },
    {
      timeDim: '10:00',
      ratedPower: 19116.29,
      realTimePower: 63.2
    },
    {
      timeDim: '11:00',
      ratedPower: 19153.4,
      realTimePower: 51.6
    },
    {
      timeDim: '12:00',
      ratedPower: 17053.47,
      realTimePower: 0
    },
    {
      timeDim: '13:00',
      ratedPower: 16354.45,
      realTimePower: -10
    },
    {
      timeDim: '14:00',
      ratedPower: 17689.35,
      realTimePower: 0
    },
    {
      timeDim: '15:00',
      ratedPower: 17919.46,
      realTimePower: 0
    },
    {
      timeDim: '16:00',
      ratedPower: 18585.41,
      realTimePower: 0
    },
    {
      timeDim: '17:00',
      ratedPower: 19580.92,
      realTimePower: 0
    },
    {
      timeDim: '18:00',
      ratedPower: 19902.44,
      realTimePower: 0
    },
    {
      timeDim: '19:00',
      ratedPower: 20401.48,
      realTimePower: 0
    },
    {
      timeDim: '20:00',
      ratedPower: 20044.99,
      realTimePower: 0
    },
    {
      timeDim: '21:00',
      ratedPower: 19368.48,
      realTimePower: 0
    },
    {
      timeDim: '22:00',
      ratedPower: 17821.77,
      realTimePower: 0
    },
    {
      timeDim: '23:00',
      ratedPower: 15889.69,
      realTimePower: 0
    }
  ];
  const index = data.findIndex(i=>i.timeDim === nowTime)
  let dataC = deepClone(data)
  dataC.splice(index+1)

  return [
    {
      data: dataC.map((item) => [yearMonthDay + item.timeDim, Number(item['ratedPower'])]),
      type: 'line',
      smooth: true,
      name: '深圳市电网实时负荷'
    },
    {
      yAxisIndex: 1,
      data: dataC.map((item) => [yearMonthDay + item.timeDim, Number(item['realTimePower'])]),
      type: 'line',
      smooth: true,
      name: '深圳市储能电站聚合实时功率'
    }
  ];
};
export const socialBenefitFun = (data = {}) => {
  return [
    {
      img: nxfdl,
      num: 0.43,
      unit: '亿KWh',
      name: '年削峰电量',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    },
    {
      img: ntgdl,
      num: 0.47,
      unit: '亿KWh',
      name: '年填谷电量',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    },
    {
      img: nco2jpl,
      num: 2.18,
      unit: '万吨',
      name: '年CO2减排量',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    }
  ];
};
//区级的柱状图
export const mapQuBar = () => {
  return [
    {
      areaCode: 440303,
      stationCount: 561
    },
    {
      areaCode: 440304,
      stationCount: 983
    },
    {
      areaCode: 440305,
      stationCount: 1187
    },
    {
      areaCode: 440306,
      stationCount: 1330
    },
    {
      areaCode: 440307,
      stationCount: 1712
    },
    {
      areaCode: 440308,
      stationCount: 234
    },
    {
      areaCode: 440309,
      stationCount: 771
    },
    {
      areaCode: 440310,
      stationCount: 227
    },
    {
      areaCode: 440311,
      stationCount: 211
    },
    {
      areaCode: 440343,
      stationCount: 64
    },
    {
      areaCode: 441521,
      stationCount: 5
    }
  ];
};
//街道级的柱状图
export const mapJdBar = () => {
  return [
    {
      streetId: 21,
      stationCount: 14
    },
    {
      streetId: 22,
      stationCount: 24
    },
    {
      streetId: 23,
      stationCount: 8
    },
    {
      streetId: 24,
      stationCount: 11
    },
    {
      streetId: 25,
      stationCount: 17
    },
    {
      streetId: 26,
      stationCount: 20
    },
    {
      streetId: 27,
      stationCount: 15
    },
    {
      streetId: 28,
      stationCount: 29
    },
    {
      streetId: 52,
      stationCount: 1
    }
  ];
};
//南山区的撒点数据
export const mapJdStationPoint = () => {
  return [
    {
      stationId: '765',
      stationName: '充电有道万利达科技大厦储能站',
      lng: 113.94028,
      lat: 22.546255,
      operatorId: '398461164',
      isHr: 1,
      status: 200,
      quickCount: 0,
      noQuickCount: 37,
      superCount: 0,
      sid: '008527',
      v2GCount: 0
    },
    {
      stationId: '630',
      stationName: '充电有道万海大厦停车场储能站',
      lng: 113.95,
      lat: 22.54,
      operatorId: '398461164',
      isHr: 1,
      status: 200,
      quickCount: 0,
      noQuickCount: 35,
      superCount: 0,
      sid: '008470',
      v2GCount: 0
    },
    {
      stationId: '809',
      stationName: '充电有道新一代国际公寓储能站',
      lng: 113.95,
      lat: 22.53,
      operatorId: '398461164',
      isHr: 1,
      status: 200,
      quickCount: 0,
      noQuickCount: 7,
      superCount: 0,
      sid: '008457',
      v2GCount: 0
    },
    {
      stationId: '440307004006',
      stationName: '丰华集祥-深圳特发信息大厦储能站',
      lng: 113.94925,
      lat: 22.52,
      operatorId: 'MA5ED7CT2',
      isHr: 1,
      status: 200,
      quickCount: 27,
      noQuickCount: 0,
      superCount: 0,
      sid: '005759',
      v2GCount: 0
    }
  ];
};
