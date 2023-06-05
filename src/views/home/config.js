import ztsyl from '@/views/charging-station/images/ztsyl.png';
import ncd from './images/ncd.png';
export const pageNumFun = (data = {}) => {
  return {
    overview: [
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
    ]
  };
};

export const chargingStationsFun = (data = {}) => {
  return [
    {
      img: ztsyl,
      num: 6399,
      unit: '个',
      name: '充电站总数',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: ncd,
      num: 2.66,
      unit: '亿KWh',
      name: '年充电量',
      classStyleType: 'leftRightStyleYellow5858'
    }
  ];
};
