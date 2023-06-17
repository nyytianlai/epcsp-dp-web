import clientUsage from './images/client-usage.png';

import dayjs from 'dayjs';
export const clientInfo = [
  {
    code: 1,
    label: '客户端实时信息'
  }
];
export const clientRealtimeTrend = [
  {
    code: 1,
    label: '客户端实时趋势情况'
  }
];
export const lineStateDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  const data1 = [
    {
      time: '01',
      onlineCount: 10
    },
    {
      time: '02',
      onlineCount: 0
    },
    {
      time: '03',
      onlineCount: 2
    },
    {
      time: '04',
      onlineCount: 4
    },
    {
      time: '05',
      onlineCount: 18
    },
    {
      time: '06',
      onlineCount: 23
    },
    {
      time: '07',
      onlineCount: 68
    },
    {
      time: '08',
      onlineCount: 103
    },
    {
      time: '09',
      onlineCount: 287
    },
    {
      time: '10',
      onlineCount: 367
    },
    {
      time: '11',
      onlineCount: 568
    },
    {
      time: '12',
      onlineCount: 400
    },
    {
      time: '13',
      onlineCount: 346
    },
    {
      time: '14',
      onlineCount: 287
    },
    {
      time: '15',
      onlineCount: 200
    },
    {
      time: '16',
      onlineCount: 236
    },
    {
      time: '17',
      onlineCount: 426
    },
    {
      time: '18',
      onlineCount: 563
    },
    {
      time: '19',
      onlineCount: 214
    },
    {
      time: '20',
      onlineCount: 654
    }
  ];
  return [
    {
      data: data1.map((item) => [yearMonthDay + item.time, item.onlineCount]),
      type: 'line',
      smooth: true,
      name: '访问量'
    }
  ];
};
export const pageNumFun = (data = {}) => {
  return [
    {
      name: '累计充电量',
      num: data?.cumulativeCharge,
      unit: data?.cumulativeChargeUnit || '亿度'
    },
    {
      name: '累计充电次数',
      num: data?.cumChargeCount,
      unit: data?.cumChargeCountUnit || '万次'
    },
    {
      name: '累计充电时长',
      num: data?.cumChargeTime,
      unit: data?.cumChargeTimeUnit || '万小时'
    },
    {
      name: '本年充电总量',
      num: data?.yearTotalCharge,
      unit: data?.yearTotalChargeUnit || '亿度'
    }
  ];
};
export const hotChargingDataFun = () => {
  return [
    {
      num: 6399,
      unit: 'kW',
      name: '充电站总量'
    },
    {
      num: 201,
      unit: 'kW',
      name: '已接入运营企业总量'
    },
    {
      num: 48,
      unit: 'kW',
      name: '新能源汽车总量'
    },
    {
      num: 201,
      unit: 'kW',
      name: '已接入运营企业总量'
    },
    {
      num: 48,
      unit: 'kW',
      name: '新能源汽车总量'
    }
  ];
};

export const deviceDataFun = (data = {}) => {
  return [
    {
      img: clientUsage,
      // num: data?.equipmentCount,
      num: 25639,
      name: '昨日访问量/次',
      iconStyle: {
        width: '0.78rem',
        height: '0.58rem'
      },
      numStyle: {
        lineHeight: '0.32rem',
        fontSize: '0.32rem',
        background: 'linear-gradient(180deg, #00F7FF 0%, #D5FEFF 52.08%, #00F7FF 100%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      },
      nameStyle: {
        fontSize: '0.14rem',
        lineHeight: '0.22rem'
      }
    },
    {
      img: clientUsage,
      // num: data?.gunCount,
      num: 19323,
      name: '今日访问量/次',
      iconStyle: {
        width: '0.78rem',
        height: '0.58rem'
      },
      numStyle: {
        lineHeight: '0.32rem',
        fontSize: '0.32rem',
        background: 'linear-gradient(180deg, #F9E900 0%, #FFFFFF 52.08%, #F9E900 100%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      },
      nameStyle: {
        fontSize: '0.14rem',
        lineHeight: '0.22rem'
      }
    }
  ];
};

export const chargingTypesTabsFun = () => {
  return [
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

export const chargingTypePieDataFun = (code = 'pile', data = {}) => {
  if (code === 'pile') {
    return [
      { value: data?.offLine, name: '离线', extraName: '离线充电桩', unit: '个' },
      { value: data?.occupy, name: '占用', extraName: '占用充电桩', unit: '个' },
      { value: data?.malfunction, name: '故障', extraName: '故障充电桩', unit: '个' },
      { value: data?.free, name: '闲置', extraName: '闲置充电桩', unit: '个' }
    ];
  } else {
    return [
      { value: data?.offLine, name: '离线', extraName: '离线充电枪', unit: '个' },
      { value: data?.occupy, name: '占用', extraName: '占用充电枪', unit: '个' },
      { value: data?.malfunction, name: '故障', extraName: '故障充电枪', unit: '个' },
      { value: data?.free, name: '闲置', extraName: '闲置充电枪', unit: '个' }
    ];
  }
};

export const monthRateDataFun = () => {
  return [
    {
      num: 6399,
      unit: '个',
      name: '南山区'
    },
    {
      num: 201,
      unit: '个',
      name: '宝安区'
    },
    {
      num: 48,
      unit: '个',
      name: '罗湖区'
    },
    {
      num: 201,
      unit: '个',
      name: '龙华区'
    },
    {
      num: 48,
      unit: '个',
      name: '龙岗区'
    },
    {
      num: 6399,
      unit: '个',
      name: '南山区'
    },
    {
      num: 201,
      unit: '个',
      name: '宝安区'
    },
    {
      num: 48,
      unit: '个',
      name: '罗湖区'
    },
    {
      num: 201,
      unit: '个',
      name: '龙华区'
    },
    {
      num: 48,
      unit: '个',
      name: '大鹏新区'
    }
  ];
};
export const chargingStationTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电功率'
    },
    {
      code: 2,
      label: '充电次数'
    }
  ];
};

export const columnDataHotFun = () => {
  return [
    {
      prop: 'stationName',
      label: '充电站名称',
      minWidth: 2.8
    },
    {
      prop: 'operatorName',
      label: '运营企业名称',
      minWidth: 2
    },
    {
      prop: 'areaName',
      label: '所属区域',
      minWidth: 1,
      filterMultiple: true
    },
    {
      prop: 'power',
      label: '充电功率',
      minWidth: '2',
      sortable: 'custom',
      sortOrders: ['ascending', 'descending']
    },
    {
      prop: 'amount',
      label: '充电次数',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending']
    }
  ];
};
// 数据过滤的选项
export const filters = [
  {
    id: 1,
    label: '全部',
    children: [
      {
        id: 440303,
        label: '罗湖区'
      },
      {
        id: 440304,
        label: '福田区'
      },
      {
        id: 440305,
        label: '南山区'
      },
      {
        id: 440306,
        label: '宝安区'
      },
      {
        id: 440307,
        label: '龙岗区'
      },
      {
        id: 440308,
        label: '盐田区'
      },
      {
        id: 440309,
        label: '龙华区'
      },
      {
        id: 440310,
        label: '坪山区'
      },
      {
        id: 440311,
        label: '光明区'
      },
      {
        id: 440343,
        label: '大鹏新区'
      },
      {
        id: 441521,
        label: '深汕特别合作区'
      }
    ]
  }
];
export const ecOptionFun = (data = [], xaxis = []) => {
  xaxis = xaxis.map((i) => {
    return { value: i, textStyle: { overflow: 'break', width: 100 } };
  });
  return {
    grid: {
      top: 30,
      bottom: 24,
      right: 5,
      left: 30
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
        color: 'rgba(19,171,194, 0.8)'
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
      },
      formatter: '{b}: {c}个'
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
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 16,
        color: '#B4C0CC'
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
        name: '问题数量',
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
                color: '#13ABC2'
              },
              {
                offset: 0,
                color: 'rgba(0, 163, 255, 0.000001)'
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
export const columnDataDetailFun = () => {
  return [
    {
      prop: 'stationName',
      label: '充电站名称',
      minWidth: 2
    },
    {
      prop: 'operatorName',
      label: '运营企业名称',
      minWidth: 2
    },
    {
      prop: 'problemType',
      label: '问题类型',
      minWidth: 1,
      filterMultiple: true
    },
    {
      prop: 'problemDescribe',
      label: '问题描述',
      minWidth: '1.5'
    },
    {
      prop: 'principal',
      label: '负责人',
      minWidth: 1
    },
    {
      prop: 'phone',
      label: '联系电话',
      minWidth: 1.5
    },
    {
      prop: 'timeDim',
      label: '时间',
      minWidth: 2
    }
  ];
};
// 市民问题类型
export const filtersDetail = [
  {
    id: 'all',
    label: '全部',
    children: [
      {
        id: '有车站位',
        label: '有车站位'
      },
      {
        id: '桩位不放开',
        label: '桩位不放开'
      },
      {
        id: '无法充电',
        label: '无法充电'
      },
      {
        id: '找不到电桩',
        label: '找不到电桩'
      },
      {
        id: '其他',
        label: '其他'
      }
    ]
  }
];
