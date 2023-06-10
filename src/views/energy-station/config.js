import cnzzs from './images/cnzzs.png'
import jrqys from './images/jrqys.png'
import xtyxxl from './images/xtyxxl.png'
import zjzrl from './images/zjzrl.png'
import jrcdl from './images/jrcdl.png'
import jrfdl from './images/jrfdl.png'
import jrcdcs from './images/jrcdcs.png'
import jrfdcs from './images/jrfdcs.png'
import nxfdl from './images/nxfdl.png'
import ntgdl from './images/ntgdl.png'
import nco2jpl from './images/nco2jpl.png'
import dayjs from 'dayjs';
export const pageNumFun = (data = {}) => {
  return [
    {
      name: '年累计充电量',
      // num: data?.cumulativeCharge,
      num: 6.04,
      unit: '亿kWh'
    },
    {
      name: '年累计放电量',
      // num: data?.cumChargeCount,
      num: 4.58,
      unit: '亿kWh'
    },
    {
      name: '累计充放电次数',
      // num: data?.cumChargeTime,
      num: 4328,
      unit: '次'
    }
  ]
}
export const cndzyxzlFun = (data = {}) => {
  return [
    {
      img: cnzzs,
      num: 2036,
      unit: '/个',
      name: '储能站总数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: jrqys,
      num: 34,
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
  {
    code: 2,
    label: '能源类型'
  }
]
export const tabTypeDataFun = (data = {}, code = 1) => {
  if (code === 1) {
    return [
      {
        value: 2033,
        name: '用户侧',
        unit: '个'
      },
      {
        value: 2,
        name: '电网侧',
        unit: '个'
      },
      {
        value: 1,
        name: '电源侧',
        unit: '个'
      },
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
      },
    ];
  }

}
export const rankTabType = [
  {
    code: 1,
    label: '系统运行效率'
  },
  {
    code: 2,
    label: '储能站数量'
  },
]
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
  },
]
export const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  data = [
    {
      "timeDim": "00:00",
      "ratedPower": 14382,
      "realTimePower": -943
    },
    {
      "timeDim": "01:00",
      "ratedPower": 14258,
      "realTimePower": -933
    },
    {
      "timeDim": "02:00",
      "ratedPower": 13597,
      "realTimePower": -900
    },
    {
      "timeDim": "03:00",
      "ratedPower": 13060,
      "realTimePower": -900
    },
    {
      "timeDim": "04:00",
      "ratedPower": 12874,
      "realTimePower": -900
    },
    {
      "timeDim": "05:00",
      "ratedPower": 12719,
      "realTimePower": 0
    },
    {
      "timeDim": "06:00",
      "ratedPower": 13053,
      "realTimePower": 0
    },
    {
      "timeDim": "07:00",
      "ratedPower": 14202,
      "realTimePower": 0
    },
    {
      "timeDim": "08:00",
      "ratedPower": 16922,
      "realTimePower": 0
    },
    {
      "timeDim": "09:00",
      "ratedPower": 18879,
      "realTimePower": 943
    },
    {
      "timeDim": "10:00",
      "ratedPower": 19116,
      "realTimePower": 943
    },
    {
      "timeDim": "11:00",
      "ratedPower": 19153,
      "realTimePower": 0
    },
    {
      "timeDim": "12:00",
      "ratedPower": 17053,
      "realTimePower": -10
    },
    {
      "timeDim": "13:00",
      "ratedPower": 16354,
      "realTimePower": 0
    },
    {
      "timeDim": "14:00",
      "ratedPower": 17689,
      "realTimePower": 0
    },
    {
      "timeDim": "15:00",
      "ratedPower": 17919,
      "realTimePower": 0
    },
    {
      "timeDim": "16:00",
      "ratedPower": 18585,
      "realTimePower": 1
    },
    {
      "timeDim": "17:00",
      "ratedPower": 19581,
      "realTimePower": 5
    },
    {
      "timeDim": "18:00",
      "ratedPower": 19902,
      "realTimePower": 900
    },
    {
      "timeDim": "19:00",
      "ratedPower": 20401,
      "realTimePower": 900
    },
    {
      "timeDim": "20:00",
      "ratedPower": 20045,
      "realTimePower": 0
    },
    {
      "timeDim": "21:00",
      "ratedPower": 19368,
      "realTimePower": 0
    },
    {
      "timeDim": "22:00",
      "ratedPower": 17822,
      "realTimePower": 0
    },
    {
      "timeDim": "23:00",
      "ratedPower": 15890,
      "realTimePower": 0
    },
  ]
  return [
    {
      data: data.map((item) => [yearMonthDay+item.timeDim, Number(item['ratedPower'])]),
      type: 'line',
      smooth: true,
      name: '深圳市电网实时负荷'
    },
    {
      yAxisIndex: 1,
      data: data.map((item) => [yearMonthDay+item.timeDim, Number(item['realTimePower'])]),
      type: 'line',
      smooth: true,
      name: '深圳市储能电站聚合实时功率'
    },
  ];
};
export const socialBenefitFun =(data = {}) => {
  return [
    {
      img: nxfdl,
      num: 10.4,
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
      num: 13.87,
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
      num: 103.79,
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