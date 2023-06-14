import charging from './images/charging.png';
import InstalledCapacity from './images/installed-capacity.png';
import PhotovoltaicArea from './images/photovoltaic-area.png';
import rate from './images/rate.png';
import num from './images/num.png';
import dayjs from 'dayjs';
import { simplifyNum } from '@/utils/index';

export const lianhuaPowerFun = (data = {}) => {
  return [
    {
      img: rate,
      num: 1601,
      name: '上网电量',
      unit: 'kWh',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: num,
      num: 855,
      name: '发电电量',
      unit: 'kWh',
      classStyleType: 'leftRightStyleYellow'
    }
  ];
};
export const lianhuaWarnFun = (data = [], xaxis = []) => {
  let data1 = [];
  let xAxis = [];
  for (let i = 6; i > 0; i--) {
    xAxis.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'));
    data1.push({ value: 0, date: dayjs().subtract(i, 'day').format('YYYY-MM-DD') });
  }
  data1.push({ value: 0, date: dayjs().format('YYYY-MM-DD') });
  xAxis.push(dayjs().format('YYYY-MM-DD'));
  let obj = {
    xAxis: xAxis,
    seriesData: [
      {
        data: data1,
        type: 'line',
        smooth: true,
        name: '告警数',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#FF6B4B' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(217, 217, 217, 0)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        itemStyle: {
          color: '#FF6B4B'
        }
      }
    ]
  };
  return obj;
  // return [
  //   {
  //     data: date.map((item) => [dayjs(item.date).format('MM-DD').toString(), item.num]),
  //     type: 'line',
  //     smooth: true,
  //     name: '告警数'
  //   }
  // ];
};
export const lianhuaWarnOption = {
  grid: {
    top: 30,
    bottom: 24,
    right: 15,
    left: 42
  },
  tooltip: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    trigger: 'axis',
    formatter: (params) => {
      const val = params[0];
      let str = `<div class="time-tooltip">`;
      str += `<div class="time">${val.data.date}</div>`;
      params.map((item) => {
        str += `<div class="item-data">
          <span class="left-data">
            ${item?.marker}
            <span class="name">${item?.seriesName}</span>
          </span>
          <span class="right-data">
            <span class="value">${item.value}</span>
            <span class="unit">个</span>
          </span>
        </div>`;
      });
      str += '</div>';
      return str;
    }
  },
  legend: {
    data: ['告警数'],
    textStyle: {
      color: '#fff'
    },
    x: '75%'
  },
  xAxis: {
    type: 'category',
    data: [],
    boundaryGap: ['2%', '2%'],
    axisLine: {
      lineStyle: {
        color: '#BAE7FF'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#BAE7FF'
      }
    },
    axisLabel: {
      fontFamily: 'Source Han Sans CN',
      fontSize: 12,
      lineHeight: 18,
      color: '#B4C0CC',
      formatter: (value) => {
        return dayjs(value).format('DD');
      }
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    name: '单位:个',
    interval: 10,
    max: 50,
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
      color: '#B4C0CC',
      formatter: (value) => {
        return value;
      }
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
const lianhuaRealtimeDataFun = () => {
  const hours = dayjs().hour();
  console.log(hours);
  const seriesData = [];
  for (let i = 0; i < hours; i++) {
    const random = Math.floor(Math.random() * 400000) + 100000;
    seriesData.push(random);
  }
  return seriesData;
};
console.log(lianhuaRealtimeDataFun());
export const lianhuaRealtimeOption = {
  grid: {
    top: 30,
    bottom: 24,
    right: 15,
    left: 60
  },
  tooltip: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    trigger: 'axis',
    formatter: (params) => {
      const val = params[0];
      let str = `<div class="time-tooltip">`;
      str += `<div class="time">${val.axisValueLabel}</div>`;
      params.map((item) => {
        str += `<div class="item-data">
          <span class="left-data">
            ${item?.marker}
            <span class="name">${item?.seriesName}</span>
          </span>
          <span class="right-data">
            <span class="value">${item.value}</span>
            <span class="unit">kW</span>
          </span>
        </div>`;
      });
      str += '</div>';
      return str;
    }
  },
  legend: {
    data: ['实时功率'],
    textStyle: {
      color: '#fff'
    },
    x: '75%'
  },
  xAxis: {
    type: 'category',
    data: [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:09',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
      '24:00'
    ],
    boundaryGap: ['2%', '2%'],
    axisLine: {
      lineStyle: {
        color: '#BAE7FF'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#BAE7FF'
      }
    },
    axisLabel: {
      fontFamily: 'Source Han Sans CN',
      fontSize: 12,
      lineHeight: 18,
      color: '#B4C0CC'
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    name: '单位:kW ',
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
      color: '#B4C0CC',
      formatter: (value) => {
        console.log(value);
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
      data: lianhuaRealtimeDataFun(),
      type: 'line',
      smooth: true,
      name: '实时功率',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#4BDEFF' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(217, 217, 217, 0)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      itemStyle: {
        color: '#4BDEFF'
      }
    }
  ]
};
const lianhuajinguiFun = () => {
  let data = [];
  for (let i = 0; i < 100; i++) {
    let obj = {
      value: '540W',
      status: 0
    };
    if (i < 50) {
      obj.status = 1;
    }
    data.push(obj);
  }
  return data;
};
export const lianhuajingguiData = lianhuajinguiFun();
export const deviceInfoFun = (data = {}) => {
  return [
    {
      img: InstalledCapacity,
      num: 19.44,
      unit: '/kW',
      name: '站点装机容量'
    },
    {
      img: PhotovoltaicArea,
      num: 114,
      unit: '/m²',
      name: '站点光伏板面积'
    }
  ];
};
//民乐站充电中汽车电池数据
export const chargeIcon = () => {
  return [
    [504766.7865625, 2499553.2800000003, 94.037890625],
    [504758.590625, 2499565.6, 93.96677734375],
    [504764.403125, 2499578.88, 94.035966796875],
    [504751.7396875, 2499633.2800000003, 94.02783203125],
    [504729.10875, 2499645.2800000003, 94.006123046875],
    [504734.08875, 2499672.64, 93.9062109375],
    [504684.6346875, 2499677.2800000003, 93.96107421875],
    [504696.7128125, 2499694.24, 93.982021484375]
  ];
};

//各站点配套设施标签
export const facilitiesLabel = (stationId) => {
  if (stationId == '118') {
    //民乐
    return [
      {
        value: '配电房',
        position: [504774.168125, 2499575.52, 96.99998046875],
        id: '配电房1',
        img: 'electricalRoom'
      },
      {
        value: '配电房',
        position: [504753.5603125, 2499558.88, 97.00000976562501],
        id: '配电房2',
        img: 'electricalRoom'
      },
      {
        value: '配电房',
        position: [504741.674375, 2499550.24, 97.00000976562501],
        id: '配电房3',
        img: 'electricalRoom'
      },
      {
        value: '卫生间',
        position: [504675.3878125, 2499607.36, 98.3817578125],
        id: '卫生间',
        img: 'toilet'
      },
      {
        value: '便利店',
        position: [504672.74375, 2499624.8000000003, 96.959091796875],
        id: '便利店',
        img: 'store'
      },
      {
        value: '休息区',
        position: [504657.135625, 2499639.04, 98.2],
        id: '休息区',
        img: 'rest'
      },
      {
        value: '维修区',
        position: [504635.49562500004, 2499664.96, 98.5],
        id: '维修区',
        img: 'maintenance'
      },
      {
        value: '配电房',
        position: [504684.1375, 2499708.64, 97],
        id: '配电房4',
        img: 'electricalRoom'
      }
    ];
  } else if (stationId == '4403070124') {
    //国际低碳城
    return [
      {
        value: '展示馆',
        id: '展示馆',
        position: [529572.4125, 2520471.52, 51.9294921875],
        img: 'bigHouse'
      },
      {
        value: '会议馆',
        id: '会议馆',
        position: [529603.1675, 2520417.6, 52.0587109375],
        img: 'bigHouse'
      },
      {
        value: '交易馆',
        id: '交易馆',
        position: [529523.8875, 2520364.8000000003, 51.9294921875],
        img: 'bigHouse'
      },
      {
        value: '实时监测中心',
        id: '实时监测展示中心',
        position: [529466.175, 2520360.16, 42.725927734375],
        img: 'monitorCenter'
      },
      {
        value: '微网箱变',
        id: '微网箱变',
        position: [529477.495, 2520360.96, 34.2319580078125],
        img: 'microgridBox'
      },
      {
        value: '储能箱',
        id: '储能箱',
        position: [529476.49, 2520356.48, 34.22337646484375],
        img: 'energyStorageBox'
      },
      {
        value: '充电终端',
        id: '充电终端',
        position: [529477.8025, 2520351.84, 32.137705078125],
        img: 'chargingTerminal'
      },
      {
        value: '光伏电池板',
        id: '光伏电池板',
        position: [529473.83, 2520347.68, 35.1907373046875],
        img: 'PVPanel'
      },
      {
        value: '充电站',
        id: '充电站',
        position: [529477.7975, 2520344.8000000003, 34.6154541015625],
        img: 'chargingStation'
      }
    ];
  } else if (stationId == '440202003') {
    //奥特迅
    return [
      {
        value: '充电集控终端',
        id: '充电集控终端',
        position: [494455.70875, 2495552, 25.17718994140625],
        img: 'chargingTerminal'
      },
      {
        value: 'V2G桩',
        id: 'V2G桩',
        position: [494458.6175, 2495536, 25.014765625],
        img: 'V2G'
      },
      {
        value: '液冷大功率充电终端',
        id: '液冷大功率充电终端',
        position: [494452.315, 2495571.52, 25.58055908203125],
        img: 'chargingTerminal'
      },
      {
        value: '充电堆',
        id: '充电堆',
        position: [494452.72375, 2495578.24, 26.920390625],
        img: 'chargingStack'
      },
      {
        value: '电池设备室',
        id: '电池设备室',
        position: [494450.11875, 2495589.6, 27.641760253906252],
        img: 'batteryRoom'
      },
      {
        value: '储能柜',
        id: '储能柜',
        position: [494448.366875, 2495595.2, 26.2085498046875],
        img: 'energyStorageBox'
      }
    ];
  } else if (stationId == '144') {
    //欢乐谷
    return [
      {
        value: '休息室',
        id: '休息室',
        position: [497134.126875, 2494086.56, 22.56550537109375],
        img: 'rest'
      },
      {
        value: '1#箱变',
        id: '1#箱变',
        position: [497201.15375, 2494072.16, 23.0725341796875],
        img: 'microgridBox'
      },
      {
        value: '2#箱变',
        id: '2#箱变',
        position: [497200.9596875, 2494068, 23.090380859375],
        img: 'microgridBox'
      },
      {
        value: '3#箱变',
        id: '3#箱变',
        position: [497201.195625, 2494064, 23.084296875],
        img: 'microgridBox'
      },
      {
        value: '4#箱变',
        id: '4#箱变',
        position: [497207.43, 2494064, 23.0889501953125],
        img: 'microgridBox'
      },
      {
        value: '5#箱变',
        id: '5#箱变',
        position: [497207.631875, 2494067.68, 23.069404296875],
        img: 'microgridBox'
      }
    ];
  } else if (stationId === '-1') {
    //宝清储能站
    return [
      {
        value: '户内配电装置楼',
        id: '户内配电装置楼',
        position: [529798.0375, 2510004, 84.44],
        img: 'building'
      },
      {
        value: '光伏电池板',
        id: '光伏电池板',
        position: [529775.9525, 2510004.48, 85.170771484375],
        img: 'photovoltaic'
      },
      {
        value: '主控通信楼',
        id: '主控通信楼',
        position: [529839.3725, 2510001.92, 82.64],
        img: 'building'
      }
    ];
  } else if (stationId == '-2') {
    //莲花村
    return [
      {
        value: '风机',
        id: '风机',
        position: [506401.55625, 2494983.84, 18.51548095703125],
        img: 'fan'
      },
      {
        value: 'A1',
        id: 'A1',
        position: [506375.833125, 2494823.68, 10.55826171875],
        img: 'metro'
      },
      {
        value: 'A2',
        id: 'A2',
        position: [506413.631875, 2494782.08, 17.473076171875],
        img: 'metro'
      },
      {
        value: 'B1',
        id: 'B1',
        position: [506479.97500000003, 2494780.16, 17.0259130859375],
        img: 'metro'
      },
      {
        value: 'B2',
        id: 'B2',
        position: [506549, 2494833.44, 17.6691015625],
        img: 'metro'
      },
      {
        value: 'C1',
        id: 'C1',
        position: [506516.78875, 2494895.84, 17.999814453125],
        img: 'metro'
      },
      {
        value: 'C2',
        id: 'C2',
        position: [506473.3137, 2494977.76, 18.95273],
        img: 'metro'
      },
      {
        value: 'D',
        id: 'D',
        position: [506389.108125, 2494895.2, 17.91951171875],
        img: 'metro'
      },
      {
        value: 'E',
        id: 'E',
        position: [506406.7, 2494957.6, 17.934033203125],
        img: 'metro'
      }
    ];
  }
};
//民乐站电流标签
export const currentLabel = () => {
  return [
    {
      value: '220V 46HZ',
      position: [504791.74562500004, 2499561.2800000003, 92.600009765625]
    },
    {
      value: '220V 46HZ',
      position: [504774.7628125, 2499640.8000000003, 92.8]
    },
    {
      value: '220V 45HZ',
      position: [504758.515625, 2499630.24, 92.8]
    },
    {
      value: '220V 47HZ',
      position: [504741.965625, 2499619.68, 92.8]
    },
    {
      value: '220V 45HZ',
      position: [504725.815625, 2499608.64, 92.8]
    },
    {
      value: '220V 47HZ',
      position: [504709.5103125, 2499596.48, 92.8]
    },

    {
      value: '220V 47HZ',
      position: [504727.878125, 2499711.84, 92.89998046875]
    },
    {
      value: '220V 45HZ',
      position: [504712.53218750004, 2499699.68, 92.899990234375]
    },
    {
      value: '220V 48HZ',
      position: [504696.603125, 2499688.16, 92.900029296875]
    },
    {
      value: '220V 46HZ',
      position: [504679.844375, 2499678.24, 92.899970703125]
    },
    {
      value: '220V 47HZ',
      position: [504663.89687500003, 2499665.7600000002, 92.9]
    },
    {
      value: '220V 45HZ',
      position: [504640.77125, 2499718.08, 94.609931640625]
    }
  ];
};
//民乐站棚顶的id
export const ceilingId = () => {
  return [
    'Shape036',
    'Shape037',
    'Shape038',
    'Shape039',
    'Rectangle092',
    'Shape045',
    'Shape044',
    'Shape041',
    'Shape042',
    'Line140',
    'Shape040'
  ];
};

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '站点充电量',
      num: data?.stationChargeCapacity,
      unit: 'kWh'
    },
    {
      name: '站点充电次数',
      num: data?.stationChargeCount,
      unit: '次'
    },
    {
      name: '站点充电时长',
      num: Math.round(data?.stationChargeDuration),
      unit: '小时'
    },
    {
      name: '站点故障次数',
      num: data?.stationFailureNumber,
      unit: '次'
    }
  ];
};

export const deviceInfoDataFun = (data = {}) => {
  return [
    {
      img: charging,
      num: data?.equipmentCount,
      name: '充电桩/个'
    },
    // {
    //   img: camera,
    //   num: data?.cameraCount || 63279,
    //   name: '摄像头/个'
    // },
    {
      img: charging,
      num: data?.gunCount,
      name: '充电枪/个'
    }
    // {
    //   img: dLock,
    //   num: data?.lockCount || 58552,
    //   name: '地锁/个'
    // }
  ];
};

export const warningTabsDataFun = (data = []) => {
  const levelData = {};
  data?.map((item) => {
    levelData[item.levelType] = item.levelCount;
  });
  return [
    {
      label: '一级人身安全',
      icon: 'first-level',
      num: levelData[1],
      code: 1,
      color: '#FA2A2D'
    },
    {
      label: '二级设备安全',
      icon: 'second-level',
      num: levelData[2],
      code: 2,
      color: '#FF7500'
    },
    {
      label: '三级告警提示',
      icon: 'third-level',
      num: levelData[3],
      code: 3,
      color: '#FFBF00'
    }
  ];
};

export const warningListFun = () => {
  return [
    {
      date: '12:30:12',
      message: '充电桩排队人数过多充电桩排队人数过多',
      area: '南山区充电桩排队人数过多'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多充电桩排队人数过多',
      area: '南山区充电桩排队人数过多'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    }
  ];
};

export const chargingTypesTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电桩使用情况'
    },
    {
      code: 2,
      label: '充电枪使用情况'
    }
  ];
};

export const chargingTypesFun = (data = {}) => {
  return [
    {
      img: rate,
      num: data && data.useRate ? data.useRate.toFixed(2) + '%' : '0%',
      name: '当前使用率',
      digits: 2,
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: num,
      num: data?.useCount,
      unit: '次',
      name: '使用次数',
      classStyleType: 'leftRightStyleYellow'
    }
  ];
};

export const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  return [
    {
      data: data?.map((item) => [yearMonthDay + item.time, item.power]),
      type: 'line',
      smooth: true,
      name: '实时功率'
    }
  ];
};

export const columnDataFun = () => {
  return [
    {
      prop: 'operatorName',
      label: '运营商名称',
      minWidth: 2.8
    },
    {
      prop: 'stationName',
      label: '充电站名称',
      minWidth: '1'
    },
    {
      prop: 'alarmLevelName',
      label: '告警级别',
      minWidth: 1
    },
    {
      prop: 'alarmDesc',
      label: '告警描述',
      minWidth: '2'
    },
    {
      prop: 'alarmTypeName',
      label: '告警类型',
      minWidth: '1'
    },
    {
      prop: 'alarmTime',
      label: '告警时间',
      minWidth: 2
    },
    {
      prop: 'stationPrincipal',
      label: '安全负责人',
      minWidth: 1
    },
    {
      prop: 'serviceTel',
      label: '联系电话',
      minWidth: 1.8
    }
  ];
};
export const realtimeTrendFun = (data = [], type = 2) => {
  if (type === 1) {
    // 日

    return [
      {
        data: data.map((item) => [item.time + ':00:00', item.cnt]),
        type: 'line',
        smooth: true,
        name: '告警数'
      }
    ];
  } else if (type === 2) {
    // 周
    return [
      {
        data: data.map((item) => [
          item.time.length >= 10 ? item.time.substr(5) : item.time,
          item.cnt
        ]),
        type: 'line',
        smooth: true,
        name: '告警数'
      }
    ];
  } else {
    // 月
    const yearMonthDay = dayjs().format('YYYY-');
    return [
      {
        data: data.map((item) => [item.time, item.cnt]),
        type: 'line',
        smooth: true,
        name: '告警数'
      }
    ];
  }
};
