import { scale } from '@sutpc/config';
export const parkingChargeAreaColumn = [
  {
    prop: 'areaName',
    label: '行政区',
    width: 3
  },
  {
    prop: 'soltNum',
    label: '车位数(个)',
    width: 3.5
  },
  {
    prop: 'connectorNum',
    label: '充电枪数(个)',
    width: 4
  },
  {
    prop: 'rate',
    label: '车充配比',
    width: 3
  }
];
export const parkingChargeOperationColumn = [
  {
    prop: 'areaName',
    label: '行政区',
    width: 2
  },
  {
    prop: 'parkingNum',
    label: '停车量(辆)',
    width: 2,
    align: 'center'
  },
  {
    prop: 'power',
    label: '充电量(kWh)',
    width: 2,
    align: 'center'
  },
  {
    prop: 'rate',
    label: '车位/充电枪利用率(%)',
    width: 4,
    align: 'center'
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
