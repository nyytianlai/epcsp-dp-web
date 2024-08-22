import { scale } from '@sutpc/config';
import i18n from '@/locales/i18n'; 
const { t } = i18n.global;
const configHead  = `special-scene.power-combine.config`;

export const parkingChargeAreaColumn = [
  {
    prop: 'areaName',
    label: '行政区',
    width: 3,
    displayLabel: t(`${configHead}.parkingChargeAreaColumn.areaName`)
  },
  {
    prop: 'totalParkingSpace',
    label: '车位数(个)',
    width: 3.5,
    displayLabel: t(`${configHead}.parkingChargeAreaColumn.totalParkingSpace`)
  },
  {
    prop: 'totalGun',
    label: '充电枪数(个)',
    width: 4,
    displayLabel: t(`${configHead}.parkingChargeAreaColumn.totalGun`)
  },
  {
    prop: 'stopChargeRatio',
    label: '车充配比',
    width: 3,
    displayLabel: t(`${configHead}.parkingChargeAreaColumn.stopChargeRatio`)
  }
];

export const parkingChargeOperationColumn = [
  {
    prop: 'areaName',
    label: '行政区',
    width: 2,
    displayLabel: t(`${configHead}.parkingChargeOperationColumn.areaName`)
  },
  {
    prop: 'dailyParkingVolume',
    label: '停车量(辆)',
    width: 2,
    align: 'center',
    displayLabel: t(`${configHead}.parkingChargeOperationColumn.dailyParkingVolume`)
  },
  {
    prop: 'dailyChargingVolume',
    label: '充电量(kWh)',
    width: 2,
    align: 'center',
    displayLabel: t(`${configHead}.parkingChargeOperationColumn.dailyChargingVolume`)
  },
  {
    prop: 'rate',
    label: '车位/充电枪利用率(%)',
    width: 4,
    align: 'center',
    displayLabel: t(`${configHead}.parkingChargeOperationColumn.rate`)
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
