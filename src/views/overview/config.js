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
import { simplifyNum } from '@/utils/index'
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
      "createdBy": null,
      "creationTime": null,
      "lastUpdatedBy": null,
      "lastUpdateTime": null,
      "hrId": 2,
      "operatorId": "398461164",
      "stationId": "118",
      "stationName": "比亚迪民乐P+R电动汽车充电站",
      "stationType": "全球最大",
      "stationPic": "http://10.226.0.231:9000/hr-station-pic/118.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20230609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230609T021313Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=3c0d97235d390bc5b31b2530dc76734caf69f5449245985ad8dd30b5fdf7ec86",
      "path3dt": null,
      "sort": 2

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
      "createdBy": null,
      "creationTime": null,
      "lastUpdatedBy": null,
      "lastUpdateTime": null,
      "hrId": 4,
      "operatorId": "395815801",
      "stationId": "4403070124",
      "stationName": "深圳国际低碳城光储充放一体化示范站",
      "stationType": "V2G",
      "stationPic": "http://10.226.0.231:9000/hr-station-pic/4403070124.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20230609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230609T021313Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=0057756d8a74cb4fc1449884727f85b7aeb7fc5cb7c24c46313ea833bb199a26",
      "path3dt": null,
      "sort": 4

    },
    {
      id: 5,
      img: aotexun,
      type: '光储充放',
      name: '奥特迅电力大厦充电站',

      "createdBy": null,
      "creationTime": null,
      "lastUpdatedBy": null,
      "lastUpdateTime": null,
      "hrId": 1,
      "operatorId": "061402628",
      "stationId": "440202003",
      "stationName": "奥特迅电力大厦后广场充电站",
      "stationType": "光储充放",
      "stationPic": "http://10.226.0.231:9000/hr-station-pic/440202003.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20230609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230609T021313Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=d20cb7f662543ea11cf511abc6d3d20b9c9689ebb215b22cceee7179790712d4",
      "path3dt": null,
      "sort": 1

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
    },
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
    },
  ];
};