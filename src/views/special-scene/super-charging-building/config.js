import { scale } from '@sutpc/config';
import dayjs from 'dayjs';
import i18n from '@/locales/i18n';
const { t } = i18n.global;
const configHead = `special-scene.super-charging-building.config`;

// getOperatCardConfig: {
//   yy: '营运',
//   ccz: '超充站',
//   unitGe: '个',
// }
export const getOperatCardConfig = (data = {}) => {
  return [
    {
      name: '已建成',
      color: '#00D2D9',
      displayName: t(`${configHead}.common.yingyun`),
      children: [
        {
          name: '超充站',
          code: 'stationOperateNum',
          value: null,
          icon: new URL('./images/chaochongzhan.png', import.meta.url).href,
          unit: '个',
          displayName: t(`${configHead}.common.cczhan`),
          displayUnit: t(`${configHead}.common.unitGe`)
        },
        {
          name: '超充桩',
          code: 'equipmentOperateNum',
          value: null,
          icon: new URL('./images/chaochongzhuang.png', import.meta.url).href,
          unit: '个',
          displayName: t(`${configHead}.common.cczhuang`),
          displayUnit: t(`${configHead}.common.unitGe`)
        },
        // {
        //   name: '超充桩',
        //   code: 'equipmentOperateNum',
        //   value: null,
        //   icon: new URL('./images/chaochongzhuang.png', import.meta.url).href,
        //   unit: '个',
        //   displayName: t(`${configHead}.common.cczhuang`),
        //   displayUnit: t(`${configHead}.common.unitGe`)
        // },
        {
          name: '装机功率',
          code: 'sscRatedPower',
          value: null,
          icon: new URL('./images/zhuangjigonglv.png', import.meta.url).href,
          unit: 'kW',
          displayName: t(`${configHead}.common.zhuangjigonglv`),
          displayUnit: t(`${configHead}.common.unitKW`)
        },
        {
          name: '超充运营商',
          code: 'stationOperateCompanyNum',
          value: null,
          icon: new URL('./images/chaochongyunyingshang.png', import.meta.url).href,
          unit: '家',
          displayName: t(`${configHead}.common.ccyys`),
          displayUnit: t(`${configHead}.common.unitJia`)
        }
      ].map((e) => {
        e.value = data && data[e.code];
        return e;
      })
    },
    {
      name: '建设中',
      color: '#3A60EE',
      displayName: t(`${configHead}.common.jsz`),
      children: [
        {
          name: '超充站',
          code: 'stationBuildNum',
          value: null,
          icon: new URL('./images/chaochongzhan.png', import.meta.url).href,
          unit: '个',
          displayName: t(`${configHead}.common.cczhan`),
          displayUnit: t(`${configHead}.common.unitGe`)
        },
        {
          name: '超充桩',
          code: 'equipmentBuildNum',
          value: null,
          icon: new URL('./images/chaochongzhuang.png', import.meta.url).href,
          unit: '个',
          displayName: t(`${configHead}.common.cczhuang`),
          displayUnit: t(`${configHead}.common.unitGe`)
        }
      ].map((e) => {
        e.value = data && data[e.code];
        return e;
      })
    },
    {
      name: '规划',
      color: '#17A4FA',
      displayName: t(`${configHead}.common.guihua`),
      children: [
        {
          name: '超充站',
          code: 'stationPlanNum',
          value: null,
          icon: new URL('./images/chaochongzhan.png', import.meta.url).href,
          unit: '个',
          displayName: t(`${configHead}.common.cczhan`),
          displayUnit: t(`${configHead}.common.unitGe`)
        },
        {
          name: '超充桩',
          code: 'equipmentPlanNum',
          value: null,
          icon: new URL('./images/chaochongzhuang.png', import.meta.url).href,
          unit: '个',
          displayName: t(`${configHead}.common.cczhuang`),
          displayUnit: t(`${configHead}.common.unitGe`)
        }
      ].map((e) => {
        e.value = data && data[e.code];
        return e;
      })
    },
    {
      name: '已接入',
      color: '#00D2D9',
      displayName: '已接入',
      children: [
        {
          name: '超充站',
          code: 'accessStationNum',
          value: null,
          icon: new URL('./images/chaochongzhan.png', import.meta.url).href,
          unit: '个',
          displayName: t(`${configHead}.common.cczhan`),
          displayUnit: t(`${configHead}.common.unitGe`)
        },
        {
          name: '超充桩',
          code: 'accessEquipmentNum',
          value: null,
          icon: new URL('./images/chaochongzhuang.png', import.meta.url).href,
          unit: '个',
          displayName: t(`${configHead}.common.cczhuang`),
          displayUnit: t(`${configHead}.common.unitGe`)
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
      displayName: t(`${configHead}.common.cczhan`),
      displayType: t(`${configHead}.common.sl`),
      displayUnit: t(`${configHead}.common.unitGe`),
      icon: new URL('./images/super-station.png', import.meta.url).href,
      children: [
        {
          name: '规划',
          code: 'stationPlanNum',
          value: '',
          seprate: '/',
          displayName: t(`${configHead}.common.guihua`)
        },
        {
          name: '建设',
          code: 'stationBuildNum',
          value: '',
          seprate: '/',
          displayName: t(`${configHead}.common.jianshe`)
        },
        {
          name: '营运',
          code: 'stationOperateNum',
          value: '',
          displayName: t(`${configHead}.common.yingyun`)
        }
      ]
    },
    {
      name: '超充桩',
      type: '数量',
      unit: '个',
      displayName: t(`${configHead}.common.cczhuang`),
      displayType: t(`${configHead}.common.sl`),
      displayUnit: t(`${configHead}.common.unitGe`),
      icon: new URL('./images/super-equipment.png', import.meta.url).href,
      children: [
        {
          name: '规划',
          code: 'equipmentPlanNum',
          value: '',
          seprate: '/',
          displayName: t(`${configHead}.common.guihua`)
        },
        {
          name: '建设',
          code: 'equipmentBuildNum',
          value: '',
          seprate: '/',
          displayName: t(`${configHead}.common.jianshe`)
        },
        {
          name: '营运',
          code: 'equipmentOperateNum',
          value: '',
          displayName: t(`${configHead}.common.yingyun`)
        }
      ]
    },
    {
      name: '超充站',
      type: '数量',
      unit: '家',
      displayName: t(`${configHead}.common.cczhan`),
      displayType: t(`${configHead}.common.sl`),
      displayUnit: t(`${configHead}.common.unitJia`),
      icon: new URL('./images/operator.png', import.meta.url).href,
      children: [
        {
          name: '建设企业',
          code: 'stationBuildCompanyNum',
          value: '',
          seprate: '/',
          displayName: t(`${configHead}.common.jiansheqiye`)
        },
        {
          name: '营运企业',
          code: 'stationOperateCompanyNum',
          value: '',
          displayName: t(`${configHead}.common.yingyunqiye`)
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
      displayName: t(`${configHead}.common.ccbs`),
      displayUnit: t(`${configHead}.common.unitGe`),
      displayTypeName: t(`${configHead}.common.cdz`),
      icon: new URL('./images/super-station.png', import.meta.url).href,
      children: [
        {
          name: '申请',
          code: 'stationTagApplyNum',
          value: '',
          seprate: '/',
          color: '#84C2FF',
          displayName: t(`${configHead}.common.sq`)
        },
        {
          name: '申请通过数',
          code: 'stationTagApplyPassNum',
          value: '',
          color: '#00F7FF',
          displayName: t(`${configHead}.common.sqtgs`)
        }
      ]
    }
    // {
    //   name: '超充标识',
    //   unit: '个',
    //   typeName: '充电枪',
    //   displayName: t(`${configHead}.common.ccbs`),
    //   displayUnit: t(`${configHead}.common.unitGe`),
    //   displayTypeName: t(`${configHead}.common.cdq`),
    //   icon: new URL('./images/super-equipment.png', import.meta.url).href,
    //   children: [
    //     {
    //       name: '申请',
    //       code: 'connectorTagApplyNum',
    //       value: '',
    //       seprate: '/',
    //       color: '#84C2FF',
    //       displayName: t(`${configHead}.common.sq`),
    //     },
    //     {
    //       name: '申请通过数',
    //       code: 'connectorTagApplyPassNum',
    //       value: '',
    //       color: '#00F7FF',
    //       displayName: t(`${configHead}.common.sqtgs`),
    //     }
    //   ]
    // }
  ].map((item) => {
    item.children.forEach((e) => (e.value = data[e.code]));
    return item;
  });

export const columnKeyListFun = (type = 'Plan') => {
  return [
    {
      prop: 'areaName',
      label: t(`${configHead}.common.xzqmc`) || '行政区名称',
      displayLabel: t(`${configHead}.common.xzqmc`),
      width: 3
    },
    {
      prop: `station${type}Num`,
      label: t(`${configHead}.common.cczhange`) || '超充站(个)',
      width: 2,
      displayLabel: t(`${configHead}.common.cczhange`)
    },
    {
      prop: `equipment${type}Num`,
      label: t(`${configHead}.common.cczhuangge`) || '超充桩(个)',
      width: 2,
      displayLabel: t(`${configHead}.common.cczhuangge`)
    }
  ];
};

export const bottomTabDataFun = () => {
  return [
    {
      code: 1,
      label: '超充站',
      displayLabel: t(`${configHead}.common.cczhan`)
    },
    {
      code: 0,
      label: '超充桩',
      displayLabel: t(`${configHead}.common.cczhuang`)
    }
  ];
};

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '今日充电量',
      num: data?.chargeCapacity,
      unit: '度',
      displayName: t(`${configHead}.common.jrcdl`),
      displayNum: t(`${configHead}.common.unitDu`)
    },
    {
      name: '今日充电时长',
      num: parseInt(data?.chargeHour),
      unit: '小时',
      displayName: t(`${configHead}.common.jrcdsc`),
      displayNum: t(`${configHead}.common.unitHour`)
    },
    {
      name: '今日充电订单数',
      num: data?.orderNum,
      unit: '个',
      displayName: t(`${configHead}.common.jrcddds`),
      displayNum: t(`${configHead}.common.unitGe`)
    },
    {
      name: '超充日均利用率',
      num: data?.totalUseRatio,
      unit: '%',
      displayName: t(`${configHead}.common.ccrjlyl`)
    }
  ];
};

export const areaDistributedTabType = [
  {
    code: 'Operate',
    label: '已建成',
    displayLabel: t(`${configHead}.common.yingyun`)
  },
  {
    code: 'Build',
    label: '建设中',
    displayLabel: t(`${configHead}.common.jsz`)
  },
  {
    code: 'Plan',
    label: '规划',
    displayLabel: t(`${configHead}.common.guihua`)
  },
  {
    code: 'Access',
    label: '已接入',
    displayLabel: '已接入' || t(`${configHead}.common.guihua`)
  }
];

export const operationTabType = [
  {
    code: 'hour',
    label: '今日',
    timeRange: [dayjs().format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD HH:mm:ss')],
    displayLabel: t(`${configHead}.common.jinri`)
  },
  {
    code: 'date',
    label: '近七日',
    timeRange: [
      dayjs().subtract(6, 'days').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD HH:mm:ss')
    ],
    displayLabel: t(`${configHead}.common.jinqiri`)
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
    legendName: '超充充电次数(次）',
    displayName: t(`${configHead}.common.cccdcs`),
    displayUnit: t(`${configHead}.common.unitCi`),
    displayLegendName: t(`${configHead}.common.cccdcsCi`)
  },
  {
    name: '超充充电量',
    code: 'chargeCapacity',
    type: 'line',
    data: [],
    color: 'rgb(255, 207, 95)',
    unit: '度',
    legendName: '超充充电量(度)',
    displayName: t(`${configHead}.common.cccdl`),
    displayUnit: t(`${configHead}.common.unitDu`),
    displayLegendName: t(`${configHead}.common.cccdlDu`)
  }
];

export const operationRankTabType = [
  {
    code: 'getStationChargeStat',
    label: '超充站',
    displayLabel: t(`${configHead}.common.cczhan`)
  },
  {
    code: 'getOperatorChargeStat',
    label: '运营商',
    displayLabel: t(`${configHead}.common.yunyingshang`)
  }
];

export const superOperationTabType = [
  {
    code: 'getConstructionStationDistribute',
    label: '场所分布',
    displayLabel: t(`${configHead}.common.changsuofenbu`)
  },
  {
    code: 'getChargeCapacityDistribute',
    label: '功率分布',
    displayLabel: t(`${configHead}.common.gonglvfenbu`)
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
    width: 4,
    displayLabel: t(`${configHead}.common.chagnsuoleixing`)
  },
  {
    prop: 'stationNum',
    label: '超充站(个)',
    width: 2,
    displayLabel: t(`${configHead}.common.cczhange`)
  },
  {
    prop: 'equipmentNum',
    label: '超充桩(个)',
    width: 2,
    displayLabel: t(`${configHead}.common.cczhuangge`)
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
      backgroundColor: 'transparent',
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
