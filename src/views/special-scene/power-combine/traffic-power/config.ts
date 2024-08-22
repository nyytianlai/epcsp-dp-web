import { scale } from '@sutpc/config';
import i18n from '@/locales/i18n'; 
const { t } = i18n.global;
const configHead  = `special-scene.power-combine.config`;

export const powerDistributedColumn = [
  {
    prop: 'areaName',
    label: '行政区',
    width: 3,
    displayLabel: t(`${configHead}.powerDistributedColumn.areaName`)
  },
  {
    prop: 'surplusPower',
    label: '巴士剩余电量(kWh)',
    width: 4,
    displayLabel: t(`${configHead}.powerDistributedColumn.soltNum`)
  },
  {
    prop: 'busNum',
    label: '巴士数量(辆)',
    width: 3,
    displayLabel: t(`${configHead}.powerDistributedColumn.connectorNum`)
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
    name: '巴士数量',
    code: 'busNum',
    type: 'bar',
    data: [],
    color: 'rgb(34, 118, 252)',
    unit: '辆',
    displayName: t(`${configHead}.operationTrendConfig.busNum`),
    displayUnit: t(`${configHead}.operationTrendConfig.unitCar`)
  },
  {
    name: '巴士剩余电量',
    code: 'busRemainEnergy',
    type: 'line',
    data: [],
    color: 'rgb(255, 207, 95)',
    unit: 'kwh',
    displayName: t(`${configHead}.operationTrendConfig.busCapacity`),
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
      backgroundColor: 'rgba(9, 41, 75, 0.8)',
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
