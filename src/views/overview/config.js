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
import { scale } from '@sutpc/config';

import i18n from '@/locales/i18n';
const { t } = i18n.global;
const configHead = `overview.config`;

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '年累计生产绿电',
      i18nKey: 'nljscld',
      displayName: t(`${configHead}.pageNumFun.nljscld`),
      // num: data?.cumulativeCharge,
      num: 2.13,
      // '亿kWh'
      unit: data?.cumulativeChargeUnit || t(`${configHead}.pageNumFun.bilKWh`),
      unitI18nKey: 'bilKWh',
      displayUnit: data?.cumulativeChargeUnit || t(`${configHead}.pageNumFun.bilKWh`)
    },
    {
      name: '年累计CO²减排量',
      // num: data?.cumChargeCount,
      i18nKey: 'nljco2jpl',
      displayName: t(`${configHead}.pageNumFun.nljco2jpl`),
      num: 195.42,
      // '万吨'
      unit: data?.cumChargeCountUnit || t(`${configHead}.pageNumFun.wanT`),
      unitI18nKey: 'wanT',
      displayUnit: data?.cumChargeCountUnit || t(`${configHead}.pageNumFun.wanT`)
    },
    {
      name: '本年累计削峰电量',
      // num: data?.cumChargeTime,
      i18nKey: 'bnljxfdl',
      displayName: t(`${configHead}.pageNumFun.bnljxfdl`),
      num: 4.58,
      // '亿kWh'
      unit: data?.cumChargeTimeUnit || t(`${configHead}.pageNumFun.bilKWh`),
      unitI18nKey: 'bilKWh',
      displayUnit: data?.cumChargeTimeUnit || t(`${configHead}.pageNumFun.bilKWh`)
    }
  ];
};

export const chargingStationsFun = (data = {}) => {
  return [
    {
      img: ztsyl,
      num: data?.stationCount,
      unit: '/个',
      name: '充电站',
      i18nKey: 'cdzhangs',
      // displayName: t(`${configHead}.chargingStationsFun.cdzhangs`),
      unitI18nKey: 'unitGe',
      displayUnit: t(`${configHead}.chargingStationsFun.unitGe`),
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: ztsyl,
      num: data?.equipmentCount,
      unit: '/个',
      name: '充电桩',
      i18nKey: 'cdzhangs',
      // displayName: t(`${configHead}.chargingStationsFun.cdzhangs`),
      unitI18nKey: 'unitGe',
      displayUnit: t(`${configHead}.chargingStationsFun.unitGe`),
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: ztsyl,
      num: data?.superChargeStationNum,
      unit: '/个',
      name: '超充站',
      i18nKey: 'cdzhangs',
      // displayName: t(`${configHead}.chargingStationsFun.cdzhangs`),
      unitI18nKey: 'unitGe',
      displayUnit: t(`${configHead}.chargingStationsFun.unitGe`),
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: ztsyl,
      num: data?.v2gStationNum,
      unit: '/个',
      name: 'V2G站',
      i18nKey: 'cdzhangs',
      // displayName: t(`${configHead}.chargingStationsFun.cdzhangs`),
      unitI18nKey: 'unitGe',
      displayUnit: t(`${configHead}.chargingStationsFun.unitGe`),
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: ztsyl,
      num: data?.euStandardStationNum,
      unit: '/个',
      name: '欧标站',
      i18nKey: 'cdzhangs',
      // displayName: t(`${configHead}.chargingStationsFun.cdzhangs`),
      unitI18nKey: 'unitGe',
      displayUnit: t(`${configHead}.chargingStationsFun.unitGe`),
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: cnzzs,
      num: 5100,
      unit: '/个',
      name: '5G储能基站',
      i18nKey: 'cdzhangs',
      // displayName: t(`${configHead}.chargingStationsFun.cdzhangs`),
      unitI18nKey: 'unitGe',
      displayUnit: t(`${configHead}.chargingStationsFun.unitGe`),
      classStyleType: 'leftRightStyleGreen'
    }
  ];
};

// export const chargingStationsFun = (data = {}) => {
//   return [
//     {
//       img: ztsyl,
//       num: data?.totalChargingStations,
//       unit: '/个',
//       name: '充电站总数',
//       i18nKey: 'cdzhangs',
//       displayName: t(`${configHead}.chargingStationsFun.cdzhangs`),
//       unitI18nKey: 'unitGe',
//       displayUnit: t(`${configHead}.chargingStationsFun.unitGe`),
//       classStyleType: 'leftRightStyleGreen'
//     },
//     {
//       img: ncd,
//       num: data?.yearTotalCharge,
//       unit: '/亿KWh',
//       name: '年充电量',
//       i18nKey: 'ncdl',
//       displayName: t(`${configHead}.chargingStationsFun.ncdl`),
//       unitI18nKey: 'unitBilKWh',
//       displayUnit: t(`${configHead}.chargingStationsFun.unitBilKWh`),
//       classStyleType: 'leftRightStyleYellow5858'
//     }
//   ];
// };

export const energyStationFun = (data = {}) => {
  return [
    {
      img: cnzzs,
      num: data?.energyStorageStationNum,
      unit: '/个',
      name: '储能站总数',
      i18nKey: 'cnzzs',
      displayName: t(`${configHead}.energyStationFun.cnzzs`),
      unitI18nKey: 'unitGe',
      displayUnit: t(`${configHead}.energyStationFun.unitGe`),
      classStyleType: 'leftRightStyleGreen'
    }
    // {
    //   img: ncd,
    //   num: 1926,
    //   unit: '/次',
    //   name: '年充放电数',
    //   i18nKey: 'ncfds',
    //   displayName: t(`${configHead}.energyStationFun.ncfds`),
    //   unitI18nKey: 'unitCi',
    //   displayUnit: t(`${configHead}.energyStationFun.unitCi`),
    //   classStyleType: 'leftRightStyleYellow5858'
    // }
  ];
};

export const photovoltaicStationFun = (data = {}) => {
  return [
    {
      img: gfzzs,
      num: '',
      code: 'pvStationNum',
      unit: '/个',
      name: '光伏站总数',
      i18nKey: 'gfzzs',
      displayName: t(`${configHead}.photovoltaicStationFun.gfzzs`),
      unitI18nKey: 'unitGe',
      displayUnit: t(`${configHead}.photovoltaicStationFun.unitGe`),
      classStyleType: 'leftRightStyleGreen'
    }
    // {
    //   img: nfdl,
    //   num: '2.13',
    //   code: '',
    //   unit: '/亿KWh',
    //   name: '年发电量',
    //   i18nKey: 'nfdl',
    //   displayName: t(`${configHead}.photovoltaicStationFun.nfdl`),
    //   unitI18nKey: 'unitBilKWh',
    //   displayUnit: t(`${configHead}.photovoltaicStationFun.unitBilKWh`),
    //   classStyleType: 'leftRightStyleYellow5858'
    // }
  ].map((el) => {
    return {
      ...el,
      num: data[el.code] ?? el.num
    };
  });
};

export const chargingsReplacementCabinetFun = (data = {}) => {
  return [
    {
      img: sszs,
      num: data?.electricBicycleCabinetNum,
      unit: '/个',
      name: '设施总数',
      i18nKey: 'sszs',
      displayName: t(`${configHead}.chargingsReplacementCabinetFun.sszs`),
      unitI18nKey: 'unitGe',
      displayUnit: t(`${configHead}.chargingsReplacementCabinetFun.unitGe`),
      classStyleType: 'leftRightStyleGreen'
    }
    // {
    //   img: ncd,
    //   num: data?.yearChargingCapacity,
    //   unit: '/亿KWh',
    //   name: '年充电量',
    //   i18nKey: 'ncdl',
    //   displayName: t(`${configHead}.chargingsReplacementCabinetFun.ncdl`),
    //   unitI18nKey: 'unitBilKWh',
    //   displayUnit: t(`${configHead}.chargingsReplacementCabinetFun.unitBilKWh`),
    //   classStyleType: 'leftRightStyleYellow5858'
    // }
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
    label: '充电站',
    i18nKey: 'czd',
    displayLabel: t(`${configHead}.stationTabType.czd`)
  },
  // {
  //   code: 2,
  //   label: '储能站'
  // },
  {
    code: 3,
    label: '光伏站',
    i18nKey: 'gfz',
    displayLabel: t(`${configHead}.stationTabType.gfz`)
  }
  // {
  //   code: 4,
  //   label: '充换电柜'
  // },
  // {
  //   code: 5,
  //   label: '换电站'
  // }
];

export const ecOptionFun = (data = [], xaxis = [], code = 1) => {
  xaxis = xaxis.map((i) => {
    return { value: i, textStyle: { overflow: 'break', width: 100 } };
  });
  return {
    grid: {
      top: scale(40),
      bottom: scale(0),
      right: scale(0),
      left: scale(0),
      containLabel: true
    },
    legend: {
      itemWidth: scale(18),
      itemHeight: scale(12),
      right: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Source Han Sans CN',
        fontSize: scale(16),
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
        color: '#fff',
        fontSize: scale(16)
      },
      axisPointer: {
        type: 'shadow'
      },
      formatter: `{b}：{c}${
        code === 1
          ? t(`${configHead}.ecOptionFun.unitGe`) || '个'
          : t(`${configHead}.ecOptionFun.unitWKW`) || '万千瓦'
      }`
      // formatter:(params)=>{
      //   return params[0].value + '个'
      // }
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
        fontSize: scale(14),
        lineHeight: scale(10),
        color: '#D0DEEE',
        interval: 0
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: `${t(`${configHead}.ecOptionFun.unit`) || '单位'}/${
        code === 1
          ? t(`${configHead}.ecOptionFun.unitGe`) || '个'
          : t(`${configHead}.ecOptionFun.unitWKW`) || '万千瓦'
      }`,
      nameTextStyle: {
        color: '#B4C0CC',
        fontSize: scale(16)
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
        fontSize: scale(14),
        lineHeight: scale(18),
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
        name: `${
          code === 1
            ? t(`${configHead}.ecOptionFun.number`) || '数量'
            : t(`${configHead}.ecOptionFun.scale`) || '规模'
        }`,
        barWidth: scale(18),
        label: {
          show: true,
          position: 'top',
          fontSize: scale(16),
          fontfamily: 'Helvetica',
          color: '#fff'
        },
        itemStyle: {
          color: () => {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: 'rgba(0, 58, 255, 0.0001)'
              },
              {
                offset: 0,
                color: '#88C6FF'
              }
            ]);
          }
        }
      }
      // {
      //   // 顶部
      //   tooltip: {
      //     show: false
      //   },
      //   type: 'pictorialBar',
      //   itemStyle: {
      //     // 顶部
      //     color: '#13ABC2'
      //   },
      //   symbol: 'rect',
      //   symbolSize: [scale(18), scale(5)],
      //   symbolPosition: 'end',
      //   data: data,
      //   z: 3
      // }
    ]
  };
};
const carbon = [
  {
    date: '2024/6/10',
    newCharging: '8355 ',
    change: '51 ',
    bike: '67 ',
    energy: '60 ',
    light: '1366'
  },
  {
    date: '2024/6/11',
    newCharging: '8195 ',
    change: '50 ',
    bike: '66 ',
    energy: '58 ',
    light: '1065'
  },
  {
    date: '2024/6/12',
    newCharging: '8100 ',
    change: '50 ',
    bike: '79 ',
    energy: '59 ',
    light: '1186'
  },
  {
    date: '2024/6/13',
    newCharging: '6922 ',
    change: '42 ',
    bike: '62 ',
    energy: '60 ',
    light: '1282'
  },
  {
    date: '2024/6/14',
    newCharging: '6763 ',
    change: '41 ',
    bike: '64 ',
    energy: '60 ',
    light: '1410'
  },
  {
    date: '2024/6/15',
    newCharging: '8116 ',
    change: '50 ',
    bike: '65 ',
    energy: '63 ',
    light: '203'
  },
  {
    date: '2024/6/16',
    newCharging: '7893 ',
    change: '48 ',
    bike: '67 ',
    energy: '63 ',
    light: '139'
  },
  {
    date: '2024/6/17',
    newCharging: '7718 ',
    change: '47 ',
    bike: '62 ',
    energy: '59 ',
    light: '327'
  },
  {
    date: '2024/6/18',
    newCharging: '8116 ',
    change: '50 ',
    bike: '65 ',
    energy: '63 ',
    light: '203'
  },
  {
    date: '2024/6/19',
    newCharging: '7893 ',
    change: '48 ',
    bike: '67 ',
    energy: '63 ',
    light: '139'
  },
  {
    date: '2024/6/20',
    newCharging: '6493 ',
    change: '40 ',
    bike: '90 ',
    energy: '62 ',
    light: '1366'
  },
  {
    date: '2024/6/21',
    newCharging: '6556 ',
    change: '40 ',
    bike: '83 ',
    energy: '60 ',
    light: '1333'
  },
  {
    date: '2024/6/22',
    newCharging: '8187 ',
    change: '50 ',
    bike: '79 ',
    energy: '58 ',
    light: '1366'
  },
  {
    date: '2024/6/23',
    newCharging: '7798 ',
    change: '48 ',
    bike: '62 ',
    energy: '62 ',
    light: '1263'
  },
  {
    date: '2024/6/24',
    newCharging: '8355 ',
    change: '51 ',
    bike: '67 ',
    energy: '60 ',
    light: '1366'
  },
  {
    date: '2024/6/25',
    newCharging: '8195 ',
    change: '50 ',
    bike: '66 ',
    energy: '58 ',
    light: '1065'
  },
  {
    date: '2024/6/26',
    newCharging: '8100 ',
    change: '50 ',
    bike: '79 ',
    energy: '59 ',
    light: '1186'
  },
  {
    date: '2024/6/27',
    newCharging: '6922 ',
    change: '42 ',
    bike: '62 ',
    energy: '60 ',
    light: '1282'
  },
  {
    date: '2024/6/28',
    newCharging: '6763 ',
    change: '41 ',
    bike: '64 ',
    energy: '60 ',
    light: '1410'
  },
  {
    date: '2024/6/29',
    newCharging: '8116 ',
    change: '50 ',
    bike: '65 ',
    energy: '63 ',
    light: '203'
  },
  {
    date: '2024/6/30',
    newCharging: '7893 ',
    change: '48 ',
    bike: '67 ',
    energy: '63 ',
    light: '139'
  },
  {
    date: '2024/7/1',
    newCharging: '7806 ',
    change: '48 ',
    bike: '74 ',
    energy: '59 ',
    light: '287'
  },
  {
    date: '2024/7/2',
    newCharging: '7949 ',
    change: '49 ',
    bike: '77 ',
    energy: '62 ',
    light: '390'
  },
  {
    date: '2024/7/3',
    newCharging: '7089 ',
    change: '43 ',
    bike: '67 ',
    energy: '57 ',
    light: '134'
  },
  {
    date: '2024/7/4',
    newCharging: '6851 ',
    change: '42 ',
    bike: '62 ',
    energy: '60 ',
    light: '1171'
  },
  {
    date: '2024/7/5',
    newCharging: '8355 ',
    change: '51 ',
    bike: '62 ',
    energy: '63 ',
    light: '195'
  },
  {
    date: '2024/7/6',
    newCharging: '8355 ',
    change: '51 ',
    bike: '61 ',
    energy: '62 ',
    light: '390'
  },
  {
    date: '2024/7/7',
    newCharging: '8195 ',
    change: '50 ',
    bike: '65 ',
    energy: '65 ',
    light: '1366'
  },
  {
    date: '2024/7/8',
    newCharging: '7543 ',
    change: '56 ',
    bike: '74 ',
    energy: '58 ',
    light: '1269'
  },
  {
    date: '2024/7/9',
    newCharging: '7670 ',
    change: '47 ',
    bike: '79 ',
    energy: '59 ',
    light: '1366'
  },
  {
    date: '2024/7/10',
    newCharging: '6843 ',
    change: '42 ',
    bike: '61 ',
    energy: '59 ',
    light: '390'
  },
  {
    date: '2024/7/11',
    newCharging: '7320 ',
    change: '45 ',
    bike: '60 ',
    energy: '62 ',
    light: '293'
  },
  {
    date: '2024/7/12',
    newCharging: '7798 ',
    change: '48 ',
    bike: '63 ',
    energy: '63 ',
    light: '195'
  },
  {
    date: '2024/7/13',
    newCharging: '7718 ',
    change: '47 ',
    bike: '66 ',
    energy: '64 ',
    light: '1562'
  },
  {
    date: '2024/7/14',
    newCharging: '7638 ',
    change: '47 ',
    bike: '64 ',
    energy: '62 ',
    light: '390'
  },
  {
    date: '2024/7/15',
    newCharging: '8148 ',
    change: '50 ',
    bike: '74 ',
    energy: '64 ',
    light: '1757'
  },
  {
    date: '2024/7/16',
    newCharging: '7861 ',
    change: '48 ',
    bike: '74 ',
    energy: '60 ',
    light: '390'
  },
  {
    date: '2024/7/17',
    newCharging: '7559 ',
    change: '46 ',
    bike: '67 ',
    energy: '64 ',
    light: '1562'
  },
  {
    date: '2024/7/18',
    newCharging: '7161 ',
    change: '44 ',
    bike: '67 ',
    energy: '64 ',
    light: '1366'
  },
  {
    date: '2024/7/19',
    newCharging: '7638 ',
    change: '47 ',
    bike: '66 ',
    energy: '63 ',
    light: '195'
  },
  {
    date: '2024/7/20',
    newCharging: '8068 ',
    change: '49 ',
    bike: '90 ',
    energy: '62 ',
    light: '1366'
  },
  {
    date: '2024/7/21',
    newCharging: '7845 ',
    change: '48 ',
    bike: '83 ',
    energy: '60 ',
    light: '1366'
  },
  {
    date: '2024/7/22',
    newCharging: '8195 ',
    change: '50 ',
    bike: '79 ',
    energy: '58 ',
    light: '1366'
  },
  {
    date: '2024/7/23',
    newCharging: '7798 ',
    change: '48 ',
    bike: '62 ',
    energy: '62 ',
    light: '1366'
  },
  {
    date: '2024/7/24',
    newCharging: '6763 ',
    change: '41 ',
    bike: '67 ',
    energy: '60 ',
    light: '1366'
  },
  {
    date: '2024/7/25',
    newCharging: '6286 ',
    change: '38 ',
    bike: '66 ',
    energy: '58 ',
    light: '1366'
  },
  {
    date: '2024/7/26',
    newCharging: '7782 ',
    change: '48 ',
    bike: '79 ',
    energy: '59 ',
    light: '390'
  },
  {
    date: '2024/7/27',
    newCharging: '7718 ',
    change: '47 ',
    bike: '62 ',
    energy: '60 ',
    light: '390'
  },
  {
    date: '2024/7/28',
    newCharging: '7559 ',
    change: '46 ',
    bike: '64 ',
    energy: '60 ',
    light: '586'
  },
  {
    date: '2024/7/29',
    newCharging: '8116 ',
    change: '50 ',
    bike: '65 ',
    energy: '63 ',
    light: '586'
  },
  {
    date: '2024/7/30',
    newCharging: '8355 ',
    change: '51 ',
    bike: '67 ',
    energy: '63 ',
    light: '586'
  },
  {
    date: '2024/7/31',
    newCharging: '7718 ',
    change: '56 ',
    bike: '62 ',
    energy: '59 ',
    light: '327'
  },
  {
    date: '2024/8/1',
    newCharging: '7002 ',
    change: '43 ',
    bike: '62 ',
    energy: '59 ',
    light: '390'
  },
  {
    date: '2024/8/2',
    newCharging: '6779 ',
    change: '42 ',
    bike: '74 ',
    energy: '59 ',
    light: '390'
  },
  {
    date: '2024/8/3',
    newCharging: '8148 ',
    change: '50 ',
    bike: '77 ',
    energy: '62 ',
    light: '390'
  },
  {
    date: '2024/08/4',
    newCharging: '8355 ',
    change: '51 ',
    bike: '67 ',
    energy: '57 ',
    light: '1366'
  },
  {
    date: '2024/08/5',
    newCharging: '7798 ',
    change: '48 ',
    bike: '62 ',
    energy: '60 ',
    light: '1171'
  },
  {
    date: '2024/08/6',
    newCharging: '8355 ',
    change: '51 ',
    bike: '62 ',
    energy: '63 ',
    light: '195'
  },
  {
    date: '2024/08/7',
    newCharging: '8355 ',
    change: '56 ',
    bike: '61 ',
    energy: '62 ',
    light: '390'
  },
  {
    date: '2024/08/8',
    newCharging: '6604 ',
    change: '40 ',
    bike: '65 ',
    energy: '65 ',
    light: '1366'
  },
  {
    date: '2024/08/9',
    newCharging: '6906 ',
    change: '42 ',
    bike: '74 ',
    energy: '58 ',
    light: '1269'
  },
  {
    date: '2024/08/10',
    newCharging: '7670 ',
    change: '47 ',
    bike: '79 ',
    energy: '59 ',
    light: '1366'
  },
  {
    date: '2024/08/11',
    newCharging: '7638 ',
    change: '47 ',
    bike: '61 ',
    energy: '59 ',
    light: '390'
  },
  {
    date: '2024/08/12',
    newCharging: '8116 ',
    change: '50 ',
    bike: '60 ',
    energy: '62 ',
    light: '293'
  },
  {
    date: '2024/08/13',
    newCharging: '7798 ',
    change: '48 ',
    bike: '63 ',
    energy: '63 ',
    light: '195'
  },
  {
    date: '2024/08/14',
    newCharging: '7718 ',
    change: '47 ',
    bike: '66 ',
    energy: '64 ',
    light: '1562'
  },
  {
    date: '2024/08/15',
    newCharging: '6357 ',
    change: '39 ',
    bike: '64 ',
    energy: '62 ',
    light: '390'
  }
];

export const lineCarbonDataFun = (data = [], xaxis = []) => {
  const yearMonthDay = dayjs().format('YYYY/M/D');
  // console.log('carbon', carbon);
  let list = deepClone(carbon);
  const len = list.length - 1;
  list = list.map((item, i) => {
    return {
      ...item,
      date: dayjs()
        .subtract(len - i, 'day')
        .format('YYYY/M/D')
    };
  });
  const index = carbon.findIndex((i) => i.date.trim() == yearMonthDay);
  if (index !== -1) {
    list.splice(index + 1);
  }

  return [
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        item.newCharging.trim()
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: t(`${configHead}.lineCarbonDataFun.xnycd`) || '新能源充电',
      displayName: t(`${configHead}.lineCarbonDataFun.xnycd`)
    },
    {
      data: list.map((item) => [dayjs(item.date).format('MM-DD').toString(), item.energy.trim()]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: t(`${configHead}.lineCarbonDataFun.cn`) || '储能',
      displayName: t(`${configHead}.lineCarbonDataFun.cn`)
    },
    {
      data: list.map((item) => [dayjs(item.date).format('MM-DD').toString(), item.light.trim()]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: t(`${configHead}.lineCarbonDataFun.gf`) || '光伏',
      displayName: t(`${configHead}.lineCarbonDataFun.gf`)
    },
    {
      data: list.map((item) => [dayjs(item.date).format('MM-DD').toString(), item.bike.trim()]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: t(`${configHead}.lineCarbonDataFun.zxcchd`) || '自行车充换电',
      displayName: t(`${configHead}.lineCarbonDataFun.zxcchd`)
    },
    {
      data: list.map((item) => [dayjs(item.date).format('MM-DD').toString(), item.change.trim()]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: t(`${configHead}.lineCarbonDataFun.hd`) || '换电',
      displayName: t(`${configHead}.lineCarbonDataFun.hd`)
    }
    // {
    //   data: list.map((item) => [
    //     dayjs(item.date).format('MM-DD').toString(),
    //     Number(item.emissionReduction.trim())
    //   ]),
    //   type: 'line',
    //   smooth: true,
    //   showSymbol: false,
    //   name: '合计'
    // }
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
      name: t(`${configHead}.lineCarbonDataFun.unitTon`) || '单位(吨)',
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
    date: '2024/6/1',
    newCharging: '880 ',
    change: '5 ',
    bike: '8 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/6/2',
    newCharging: '852 ',
    change: '5 ',
    bike: '9 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/6/3',
    newCharging: '1024 ',
    change: '6 ',
    bike: '10 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/6/4',
    newCharging: '1050 ',
    change: '6 ',
    bike: '8 ',
    energy: '11 ',
    light: '214'
  },
  {
    date: '2024/6/5',
    newCharging: '980 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '184'
  },
  {
    date: '2024/6/6',
    newCharging: '1050 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '31'
  },
  {
    date: '2024/6/7',
    newCharging: '1050 ',
    change: '7 ',
    bike: '8 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/6/8',
    newCharging: '830 ',
    change: '5 ',
    bike: '8 ',
    energy: '13 ',
    light: '214'
  },
  {
    date: '2024/6/9',
    newCharging: '868 ',
    change: '5 ',
    bike: '9 ',
    energy: '12 ',
    light: '199'
  },
  {
    date: '2024/6/10',
    newCharging: '964 ',
    change: '6 ',
    bike: '10 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/6/11',
    newCharging: '960 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/6/12',
    newCharging: '1020 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '46'
  },
  {
    date: '2024/6/13',
    newCharging: '980 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '31'
  },
  {
    date: '2024/6/14',
    newCharging: '970 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '245'
  },
  {
    date: '2024/6/15',
    newCharging: '799 ',
    change: '5 ',
    bike: '8 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/7/10',
    newCharging: '1050 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/7/11',
    newCharging: '1030 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '167'
  },
  {
    date: '2024/7/12',
    newCharging: '1018 ',
    change: '6 ',
    bike: '10 ',
    energy: '12 ',
    light: '186'
  },
  {
    date: '2024/7/13',
    newCharging: '870 ',
    change: '5 ',
    bike: '8 ',
    energy: '12 ',
    light: '201'
  },
  {
    date: '2024/7/14',
    newCharging: '850 ',
    change: '5 ',
    bike: '8 ',
    energy: '12 ',
    light: '221'
  },
  {
    date: '2024/7/15',
    newCharging: '1020 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '32'
  },
  {
    date: '2024/7/16',
    newCharging: '992 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '22'
  },
  {
    date: '2024/7/17',
    newCharging: '970 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '51'
  },
  {
    date: '2024/7/18',
    newCharging: '1020 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '32'
  },
  {
    date: '2024/7/19',
    newCharging: '992 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '22'
  },
  {
    date: '2024/7/20',
    newCharging: '816 ',
    change: '5 ',
    bike: '11 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/7/21',
    newCharging: '824 ',
    change: '5 ',
    bike: '10 ',
    energy: '12 ',
    light: '209'
  },
  {
    date: '2024/7/22',
    newCharging: '1029 ',
    change: '6 ',
    bike: '10 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/7/23',
    newCharging: '980 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '198'
  },
  {
    date: '2024/7/24',
    newCharging: '1050 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/7/25',
    newCharging: '1030 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '167'
  },
  {
    date: '2024/7/26',
    newCharging: '1018 ',
    change: '6 ',
    bike: '10 ',
    energy: '12 ',
    light: '186'
  },
  {
    date: '2024/7/27',
    newCharging: '870 ',
    change: '5 ',
    bike: '8 ',
    energy: '12 ',
    light: '201'
  },
  {
    date: '2024/7/28',
    newCharging: '850 ',
    change: '5 ',
    bike: '8 ',
    energy: '12 ',
    light: '221'
  },
  {
    date: '2024/7/29',
    newCharging: '1020 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '32'
  },
  {
    date: '2024/7/30',
    newCharging: '992 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '22'
  },
  {
    date: '2024/7/31',
    newCharging: '970 ',
    change: '7 ',
    bike: '8 ',
    energy: '12 ',
    light: '51'
  },

  {
    date: '2024/8/1',
    newCharging: '981 ',
    change: '6 ',
    bike: '9 ',
    energy: '12 ',
    light: '45'
  },
  {
    date: '2024/8/2',
    newCharging: '999 ',
    change: '6 ',
    bike: '10 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/8/3',
    newCharging: '891 ',
    change: '5 ',
    bike: '8 ',
    energy: '11 ',
    light: '21'
  },
  {
    date: '2024/8/4',
    newCharging: '861 ',
    change: '5 ',
    bike: '8 ',
    energy: '12 ',
    light: '184'
  },
  {
    date: '2024/8/5',
    newCharging: '1050 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '31'
  },
  {
    date: '2024/8/6',
    newCharging: '1050 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/8/7',
    newCharging: '1030 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '214'
  },
  {
    date: '2024/8/8',
    newCharging: '948 ',
    change: '7 ',
    bike: '9 ',
    energy: '12 ',
    light: '199'
  },
  {
    date: '2024/8/9',
    newCharging: '964 ',
    change: '6 ',
    bike: '10 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/8/10',
    newCharging: '860 ',
    change: '5 ',
    bike: '8 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/8/11',
    newCharging: '920 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '46'
  },
  {
    date: '2024/8/12',
    newCharging: '980 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '31'
  },
  {
    date: '2024/8/13',
    newCharging: '970 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '245'
  },
  {
    date: '2024/8/14',
    newCharging: '960 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/8/15',
    newCharging: '1024 ',
    change: '6 ',
    bike: '9 ',
    energy: '13 ',
    light: '275'
  },
  {
    date: '2024/8/16',
    newCharging: '988 ',
    change: '6 ',
    bike: '9 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/8/17',
    newCharging: '950 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '245'
  },
  {
    date: '2024/8/18',
    newCharging: '900 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '214'
  },
  {
    date: '2024/8/19',
    newCharging: '960 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '31'
  },
  {
    date: '2024/8/20',
    newCharging: '1014 ',
    change: '6 ',
    bike: '11 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/8/21',
    newCharging: '986 ',
    change: '6 ',
    bike: '10 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/8/22',
    newCharging: '1030 ',
    change: '6 ',
    bike: '10 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/8/23',
    newCharging: '980 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/8/24',
    newCharging: '850 ',
    change: '5 ',
    bike: '8 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/8/25',
    newCharging: '790 ',
    change: '5 ',
    bike: '8 ',
    energy: '12 ',
    light: '214'
  },
  {
    date: '2024/8/26',
    newCharging: '978 ',
    change: '6 ',
    bike: '10 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/8/27',
    newCharging: '970 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '61'
  },
  {
    date: '2024/8/28',
    newCharging: '950 ',
    change: '6 ',
    bike: '8 ',
    energy: '12 ',
    light: '92'
  },
  {
    date: '2024/8/29',
    newCharging: '1020 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '92'
  },
  {
    date: '2024/8/30',
    newCharging: '1050 ',
    change: '6 ',
    bike: '8 ',
    energy: '13 ',
    light: '92'
  }
];

export const lineElectricDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY/M/D');
  let list = deepClone(Electric);
  const index = Electric.findIndex((i) => i.date.trim() == yearMonthDay);
  if (index !== -1) {
    list.splice(index + 1);
  }

  return [
    {
      data: list.map((item) => [
        dayjs(item.date).format('MM-DD').toString(),
        item.newCharging.trim()
      ]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: t(`${configHead}.lineElectricDataFun.xnycd`) || '新能源充电',
      displayName: t(`${configHead}.lineElectricDataFun.xnycd`)
    },
    {
      data: list.map((item) => [dayjs(item.date).format('MM-DD').toString(), item.energy.trim()]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: t(`${configHead}.lineElectricDataFun.cnfd`) || '储能放电',
      displayName: t(`${configHead}.lineElectricDataFun.cnfd`)
    },
    {
      data: list.map((item) => [dayjs(item.date).format('MM-DD').toString(), item.light.trim()]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: t(`${configHead}.lineElectricDataFun.gffd`) || '光伏发电',
      displayName: t(`${configHead}.lineElectricDataFun.gffd`)
    },
    {
      data: list.map((item) => [dayjs(item.date).format('MM-DD').toString(), item.bike.trim()]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: t(`${configHead}.lineElectricDataFun.zxcchd`) || '自行车充换电',
      displayName: t(`${configHead}.lineElectricDataFun.zxcchd`)
    },
    {
      data: list.map((item) => [dayjs(item.date).format('MM-DD').toString(), item.change.trim()]),
      type: 'line',
      smooth: true,
      showSymbol: false,
      name: t(`${configHead}.lineElectricDataFun.hd`) || '换电',
      displayName: t(`${configHead}.lineElectricDataFun.hd`)
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

export const changeElectricFun = (data = {}) => {
  return [
    {
      img: cnzzs,
      num: 49,
      unit: '/个',
      name: '换电站总数',
      i18nKey: 'hdzzs',
      displayName: t(`${configHead}.changeElectricFun.hdzzs`),
      unitI18nKey: 'unitGe',
      displayUnit: t(`${configHead}.changeElectricFun.unitGe`),
      classStyleType: 'leftRightStyleGreen'
    }
    // {
    //   img: ncd,
    //   num: 13.16,
    //   unit: '/万次',
    //   name: '年充电数',
    //   i18nKey: 'ncds',
    //   displayName: t(`${configHead}.changeElectricFun.ncds`),
    //   unitI18nKey: 'unitWanCi',
    //   displayUnit: t(`${configHead}.changeElectricFun.unitWanCi`),
    //   classStyleType: 'leftRightStyleYellow5858'
    // }
  ];
};

export const columnKeyListFun = () => {
  return [
    {
      prop: 'areaName',
      label: '行政区名称',
      width: 2
    },
    {
      prop: `stationNum`,
      label: '充电场站数量(个)',
      width: 2
    },
    {
      prop: `gunNum`,
      label: '登记枪数(个)',
      width: 2
    },
    {
      prop: `DynamicGunNum`,
      label: '动态接入枪(个)',
      width: 2
    },
    {
      prop: `DynamicGunRate`,
      label: '动态接入率(%)',
      width: 2
    },
    {
      prop: `v2gEquipment`,
      label: 'V2G桩数量(个)',
      width: 2
    },
    {
      prop: `v2gStation`,
      label: 'V2G站点数(个)',
      width: 2
    },
    {
      prop: `superStation`,
      label: '超充站(个)',
      width: 2
    },
    {
      prop: `operationNum`,
      label: '运营商数量(家)',
      width: 2
    }
  ];
};

export const columnDataFun = () => {
  return [
    {
      areaName: '光明区',
      stationNum: 432,
      gunNum: 17591,
      DynamicGunNum: 9538,
      DynamicGunRate: 54.22,
      v2gEquipment: 2,
      v2gStation: 2,
      superStation: 8,
      operationNum: 36
    },
    {
      areaName: '南山区',
      stationNum: 1668,
      gunNum: 41932,
      DynamicGunNum: 29182,
      DynamicGunRate: 69.59,
      v2gEquipment: 34,
      v2gStation: 6,
      superStation: 17,
      operationNum: 64
    },
    {
      areaName: '坪山区',
      stationNum: 353,
      gunNum: 16620,
      DynamicGunNum: 12191,
      DynamicGunRate: 73.35,
      v2gEquipment: 2,
      v2gStation: 2,
      superStation: 3,
      operationNum: 8
    },
    {
      areaName: '大鹏新区',
      stationNum: 186,
      gunNum: 5257,
      DynamicGunNum: 4230,
      DynamicGunRate: 80.46,
      v2gEquipment: 0,
      v2gStation: 0,
      superStation: 4,
      operationNum: 2
    },
    {
      areaName: '宝安区',
      stationNum: 2571,
      gunNum: 77351,
      DynamicGunNum: 43696,
      DynamicGunRate: 56.49,
      v2gEquipment: 37,
      v2gStation: 16,
      superStation: 40,
      operationNum: 207
    },
    {
      areaName: '深汕特别合作区',
      stationNum: 45,
      gunNum: 512,
      DynamicGunNum: 487,
      DynamicGunRate: 95.12,
      v2gEquipment: 0,
      v2gStation: 0,
      superStation: 1,
      operationNum: 5
    },
    {
      areaName: '盐田区',
      stationNum: 349,
      gunNum: 7955,
      DynamicGunNum: 5255,
      DynamicGunRate: 66.06,
      v2gEquipment: 5,
      v2gStation: 3,
      superStation: 7,
      operationNum: 8
    },
    {
      areaName: '福田区',
      stationNum: 1525,
      gunNum: 27565,
      DynamicGunNum: 18681,
      DynamicGunRate: 67.77,
      v2gEquipment: 25,
      v2gStation: 4,
      superStation: 11,
      operationNum: 48
    },
    {
      areaName: '罗湖区',
      stationNum: 887,
      gunNum: 16594,
      DynamicGunNum: 11089,
      DynamicGunRate: 66.83,
      v2gEquipment: 1,
      v2gStation: 1,
      superStation: 7,
      operationNum: 33
    },
    {
      areaName: '龙华区',
      stationNum: 1235,
      gunNum: 37013,
      DynamicGunNum: 24116,
      DynamicGunRate: 65.16,
      v2gEquipment: 15,
      v2gStation: 9,
      superStation: 10,
      operationNum: 48
    },
    {
      areaName: '龙岗区',
      stationNum: 2257,
      gunNum: 67976,
      DynamicGunNum: 44253,
      DynamicGunRate: 65.1,
      v2gEquipment: 10,
      v2gStation: 4,
      superStation: 15,
      operationNum: 75
    },
    {
      areaName: '未知',
      stationNum: '--',
      gunNum: '--',
      DynamicGunNum: '--',
      DynamicGunRate: '--',
      v2gEquipment: '--',
      v2gStation: '--',
      superStation: '--',
      operationNum: 84
    }
  ];
};
