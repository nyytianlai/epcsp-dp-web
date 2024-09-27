import { scale } from '@sutpc/config';
import i18n from '@/locales/i18n';
const { t } = i18n.global;
const configHead = `special-scene.power-combine.config`;

export const powerDistributedColumn = [
  {
    prop: 'areaName',
    label: '区域',
    width: 3
  },
  {
    prop: 'busRemainPower',
    label: '巴士储能电量(kWh)',
    width: 5,
    align: 'center'
  },
  {
    prop: 'busNum',
    label: '数量(辆)',
    width: 3,
    align: 'center'
  },
  {
    prop: 'stationNum',
    label: 'V2G站(个)',
    width: 3,
    align: 'center'
  },
  {
    prop: 'pileNum',
    label: 'V2G桩(个)',
    width: 3,
    align: 'center'
  },
  {
    prop: '合计',
    label: '合计(个)',
    width: 3,
    align: 'center'
  }
];

export const parkingChargeOperationColumn = [
  {
    prop: 'areaName',
    label: '行政区',
    width: 2,
    displayLabel: t(`${configHead}.parkingChargeOperationColumn1.areaName`)
  },
  {
    prop: 'parkingNum',
    label: '停车量(辆)',
    width: 2,
    align: 'center',
    displayLabel: t(`${configHead}.parkingChargeOperationColumn1.parkingNum`)
  },
  {
    prop: 'power',
    label: '充电量(kWh)',
    width: 2,
    align: 'center',
    displayLabel: t(`${configHead}.parkingChargeOperationColumn1.power`)
  },
  {
    prop: 'rate',
    label: '车位/充电枪利用率(%)',
    width: 4,
    align: 'center',
    displayLabel: t(`${configHead}.parkingChargeOperationColumn1.rate`)
  }
];

export const operationTrendConfig = () => [
  {
    name: '公交运行',
    code: 'busNum',
    type: 'bar',
    data: [],
    color: 'rgb(34, 118, 252)',
    unit: '辆',
    // displayName: t(`${configHead}.operationTrendConfig.busNum`),
    displayUnit: t(`${configHead}.operationTrendConfig.unitCar`)
  },
  {
    name: '公交储能电量',
    code: 'busRemainEnergy',
    type: 'line',
    data: [],
    color: 'rgb(255, 207, 95)',
    unit: 'kwh',
    // displayName: t(`${configHead}.operationTrendConfig.busCapacity`),
    displayUnit: t(`${configHead}.operationTrendConfig.unitKwh`)
  }
];

export const adjustTrendConfig = () => [
  {
    name: '调节次数',
    code: 'adjustmentTimes',
    type: 'bar',
    data: [],
    color: 'rgb(34, 118, 252)',
    unit: '次',
    displayName: t(`${configHead}.adjustTrendConfig.busNum`),
    displayUnit: t(`${configHead}.adjustTrendConfig.unitCi`)
  },
  {
    name: '调节功率',
    code: 'adjustmentPower',
    type: 'line',
    data: [],
    color: 'rgb(255, 207, 95)',
    unit: 'MW',
    displayName: t(`${configHead}.adjustTrendConfig.busCapacity`),
    displayUnit: t(`${configHead}.adjustTrendConfig.unitMw`)
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
import ztsyl from '@/views/charging-station/images/ztsyl.png';
export const chargingStationsFun = (data: any = []) => {
  return [
    {
      img: ztsyl,
      code: 5,
      children: [
        {
          name: '充电桩数量',
          num: null,
          code: 'cnt',
          unit: '/个'
        },
        {
          name: '装机功率',
          num: null,
          code: 'power',
          unit: '/KW'
        }
      ]
    },
    {
      img: ztsyl,
      code: 6,
      children: [
        {
          name: 'V2G桩数量',
          unit: '/个',
          num: null,
          code: 'cnt'
        },
        {
          name: '装机功率',
          unit: '/KW',
          code: 'power',
          num: null
        }
      ]
    },
    {
      img: ztsyl,
      code: 2,
      children: [
        {
          name: '光伏桩数量',
          unit: '/个',
          num: null,
          code: 'cnt'
        },
        {
          name: '装机功率',
          unit: '/KW',
          code: 'power',
          num: null
        }
      ]
    },
    // {
    //   img: ztsyl,
    //   code: 0,
    //   children: [
    //     {
    //       name: '换电站',
    //       unit: '/个',
    //       num: null,
    //       code: 'cnt'
    //     },
    //     {
    //       name: '装机功率',
    //       unit: '/KW',
    //       code: 'power',
    //       num: null
    //     }
    //   ]
    // },
    {
      img: ztsyl,
      code: 3,
      children: [
        {
          name: '电动自行车充换电柜',
          unit: '/个',
          num: null,
          code: 'cnt'
        }
      ]
    }
  ].map((item) => {
    const fd = data.find((el) => el.type == item.code);
    item.children.forEach((child) => {
      child.num = fd ? fd[child.code] : null;
    });
    return item;
  });
};
