import charging from './images/charging.png';
import InstalledCapacity from './images/installed-capacity.png';
import PhotovoltaicArea from './images/photovoltaic-area.png';
import rate from './images/rate.png';
import num from './images/num.png';
import dayjs from 'dayjs';
import petrol from './images/petrol.png';
import { simplifyNum, deepClone } from '@/utils/index';
import nxfdl from './components/images/nxfdl.png';
import ntgdl from './components/images/ntgdl.png';
import cddy from './components/images/cddy.png';
import { baoqingDevice } from './components/baoqing-device.js';

import i18n from '@/locales/i18n';
const { t } = i18n.global;
const configHead = `station-detail.config`;

// 宝清储能站可高亮TileLayer
export const tileLayerIds = ['91C288AF40176FFAD02BD09F258CA575'];
export const lianhuaPowerFun = (data = {}) => {
  return [
    {
      img: rate,
      num: 72.34,
      name: '上网电量',
      unit: 'kWh',
      classStyleType: 'leftRightStyleGreen',
      displayName: t(`${configHead}.lianhuaPowerFun.swdl`)
    },
    {
      img: num,
      num: 148.64,
      name: '发电电量',
      unit: 'kWh',
      classStyleType: 'leftRightStyleYellow',
      displayName: t(`${configHead}.lianhuaPowerFun.fddl`)
    }
  ];
};

export const lianhuaWarnFun = (data = [], xaxis = []) => {
  let todayTrans = t(`${configHead}.lianhuaWarnFun.today`) || '今日';
  let data1 = [];
  let xAxis = [];
  for (let i = 6; i > 0; i--) {
    xAxis.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'));
    data1.push({ value: 0, date: dayjs().subtract(i, 'day').format('YYYY-MM-DD') });
  }
  data1.push({ value: 0, date: dayjs().format('YYYY-MM-DD') });
  xAxis.push(todayTrans || '今日');
  let obj = {
    xAxis: xAxis,
    seriesData: [
      {
        data: data1,
        type: 'line',
        smooth: true,
        name: t(`${configHead}.lianhuaWarnFun.gjs`) || '告警数',
        areaStyle: {
          origin: 'start',
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
            <span class="unit">${t(`${configHead}.lianhuaWarnOption.unitGe`)}</span>
          </span>
        </div>`;
      });
      //  || '个'
      str += '</div>';
      return str;
    }
  },
  legend: {
    data: [t(`${configHead}.lianhuaWarnOption.gjs`) || '告警数'],
    textStyle: {
      color: '#fff'
    },
    x: '75%'
  },
  xAxis: {
    type: 'category',
    data: [],
    boundaryGap: false,
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
        if (value === '今日') {
          return value;
        } else {
          return dayjs(value).format('DD') + t(`${configHead}.lianhuaWarnOption.day`) || '日';
        }
      }
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    name: t(`${configHead}.lianhuaWarnOption.yAxisName`) || '单位:个',
    interval: 10,
    max: 50,
    min: -10,
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
        return value >= 0 ? value : '';
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
  const seriesData = [
    0, 0, 0, 0, 0, 0, 0.48, 1.22, 2.13, 3.55, 5.01, 7.96, 8.96, 10.56, 9.76, 8.43, 7.46, 5.01, 2.4,
    1.25, 0, 0, 0, 0
  ];
  return seriesData;
};

export const lianhuaRealtimeOption = () => {
  const data = lianhuaRealtimeDataFun();
  const h = dayjs().format('HH');
  const time = [
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
  ];
  const index = time.findIndex((i) => {
    const temp = i.split(':')[0];
    return h === temp;
  });
  // 获取副本
  let timeC = deepClone(time);
  let dataC = deepClone(data);
  // 数组选择
  timeC.splice(index + 1);
  dataC.splice(index + 1);

  return {
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
      data: [t(`${configHead}.lianhuaRealtimeOption.ssgl`) || '实时功率'],
      textStyle: {
        color: '#fff'
      },
      x: '75%'
    },
    xAxis: {
      type: 'category',
      data: time,
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
      name: t(`${configHead}.lianhuaRealtimeOption.yAxisName`) || '单位:kW ',
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
        data: dataC,
        type: 'line',
        smooth: true,
        name: t(`${configHead}.lianhuaRealtimeOption.seriesName`) || '实时功率',
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
};

const lianhuajinguiFun = (weather = 0) => {
  let data = [];
  const photoData = [
    397, 468, 482, 476, 437, 455, 481, 453, 429, 426, 452, 426, 452, 438, 467, 466, 488, 453, 433,
    456, 364, 362, 421, 395, 392, 397, 381, 367, 387, 375, 362, 377, 341, 327, 346, 349
  ];
  for (let i = 0; i < 36; i++) {
    let obj = {
      id: `singleCrystalSilicon${i + 1}`,
      text: '540W',
      value: weather === 1 ? photoData[i] - parseInt(photoData[i] * 0.23) : photoData[i],
      status: 1
    };
    // if (i < 50) {
    //   obj.status = 1;
    // }
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
      unit: '/kWp',
      name: '站点装机容量',
      displayName: t(`${configHead}.deviceInfoFun.zdzjrl`)
    },
    {
      img: PhotovoltaicArea,
      num: 114,
      unit: '/m²',
      name: '站点光伏板面积',
      displayName: t(`${configHead}.deviceInfoFun.zdgfbmj`)
    }
  ];
};
//民乐站充电中汽车电池数据
export const chargeIcon = () => {
  return [
    {
      id: '006813',
      coord: [504734.08875, 2499672.64, 93.9062109375]
    },
    {
      id: '006782',
      coord: [504751.7396875, 2499633.2800000003, 94.02783203125]
    },
    {
      id: '006750',
      coord: [504764.403125, 2499578.88, 94.035966796875]
    },
    {
      id: '006666',
      coord: [504766.7865625, 2499553.2800000003, 94.037890625]
    },
    {
      id: '006660',
      coord: [504758.590625, 2499565.6, 93.96677734375]
    },
    {
      id: 'chargeIcon', //充电演示的电池
      coord: [504729.10875, 2499645.2800000003, 94.006123046875]
    },
    {
      id: '-99',
      coord: [504684.6346875, 2499677.2800000003, 93.96107421875]
    },
    {
      id: '-88',
      coord: [504696.7128125, 2499694.24, 93.982021484375]
    }
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
        img: 'electricalRoom',
        displayValue: t(`${configHead}.facilitiesLabel.electricalRoom`)
      },
      {
        value: '配电房',
        position: [504753.5603125, 2499558.88, 97.00000976562501],
        id: '配电房2',
        img: 'electricalRoom',
        displayValue: t(`${configHead}.facilitiesLabel.electricalRoom`)
      },
      {
        value: '配电房',
        position: [504741.674375, 2499550.24, 97.00000976562501],
        id: '配电房3',
        img: 'electricalRoom',
        displayValue: t(`${configHead}.facilitiesLabel.electricalRoom`)
      },
      {
        value: '卫生间',
        position: [504675.3878125, 2499607.36, 98.3817578125],
        id: '卫生间',
        img: 'toilet',
        displayValue: t(`${configHead}.facilitiesLabel.toilet`)
      },
      {
        value: '便利店',
        position: [504672.74375, 2499624.8000000003, 96.959091796875],
        id: '便利店',
        img: 'store',
        displayValue: t(`${configHead}.facilitiesLabel.store`)
      },
      {
        value: '休息区',
        position: [504657.135625, 2499639.04, 98.2],
        id: '休息区',
        img: 'rest',
        displayValue: t(`${configHead}.facilitiesLabel.rest`)
      },
      {
        value: '维修区',
        position: [504635.49562500004, 2499664.96, 98.5],
        id: '维修区',
        img: 'maintenance',
        displayValue: t(`${configHead}.facilitiesLabel.maintenance`)
      },
      {
        value: '配电房',
        position: [504684.1375, 2499708.64, 97],
        id: '配电房4',
        img: 'electricalRoom',
        displayValue: t(`${configHead}.facilitiesLabel.electricalRoom`)
      }
    ];
  } else if (stationId == '4403070124') {
    //国际低碳城
    return [
      {
        value: '展示馆',
        id: '展示馆',
        position: [529572.4125, 2520471.52, 51.9294921875],
        img: 'bigHouse',
        displayValue: t(`${configHead}.facilitiesLabel.bigHouse`)
      },
      {
        value: '会议馆',
        id: '会议馆',
        position: [529603.1675, 2520417.6, 52.0587109375],
        img: 'bigHouse',
        displayValue: t(`${configHead}.facilitiesLabel.bigHouse1`)
      },
      {
        value: '交易馆',
        id: '交易馆',
        position: [529523.8875, 2520364.8000000003, 51.9294921875],
        img: 'bigHouse',
        displayValue: t(`${configHead}.facilitiesLabel.bigHouse2`)
      },
      {
        value: '实时监测中心',
        id: '实时监测展示中心',
        type: 'customAngleMarker',
        camera: [529468.861, 2520349.212, 47.814, -36.0, -104.999996, 2],
        position: [529466.175, 2520360.16, 42.725927734375],
        img: 'monitorCenter',
        displayValue: t(`${configHead}.facilitiesLabel.monitorCenter`)
      },
      {
        value: '微网箱变',
        id: '微网箱变',
        position: [529477.495, 2520360.96, 34.2319580078125],
        img: 'microgridBox',
        displayValue: t(`${configHead}.facilitiesLabel.microgridBox`)
      },
      {
        value: '储能箱',
        id: '储能箱',
        position: [529476.49, 2520356.48, 34.22337646484375],
        img: 'energyStorageBox',
        displayValue: t(`${configHead}.facilitiesLabel.energyStorageBox`)
      },
      {
        value: '充电终端',
        id: '充电终端',
        type: 'customAngleMarker',
        camera: [529478.721, 2520347.989, 34.255, -19.425051, -103.241957, 2],
        position: [529477.8025, 2520351.84, 32.137705078125],
        img: 'chargingTerminal',
        displayValue: t(`${configHead}.facilitiesLabel.chargingTerminal`)
      },
      {
        value: '光伏电池板',
        id: '光伏电池板',
        type: 'customAngleMarker',
        camera: [529489.451, 2520341.212, 46.46, -43.126306, -145.107255, 2],
        position: [529473.83, 2520347.68, 35.1907373046875],
        img: 'PVPanel',
        displayValue: t(`${configHead}.facilitiesLabel.PVPanel`)
      },
      {
        value: '充电站',
        id: '充电站',
        type: 'customAngleMarker',
        camera: [529477.747812, 2520330.100313, 35.466946, -0.030306, -104.800781, 2],
        position: [529477.7975, 2520344.8000000003, 34.6154541015625],
        img: 'chargingStation',
        displayValue: t(`${configHead}.facilitiesLabel.chargingStation`)
      }
    ];
  } else if (stationId == '440202003') {
    //奥特迅
    return [
      {
        value: '充电集控终端',
        id: '充电集控终端',
        type: 'customAngleMarker',
        camera: [494465.020625, 2495555.3925, 25.748376, -5.967556, 159.053345, 2],
        position: [494455.70875, 2495552, 25.17718994140625],
        img: 'chargingTerminal',
        displayValue: t(`${configHead}.facilitiesLabel.chargingTerminal1`)
      },
      {
        value: 'V2G桩',
        id: 'V2G桩',
        type: 'customAngleMarker',
        camera: [494462.151, 2495536.641, 25.595, -6.4, 169.799997, 2],
        position: [494458.6175, 2495536, 25.014765625],
        img: 'V2G',
        displayValue: t(`${configHead}.facilitiesLabel.V2G`)
      },
      {
        value: '液冷大功率充电终端',
        id: '液冷大功率充电终端',
        type: 'customAngleMarker',
        camera: [494455.913, 2495573.056, 25.894, -21.2, 170.800003, 2],
        position: [494452.315, 2495571.52, 25.58055908203125],
        img: 'chargingTerminal',
        displayValue: t(`${configHead}.facilitiesLabel.chargingTerminal2`)
      },
      {
        value: '充电堆',
        id: '充电堆',
        type: 'customAngleMarker',
        camera: [494462.128125, 2495576.0375, 30.344631, -26.933886, -164.908112, 2],
        position: [494452.72375, 2495578.24, 26.920390625],
        img: 'chargingStack',
        displayValue: t(`${configHead}.facilitiesLabel.chargingStack`)
      },
      {
        value: '电池设备室',
        id: '电池设备室',
        position: [494450.11875, 2495589.6, 27.641760253906252],
        img: 'batteryRoom',
        displayValue: t(`${configHead}.facilitiesLabel.batteryRoom`)
      },
      {
        value: '储能柜',
        id: '储能柜',
        position: [494448.366875, 2495595.2, 26.2085498046875],
        img: 'energyStorageBox',
        displayValue: t(`${configHead}.facilitiesLabel.energyStorageBox1`)
      }
    ];
  } else if (stationId == '144') {
    //欢乐谷
    return [
      {
        value: '休息室',
        id: '休息室',
        position: [497134.126875, 2494086.56, 22.56550537109375],
        img: 'rest',
        displayValue: t(`${configHead}.facilitiesLabel.rest1`)
      },
      {
        value: '1#箱变',
        id: '1#箱变',
        position: [497201.15375, 2494072.16, 23.0725341796875],
        img: 'microgridBox',
        displayValue: t(`${configHead}.facilitiesLabel.microgridBox1`)
      },
      {
        value: '2#箱变',
        id: '2#箱变',
        position: [497200.9596875, 2494068, 23.090380859375],
        img: 'microgridBox',
        displayValue: t(`${configHead}.facilitiesLabel.microgridBox2`)
      },
      {
        value: '3#箱变',
        id: '3#箱变',
        position: [497201.195625, 2494064, 23.084296875],
        img: 'microgridBox',
        displayValue: t(`${configHead}.facilitiesLabel.microgridBox3`)
      },
      {
        value: '4#箱变',
        id: '4#箱变',
        position: [497207.43, 2494064, 23.0889501953125],
        img: 'microgridBox',
        displayValue: t(`${configHead}.facilitiesLabel.microgridBox4`)
      },
      {
        value: '5#箱变',
        id: '5#箱变',
        position: [497207.631875, 2494067.68, 23.069404296875],
        img: 'microgridBox',
        displayValue: t(`${configHead}.facilitiesLabel.microgridBox5`)
      }
    ];
  } else if (stationId === '-1') {
    //宝清储能站
    return [
      {
        value: '户内配电装置楼',
        id: '户内配电装置楼',
        position: [529798.0375, 2510004, 84.44],
        img: 'building',
        displayValue: t(`${configHead}.facilitiesLabel.building`)
      },
      {
        value: '光伏电池板',
        id: '光伏电池板',
        position: [529775.9525, 2510004.48, 85.170771484375],
        img: 'photovoltaic',
        displayValue: t(`${configHead}.facilitiesLabel.photovoltaic`)
      },
      {
        value: '主控通信楼',
        id: '主控通信楼',
        position: [529839.3725, 2510001.92, 82.64],
        img: 'building',
        displayValue: t(`${configHead}.facilitiesLabel.building1`)
      }
    ];
  } else if (stationId == '-2') {
    //莲花村
    return [
      {
        value: '风机',
        id: 'fan',
        position: [506401.55625, 2494983.84, 18.51548095703125],
        img: 'fan',
        displayValue: t(`${configHead}.facilitiesLabel.fan`)
      },
      {
        value: '光伏电池板',
        id: 'photovoltaic',
        position: [506406.80562500004, 2494958.88, 17.351787109375],
        img: 'photovoltaic',
        displayValue: t(`${configHead}.facilitiesLabel.photovoltaic`)
      }
    ];
  } else if (stationId == '-3') {
    //红荔西
    return [
      {
        value: '机房',
        id: 'machineRoom-1',
        type: 'hongli',
        position: [502305.79375, 2494200.64, 13.65986083984375],
        img: 'machineRoom',
        displayValue: t(`${configHead}.facilitiesLabel.machineRoom`)
      },
      {
        value: '微波',
        id: 'micro-wave',
        type: 'hongli',
        position: [502312.6265625, 2494191.36, 20.13559326171875],
        img: 'microwave',
        displayValue: t(`${configHead}.facilitiesLabel.microwave`)
      },
      {
        value: '5G天线',
        id: '5G-antenna',
        type: 'hongli',
        position: [502312.4453125, 2494190.88, 23.995588378906252],
        img: '5GAntenna',
        displayValue: t(`${configHead}.facilitiesLabel.5GAntenna`)
      }
    ];
  } else {
    return [];
  }
};
//民乐站电流标签
export const currentLabel = () => {
  return [
    {
      value: '380V 50HZ',
      position: [504791.74562500004, 2499561.2800000003, 92.600009765625]
    },
    {
      value: '312V 46HZ',
      position: [504774.7628125, 2499640.8000000003, 92.8]
    },
    {
      value: '358V 46HZ',
      position: [504758.515625, 2499630.24, 92.8]
    },
    {
      value: '371V 47HZ',
      position: [504741.965625, 2499619.68, 92.8]
    },
    {
      value: '326V 45HZ',
      position: [504725.815625, 2499608.64, 92.8]
    },
    {
      value: '371V 47HZ',
      position: [504709.5103125, 2499596.48, 92.8]
    },

    {
      value: '372V 47HZ',
      position: [504727.878125, 2499711.84, 92.89998046875]
    },
    {
      value: '367V 46HZ',
      position: [504712.53218750004, 2499699.68, 92.899990234375]
    },
    {
      value: '295V 48HZ',
      position: [504696.603125, 2499688.16, 92.900029296875]
    },
    {
      value: '354V 46HZ',
      position: [504679.844375, 2499678.24, 92.899970703125]
    },
    {
      value: '360V 47HZ',
      position: [504663.89687500003, 2499665.7600000002, 92.9]
    },
    {
      value: '362V 47HZ',
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

// 宝清储能站F1-空间分布
export const floor1SpaceMarker = [
  {
    value: '高压配电室',
    id: 'floor1Marker1',
    groupId: 'stationFacilitiesLabel',
    position: [529813.5, 2509990.72, 74.44],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor1SpaceMarker.gypds`)
  },
  {
    value: '配电变压器室',
    id: 'floor1Marker2',
    groupId: 'stationFacilitiesLabel',
    position: [529811.4175, 2509998.88, 74.44],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor1SpaceMarker.pdbyqs`)
  },
  {
    value: 'PCS室',
    id: 'floor1Marker3',
    groupId: 'stationFacilitiesLabel',
    position: [529810.5675, 2510006.56, 74.44],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor1SpaceMarker.pcss`)
  },
  {
    value: '#1电池堆室',
    id: 'floor1Marker4',
    groupId: 'stationFacilitiesLabel',
    position: [529774.1475, 2509995.52, 74.44],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor1SpaceMarker.dcds1`)
  },
  {
    value: '#3电池堆室',
    id: 'floor1Marker5',
    groupId: 'stationFacilitiesLabel',
    position: [529774.1775, 2510008.16, 74.44],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor1SpaceMarker.dcds3`)
  },
  {
    value: '电池簇',
    id: 'floor1Marker6',
    groupId: 'stationFacilitiesLabel',
    position: [529774.3200000001, 2510013.44, 74.44],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor1SpaceMarker.dcc`)
  }
];

export const floor2SpaceMarker = [
  {
    value: '吊装孔',
    id: 'floor2Marker1',
    groupId: 'stationFacilitiesLabel',
    position: [529800.625, 2509990.4, 88.63173828125001],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor2SpaceMarker.dzk`)
  },
  {
    value: '储能电池堆室#5',
    id: 'floor2Marker2',
    groupId: 'stationFacilitiesLabel',
    position: [529814.96, 2509996.48, 87.66400390625],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor2SpaceMarker.cndcds5`)
  },
  {
    value: '空调机房',
    id: 'floor2Marker3',
    groupId: 'stationFacilitiesLabel',
    position: [529800.5775, 2510010.24, 87.66400390625],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor2SpaceMarker.ktjf`)
  },
  {
    value: '#2电池堆室',
    id: 'floor2Marker4',
    groupId: 'stationFacilitiesLabel',
    position: [529774.72, 2510008.16, 87.66400390625],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor2SpaceMarker.dcds2`)
  },
  {
    value: '#4电池堆室',
    id: 'floor2Marker5',
    groupId: 'stationFacilitiesLabel',
    position: [529777.9525, 2509997.12, 89.66400390625],
    img: 'text-bg',
    displayValue: t(`${configHead}.floor2SpaceMarker.dcds4`)
  }
];

// 宝清储能站F1-设备功能
export const floor1DeviceMarker = [
  // {
  //   value: 'PCS柜',
  //   id: 'floor1DeviceMarker1',
  //   groupId: 'stationFacilitiesLabel',
  //   type: 'customAngleMarker',
  //   img: 'pcs',
  //   position: [529808.3725, 2509992.32, 76.12537109375],
  //   camera: [529805.81082, 2509990.714063, 76.307715, -7.829712, -29.874485, 2]
  // },
  {
    value: 'PCS规约转换器',
    id: 'floor1DeviceMarker2',
    groupId: 'stationFacilitiesLabel',
    type: 'customAngleMarker',
    img: 'bms',
    position: [529797.53, 2510010.24, 75.90593750000001],
    camera: [529797.906094, 2510013.5825, 76.28894, -5.770772, 88.328033, 2],
    displayValue: t(`${configHead}.floor1DeviceMarker.pcsgyzhq`)
  },
  {
    value: '电池簇',
    id: 'floor1DeviceMarker3',
    groupId: 'stationFacilitiesLabel',
    type: 'customAngleMarker',
    img: 'battery-group',
    position: [529782.2375, 2509997.76, 75.84],
    camera: [529783.675781, 2509997.0125, 76.15019, -14.825991, -150.658203, 2],
    displayValue: t(`${configHead}.floor1DeviceMarker.dcc`)
  },
  {
    value: '电池簇',
    id: 'floor1DeviceMarker4',
    groupId: 'stationFacilitiesLabel',
    type: 'customAngleMarker',
    img: 'battery-group',
    position: [529782.375, 2510008.32, 75.84],
    camera: [529784.324063, 2510008.4175, 75.900972, -9.587769, 179.205246, 2],
    displayValue: t(`${configHead}.floor1DeviceMarker.dcc`)
  }
];

export const floor2DeviceMarker = [
  {
    value: '电池簇',
    id: 'floor2DeviceMarker1',
    groupId: 'stationFacilitiesLabel',
    type: 'customAngleMarker',
    img: 'battery-group',
    position: [529812.0075000001, 2509993.92, 88.45103515625],
    camera: [529813.420337, 2509995.586992, 89.321895, -11.132771, 130.23381, 2],
    displayValue: t(`${configHead}.floor2DeviceMarker.dcc`)
  },
  {
    value: '电池簇',
    id: 'floor2DeviceMarker2',
    groupId: 'stationFacilitiesLabel',
    type: 'customAngleMarker',
    img: 'battery-group',
    position: [529782.4075, 2509997.44, 88.8433984375],
    camera: [529783.006836, 2509999.194688, 89.246934, -12.657774, 105.930191, 2],
    displayValue: t(`${configHead}.floor2DeviceMarker.dcc`)
  },
  {
    value: '电池簇',
    id: 'floor2DeviceMarker3',
    groupId: 'stationFacilitiesLabel',
    type: 'customAngleMarker',
    img: 'battery-group',
    position: [529782.04, 2510007.68, 88.351171875],
    camera: [529783.382183, 2510009.573828, 88.775244, -4.620971, 112.99543, 2],
    displayValue: t(`${configHead}.floor2DeviceMarker.dcc`)
  }
];

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '站点充电量',
      num: data?.stationChargeCapacity,
      unit: 'kWh',
      displayName: t(`${configHead}.pageNumFun.zdcdl`),
      displayUnit: t(`${configHead}.pageNumFun.KWH`)
    },
    {
      name: '站点充电次数',
      num: data?.stationChargeCount,
      unit: '次',
      displayName: t(`${configHead}.pageNumFun.zdcdcs`),
      displayUnit: t(`${configHead}.pageNumFun.unitCi`)
    },
    {
      name: '站点充电时长',
      num: Math.round(data?.stationChargeDuration),
      unit: '小时',
      displayName: t(`${configHead}.pageNumFun.zdcdsc`),
      displayUnit: t(`${configHead}.pageNumFun.unitHour`)
    },
    {
      name: '站点故障次数',
      num: data?.stationFailureNumber,
      unit: '次',
      displayName: t(`${configHead}.pageNumFun.zdgzcs`),
      displayUnit: t(`${configHead}.pageNumFun.unitCi`)
    }
  ];
};

export const deviceInfoDataFun = (data = {}) => {
  return [
    {
      img: charging,
      num: data?.equipmentCount,
      name: '充电桩/个',
      displayName: t(`${configHead}.deviceInfoDataFun.cdzg`)
    },
    // {
    //   img: camera,
    //   num: data?.cameraCount || 63279,
    //   name: '摄像头/个'
    // },
    {
      img: charging,
      num: data?.gunCount,
      name: '充电枪/个',
      displayName: t(`${configHead}.deviceInfoDataFun.cdqg`)
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
    levelData[item?.levelType] = item?.levelCount;
  });
  return [
    {
      // label: '一级人身安全',
      icon: 'first-level',
      num: levelData[1],
      code: 1,
      color: '#FA2A2D',
      label: t(`${configHead}.warningTabsDataFun.yjrsaq`)
    },
    {
      // label: '二级设备安全',
      icon: 'second-level',
      num: levelData[2],
      code: 2,
      color: '#FF7500',
      label: t(`${configHead}.warningTabsDataFun.ejsbaq`)
    },
    {
      // label: '三级告警提示',
      icon: 'third-level',
      num: levelData[3],
      code: 3,
      color: '#FFBF00',
      label: t(`${configHead}.warningTabsDataFun.sjgjts`)
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
      label: '充电桩使用情况',
      displayLabel: t(`${configHead}.chargingTypesTabsFun.cdzsyqk`)
    },
    {
      code: 2,
      label: '充电枪使用情况',
      displayLabel: t(`${configHead}.chargingTypesTabsFun.cdqsyqk`)
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
      classStyleType: 'leftRightStyleGreen',
      displayName: t(`${configHead}.chargingTypesFun.dqsyl`)
    },
    {
      img: num,
      num: data?.useCount,
      unit: '次',
      name: '使用次数',
      classStyleType: 'leftRightStyleYellow',
      displayName: t(`${configHead}.chargingTypesFun.sycs`),
      displayUnit: t(`${configHead}.chargingTypesFun.unitCi`)
    }
  ];
};

export const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  return [
    // {
    //   data: data?.map((item) => [yearMonthDay + item.time, item.totalPower]),
    //   type: 'line',
    //   smooth: true,
    //   name: '总功率'
    //   // areaStyle:{show:false}
    // },
    // {
    //   data: data?.map((item) => [yearMonthDay + item.time, item.ratedPower]),
    //   type: 'line',
    //   smooth: true,
    //   name: '实时额定功率'
    // },
    {
      data: data?.map((item) => [yearMonthDay + item.time, item.power]),
      type: 'line',
      smooth: true,
      name: t(`${configHead}.linePowerDataFun.ssgl`) || '实时功率'
    }
  ];
};

export const columnDataFun = () => {
  return [
    {
      prop: 'operatorName',
      label: '运营商名称',
      minWidth: 2.8,
      displayLabel: t(`${configHead}.columnDataFun.yysmc`)
    },
    {
      prop: 'stationName',
      label: '充电站名称',
      minWidth: '1',
      displayLabel: t(`${configHead}.columnDataFun.cdzmc`)
    },
    {
      prop: 'alarmLevelName',
      label: '告警级别',
      minWidth: 1,
      displayLabel: t(`${configHead}.columnDataFun.gjjb`)
    },
    {
      prop: 'alarmDesc',
      label: '告警描述',
      minWidth: '2',
      displayLabel: t(`${configHead}.columnDataFun.gjms`)
    },
    {
      prop: 'alarmTypeName',
      label: '告警类型',
      minWidth: '1',
      displayLabel: t(`${configHead}.columnDataFun.gjlx`)
    },
    {
      prop: 'alarmTime',
      label: '告警时间',
      minWidth: 2,
      displayLabel: t(`${configHead}.columnDataFun.gjsj`)
    },
    {
      prop: 'stationPrincipal',
      label: '安全负责人',
      minWidth: 1,
      displayLabel: t(`${configHead}.columnDataFun.aqfzr`)
    },
    {
      prop: 'serviceTel',
      label: '联系电话',
      minWidth: 1.8,
      displayLabel: t(`${configHead}.columnDataFun.lxdh`)
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
        name: t(`${configHead}.realtimeTrendFun.gjs`) || '告警数'
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
        name: t(`${configHead}.realtimeTrendFun.gjs`) || '告警数'
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
        name: t(`${configHead}.realtimeTrendFun.gjs`) || '告警数'
      }
    ];
  }
};

export const stationWarnFun = (data = []) => {
  let data1 = [];
  let xAxis = [];
  for (let i = 0; i < data.length; i++) {
    xAxis.push(data[i].time);
    data1.push({ value: data[i].cnt, date: data[i].time });
  }
  // data1.push({ value: data[i].time, date: dayjs().format('YYYY-MM-DD') });
  let obj = {
    xAxis: xAxis,
    seriesData: [
      {
        data: data1,
        type: 'line',
        smooth: true,
        name: t(`${configHead}.stationWarnFun.gjs`) || '告警数',
        areaStyle: {
          origin: 'start',
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
};
export const xAxisTodayFun = () => {
  let xAxis = [];
  for (let i = 0; i < 24; i++) {
    xAxis.push(
      dayjs().set('hour', i).set('minute', '00').set('second', '00').format('YYYY-MM-DD HH:mm:ss')
    );
  }
  return xAxis;
};
const realtimeSeriesDataFun = (min = 0, max = 100) => {
  const hours = dayjs().hour();
  const seriesData = [];
  for (let i = 0; i < hours; i++) {
    const random = Math.floor(Math.random() * max) + min;
    seriesData.push(random);
  }
  return seriesData;
};

export const stationWarnOption = {
  grid: {
    top: 30,
    bottom: 10,
    right: 20,
    left: 20,
    containLabel: true
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
            <span class="unit">${t(`${configHead}.stationWarnOption.unitGe`)}</span>
          </span>
        </div>`;
      });
      // ||'个'
      str += '</div>';
      return str;
    }
  },
  legend: {
    data: [t(`${configHead}.stationWarnOption.gjs`) || '告警数'],
    textStyle: {
      color: '#fff'
    },
    x: '75%'
  },
  xAxis: {
    type: 'category',
    data: [],
    boundaryGap: false,
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
      fontSize: 10,
      lineHeight: 18,
      color: '#B4C0CC',
      formatter: (value) => {
        if (value === '今日') {
          return value;
        } else {
          return dayjs(value).format('DD') + t(`${configHead}.stationWarnOption.day`) || '日';
        }
      }
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    name: t(`${configHead}.stationWarnOption.yAxisName`) || '单位:个',
    // interval: 10,
    // max: 50,
    // min: -10,
    splitNumber: 4,
    minInterval: 1,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      fontFamily: 'Helvetica',
      fontSize: 10,
      lineHeight: 16,
      color: '#B4C0CC',
      formatter: (value) => {
        return value >= 0 ? value : '';
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

export const batterySOHOption = () => {
  let xAxis = [];
  let todaySeriesData = [];
  const hours = dayjs().hour();
  const minutes = dayjs().minute();

  for (let i = 0; i < baoqingDevice.length; i++) {
    xAxis.push(baoqingDevice[i].time);
    const date = baoqingDevice[i].time.split(':');
    // 判断小时和分钟是否小于当前时刻
    if (hours > Number(date[0]) || (Number(date[0]) <= hours && Number(date[1]) <= minutes)) {
      todaySeriesData.push((baoqingDevice[i].voltage * baoqingDevice[i].current).toFixed(2));
    }
    // console.log(dayjs(    ).format('YYYY-MM-DD HH:mm'));
    // xAxis.push(dayjs().set('hour', i).set('minute', '00').format('YYYY-MM-DD HH:mm'));
  }
  // console.log('xAxis', xAxis);
  // console.log('todaySeriesData', todaySeriesData);
  return {
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
      data: [t(`${configHead}.batterySOHOption.dccgl`) || '电池簇功率'],
      textStyle: {
        color: '#fff'
      },
      x: 'right'
    },
    xAxis: {
      type: 'category',
      data: xAxis,
      boundaryGap: false,
      minInterval: 0,
      interval: 60,
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
        // formatter: (value) => {
        //   return dayjs(value).format('HH');
        // }
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      name: t(`${configHead}.batterySOHOption.yAxisName`) || '单位：kW',
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
          return value >= 0 ? value : '';
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
        data: todaySeriesData,
        type: 'line',
        smooth: true,
        name: t(`${configHead}.batterySOHOption.seriesName`) || '电池簇功率',
        areaStyle: {
          origin: 'start',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#00FFF9' // 0% 处的颜色
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
          color: '#00FFF9'
        }
      }
    ]
  };
};

export const batteryTempOption = {
  grid: {
    top: 30,
    bottom: 60,
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
      str += `<div class="time">${val.axisValueLabel}</div>`;
      params.map((item) => {
        str += `<div class="item-data">
          <span class="left-data">
            ${item?.marker}
            <span class="name">${item?.seriesName}</span>
          </span>
          <span class="right-data">
            <span class="value">${item.value}</span>
            <span class="unit">℃</span>
          </span>
        </div>`;
      });
      str += '</div>';
      return str;
    }
  },
  legend: {
    data: [t(`${configHead}.batteryTempOption.czdwd`) || '簇最低温度'],
    textStyle: {
      color: '#fff'
    },
    x: '75%'
  },
  xAxis: {
    type: 'category',
    data: xAxisTodayFun(),
    boundaryGap: false,
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
        return dayjs(value).format('HH');
      }
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    name: t(`${configHead}.batteryTempOption.yAxisName`) || '单位:℃',
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
        return value >= 0 ? value : '';
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
      data: realtimeSeriesDataFun(28, 66),
      type: 'line',
      smooth: true,
      name: t(`${configHead}.batteryTempOption.seriesName`) || '簇最低温度',
      areaStyle: {
        origin: 'start',
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#00FFF9' // 0% 处的颜色
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
        color: '#00FFF9'
      }
    }
  ]
};

export const pageNumBaoqingFun = (data = {}) => {
  return [
    {
      name: '日充电量',
      num: 21.79,
      unit: 'MWh',
      displayName: t(`${configHead}.pageNumBaoqingFun.rcdl`),
      displayUnit: t(`${configHead}.pageNumBaoqingFun.unitMWh`)
    },
    {
      name: '日放电量',
      num: 21.63,
      unit: 'MWh',
      displayName: t(`${configHead}.pageNumBaoqingFun.rfdl`),
      displayUnit: t(`${configHead}.pageNumBaoqingFun.unitMWh`)
    },
    {
      name: 'SOC',
      num: 97.86,
      unit: '%',
      displayName: t(`${configHead}.pageNumBaoqingFun.soc`),
      displayUnit: t(`${configHead}.pageNumBaoqingFun.unitPer`)
    },
    {
      name: 'SOH',
      num: 98.21,
      unit: '%',
      displayName: t(`${configHead}.pageNumBaoqingFun.soh`),
      displayUnit: t(`${configHead}.pageNumBaoqingFun.unitPer`)
    },
    {
      name: '日故障次数',
      num: 0,
      unit: '次',
      displayName: t(`${configHead}.pageNumBaoqingFun.rgzcs`),
      displayUnit: t(`${configHead}.pageNumBaoqingFun.unitCi`)
    }
  ];
};

export const runingFun = (data = {}) => {
  return [
    {
      img: petrol,
      num: 10,
      unit: '最大可充功率/MW',
      name: '',
      displayUnit: t(`${configHead}.runingFun.zdkcglmv`)
    },
    {
      img: petrol,
      num: 10,
      unit: '最大可放功率/MW',
      name: '',
      displayUnit: t(`${configHead}.runingFun.zdkfglmv`)
    },
    {
      img: petrol,
      num: 132,
      unit: '最大可充时间/min',
      name: '',
      displayUnit: t(`${configHead}.runingFun.zdkcsjmin`)
    },
    {
      img: petrol,
      num: 126,
      unit: '最大可放时间/min',
      name: '',
      displayUnit: t(`${configHead}.runingFun.zdkfsjmin`)
    }
  ];
};

export const warnList = [
  {
    date: '2023-02-19',
    data: [
      {
        date: '2023-19-02 12:30:12',
        message: '保护[BCMS内部通讯故障]发生故…',
        area: '#1电池簇',
        displayMessage: t(`${configHead}.warnList.message1`),
        displayArea: t(`${configHead}.warnList.area1`)
      },
      {
        date: '2023-19-02 12:18:56',
        message: '保护[BCMS内部通讯故障]发生',
        area: '#2电池簇',
        displayMessage: t(`${configHead}.warnList.message2`),
        displayArea: t(`${configHead}.warnList.area2`)
      },
      {
        date: '2023-19-02 12:17:56',
        message: '告警[单体压差大]产生',
        area: '#3电池簇',
        displayMessage: t(`${configHead}.warnList.message3`),
        displayArea: t(`${configHead}.warnList.area3`)
      },
      {
        date: '2023-19-02 11:58:21',
        message: '告警[单体压差大]产生',
        area: '#8电池簇',
        displayMessage: t(`${configHead}.warnList.message4`),
        displayArea: t(`${configHead}.warnList.area4`)
      },
      {
        date: '2023-19-02 11:23:01',
        message: '告警[单体压差大]产生',
        area: '#9电池簇',
        displayMessage: t(`${configHead}.warnList.message5`),
        displayArea: t(`${configHead}.warnList.area5`)
      },
      {
        date: '2023-19-02 10:45:42',
        message: '告警[单体压差大]产生',
        area: '#9电池簇',
        displayMessage: t(`${configHead}.warnList.message6`),
        displayArea: t(`${configHead}.warnList.area6`)
      },
      {
        date: '2023-19-02 09:16:01',
        message: '告警[单体压差大]产生',
        area: '#9电池簇',
        displayMessage: t(`${configHead}.warnList.message7`),
        displayArea: t(`${configHead}.warnList.area7`)
      }
    ]
  }
];

const baoqingSytemStatusFun = () => {
  let data = [];
  for (let i = 0; i < 36; i++) {
    let obj = {
      id: 'baoqingSytemStatus' + i,
      value: `#${i + 1}${t(`${configHead}.baoqingSytemStatusFun.fxt`) || '分系统'}`,
      status: 1
    };
    // if (i < 50) {
    //   obj.status = 1;
    // }
    data.push(obj);
  }
  return data;
};
export const baoqingSytemStatusData = baoqingSytemStatusFun();

const baoqingRealtimeDataFun = () => {
  // const hours = dayjs().hour();
  const seriesData = [-10, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, -10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // for (let i = 0; i < 24; i++) {
  //   // console.log('i', i);
  //   if (i === 9 || i === 10) {
  //     seriesData.push(-150);
  //   } else if (i === 18 || i === 19) {
  //     seriesData.push(120);
  //   } else {
  //     seriesData.push(0);
  //   }
  // }
  return seriesData;
};

export const baoqingRealtimeOption = () => {
  const data = baoqingRealtimeDataFun();
  const h = dayjs().format('HH');
  const time = [
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
  ];
  const index = time.findIndex((i) => {
    const temp = i.split(':')[0];
    return h === temp;
  });
  // 获取副本
  let timeC = deepClone(time);
  let dataC = deepClone(data);
  // 数组选择
  timeC.splice(index + 1);
  dataC.splice(index + 1);

  return {
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
              <span class="unit">GWH</span>
            </span>
          </div>`;
        });
        str += '</div>';
        return str;
      }
    },
    legend: {
      textStyle: {
        color: '#fff'
      },
      x: '75%'
    },
    xAxis: {
      type: 'category',
      data: time,
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
      name: t(`${configHead}.baoqingRealtimeOption.yAxisName`) || '单位:GWH',
      nameTextStyle: {
        color: '#B4C0CC'
      },
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
        data: dataC,
        type: 'line',
        // smooth: true,
        name: t(`${configHead}.baoqingRealtimeOption.seriesName`) || '实时充放',
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
};
const baoqingWarnDataFun = () => {
  const hours = dayjs().hour();
  const seriesData = [];
  for (let i = 0; i <= hours; i++) {
    const random = Math.floor(Math.random() * 30);
    seriesData.push(random);
  }
  return seriesData;
};

export const baoqingWarnOption = {
  grid: {
    top: 30,
    bottom: 24,
    right: 15,
    left: 30
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
            <span class="unit">${t(`${configHead}.baoqingWarnOption.unitGe`)}</span>
          </span>
        </div>`;
      });
      // || '个'
      str += '</div>';
      return str;
    }
  },
  legend: {
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
      '09:00',
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
    name: t(`${configHead}.baoqingWarnOption.yAxisName`) || '单位:个',
    nameTextStyle: {
      color: '#B4C0CC'
    },
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
      data: baoqingWarnDataFun(),
      type: 'line',
      smooth: true,
      name: t(`${configHead}.baoqingWarnOption.seriesName`) || '告警数',
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

export const msgList = [
  {
    label: '分系统设备模式',
    value: '空线',
    displayLabel: t(`${configHead}.msgList.fxtsbms`),
    displayValue: t(`${configHead}.msgList.kx`)
  },
  {
    label: '分系统工作状态',
    value: '运行',
    displayLabel: t(`${configHead}.msgList.fxtgzzt`),
    displayValue: t(`${configHead}.msgList.yx`)
  },
  {
    label: '分系统最大可充功率',
    value: '500kW',
    displayLabel: t(`${configHead}.msgList.fxtzdkcgl`)
  },
  {
    label: '分系统最大可放功率',
    value: '500kW',
    displayLabel: t(`${configHead}.msgList.fxtzdkfgl`)
  },
  {
    label: '分系统可放电量',
    value: '1103.10',
    displayLabel: t(`${configHead}.msgList.fxtkfdl`)
  },
  {
    label: '分系统可充电量',
    value: '857.90',
    displayLabel: t(`${configHead}.msgList.fxtkcdl`)
  },
  {
    label: '分系统总充电量',
    value: '368635.19',
    displayLabel: t(`${configHead}.msgList.fxtzcdl`)
  },
  {
    label: '分系统总放电量',
    value: '343971.09',
    displayLabel: t(`${configHead}.msgList.fxtzfdl`)
  }
];

export const msgPopList = [
  {
    label: '站点区域',
    value: '福田区',
    displayLabel: t(`${configHead}.msgPopList.zdqy`),
    displayValue: t(`${configHead}.msgPopList.ftq`)
  },
  {
    label: '具体地址',
    value: '深圳市福田区红荔西路与香蜜湖路东北交叉口',
    displayLabel: t(`${configHead}.msgPopList.jtdz`),
    displayValue: t(`${configHead}.msgPopList.address`)
  },
  {
    label: '站点性质',
    value: '5G基站',
    displayLabel: t(`${configHead}.msgPopList.zdxz`),
    displayValue: t(`${configHead}.msgPopList.5gjz`)
  }
];
const popRealtimeDataFun = () => {
  // const hours = dayjs().hour();
  const seriesData = [
    0, 4.95, 0, 0, 0, 0, 0, 0, 0, 0, -3.65, -3.63, 4.97, 3.18, -4, -3.59, -3.7, 0, 0, 0, 0, 0, 0, 0
  ];
  // for (let i = 0; i < 24; i++) {
  //   // console.log('i', i);
  //   if (i === 9 || i === 10) {
  //     seriesData.push(-150);
  //   } else if (i === 18 || i === 19) {
  //     seriesData.push(120);
  //   } else {
  //     seriesData.push(0);
  //   }
  // }
  return seriesData;
};

export const popRealtimeOption = () => {
  const data = popRealtimeDataFun();
  const h = dayjs().format('HH');
  const time = [
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
  ];
  const index = time.findIndex((i) => {
    const temp = i.split(':')[0];
    return h === temp;
  });
  // 获取副本
  let timeC = deepClone(time);
  let dataC = deepClone(data);
  // 数组选择
  timeC.splice(index + 1);
  dataC.splice(index + 1);

  return {
    grid: {
      top: 30,
      bottom: 24,
      right: 30,
      left: 40
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
              <span class="unit">kw</span>
            </span>
          </div>`;
        });
        str += '</div>';
        return str;
      }
    },
    legend: {
      textStyle: {
        color: '#fff'
      },
      x: '70%'
    },
    xAxis: {
      type: 'category',
      data: time,
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
      name: t(`${configHead}.popRealtimeOption.yAxisName`) || '单位:kw',
      nameTextStyle: {
        color: '#B4C0CC'
      },
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
        data: dataC,
        type: 'line',
        // smooth: true,
        name: t(`${configHead}.popRealtimeOption.seriesName`) || '实时充放',
        // areaStyle: {
        //   color: {
        //     type: 'linear',
        //     x: 0,
        //     y: 0,
        //     x2: 0,
        //     y2: 1,
        //     colorStops: [
        //       {
        //         offset: 0,
        //         color: '#4BDEFF' // 0% 处的颜色
        //       },
        //       {
        //         offset: 1,
        //         color: 'rgba(217, 217, 217, 0)' // 100% 处的颜色
        //       }
        //     ],
        //     global: false // 缺省为 false
        //   }
        // },
        itemStyle: {
          color: '#4BDEFF'
        }
      }
    ]
  };
};

export const pageNumLianhuaxiFun = (data = {}) => {
  return [
    {
      name: '年累计发电量',
      num: 1.12,
      unit: '万kWh',
      displayName: t(`${configHead}.pageNumLianhuaxiFun.nljfdl`),
      displayUnit: t(`${configHead}.pageNumLianhuaxiFun.wanKwh`)
    },
    {
      name: '年有效利用小时数',
      num: 569,
      unit: '小时',
      displayName: t(`${configHead}.pageNumLianhuaxiFun.nyxlyxss`),
      displayUnit: t(`${configHead}.pageNumLianhuaxiFun.unitHour`)
    },
    {
      name: '年累计CO²减排量',
      num: 1.1,
      unit: '吨',
      displayName: t(`${configHead}.pageNumLianhuaxiFun.nljco2jpl`),
      displayUnit: t(`${configHead}.pageNumLianhuaxiFun.unitTon`)
    }
  ];
};

export const chargingStationTabsFun = () => {
  return [
    {
      code: 'cdzlx',
      chargingType: 'speed',
      typeCharge: 'pile',
      label: '充电桩类型',
      displayLabel: t(`${configHead}.chargingStationTabsFun.cdzlx`)
    },
    {
      code: 'cdzdllx',
      chargingType: 'electricity',
      typeCharge: 'pile',
      label: '充电桩电流类型',
      displayLabel: t(`${configHead}.chargingStationTabsFun.cdzdllx`)
    }
  ];
};

export const chargingStationGunTabsFun = () => {
  return [
    {
      code: 'cdqlx',
      chargingType: 'speed',
      typeCharge: 'gun',
      label: '充电枪类型',
      displayLabel: t(`${configHead}.chargingStationGunTabsFun.cdqlx`)
    },
    {
      code: 'cdqdllx',
      chargingType: 'electricity',
      typeCharge: 'gun',
      label: '充电枪电流类型',
      displayLabel: t(`${configHead}.chargingStationGunTabsFun.cdqdllx`)
    }
  ];
};

export const chargingStationPieDataFun = (code = 'cdzlx', data = {}) => {
  let res = [];
  switch (code) {
    case 'cdzlx':
      res = [
        {
          value: data?.chargeCountByChargeTypeDto?.quickCount,
          // value: 29982,
          name: '快充桩',
          code: 1,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), // '个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.kcz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByChargeTypeDto?.noQuickCount,
          // value: 142337,
          name: '慢充桩',
          code: 2,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), // '个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.mcz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByChargeTypeDto?.superCount,
          // value: 26,
          name: '超充桩',
          code: 3,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), // '个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.ccz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByChargeTypeDto?.v2gCount,
          // value: 21,
          name: 'V2G桩',
          code: 4,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), // '个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.v2gz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        }
      ];
      break;
    case 'cdzdllx':
      res = [
        {
          value: data?.chargeCountByElectricityTypeDto?.directCurrentCount,
          name: '直流桩',
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.zlz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.exchangeCount,
          name: '交流桩',
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.jlz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.directAndExchangeCount,
          name: '交直流桩',
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.jzlz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.otherCount,
          name: '其他桩',
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.qtz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.v2gCount,
          name: 'V2G桩',
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.v2gz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        }
      ];
      break;
    case 'cdqlx':
      res = [
        {
          value: data?.chargeCountByChargeTypeDto?.quickCount,
          name: '快充枪',
          code: 1,
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.kcq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByChargeTypeDto?.noQuickCount,
          name: '慢充枪',
          code: 2,
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.mcq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByChargeTypeDto?.superCount,
          name: '超充枪',
          code: 3,
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.ccq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByChargeTypeDto?.v2gCount,
          name: 'V2G枪',
          code: 4,
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.v2gq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        }
      ];
      break;
    case 'cdqdllx':
      res = [
        {
          value: data?.chargeCountByElectricityTypeDto?.directCurrentCount,
          name: '直流枪',
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.zlq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.exchangeCount,
          name: '交流枪',
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.jlq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.directAndExchangeCount,
          name: '交直流枪',
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.jzlq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.otherCount,
          name: '其他枪',
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.qtq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.v2gCount,
          name: 'V2G枪',
          unit: t(`${configHead}.chargingStationPieDataFun.zlz`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.v2gq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        }
      ];
      break;
    default:
      break;
  }
  res = res.filter((i) => i.value);
  return res;
};

export const batteryMsgFun = (data = {}) => {
  return [
    {
      img: nxfdl,
      num: 9.6,
      unit: 'kWh',
      name: '最大放电量',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      },
      displayName: t(`${configHead}.batteryMsgFun.zdfdl`)
    },
    {
      img: ntgdl,
      num: 48 / 57,
      unit: 'v',
      name: '放电电压',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      },
      displayName: t(`${configHead}.batteryMsgFun.fddy`)
    },
    {
      img: cddy,
      num: 56.4,
      unit: 'v',
      name: '充电电压',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      },
      displayName: t(`${configHead}.batteryMsgFun.cddy`)
    }
  ];
};
export const timeRandom = {
  '05:00': 0,
  '05:30': 5,
  '06:00': 10,
  '06:30': 15,
  '07:00': 25,
  '07:30': 35,
  '08:00': 50,
  '08:30': 65,
  '09:00': 75,
  '09:30': 80,
  '10:00': 85,
  '10:30': 90,
  '11:00': 95,
  '11:30': 98,
  '12:00': 100,
  '12:30': 100,
  '13:00': 98,
  '13:30': 95,
  '14:00': 90,
  '14:30': 88,
  '15:00': 85,
  '15:30': 75,
  '16:00': 65,
  '16:30': 50,
  '17:00': 35,
  '17:30': 25,
  '18:00': 15,
  '18:30': 10,
  '19:00': 5,
  '19:30': 0
};

// 超充站点顶部数据
export const getSuperHeaderData = (data = {}, type = 0) => {
  return [
    {
      name: '充电量',
      num: data?.stationChargeCapacity,
      unit: 'kWh',
      nameColor: '#64DEF6',
      children: [
        {
          name: type ? '站点' : '站点',
          num:
            data?.stationChargeCapacity > Math.pow(10, 6)
              ? (data?.stationChargeCapacity / Math.pow(10, 6)).toFixed(2) +
                t(`${configHead}.getSuperHeaderData.w`)
              : data?.stationChargeCapacity,
          displayName: t(`${configHead}.getSuperHeaderData.zd`)
        },
        {
          name: '超充',
          nameColor: '#64DEF6',
          num: data?.superStationChargeCapacity,
          displayName: t(`${configHead}.getSuperHeaderData.cc`)
        }
      ],
      displayName: t(`${configHead}.getSuperHeaderData.cdl`)
    },
    {
      name: '充电次数',
      num: data?.stationChargeCount,
      nameColor: '#64DEF6',
      // unit: '次',
      children: [
        {
          name: type ? '站点' : '站点',
          num: data?.stationChargeCount,
          displayName: t(`${configHead}.getSuperHeaderData.zd`)
        },
        {
          name: '超充',
          nameColor: '#64DEF6',
          num: data?.superStationChargeCount,
          displayName: t(`${configHead}.getSuperHeaderData.cc`)
        }
      ],
      displayName: t(`${configHead}.getSuperHeaderData.cdcs`),
      unit: t(`${configHead}.getSuperHeaderData.unitCi`)
    },
    {
      name: '充电时长',
      num: Math.round(data?.stationChargeDuration),
      // unit: '小时',
      nameColor: '#64DEF6',
      children: [
        {
          name: type ? '站点' : '站点',
          num: Math.round(data?.stationChargeDuration),
          displayName: t(`${configHead}.getSuperHeaderData.zd`)
        },
        {
          name: '超充',
          nameColor: '#64DEF6',
          num: data?.superStationChargeDuration,
          displayName: t(`${configHead}.getSuperHeaderData.cc`)
        }
      ],
      displayName: t(`${configHead}.getSuperHeaderData.zdfdl`),
      unit: t(`${configHead}.getSuperHeaderData.unitHour`)
    },
    {
      name: '站点故障次数',
      num: data?.stationFailureNumber,
      nameColor: '#64DEF6',
      // unit: '次',
      displayName: t(`${configHead}.getSuperHeaderData.zdgzcs`),
      unit: t(`${configHead}.getSuperHeaderData.unitCi`)
      // children: [
      //   {
      //     name: type ? '站点' : '充电桩',
      //     num: data?.stationFailureNumber
      //   },
      //   {
      //     name: '超充',
      //     nameColor: '#64DEF6',
      //     num: ''
      //   }
      // ]
    }
  ];
};

export const columnKeyList = [
  {
    prop: 'cnt',
    label: '告警数',
    width: 2
  },
  {
    prop: 'occurCount',
    label: '已发生',
    width: 2
  },
  {
    prop: 'affirmCnt',
    label: '已恢复',
    width: 2
  }
];
