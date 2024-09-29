import { scale } from '@sutpc/config';

export const pieColorList = [
  'rgb(166, 207, 255)',
  'rgb(255, 207, 95)',
  'rgb(95, 213, 236)',
  'rgb(151, 214, 100)',
  'rgb(34, 118, 252)',
  'rgb(238, 111, 124)',
  'rgb(255, 173, 196)',
  'rgb(67, 70, 211)'
];

export const v2gRegionalDistributedColumn = [
  {
    prop: 'areaName',
    label: '区域',
    width: 3
  },
  {
    prop: 'pileNum',
    label: 'V2G桩(个)',
    width: 4
  },
  {
    prop: 'stationNum',
    label: 'V2G站(个)',
    width: 3
  }
];
export const parkingChargeOperationColumn = [
  {
    prop: 'areaName',
    label: '区域',
    width: 2
  },
  {
    prop: 'parkingNum',
    label: '停车量(辆)',
    width: 2,
    align: 'center'
  },
  {
    prop: 'power',
    label: '充电量(kWh)',
    width: 2,
    align: 'center'
  },
  {
    prop: 'rate',
    label: '车位/充电枪利用率(%)',
    width: 4,
    align: 'center'
  }
];

export const operationTrendConfig = () => [
  {
    name: '巴士数量',
    code: 'busNum',
    type: 'bar',
    data: [],
    color: 'rgb(34, 118, 252)',
    unit: '辆'
  },
  {
    name: '巴士储能电量',
    code: 'busRemainEnergy',
    type: 'line',
    data: [],
    color: 'rgb(255, 207, 95)',
    unit: 'kwh'
  }
];
export const adjustTrendConfig = () => [
  {
    name: '调节次数',
    code: 'adjustmentTimes',
    type: 'bar',
    data: [],
    color: 'rgb(34, 118, 252)',
    unit: '次'
  },
  {
    name: '调节功率',
    code: 'adjustmentPower',
    type: 'line',
    data: [],
    color: 'rgb(255, 207, 95)',
    unit: 'MW'
  }
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
      backgroundColor: 'transparent',
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
      splitNumber: 3,
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

export const tabTypeList = [
  {
    code: 'public',
    label: '公共充电桩'
  },
  {
    code: 'private',
    label: '私人充电桩'
  }
];

export const staticConfig = (data = []) =>
  [
    [
      {
        name: '尖峰时段',
        timeProperty: 'peak',
        code: 'timeRange'
      },
      {
        name: '低谷时段',
        timeProperty: 'bottom',
        code: 'timeRange'
      }
    ],
    [
      {
        name: '充电量',
        timeProperty: 'peak',
        code: 'chargeCapacity'
      },
      {
        name: '充电量',
        timeProperty: 'bottom',
        code: 'chargeCapacity'
      }
    ],
    [
      {
        name: '占比',
        timeProperty: 'peak',
        code: 'chargeCapacityRatio'
      },
      {
        name: '占比',
        timeProperty: 'bottom',
        code: 'chargeCapacityRatio'
      }
    ]
  ].map((item) => {
    item.forEach((el: any) => {
      const fd = data.find((d) => d.timeProperty === el.timeProperty);
      el.value = fd ? fd[el.code] : 0;
    });
    return {
      ...item
    };
  });
