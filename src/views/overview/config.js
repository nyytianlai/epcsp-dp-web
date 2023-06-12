import ztsyl from '@/views/charging-station/images/ztsyl.png';
import ncd from './images/ncd.png';
import nfdl from './images/nfdl.png';
import gfzzs from './images/gfzzs.png';
import cnzzs from './images/cnzzs.png';
import sszs from './images/sszs.png';
import aotexun from './images/aotexun.png';
import baoqing from './images/baoqing.png';
import honglixi from './images/honglixi.png';
import telaidian from './images/telaidian.png';
import lianhuaxi from './images/lianhuaxi.png';
import minle from './images/minle.png';
import { simplifyNum } from '@/utils/index';
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
      num: data?.totalChargingStations,
      unit: '个',
      name: '充电站总数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: ncd,
      num: data?.yearTotalCharge,
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
      img: minle,
      type: '充电站',
      name: '民乐充电站',
      createdBy: null,
      creationTime: null,
      lastUpdatedBy: null,
      lastUpdateTime: null,
      hrId: 2,
      operatorId: '398461164',
      stationId: '118',
      stationName: '比亚迪民乐P+R电动汽车充电站',
      stationType: '全球最大',
      stationPic:
        'http://10.226.0.231:9000/hr-station-pic/118.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20230609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230609T021313Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=3c0d97235d390bc5b31b2530dc76734caf69f5449245985ad8dd30b5fdf7ec86',
      path3dt: null,
      sort: 2
    },
    {
      id: 2,
      img: lianhuaxi,
      type: '光伏',
      name: '莲花西地铁光伏站'
    },
    {
      id: 3,
      img: honglixi,
      type: '5G',
      name: '红荔西5G示范站'
    },
    {
      id: 4,
      img: telaidian,
      type: '充电站',
      name: '特来电深圳国际低碳城站',
      createdBy: null,
      creationTime: null,
      lastUpdatedBy: null,
      lastUpdateTime: null,
      hrId: 4,
      operatorId: '395815801',
      stationId: '4403070124',
      stationName: '深圳国际低碳城光储充放一体化示范站',
      stationType: 'V2G',
      stationPic:
        'http://10.226.0.231:9000/hr-station-pic/4403070124.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20230609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230609T021313Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=0057756d8a74cb4fc1449884727f85b7aeb7fc5cb7c24c46313ea833bb199a26',
      path3dt: null,
      sort: 4
    },
    {
      id: 5,
      img: aotexun,
      type: '光储充放',
      name: '奥特迅电力大厦充电站',

      createdBy: null,
      creationTime: null,
      lastUpdatedBy: null,
      lastUpdateTime: null,
      hrId: 1,
      operatorId: '061402628',
      stationId: '440202003',
      stationName: '奥特迅电力大厦后广场充电站',
      stationType: '光储充放',
      stationPic:
        'http://10.226.0.231:9000/hr-station-pic/440202003.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20230609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230609T021313Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=d20cb7f662543ea11cf511abc6d3d20b9c9689ebb215b22cceee7179790712d4',
      path3dt: null,
      sort: 1
    },
    {
      id: 6,
      img: baoqing,
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
export const lineCarbonDataFun = (data = [], xaxis = []) => {
  
  const yearMonthDay = dayjs('2023-05').format('MM-');
  data = [
    {
      "time": "01",
      "ddqc": 11250,
      "llddc": 900,
      cn: 1515,
      gf: 2854
    },
    {
      "time": "02",
      "ddqc": 11028,
      "llddc": 832,
      cn: 1485,
      gf: 3006
    },
    {
      "time": "03",
      "ddqc": 10582,
      "llddc": 794,
      cn: 1425,
      gf: 3127
    },
    {
      "time": "04",
      "ddqc": 7797,
      "llddc": 623,
      cn: 1515,
      gf: 3066
    },
    {
      "time": "05",
      "ddqc": 8354,
      "llddc": 668,
      cn: 1485,
      gf: 3218
    },
    {
      "time": "06",
      "ddqc": 8195,
      "llddc": 655,
      cn: 1425,
      gf: 2884
    },
    {
      "time": "07",
      "ddqc": 9929,
      "llddc": 794,
      cn: 1455,
      gf: 936
    },
    {
      "time": "08",
      "ddqc": 7718,
      "llddc": 617,
      cn: 1470,
      gf: 850
    },
    {
      "time": "09",
      "ddqc": 7758,
      "llddc": 642,
      cn: 1485,
      gf: 1223
    },
    {
      "time": "10",
      "ddqc": 8115,
      "llddc": 649,
      cn: 1545,
      gf: 1288
    },
    {
      "time": "11",
      "ddqc": 8354,
      "llddc": 688,
      cn: 1560,
      gf: 1340
    },
    {
      "time": "12",
      "ddqc": 7718,
      "llddc": 617,
      cn: 1455,
      gf: 876
    },
    {
      "time": "13",
      "ddqc": 9166,
      "llddc": 740,
      cn: 1440,
      gf: 919
    },
    {
      "time": "14",
      "ddqc": 9739,
      "llddc": 771,
      cn: 1530,
      gf: 824
    },
    {
      "time": "15",
      "ddqc": 8354,
      "llddc": 668,
      cn: 1410,
      gf: 3097
    },
    {
      "time": "16",
      "ddqc": 7797,
      "llddc": 623,
      cn: 1485,
      gf: 2732
    },
    {
      "time": "17",
      "ddqc": 8354,
      "llddc": 617,
      cn: 1545,
      gf: 425
    },
    {
      "time": "18",
      "ddqc": 8354,
      "llddc": 611,
      cn: 1515,
      gf: 910
    },
    {
      "time": "19",
      "ddqc": 8195,
      "llddc": 649,
      cn: 1590,
      gf: 3188
    },
    {
      "time": "20",
      "ddqc": 9929,
      "llddc": 736,
      cn: 1425,
      gf: 2904
    },
    {
      "time": "21",
      "ddqc": 9261,
      "llddc": 793,
      cn: 1455,
      gf: 3157
    },
    {
      "time": "22",
      "ddqc": 7638,
      "llddc": 611,
      cn: 1440,
      gf: 841
    },
    {
      "time": "23",
      "ddqc": 8115,
      "llddc": 598,
      cn: 1530,
      gf: 663
    },
    {
      "time": "24",
      "ddqc": 7797,
      "llddc": 630,
      cn: 1560,
      gf: 425
    },
    {
      "time": "25",
      "ddqc": 7718,
      "llddc": 655,
      cn: 1575,
      gf: 3643
    },
    {
      "time": "26",
      "ddqc": 7638,
      "llddc": 642,
      cn: 1530,
      gf: 910
    },
    {
      "time": "27",
      "ddqc": 9739,
      "llddc": 742,
      cn: 1575,
      gf: 3669
    },
    {
      "time": "28",
      "ddqc": 9929,
      "llddc": 740,
      cn: 1470,
      gf: 858
    },
    {
      "time": "29",
      "ddqc": 8354,
      "llddc": 668,
      cn: 1575,
      gf: 3574
    },
    {
      "time": "30",
      "ddqc": 7718,
      "llddc": 668,
      cn: 1575,
      gf: 3066
    },
    {
      "time": "31",
      "ddqc": 7638,
      "llddc": 655,
      cn: 1545,
      gf: 459
    },
  ]
  return [
    {
      data: data.map((item) => [yearMonthDay+item.time, item.llddc]),
      type: 'line',
      smooth: true,
      name: '两轮动车'
    },
    {
      data: data.map((item) => [yearMonthDay+item.time, item.ddqc]),
      type: 'line',
      smooth: true,
      name: '电动汽车'
    },
    {
      data: data.map((item) => [yearMonthDay+item.time, item.cn]),
      type: 'line',
      smooth: true,
      name: '储能'
    },
    {
      data: data.map((item) => [yearMonthDay+item.time, item.gf]),
      type: 'line',
      smooth: true,
      name: '光伏'
    },
    {
      data: data.map((item) => [yearMonthDay+item.time, item.llddc + item.ddqc+item.cn+item.gf]),
      type: 'line',
      smooth: true,
      name: '合计'
    }
  ];
};
export const lineElectricDataFun = (data = []) => {
  const yearMonthDay = dayjs('2023-05').format('MM-');
  data = [
    {
      "time": "01",
      "ddqc": 1400,
      "llddc": 112,
      cn: 300,
      gf: 476
    },
    {
      "time": "02",
      "ddqc": 1400,
      "llddc": 96,
      cn: 300,
      gf: 476
    },
    {
      "time": "03",
      "ddqc": 1400,
      "llddc": 96,
      cn: 300,
      gf: 476
    },
    {
      "time": "04",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 476
    },
    {
      "time": "05",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 476
    },
    {
      "time": "06",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 476
    },
    {
      "time": "07",
      "ddqc": 1200,
      "llddc": 96,
      cn: 300,
      gf: 136
    },
    {
      "time": "08",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 136
    },
    {
      "time": "09",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 204
    },
    {
      "time": "10",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 204
    },
    {
      "time": "11",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 204
    },
    {
      "time": "12",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 136
    },
    {
      "time": "13",
      "ddqc": 1200,
      "llddc": 97,
      cn: 300,
      gf: 136
    },
    {
      "time": "14",
      "ddqc": 1200,
      "llddc": 95,
      cn: 300,
      gf: 136
    },
    {
      "time": "15",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 476
    },
    {
      "time": "16",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 408
    },
    {
      "time": "17",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 68
    },
    {
      "time": "18",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 136
    },
    {
      "time": "19",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 476
    },
    {
      "time": "20",
      "ddqc": 1200,
      "llddc": 89,
      cn: 300,
      gf: 442
    },
    {
      "time": "21",
      "ddqc": 1200,
      "llddc": 95,
      cn: 300,
      gf: 476
    },
    {
      "time": "22",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 136
    },
    {
      "time": "23",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 102
    },
    {
      "time": "24",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 68
    },
    {
      "time": "25",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 544
    },
    {
      "time": "26",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 136
    },
    {
      "time": "27",
      "ddqc": 1200,
      "llddc": 88,
      cn: 300,
      gf: 612
    },
    {
      "time": "28",
      "ddqc": 1200,
      "llddc": 98,
      cn: 300,
      gf: 136
    },
    {
      "time": "29",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 544
    },
    {
      "time": "30",
      "ddqc": 1000,
      "llddc": 80,
      cn: 300,
      gf: 476
    },
    {
      "time": "31",
      "ddqc": 1000,
      "llddc": 82,
      cn: 300,
      gf: 68
    },
  ]
  return [
    {
      data: data.map((item) => [yearMonthDay+item.time, item.llddc]),
      type: 'line',
      smooth: true,
      name: '两轮电动车'
    },
    {
      data: data.map((item) => [yearMonthDay+item.time, item.cn]),
      type: 'line',
      smooth: true,
      name: '储能放电'
    },
    {
      data: data.map((item) => [yearMonthDay+item.time, item.gf]),
      type: 'line',
      smooth: true,
      name: '光伏发电'
    },
    {
      data: data.map((item) => [yearMonthDay+item.time, item.ddqc]),
      type: 'line',
      smooth: true,
      name: '汽车充电'
    }
  ];
};

//区级的柱状图
export const mapQuBar = () => {
  return [
    {
      areaCode: 440303,
      charge: 561,
      energyStorage: 51,
      photovoltaic: 9,
      chargingCabinet: 20
    },
    {
      areaCode: 440304,
      charge: 983,
      energyStorage: 77,
      photovoltaic: 18,
      chargingCabinet: 20
    },
    {
      areaCode: 440305,
      charge: 1187,
      energyStorage: 31,
      photovoltaic: 15,
      chargingCabinet: 20
    },
    {
      areaCode: 440306,
      charge: 1330,
      energyStorage: 67,
      photovoltaic: 32,
      chargingCabinet: 20
    },
    {
      areaCode: 440307,
      charge: 1712,
      energyStorage: 49,
      photovoltaic: 42,
      chargingCabinet: 20
    },
    {
      areaCode: 440308,
      charge: 234,
      energyStorage: 26,
      photovoltaic: 12,
      chargingCabinet: 20
    },
    {
      areaCode: 440309,
      charge: 771,
      energyStorage: 81,
      photovoltaic: 27,
      chargingCabinet: 20
    },
    {
      areaCode: 440310,
      charge: 227,
      energyStorage: 58,
      photovoltaic: 13,
      chargingCabinet: 20
    },
    {
      areaCode: 440311,
      charge: 211,
      energyStorage: 47,
      photovoltaic: 16,
      chargingCabinet: 20
    },
    {
      areaCode: 440343,
      charge: 64,
      energyStorage: 98,
      photovoltaic: 7,
      chargingCabinet: 20
    },
    {
      areaCode: 441521,
      charge: 5,
      energyStorage: 16,
      photovoltaic: 37,
      chargingCabinet: 20
    }
  ];
};
//街道级的柱状图
export const mapJdBar = () => {
  return [
    {
      streetId: 21,
      charge: 14,
      energyStorage: 2,
      photovoltaic: 10,
      chargingCabinet: 8
    },
    {
      streetId: 22,
      charge: 24,
      energyStorage: 2,
      photovoltaic: 1,
      chargingCabinet: 8
    },
    {
      streetId: 23,
      charge: 8,
      energyStorage: 3,
      photovoltaic: 5,
      chargingCabinet: 8
    },
    {
      streetId: 24,
      charge: 11,
      energyStorage: 1,
      photovoltaic: 3,
      chargingCabinet: 8
    },
    {
      streetId: 25,
      charge: 17,
      energyStorage: 8,
      photovoltaic: 6,
      chargingCabinet: 8
    },
    {
      streetId: 26,
      charge: 20,
      energyStorage: 3,
      photovoltaic: 9,
      chargingCabinet: 8
    },
    {
      streetId: 27,
      charge: 15,
      energyStorage: 7,
      photovoltaic: 1,
      chargingCabinet: 8
    },
    {
      streetId: 28,
      charge: 29,
      energyStorage: 8,
      photovoltaic: 13,
      chargingCabinet: 8
    },
    {
      streetId: 52,
      charge: 1,
      energyStorage: 4,
      photovoltaic: 4,
      chargingCabinet: 8
    }
  ];
};
//南山区的撒点数据
export const mapJdStationPoint = () => {
  return [
    {
      stationId: '735',
      stationName: '充电有道航天科技大厦慢充站',
      lng: 113.94853,
      lat: 22.52521,
      operatorId: '398461164',
      isHr: 1,
      stationType: 50,
      quickCount: 0,
      noQuickCount: 90,
      superCount: 0,
      sid: '010478',
      v2GCount: 0
    },
    {
      stationId: '0246',
      stationName: '高新西站',
      lng: 113.936015,
      lat: 22.543873,
      operatorId: '552132052',
      isHr: 1,
      stationType: 50,
      quickCount: 0,
      noQuickCount: 0,
      superCount: 3,
      sid: '009092',
      v2GCount: 0
    },
    {
      stationId: '772',
      stationName: '充电有道四达大厦慢充站',
      lng: 113.93167,
      lat: 22.515621,
      operatorId: '398461164',
      isHr: 1,
      stationType: 50,
      quickCount: 0,
      noQuickCount: 11,
      superCount: 0,
      sid: '009006',
      v2GCount: 0
    },
    {
      stationId: '725',
      stationName: '充电有道紫光信息港慢充站',
      lng: 113.95462,
      lat: 22.561201,
      operatorId: '398461164',
      isHr: 1,
      stationType: 50,
      quickCount: 0,
      noQuickCount: 60,
      superCount: 0,
      sid: '008565',
      v2GCount: 0
    },
    {
      stationId: '765',
      stationName: '充电有道万利达科技大厦储能站',
      lng: 113.94028,
      lat: 22.546255,
      operatorId: '398461164',
      isHr: 1,
      stationType: 200,
      quickCount: 0,
      noQuickCount: 37,
      superCount: 0,
      sid: '008527',
      v2GCount: 0
    },
    {
      stationId: '630',
      stationName: '充电有道万海大厦停车场储能站',
      lng: 113.923,
      lat: 22.49787,
      operatorId: '398461164',
      isHr: 1,
      stationType: 200,
      quickCount: 0,
      noQuickCount: 35,
      superCount: 0,
      sid: '008470',
      v2GCount: 0
    },
    {
      stationId: '809',
      stationName: '充电有道新一代国际公寓储能站',
      lng: 113.93135,
      lat: 22.511007,
      operatorId: '398461164',
      isHr: 1,
      stationType: 200,
      quickCount: 0,
      noQuickCount: 7,
      superCount: 0,
      sid: '008457',
      v2GCount: 0
    },
    {
      stationId: '440307004006',
      stationName: '丰华集祥-深圳特发信息大厦储能站',
      lng: 113.94925,
      lat: 22.550663,
      operatorId: 'MA5ED7CT2',
      isHr: 1,
      stationType: 200,
      quickCount: 27,
      noQuickCount: 0,
      superCount: 0,
      sid: '005759',
      v2GCount: 0
    },
    {
      stationId: '120',
      stationName: '怡化金融大厦交流光伏站',
      lng: 113.942336,
      lat: 22.531837,
      operatorId: 'MA5FGLRY4',
      isHr: 1,
      stationType: 300,
      quickCount: 3,
      noQuickCount: 0,
      superCount: 0,
      sid: '005476',
      v2GCount: 0
    },
    {
      stationId: '87',
      stationName: '三诺大厦交流充光伏站',
      lng: 113.943899,
      lat: 22.527977,
      operatorId: 'MA5FGLRY4',
      isHr: 1,
      stationType: 300,
      quickCount: 0,
      noQuickCount: 20,
      superCount: 0,
      sid: '005474',
      v2GCount: 0
    },
    {
      stationId: '536107916714987520',
      stationName: '中山大学光伏站',
      lng: 113.94332,
      lat: 22.527021,
      operatorId: '326400952',
      isHr: 1,
      stationType: 300,
      quickCount: 21,
      noQuickCount: 4,
      superCount: 0,
      sid: '004896',
      v2GCount: 0
    },
    {
      stationId: '574497300803493888',
      stationName: '赛百诺大厦光伏站',
      lng: 113.936067,
      lat: 22.548526,
      operatorId: '326400952',
      isHr: 1,
      stationType: 300,
      quickCount: 0,
      noQuickCount: 32,
      superCount: 0,
      sid: '004894',
      v2GCount: 0
    },
    {
      stationId: '12',
      stationName: '南山区高新园充换电柜',
      lng: 113.949528,
      lat: 22.544476,
      operatorId: '192417563',
      isHr: 1,
      stationType: 400,
      quickCount: 20,
      noQuickCount: 0,
      superCount: 20,
      sid: '004396',
      v2GCount: 0
    },
    {
      stationId: '000000001042',
      stationName: '德维森电动汽车充换电柜',
      lng: 113.946449,
      lat: 22.534182,
      operatorId: 'MA5DA0053',
      isHr: 1,
      stationType: 400,
      quickCount: 2,
      noQuickCount: 10,
      superCount: 0,
      sid: '004041',
      v2GCount: 0
    },
    {
      stationId: '440202014',
      stationName: '数字技术园充换电柜',
      lng: 113.948948,
      lat: 22.533942,
      operatorId: '061402628',
      isHr: 1,
      stationType: 400,
      quickCount: 4,
      noQuickCount: 10,
      superCount: 0,
      sid: '002618',
      v2GCount: 0
    },
    {
      stationId: 'YSZH-YTDS-0755-0039',
      stationName: '英唐大厦充电站',
      lng: 113.946915,
      lat: 22.535107,
      operatorId: '349861452',
      isHr: 1,
      stationType: 50,
      quickCount: 0,
      noQuickCount: 12,
      superCount: 0,
      sid: '002476',
      v2GCount: 0
    },
    {
      stationId: 'YSZH-YJYY-0755-0054',
      stationName: '深圳软件园一期②充电站（交流）',
      lng: 113.939557,
      lat: 22.544454,
      operatorId: '349861452',
      isHr: 1,
      stationType: 50,
      quickCount: 0,
      noQuickCount: 63,
      superCount: 0,
      sid: '002462',
      v2GCount: 0
    },
    {
      stationId: 'YSZH-WDCX-0755-0038',
      stationName: '武大产学研基地充电站',
      lng: 113.944756,
      lat: 22.530485,
      operatorId: '349861452',
      isHr: 1,
      stationType: 50,
      quickCount: 0,
      noQuickCount: 18,
      superCount: 0,
      sid: '002458',
      v2GCount: 0
    },
    {
      stationId: 'YSZH-RJYY-0755-0043',
      stationName: '深圳软件园一期①充电站（直流）',
      lng: 113.939034,
      lat: 22.544621,
      operatorId: '349861452',
      isHr: 1,
      stationType: 50,
      quickCount: 2,
      noQuickCount: 0,
      superCount: 0,
      sid: '002447',
      v2GCount: 0
    },
    {
      stationId: 'YSZH-SZDX-0755-0045',
      stationName: '深圳大学充电站',
      lng: 113.942762,
      lat: 22.529076,
      operatorId: '349861452',
      isHr: 1,
      stationType: 50,
      quickCount: 6,
      noQuickCount: 2,
      superCount: 0,
      sid: '002446',
      v2GCount: 0
    },
    {
      stationId: '440202017',
      stationName: '南山软件大厦充电站',
      lng: 113.940452,
      lat: 22.549209,
      operatorId: '061402628',
      isHr: 1,
      stationType: 50,
      quickCount: 3,
      noQuickCount: 21,
      superCount: 16,
      sid: '001817',
      v2GCount: 0
    },
    {
      stationId: '440202011',
      stationName: '联想大厦停车场充电站',
      lng: 113.947683,
      lat: 22.538778,
      operatorId: '061402628',
      isHr: 1,
      stationType: 50,
      quickCount: 12,
      noQuickCount: 0,
      superCount: 8,
      sid: '001802',
      v2GCount: 0
    },
    {
      stationId: '866904192231677952',
      stationName: '致联航天科技充电站',
      lng: 113.954124,
      lat: 22.53712,
      operatorId: 'MA5DM667X',
      isHr: 1,
      stationType: 50,
      quickCount: 10,
      noQuickCount: 5,
      superCount: 0,
      sid: '000257',
      v2GCount: 0
    }
  ];
};
