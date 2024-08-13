import { scale } from '@sutpc/config';
import dayjs from 'dayjs';

export const getOperatCardConfig = (data = {}) => {
  return [
    {
      name: '营运',
      color: '#00D2D9',
      children: [
        {
          name: '超充站',
          code: 'stationOperateNum',
          value: null,
          icon: new URL('./images/chaochongzhan.png', import.meta.url).href
        },
        {
          name: '超充桩',
          code: 'equipmentOperateNum',
          value: null,
          icon: new URL('./images/chaochongzhuang.png', import.meta.url).href
        },
        {
          name: '装机功率',
          code: 'stationOperateNum',
          value: null,
          icon: new URL('./images/zhuangjigonglv.png', import.meta.url).href
        },
        {
          name: '超充运营商',
          code: 'stationOperateCompanyNum',
          value: null,
          icon: new URL('./images/chaochongyunyingshang.png', import.meta.url).href
        }
      ].map((e) => {
        e.value = data && data[e.code];
        return e;
      })
    },
    {
      name: '建设中',
      color: '#3A60EE',
      children: [
        {
          name: '超充站',
          code: 'stationBuildNum',
          value: null,
          icon: new URL('./images/chaochongzhan.png', import.meta.url).href
        },
        {
          name: '超充桩',
          code: 'equipmentBuildNum',
          value: null,
          icon: new URL('./images/chaochongzhuang.png', import.meta.url).href
        }
      ].map((e) => {
        e.value = data && data[e.code];
        return e;
      })
    },
    {
      name: '规划',
      color: '#17A4FA',
      children: [
        {
          name: '超充站',
          code: 'stationPlanNum',
          value: null,
          icon: new URL('./images/chaochongzhan.png', import.meta.url).href
        },
        {
          name: '超充桩',
          code: 'equipmentPlanNum',
          value: null,
          icon: new URL('./images/chaochongzhuang.png', import.meta.url).href
        }
      ].map((e) => {
        e.value = data && data[e.code];
        return e;
      })
    }
  ];
};

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
      name: '超充标识',
      unit: '个',
      typeName: '充电站',
      icon: new URL('./images/super-station.png', import.meta.url).href,
      children: [
        {
          name: '申请',
          code: 'stationTagApplyNum',
          value: '',
          seprate: '/',
          color: '#84C2FF'
        },
        {
          name: '申请通过数',
          code: 'stationTagApplyPassNum',
          value: '',
          color: '#00F7FF'
        }
      ]
    },
    {
      name: '超充标识',
      unit: '个',
      typeName: '充电枪',
      icon: new URL('./images/super-equipment.png', import.meta.url).href,
      children: [
        {
          name: '申请',
          code: 'connectorTagApplyNum',
          value: '',
          seprate: '/',
          color: '#84C2FF'
        },
        {
          name: '申请通过数',
          code: 'connectorTagApplyPassNum',
          value: '',
          color: '#00F7FF'
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
      width: 3
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
      code: 0,
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
    code: 'Operate',
    label: '营运'
  },
  {
    code: 'Build',
    label: '建设'
  },
  {
    code: 'Plan',
    label: '规划'
  }
];

export const operationTabType = [
  {
    code: 'hour',
    label: '今日',
    timeRange: [dayjs().format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD HH:mm:ss')]
  },
  {
    code: 'date',
    label: '近七日',
    timeRange: [
      dayjs().subtract(6, 'days').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD HH:mm:ss')
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
  'rgb(34, 118, 252)',
  'rgb(255, 207, 95)',
  'rgb(75, 222, 255)',
  'rgb(190, 229, 251)'
];

export const superDistribuetedColumns = [
  {
    prop: 'constructionName',
    label: '场所类型',
    width: 4
  },
  {
    prop: 'stationNum',
    label: '超充站(个)',
    width: 2
  },
  {
    prop: 'equipmentNum',
    label: '超充桩(个)',
    width: 2
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
