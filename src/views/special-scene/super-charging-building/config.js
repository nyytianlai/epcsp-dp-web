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
          code: '',
          value: '163',
          seprate: '/'
        },
        {
          name: '建设',
          code: '',
          value: '1020',
          seprate: '/'
        },
        {
          name: '营运',
          code: '',
          value: '1020'
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
          code: '',
          value: '163',
          seprate: '/'
        },
        {
          name: '建设',
          code: '',
          value: '1020',
          seprate: '/'
        },
        {
          name: '营运',
          code: '',
          value: '1020'
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
          code: '',
          value: '163',
          seprate: '/'
        },
        {
          name: '营运企业',
          code: '',
          value: '1020'
        }
      ]
    }
  ].map((item) => {
    item.children.forEach((e) => (e.value = data[e.code] || e.value));
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
          code: '',
          value: '163',
          seprate: '/'
        },
        {
          name: '充电桩)',
          code: '',
          value: '1020'
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
          code: '',
          value: '163',
          seprate: '/'
        },
        {
          name: '充电桩)',
          code: '',
          value: '1020'
        }
      ]
    }
  ].map((item) => {
    item.children.forEach((e) => (e.value = data[e.code] || e.value));
    return item;
  });

export const columnKeyListFun = (type = 1) => {
  return [
    {
      prop: 'areaName',
      label: '行政区名称',
      width: 4
    },
    { prop: 'affirmCnt', label: '超充站(个)', width: 2 },
    { prop: 'recCnt', label: '超充桩(个)', width: 2 }
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
      num: data?.cumulativeCharge,
      unit: data?.cumulativeChargeUnit || '亿度'
    },
    {
      name: '今日充电时长',
      num: parseInt(data?.cumChargeCount),
      unit: data?.cumChargeCountUnit || '万次'
    },
    {
      name: '今日充电订单数',
      num: data?.cumChargeTime,
      unit: data?.cumChargeTimeUnit || '小时'
    },
    {
      name: '超充日均利用率',
      num: data?.yearTotalCharge,
      unit: data?.yearTotalChargeUnit || '亿度'
    }
  ];
};
export const areaDistributedTabType = [
  {
    code: 1,
    label: '规划'
  },
  {
    code: 2,
    label: '建设'
  },
  {
    code: 3,
    label: '运营'
  }
];

export const operationTabType = [
  {
    code: 1,
    label: '今日'
  },
  {
    code: 2,
    label: '近七日'
  }
];

export const operationTrendConfig = (data) => [
  {
    name: '超充充电次数',
    code: '',
    type: 'bar',
    data: [],
    color: 'rgb(34, 118, 252)',
    unit: '次',
    legendName: '超充充电次数(次）'
  },
  {
    name: '超充充电量',
    code: '',
    type: 'line',
    data: [],
    color: 'rgb(255, 207, 95)',
    unit: '度',
    legendName: '超充充电量(度)'
  }
];

export const operationRankTabType = [
  {
    code: 1,
    label: '超充站'
  },
  {
    code: 2,
    label: '运营商'
  }
];

export const superOperationTabType = [
  {
    code: 1,
    label: '场所分布'
  },
  {
    code: 2,
    label: '功率分布'
  }
];

export const chartColorList = [
  'rgb(229, 204, 72)',
  'rgb(50, 84, 221)',
  'rgb(75, 222, 255)',
  'rgb(190, 229, 251)'
];

export const piewChartConfig = [
  {
    name: `≥480kw并且
    <600kw`,
    value: 153
  },
  {
    name: '≥600kw',
    value: 153
  }
];
