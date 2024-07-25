import { scale } from '@sutpc/config';
import dayjs from 'dayjs';
export const getCardConfig1 = (data = {}) =>
  [
    {
      name: '超充站',
      type: '数量',
      unit: '个',
      icon: new URL('./images/super-station.png', import.meta.url).href,
      children: [
        {
          name: '规划',
          code: 'stationPlanNum',
          value: '',
          seprate: '/'
        },
        {
          name: '建设',
          code: 'stationBuildNum',
          value: '',
          seprate: '/'
        },
        {
          name: '营运',
          code: 'stationOperateNum',
          value: ''
        }
      ]
    },
    {
      name: '超充桩',
      type: '数量',
      unit: '个',
      icon: new URL('./images/super-equipment.png', import.meta.url).href,
      children: [
        {
          name: '规划',
          code: 'equipmentPlanNum',
          value: '',
          seprate: '/'
        },
        {
          name: '建设',
          code: 'equipmentBuildNum',
          value: '',
          seprate: '/'
        },
        {
          name: '营运',
          code: 'equipmentOperateNum',
          value: ''
        }
      ]
    },
    {
      name: '超充站',
      type: '数量',
      unit: '家',
      icon: new URL('./images/operator.png', import.meta.url).href,
      children: [
        {
          name: '建设企业',
          code: 'stationBuildCompanyNum',
          value: '',
          seprate: '/'
        },
        {
          name: '营运企业',
          code: 'stationOperateCompanyNum',
          value: ''
        }
      ]
    }
  ].map((item) => {
    item.children.forEach((e) => (e.value = data && data[e.code]));
    return item;
  });

export const getCardConfig2 = (data = {}) =>
  [
    {
      name: '超充标识申请数',
      unit: '个',
      icon: new URL('./images/apply.png', import.meta.url).href,
      children: [
        {
          name: '(充电站',
          code: 'stationTagApplyNum',
          value: '',
          seprate: '/'
        },
        {
          name: '充电桩)',
          code: 'equipmentTagApplyNum',
          value: ''
        }
      ]
    },
    {
      name: '超充标识申请通过数',
      unit: '个',
      icon: new URL('./images/approved.png', import.meta.url).href,
      children: [
        {
          name: '(充电站',
          code: 'stationTagApplyPassNum',
          value: '',
          seprate: '/'
        },
        {
          name: '充电桩)',
          code: 'equipmentTagApplyPassNum',
          value: ''
        }
      ]
    }
  ].map((item) => {
    item.children.forEach((e) => (e.value = data[e.code]));
    return item;
  });

export const columnKeyListFun = (type = 'Plan') => {
  return [
    {
      prop: 'areaName',
      label: '行政区名称',
      width: 4
    },
    { prop: `station${type}Num`, label: '超充站(个)', width: 2 },
    { prop: `equipment${type}Num`, label: '超充桩(个)', width: 2 }
  ];
};

export const bottomTabDataFun = () => {
  return [
    {
      code: 1,
      label: '超充站'
    },
    {
      code: 2,
      label: '超充桩'
    }
  ];
};
export const pageNumFun = (data = {}) => {
  return [
    {
      name: '今日充电量',
      num: data?.chargeCapacity,
      unit: '度'
    },
    {
      name: '今日充电时长',
      num: parseInt(data?.chargeHour),
      unit: '小时'
    },
    {
      name: '今日充电订单数',
      num: data?.orderNum,
      unit: '个'
    },
    {
      name: '超充日均利用率',
      num: data?.totalUseRatio,
      unit: '%'
    }
  ];
};
export const areaDistributedTabType = [
  {
    code: 'Plan',
    label: '规划'
  },
  {
    code: 'Build',
    label: '建设'
  },
  {
    code: 'Operate',
    label: '运营'
  }
];

export const operationTabType = [
  {
    code: 'hour',
    label: '今日',
    timeRange: [dayjs().format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD 23:59:59')]
  },
  {
    code: 'date',
    label: '近七日',
    timeRange: [
      dayjs().subtract(6, 'days').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59')
    ]
  }
];

export const operationTrendConfig = (data) => [
  {
    name: '超充充电次数',
    code: 'orderNum',
    type: 'bar',
    data: [],
    color: 'rgb(34, 118, 252)',
    unit: '次',
    legendName: '超充充电次数(次）'
  },
  {
    name: '超充充电量',
    code: 'chargeCapacity',
    type: 'line',
    data: [],
    color: 'rgb(255, 207, 95)',
    unit: '度',
    legendName: '超充充电量(度)'
  }
];

export const operationRankTabType = [
  {
    code: 'getStationChargeStat',
    label: '超充站'
  },
  {
    code: 'getOperatorChargeStat',
    label: '运营商'
  }
];

export const superOperationTabType = [
  {
    code: 'getConstructionStationDistribute',
    label: '场所分布'
  },
  {
    code: 'getChargeCapacityDistribute',
    label: '功率分布'
  }
];

export const chartColorList = [
  'rgb(50, 84, 221)',
  'rgb(229, 204, 72)',
  'rgb(75, 222, 255)',
  'rgb(190, 229, 251)'
];

export const superDistribuetedColumns = [
  {
    prop: 'constructionCode',
    label: '场所类型'
  },
  {
    prop: 'stationNum',
    label: '超充站(个)'
  },
  {
    prop: 'equipmentNum',
    label: '超充桩(个)'
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
      backgroundColor: 'rgba(0, 163, 255, 0.5)',
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
        fontSize: scale(14),
        lineHeight: scale(10),
        color: '#D0DEEE'
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
        fontFamily: 'Helvetica',
        fontSize: scale(14),
        lineHeight: scale(18),
        color: '#B4C0CC'
      },
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
