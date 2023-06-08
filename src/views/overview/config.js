import ztsyl from '@/views/charging-station/images/ztsyl.png';
import ncd from './images/ncd.png';
import nfdl from './images/nfdl.png';
import gfzzs from './images/gfzzs.png';
import cnzzs from './images/cnzzs.png';
import sszs from './images/sszs.png';
import {simplifyNum} from '@/utils/index'
import dayjs from 'dayjs';
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
export const stationTabType = [
  {
    code: 1,
    label: '充电站'
  },
  {
    code: 2,
    label: '储能站'
  },
  {
    code: 3,
    label: '光伏站'
  },
  {
    code: 4,
    label: '充换设施'
  }
]

export const ecOptionFun = (data = [], xaxis = []) => {
  xaxis = xaxis.map((i) => {
    return { value: i, textStyle: { overflow: 'break', width: 100 } };
  });
  return {
    grid: {
      top: 30,
      bottom: 24,
      right: 5,
      left: 42
    },
    legend: {
      itemWidth: 16,
      itemHeight: 10,
      right: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Source Han Sans CN',
        fontSize: 14,
        color: '#FFF'
      },
      itemStyle: {
        color: 'rgba(136,198,255, 0.8)'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 163, 255, 0.5)',
      borderWidth: 0,
      textStyle: {
        color: '#fff'
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: xaxis,

      boundaryGap: ['2%', '2%'],
      axisLine: {
        lineStyle: {
          color: '#BAE7FF'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontFamily: 'Source Han Sans CN',
        fontSize: 12,
        lineHeight: 18,
        color: '#D0DEEE',
        interval: 0
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '单位/个',
      nameTextStyle: {
        color: '#B4C0CC'
      },
      minInterval: 1,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 16,
        color: '#B4C0CC',
        formatter: (value) => {
          return value ? simplifyNum(value) : '';
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(230, 247, 255, 0.2)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        data: data,
        type: 'bar',
        name: '数量',
        barWidth: 16,
        label: {
          show: true,
          position: 'top',
          fontSize: 14,
          fontfamily: 'Helvetica',
          color: '#fff'
        },
        itemStyle: {
          color: () => {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: '#88C6FF'
              }, 
              {
                offset: 0,
                color: 'rgba(0, 58, 255, 0.0001)'
              }
            ]);
          }
        }
      },
      {
        // 顶部
        tooltip: {
          show: false
        },
        type: 'pictorialBar',
        itemStyle: {
          // 顶部
          color: '#13ABC2'
        },
        symbol: 'rect',
        symbolSize: ['16', '3'],
        symbolPosition: 'end',
        data: data,
        z: 3
      }
    ]
  };
};
export const lineCarbonDataFun = (data = [],xaxis = []) => {
  data = [
    {
      "time": "01",
      "onlineCount": 82303,
      "offlineCount": 10646
    },
    {
      "time": "02",
      "onlineCount": 12303,
      "offlineCount": 11646
    },
    {
      "time": "03",
      "onlineCount": 32303,
      "offlineCount": 16646
    },
    {
      "time": "04",
      "onlineCount": 62303,
      "offlineCount": 19646
    },
    {
      "time": "05",
      "onlineCount": 42303,
      "offlineCount": 12646
    },
    {
      "time": "06",
      "onlineCount": 22303,
      "offlineCount": 11646
    },
    {
      "time": "07",
      "onlineCount": 32303,
      "offlineCount": 13646
    },
  ]
  return [
    {
      data: data.map((item) => [item.time, item.onlineCount]),
      type: 'line',
      smooth: true,
      name: '两轮动车'
    },
    {
      data: data.map((item) => [item.time, item.offlineCount]),
      type: 'line',
      smooth: true,
      name: '电动汽车'
    },
    {
      data: data.map((item) => [item.time, item.onlineCount - item.offlineCount]),
      type: 'line',
      smooth: true,
      name: '储能'
    },
    {
      data: data.map((item) => [item.time, item.onlineCount]),
      type: 'line',
      smooth: true,
      name: '光伏'
    },
    {
      data: data.map((item) => [item.time, item.onlineCount + item.offlineCount]),
      type: 'line',
      smooth: true,
      name: '合计'
    },
  ];
};
export const lineElectricDataFun = (data = []) => {
  data = [
    {
      "time": "01",
      "onlineCount": 823,
      "offlineCount": 106
    },
    {
      "time": "02",
      "onlineCount": 123,
      "offlineCount": 116
    },
    {
      "time": "03",
      "onlineCount": 323,
      "offlineCount": 166
    },
    {
      "time": "04",
      "onlineCount": 623,
      "offlineCount": 196
    },
    {
      "time": "05",
      "onlineCount": 423,
      "offlineCount": 126
    },
    {
      "time": "06",
      "onlineCount": 223,
      "offlineCount": 116
    },
    {
      "time": "07",
      "onlineCount": 323,
      "offlineCount": 136
    },
  ]
  return [
    {
      data: data.map((item) => [item.time, item.onlineCount]),
      type: 'line',
      smooth: true,
      name: '两轮电动车'
    },
    {
      data: data.map((item) => [item.time, item.offlineCount]),
      type: 'line',
      smooth: true,
      name: '储能放电'
    },
    {
      data: data.map((item) => [item.time, item.onlineCount - item.offlineCount]),
      type: 'line',
      smooth: true,
      name: '光伏发电'
    },
    {
      data: data.map((item) => [item.time, item.onlineCount + item.offlineCount]),
      type: 'line',
      smooth: true,
      name: '汽车充电'
    },
  ];
};