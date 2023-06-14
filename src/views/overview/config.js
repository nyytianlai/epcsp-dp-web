import ztsyl from '@/views/charging-station/images/ztsyl.png';
import ncd from './images/ncd.png';
import nfdl from './images/nfdl.png';
import gfzzs from './images/gfzzs.png';
import cnzzs from './images/cnzzs.png';
import sszs from './images/sszs.png';
// import aotexun from './images/aotexun.png';
// import baoqing from './images/baoqing.png';
// import honglixi from './images/honglixi.png';
// import telaidian from './images/telaidian.png';
// import lianhuaxi from './images/lianhuaxi.png';
// import minle from './images/minle.png';
import { simplifyNum } from '@/utils/index';
import dayjs from 'dayjs';
import { deepClone } from '@/utils';
export const pageNumFun = (data = {}) => {
  return [
    {
      name: '年累计生产绿电',
      // num: data?.cumulativeCharge,
      num: 4.29,
      unit: data?.cumulativeChargeUnit || '亿kWh'
    },
    {
      name: '年累计CO²减排量',
      // num: data?.cumChargeCount,
      num: 195.42,
      unit: data?.cumChargeCountUnit || '万吨'
    },
    {
      name: '本年累计削峰电量',
      // num: data?.cumChargeTime,
      num: 4.58,
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
      num: 229,
      unit: '个',
      name: '光伏站总数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: nfdl,
      num: 4.29,
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
      num: 23.23,
      unit: '万个',
      name: '设施总数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: ncd,
      num: 1.25,
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
      // img: minle,
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
      // img: lianhuaxi,
      type: '光伏',
      name: '莲花西地铁光伏站'
    },
    {
      id: 3,
      // img: honglixi,
      type: '5G',
      name: '红荔西5G示范站'
    },
    {
      id: 4,
      // img: telaidian,
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
      // img: aotexun,
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
      // img: baoqing,
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
const carbon = [
  {
    date: '2023/5/10',
    electricVehicleNum: '8355',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1485',
    photovoltaic: '1366',
    emissionReduction: '11874'
  },
  {
    date: '2023/5/11',
    electricVehicleNum: '8195',
    twoWheeledElectricCarNum: '656',
    storedEnergy: '1425',
    photovoltaic: '1065',
    emissionReduction: '11341'
  },
  {
    date: '2023/5/12',
    electricVehicleNum: '8100',
    twoWheeledElectricCarNum: '794',
    storedEnergy: '1455',
    photovoltaic: '1186',
    emissionReduction: '11536'
  },
  {
    date: '2023/5/13',
    electricVehicleNum: '6922',
    twoWheeledElectricCarNum: '617',
    storedEnergy: '1470',
    photovoltaic: '1282',
    emissionReduction: '10292'
  },
  {
    date: '2023/5/14',
    electricVehicleNum: '6763',
    twoWheeledElectricCarNum: '643',
    storedEnergy: '1485',
    photovoltaic: '1410',
    emissionReduction: '10301'
  },
  {
    date: '2023/5/15',
    electricVehicleNum: '8116',
    twoWheeledElectricCarNum: '649',
    storedEnergy: '1545',
    photovoltaic: '203',
    emissionReduction: '10513'
  },
  {
    date: '2023/5/16',
    electricVehicleNum: '7893',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1560',
    photovoltaic: '139',
    emissionReduction: '10260'
  },
  {
    date: '2023/5/17',
    electricVehicleNum: '7718',
    twoWheeledElectricCarNum: '617',
    storedEnergy: '1455',
    photovoltaic: '327',
    emissionReduction: '10117'
  },
  {
    date: '2023/5/18',
    electricVehicleNum: '8116',
    twoWheeledElectricCarNum: '649',
    storedEnergy: '1545',
    photovoltaic: '203',
    emissionReduction: '10513'
  },
  {
    date: '2023/5/19',
    electricVehicleNum: '7893',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1560',
    photovoltaic: '139',
    emissionReduction: '10260'
  },
  {
    date: '2023/5/20',
    electricVehicleNum: '6493',
    twoWheeledElectricCarNum: '900',
    storedEnergy: '1515',
    photovoltaic: '1366',
    emissionReduction: '10274'
  },
  {
    date: '2023/5/21',
    electricVehicleNum: '6556',
    twoWheeledElectricCarNum: '833',
    storedEnergy: '1485',
    photovoltaic: '1333',
    emissionReduction: '10207'
  },
  {
    date: '2023/5/22',
    electricVehicleNum: '8187',
    twoWheeledElectricCarNum: '794',
    storedEnergy: '1425',
    photovoltaic: '1366',
    emissionReduction: '11773'
  },
  {
    date: '2023/5/23',
    electricVehicleNum: '7798',
    twoWheeledElectricCarNum: '624',
    storedEnergy: '1515',
    photovoltaic: '1263',
    emissionReduction: '11199'
  },
  {
    date: '2023/5/24',
    electricVehicleNum: '8355',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1485',
    photovoltaic: '1366',
    emissionReduction: '11874'
  },
  {
    date: '2023/5/25',
    electricVehicleNum: '8195',
    twoWheeledElectricCarNum: '656',
    storedEnergy: '1425',
    photovoltaic: '1065',
    emissionReduction: '11341'
  },
  {
    date: '2023/5/26',
    electricVehicleNum: '8100',
    twoWheeledElectricCarNum: '794',
    storedEnergy: '1455',
    photovoltaic: '1186',
    emissionReduction: '11536'
  },
  {
    date: '2023/5/27',
    electricVehicleNum: '6922',
    twoWheeledElectricCarNum: '617',
    storedEnergy: '1470',
    photovoltaic: '1282',
    emissionReduction: '10292'
  },
  {
    date: '2023/5/28',
    electricVehicleNum: '6763',
    twoWheeledElectricCarNum: '643',
    storedEnergy: '1485',
    photovoltaic: '1410',
    emissionReduction: '10301'
  },
  {
    date: '2023/5/29',
    electricVehicleNum: '8116',
    twoWheeledElectricCarNum: '649',
    storedEnergy: '1545',
    photovoltaic: '203',
    emissionReduction: '10513'
  },
  {
    date: '2023/5/30',
    electricVehicleNum: '7893',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1560',
    photovoltaic: '139',
    emissionReduction: '10260'
  },
  {
    date: '2023/5/31',
    electricVehicleNum: '7718',
    twoWheeledElectricCarNum: '617',
    storedEnergy: '1455',
    photovoltaic: '327',
    emissionReduction: '10117'
  },
  {
    date: '2023/6/1',
    electricVehicleNum: '7806',
    twoWheeledElectricCarNum: '741',
    storedEnergy: '1440',
    photovoltaic: '287',
    emissionReduction: '10274'
  },
  {
    date: '2023/6/2',
    electricVehicleNum: '7949',
    twoWheeledElectricCarNum: '771',
    storedEnergy: '1530',
    photovoltaic: '390',
    emissionReduction: '10640'
  },
  {
    date: '2023/6/3',
    electricVehicleNum: '7089',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1410',
    photovoltaic: '134',
    emissionReduction: '9302'
  },
  {
    date: '2023/6/4',
    electricVehicleNum: '6851',
    twoWheeledElectricCarNum: '624',
    storedEnergy: '1485',
    photovoltaic: '1171',
    emissionReduction: '10131'
  },
  {
    date: '2023/6/5',
    electricVehicleNum: '8355',
    twoWheeledElectricCarNum: '617',
    storedEnergy: '1545',
    photovoltaic: '195',
    emissionReduction: '10712'
  },
  {
    date: '2023/6/6',
    electricVehicleNum: '8355',
    twoWheeledElectricCarNum: '611',
    storedEnergy: '1515',
    photovoltaic: '390',
    emissionReduction: '10871'
  },
  {
    date: '2023/6/7',
    electricVehicleNum: '8195',
    twoWheeledElectricCarNum: '649',
    storedEnergy: '1590',
    photovoltaic: '1366',
    emissionReduction: '11801'
  },
  {
    date: '2023/6/8',
    electricVehicleNum: '7543',
    twoWheeledElectricCarNum: '736',
    storedEnergy: '1425',
    photovoltaic: '1269',
    emissionReduction: '10973'
  },
  {
    date: '2023/6/9',
    electricVehicleNum: '7670',
    twoWheeledElectricCarNum: '794',
    storedEnergy: '1455',
    photovoltaic: '1366',
    emissionReduction: '11285'
  },
  {
    date: '2023/6/10',
    electricVehicleNum: '6843',
    twoWheeledElectricCarNum: '611',
    storedEnergy: '1440',
    photovoltaic: '390',
    emissionReduction: '9284'
  },
  {
    date: '2023/6/11',
    electricVehicleNum: '7320',
    twoWheeledElectricCarNum: '598',
    storedEnergy: '1530',
    photovoltaic: '293',
    emissionReduction: '9741'
  },
  {
    date: '2023/6/12',
    electricVehicleNum: '7798',
    twoWheeledElectricCarNum: '630',
    storedEnergy: '1560',
    photovoltaic: '195',
    emissionReduction: '10183'
  },
  {
    date: '2023/6/13',
    electricVehicleNum: '7718',
    twoWheeledElectricCarNum: '656',
    storedEnergy: '1575',
    photovoltaic: '1562',
    emissionReduction: '11510'
  },
  {
    date: '2023/6/14',
    electricVehicleNum: '7638',
    twoWheeledElectricCarNum: '643',
    storedEnergy: '1530',
    photovoltaic: '390',
    emissionReduction: '10202'
  },
  {
    date: '2023/6/15',
    electricVehicleNum: '8148',
    twoWheeledElectricCarNum: '742',
    storedEnergy: '1575',
    photovoltaic: '1757',
    emissionReduction: '12222'
  },
  {
    date: '2023/6/16',
    electricVehicleNum: '7861',
    twoWheeledElectricCarNum: '741',
    storedEnergy: '1470',
    photovoltaic: '390',
    emissionReduction: '10462'
  },
  {
    date: '2023/6/17',
    electricVehicleNum: '7559',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1575',
    photovoltaic: '1562',
    emissionReduction: '11364'
  },
  {
    date: '2023/6/18',
    electricVehicleNum: '7161',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1575',
    photovoltaic: '1366',
    emissionReduction: '10771'
  },
  {
    date: '2023/6/19',
    electricVehicleNum: '7638',
    twoWheeledElectricCarNum: '656',
    storedEnergy: '1545',
    photovoltaic: '195',
    emissionReduction: '10034'
  },
  {
    date: '2023/6/20',
    electricVehicleNum: '8068',
    twoWheeledElectricCarNum: '900',
    storedEnergy: '1515',
    photovoltaic: '1366',
    emissionReduction: '11850'
  },
  {
    date: '2023/6/21',
    electricVehicleNum: '7845',
    twoWheeledElectricCarNum: '833',
    storedEnergy: '1485',
    photovoltaic: '1366',
    emissionReduction: '11529'
  },
  {
    date: '2023/6/22',
    electricVehicleNum: '8195',
    twoWheeledElectricCarNum: '794',
    storedEnergy: '1425',
    photovoltaic: '1366',
    emissionReduction: '11781'
  },
  {
    date: '2023/6/23',
    electricVehicleNum: '7798',
    twoWheeledElectricCarNum: '624',
    storedEnergy: '1515',
    photovoltaic: '1366',
    emissionReduction: '11303'
  },
  {
    date: '2023/6/24',
    electricVehicleNum: '6763',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1485',
    photovoltaic: '1366',
    emissionReduction: '10283'
  },
  {
    date: '2023/6/25',
    electricVehicleNum: '6286',
    twoWheeledElectricCarNum: '656',
    storedEnergy: '1425',
    photovoltaic: '1366',
    emissionReduction: '9733'
  },
  {
    date: '2023/6/26',
    electricVehicleNum: '7782',
    twoWheeledElectricCarNum: '794',
    storedEnergy: '1455',
    photovoltaic: '390',
    emissionReduction: '10421'
  },
  {
    date: '2023/6/27',
    electricVehicleNum: '7718',
    twoWheeledElectricCarNum: '617',
    storedEnergy: '1470',
    photovoltaic: '390',
    emissionReduction: '10196'
  },
  {
    date: '2023/6/28',
    electricVehicleNum: '7559',
    twoWheeledElectricCarNum: '643',
    storedEnergy: '1485',
    photovoltaic: '586',
    emissionReduction: '10272'
  },
  {
    date: '2023/6/29',
    electricVehicleNum: '8116',
    twoWheeledElectricCarNum: '649',
    storedEnergy: '1545',
    photovoltaic: '586',
    emissionReduction: '10896'
  },
  {
    date: '2023/6/30',
    electricVehicleNum: '8355',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1560',
    photovoltaic: '586',
    emissionReduction: '11169'
  },
  {
    date: '2023/7/1',
    electricVehicleNum: '7002',
    twoWheeledElectricCarNum: '617',
    storedEnergy: '1455',
    photovoltaic: '390',
    emissionReduction: '9465'
  },
  {
    date: '2023/7/2',
    electricVehicleNum: '6779',
    twoWheeledElectricCarNum: '741',
    storedEnergy: '1440',
    photovoltaic: '390',
    emissionReduction: '9350'
  },
  {
    date: '2023/7/3',
    electricVehicleNum: '8148',
    twoWheeledElectricCarNum: '771',
    storedEnergy: '1530',
    photovoltaic: '390',
    emissionReduction: '10839'
  },
  {
    date: '2023/7/4',
    electricVehicleNum: '8355',
    twoWheeledElectricCarNum: '668',
    storedEnergy: '1410',
    photovoltaic: '1366',
    emissionReduction: '11799'
  },
  {
    date: '2023/7/5',
    electricVehicleNum: '7798',
    twoWheeledElectricCarNum: '624',
    storedEnergy: '1485',
    photovoltaic: '1171',
    emissionReduction: '11078'
  },
  {
    date: '2023/7/6',
    electricVehicleNum: '8355',
    twoWheeledElectricCarNum: '617',
    storedEnergy: '1545',
    photovoltaic: '195',
    emissionReduction: '10712'
  },
  {
    date: '2023/7/7',
    electricVehicleNum: '8355',
    twoWheeledElectricCarNum: '611',
    storedEnergy: '1515',
    photovoltaic: '390',
    emissionReduction: '10871'
  },
  {
    date: '2023/7/8',
    electricVehicleNum: '6604',
    twoWheeledElectricCarNum: '649',
    storedEnergy: '1590',
    photovoltaic: '1366',
    emissionReduction: '10210'
  },
  {
    date: '2023/7/9',
    electricVehicleNum: '6906',
    twoWheeledElectricCarNum: '736',
    storedEnergy: '1425',
    photovoltaic: '1269',
    emissionReduction: '10337'
  },
  {
    date: '2023/7/10',
    electricVehicleNum: '7670',
    twoWheeledElectricCarNum: '794',
    storedEnergy: '1455',
    photovoltaic: '1366',
    emissionReduction: '11285'
  },
  {
    date: '2023/7/11',
    electricVehicleNum: '7638',
    twoWheeledElectricCarNum: '611',
    storedEnergy: '1440',
    photovoltaic: '390',
    emissionReduction: '10080'
  },
  {
    date: '2023/7/12',
    electricVehicleNum: '8116',
    twoWheeledElectricCarNum: '598',
    storedEnergy: '1530',
    photovoltaic: '293',
    emissionReduction: '10537'
  },
  {
    date: '2023/7/13',
    electricVehicleNum: '7798',
    twoWheeledElectricCarNum: '630',
    storedEnergy: '1560',
    photovoltaic: '195',
    emissionReduction: '10183'
  },
  {
    date: '2023/7/14',
    electricVehicleNum: '7718',
    twoWheeledElectricCarNum: '656',
    storedEnergy: '1575',
    photovoltaic: '1562',
    emissionReduction: '11510'
  },
  {
    date: '2023/7/15',
    electricVehicleNum: '6357',
    twoWheeledElectricCarNum: '643',
    storedEnergy: '1530',
    photovoltaic: '390',
    emissionReduction: '8921'
  }
];
export const lineCarbonDataFun = (data = [], xaxis = []) => {
  const yearMonthDay = dayjs().format('YYYY/M/D');
  console.log('carbon', carbon);
  let list = deepClone(carbon);
  const index = carbon.findIndex((i) => i.date.trim() == yearMonthDay);
  list.splice(index + 1);
  return [
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        item.twoWheeledElectricCarNum.trim()
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: '充换电柜'
    },
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        item.electricVehicleNum.trim()
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: '电动汽车'
    },
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        item.storedEnergy.trim()
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: '储能'
    },
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        item.photovoltaic.trim()
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: '光伏'
    },
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        Number(item.emissionReduction.trim())
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: '合计'
    }
  ];
};
export const lineCarbonOptionFun = {
  grid: {
    top: '15%',
    left: '2%',
    right: '5%',
    bottom: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.8)'
      },
      crossStyle: {
        color: '#fff'
      }
    }
  },
  legend: {
    data: [],
    textStyle: {
      color: '#fff'
    },
    x: '12%'
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      show: false
    },
    axisLabel: {
      color: '#fff'
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  yAxis: [
    {
      type: 'value',
      name: '单位(吨)',
      nameTextStyle: {
        color: '#fff'
      },
      max: 15,
      axisLabel: {
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed'
        }
      }
    }
  ],
  series: []
};
const Electric = [
  {
    date: '2023/5/10',
    electricVehicleNum: '1050',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '297 ',
    photovoltaic: '214'
  },
  {
    date: '2023/5/11',
    electricVehicleNum: '1030 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '285 ',
    photovoltaic: '167'
  },
  {
    date: '2023/5/12',
    electricVehicleNum: '1018 ',
    twoWheeledElectricCarNum: '100 ',
    storedEnergy: '291 ',
    photovoltaic: '186'
  },
  {
    date: '2023/5/13',
    electricVehicleNum: '870 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '294 ',
    photovoltaic: '201'
  },
  {
    date: '2023/5/14',
    electricVehicleNum: '850 ',
    twoWheeledElectricCarNum: '81 ',
    storedEnergy: '297 ',
    photovoltaic: '221'
  },
  {
    date: '2023/5/15',
    electricVehicleNum: '1020 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '309 ',
    photovoltaic: '32'
  },
  {
    date: '2023/5/16',
    electricVehicleNum: '992 ',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '312 ',
    photovoltaic: '22'
  },
  {
    date: '2023/5/17',
    electricVehicleNum: '970 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '291 ',
    photovoltaic: '51'
  },
  {
    date: '2023/5/18',
    electricVehicleNum: '1020 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '309 ',
    photovoltaic: '32'
  },
  {
    date: '2023/5/19',
    electricVehicleNum: '992 ',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '312 ',
    photovoltaic: '22'
  },
  {
    date: '2023/5/20',
    electricVehicleNum: '816 ',
    twoWheeledElectricCarNum: '113 ',
    storedEnergy: '303 ',
    photovoltaic: '214'
  },
  {
    date: '2023/5/21',
    electricVehicleNum: '824 ',
    twoWheeledElectricCarNum: '105 ',
    storedEnergy: '297 ',
    photovoltaic: '209'
  },
  {
    date: '2023/5/22',
    electricVehicleNum: '1029 ',
    twoWheeledElectricCarNum: '100 ',
    storedEnergy: '285 ',
    photovoltaic: '214'
  },
  {
    date: '2023/5/23',
    electricVehicleNum: '980 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '303 ',
    photovoltaic: '198'
  },
  {
    date: '2023/5/24',
    electricVehicleNum: '1050 ',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '297 ',
    photovoltaic: '214'
  },
  {
    date: '2023/5/25',
    electricVehicleNum: '1030 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '285 ',
    photovoltaic: '167'
  },
  {
    date: '2023/5/26',
    electricVehicleNum: '1018 ',
    twoWheeledElectricCarNum: '100 ',
    storedEnergy: '291 ',
    photovoltaic: '186'
  },
  {
    date: '2023/5/27',
    electricVehicleNum: '870 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '294 ',
    photovoltaic: '201'
  },
  {
    date: '2023/5/28',
    electricVehicleNum: '850 ',
    twoWheeledElectricCarNum: '81 ',
    storedEnergy: '297 ',
    photovoltaic: '221'
  },
  {
    date: '2023/5/29',
    electricVehicleNum: '1020 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '309 ',
    photovoltaic: '32'
  },
  {
    date: '2023/5/30',
    electricVehicleNum: '992 ',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '312 ',
    photovoltaic: '22'
  },
  {
    date: '2023/5/31',
    electricVehicleNum: '970 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '291 ',
    photovoltaic: '51'
  },
  {
    date: '2023/6/1',
    electricVehicleNum: '981 ',
    twoWheeledElectricCarNum: '93 ',
    storedEnergy: '288 ',
    photovoltaic: '45'
  },
  {
    date: '2023/6/2',
    electricVehicleNum: '999 ',
    twoWheeledElectricCarNum: '97 ',
    storedEnergy: '306 ',
    photovoltaic: '61'
  },
  {
    date: '2023/6/3',
    electricVehicleNum: '891 ',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '282 ',
    photovoltaic: '21'
  },
  {
    date: '2023/6/4',
    electricVehicleNum: '861 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '297 ',
    photovoltaic: '184'
  },
  {
    date: '2023/6/5',
    electricVehicleNum: '1050 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '309 ',
    photovoltaic: '31'
  },
  {
    date: '2023/6/6',
    electricVehicleNum: '1050 ',
    twoWheeledElectricCarNum: '77 ',
    storedEnergy: '303 ',
    photovoltaic: '61'
  },
  {
    date: '2023/6/7',
    electricVehicleNum: '1030 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '318 ',
    photovoltaic: '214'
  },
  {
    date: '2023/6/8',
    electricVehicleNum: '948 ',
    twoWheeledElectricCarNum: '93 ',
    storedEnergy: '285 ',
    photovoltaic: '199'
  },
  {
    date: '2023/6/9',
    electricVehicleNum: '964 ',
    twoWheeledElectricCarNum: '100 ',
    storedEnergy: '291 ',
    photovoltaic: '214'
  },
  {
    date: '2023/6/10',
    electricVehicleNum: '860 ',
    twoWheeledElectricCarNum: '77 ',
    storedEnergy: '288 ',
    photovoltaic: '61'
  },
  {
    date: '2023/6/11',
    electricVehicleNum: '920 ',
    twoWheeledElectricCarNum: '75 ',
    storedEnergy: '306 ',
    photovoltaic: '46'
  },
  {
    date: '2023/6/12',
    electricVehicleNum: '980 ',
    twoWheeledElectricCarNum: '79 ',
    storedEnergy: '312 ',
    photovoltaic: '31'
  },
  {
    date: '2023/6/13',
    electricVehicleNum: '970 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '315 ',
    photovoltaic: '245'
  },
  {
    date: '2023/6/14',
    electricVehicleNum: '960 ',
    twoWheeledElectricCarNum: '81 ',
    storedEnergy: '306 ',
    photovoltaic: '61'
  },
  {
    date: '2023/6/15',
    electricVehicleNum: '1024 ',
    twoWheeledElectricCarNum: '93 ',
    storedEnergy: '315 ',
    photovoltaic: '275'
  },
  {
    date: '2023/6/16',
    electricVehicleNum: '988 ',
    twoWheeledElectricCarNum: '93 ',
    storedEnergy: '294 ',
    photovoltaic: '61'
  },
  {
    date: '2023/6/17',
    electricVehicleNum: '950 ',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '315 ',
    photovoltaic: '245'
  },
  {
    date: '2023/6/18',
    electricVehicleNum: '900 ',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '315 ',
    photovoltaic: '214'
  },
  {
    date: '2023/6/19',
    electricVehicleNum: '960 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '309 ',
    photovoltaic: '31'
  },
  {
    date: '2023/6/20',
    electricVehicleNum: '1014 ',
    twoWheeledElectricCarNum: '113 ',
    storedEnergy: '303 ',
    photovoltaic: '214'
  },
  {
    date: '2023/6/21',
    electricVehicleNum: '986 ',
    twoWheeledElectricCarNum: '105 ',
    storedEnergy: '297 ',
    photovoltaic: '214'
  },
  {
    date: '2023/6/22',
    electricVehicleNum: '1030 ',
    twoWheeledElectricCarNum: '100 ',
    storedEnergy: '285 ',
    photovoltaic: '214'
  },
  {
    date: '2023/6/23',
    electricVehicleNum: '980 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '303 ',
    photovoltaic: '214'
  },
  {
    date: '2023/6/24',
    electricVehicleNum: '850 ',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '297 ',
    photovoltaic: '214'
  },
  {
    date: '2023/6/25',
    electricVehicleNum: '790 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '285 ',
    photovoltaic: '214'
  },
  {
    date: '2023/6/26',
    electricVehicleNum: '978 ',
    twoWheeledElectricCarNum: '100 ',
    storedEnergy: '291 ',
    photovoltaic: '61'
  },
  {
    date: '2023/6/27',
    electricVehicleNum: '970 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '294 ',
    photovoltaic: '61'
  },
  {
    date: '2023/6/28',
    electricVehicleNum: '950 ',
    twoWheeledElectricCarNum: '81 ',
    storedEnergy: '297 ',
    photovoltaic: '92'
  },
  {
    date: '2023/6/29',
    electricVehicleNum: '1020 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '309 ',
    photovoltaic: '92'
  },
  {
    date: '2023/6/30',
    electricVehicleNum: '1050 ',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '312 ',
    photovoltaic: '92'
  },
  {
    date: '2023/7/1',
    electricVehicleNum: '880 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '291 ',
    photovoltaic: '61'
  },
  {
    date: '2023/7/2',
    electricVehicleNum: '852 ',
    twoWheeledElectricCarNum: '93 ',
    storedEnergy: '288 ',
    photovoltaic: '61'
  },
  {
    date: '2023/7/3',
    electricVehicleNum: '1024 ',
    twoWheeledElectricCarNum: '97 ',
    storedEnergy: '306 ',
    photovoltaic: '61'
  },
  {
    date: '2023/7/4',
    electricVehicleNum: '1050 ',
    twoWheeledElectricCarNum: '84 ',
    storedEnergy: '282 ',
    photovoltaic: '214'
  },
  {
    date: '2023/7/5',
    electricVehicleNum: '980 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '297 ',
    photovoltaic: '184'
  },
  {
    date: '2023/7/6',
    electricVehicleNum: '1050 ',
    twoWheeledElectricCarNum: '78 ',
    storedEnergy: '309 ',
    photovoltaic: '31'
  },
  {
    date: '2023/7/7',
    electricVehicleNum: '1050 ',
    twoWheeledElectricCarNum: '77 ',
    storedEnergy: '303 ',
    photovoltaic: '61'
  },
  {
    date: '2023/7/8',
    electricVehicleNum: '830 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '318 ',
    photovoltaic: '214'
  },
  {
    date: '2023/7/9',
    electricVehicleNum: '868 ',
    twoWheeledElectricCarNum: '93 ',
    storedEnergy: '285 ',
    photovoltaic: '199'
  },
  {
    date: '2023/7/10',
    electricVehicleNum: '964 ',
    twoWheeledElectricCarNum: '100 ',
    storedEnergy: '291 ',
    photovoltaic: '214'
  },
  {
    date: '2023/7/11',
    electricVehicleNum: '960 ',
    twoWheeledElectricCarNum: '77 ',
    storedEnergy: '288 ',
    photovoltaic: '61'
  },
  {
    date: '2023/7/12',
    electricVehicleNum: '1020 ',
    twoWheeledElectricCarNum: '75 ',
    storedEnergy: '306 ',
    photovoltaic: '46'
  },
  {
    date: '2023/7/13',
    electricVehicleNum: '980 ',
    twoWheeledElectricCarNum: '79 ',
    storedEnergy: '312 ',
    photovoltaic: '31'
  },
  {
    date: '2023/7/14',
    electricVehicleNum: '970 ',
    twoWheeledElectricCarNum: '82 ',
    storedEnergy: '315 ',
    photovoltaic: '245'
  },
  {
    date: '2023/7/15',
    electricVehicleNum: '799 ',
    twoWheeledElectricCarNum: '81 ',
    storedEnergy: '306 ',
    photovoltaic: '61'
  }
];
export const lineElectricDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY/M/D');
  let list = deepClone(Electric);
  const index = Electric.findIndex((i) => i.date.trim() == yearMonthDay);
  list.splice(index + 1);

  return [
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        item.twoWheeledElectricCarNum.trim()
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: '电动车充换电'
    },
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        item.storedEnergy.trim()
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: '储能放电'
    },
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        item.photovoltaic.trim()
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: '光伏发电'
    },
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        item.electricVehicleNum.trim()
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
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
