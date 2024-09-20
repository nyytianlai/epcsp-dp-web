import { scale } from '@sutpc/config';
export const pieColorList = [
  'rgb(166, 207, 255)',
  'rgb(95, 213, 236)',
  'rgb(34, 118, 252)',
  'rgb(151, 214, 100)',
  'rgb(255, 207, 95)',
  'rgb(238, 111, 124)',
  'rgb(255, 173, 196)',
  'rgb(67, 70, 211)'
];
export const getBaseChartOption = () => {
  return {
    grid: {
      top: scale(30),
      bottom: scale(8),
      right: scale(12),
      left: scale(12),
      containLabel: true
    },
    legend: {
      itemWidth: scale(18),
      itemHeight: scale(12),
      right: 'center',
      left: 'center',
      top: 0,
      textStyle: {
        fontFamily: 'Source Han Sans CN',
        fontSize: scale(12),
        fontWeight: 400,
        color: 'rgba(255,255,255,0.85)'
      },
      itemStyle: {
        color: 'rgba(136,198,255, 0.8)'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(9, 41, 75, 0.8)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
        fontSize: scale(16)
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
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
        fontSize: scale(12),
        color: 'rgba(255,255,255,0.85)'
        // interval: 0
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: scale(12),
        color: 'rgba(255,255,255,0.85)'
      },
      // minInterval: 1,
      splitLine: {
        lineStyle: {
          color: 'rgba(230, 247, 255, 0.2)',
          type: 'dashed'
        }
      }
    },
    series: []
  };
};

export const pageNumFun = (data: any = {}) => {
  return [
    {
      name: '基线',
      num: data?.baseline,
      unit: 'MW'
    },
    {
      name: '计划',
      num: data?.planNum,
      unit: 'MW'
    },
    {
      name: '实际',
      num: data?.actualNum,
      unit: 'MW'
    }
  ];
};

import ztsyl from '@/views/charging-station/images/ztsyl.png';
export const chargingStationsFun = (data: any = []) => {
  return [
    {
      img: ztsyl,
      code: 5,
      children: [
        {
          name: '充电桩数量',
          num: null,
          code: 'cnt',
          unit: '/个'
        },
        {
          name: '装机功率',
          num: null,
          code: 'power',
          unit: '/KW'
        }
      ]
    },
    {
      img: ztsyl,
      code: 6,
      children: [
        {
          name: 'V2G桩数量',
          unit: '/个',
          num: null,
          code: 'cnt'
        },
        {
          name: '装机功率',
          unit: '/KW',
          code: 'power',
          num: null
        }
      ]
    },
    {
      img: ztsyl,
      code: 2,
      children: [
        {
          name: '光伏桩数量',
          unit: '/个',
          num: null,
          code: 'cnt'
        },
        {
          name: '装机功率',
          unit: '/KW',
          code: 'power',
          num: null
        }
      ]
    },
    {
      img: ztsyl,
      code: 0,
      children: [
        {
          name: '换电站',
          unit: '/个',
          num: null,
          code: 'cnt'
        },
        {
          name: '装机功率',
          unit: '/KW',
          code: 'power',
          num: null
        }
      ]
    },
    {
      img: ztsyl,
      code: 3,
      children: [
        {
          name: '电动自行车充换电柜',
          unit: '/个',
          num: null,
          code: 'cnt'
        }
      ]
    }
  ].map((item) => {
    const fd = data.find((el) => el.type == item.code);
    item.children.forEach((child) => {
      child.num = fd ? fd[child.code] : null;
    });
    return item;
  });
};
