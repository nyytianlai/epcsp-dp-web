import clientUsage from './images/client-usage.png';
import { deepClone } from '@/utils/index';
import i18n from '@/locales/i18n'; 
const { t } = i18n.global;
const configHead = `public-service.config`;

import dayjs from 'dayjs';

export const clientInfo = [
  {
    code: 1,
    label: '客户端实时信息',
    displayLabel: t(`${configHead}.clientInfo.clientRealtimeInfo`),
  }
];

export const clientRealtimeTrend = [
  {
    code: 1,
    label: '客户端实时趋势情况',
    displayLabel: t(`${configHead}.clientRealtimeTrend.clientRealtimeTrendInfo`),
  }
];

export const lineStateDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  const nowTime = dayjs().format('HH');

  const data1 = [
    {
      time: '01',
      onlineCount: 10
    },
    {
      time: '02',
      onlineCount: 0
    },
    {
      time: '03',
      onlineCount: 2
    },
    {
      time: '04',
      onlineCount: 4
    },
    {
      time: '05',
      onlineCount: 18
    },
    {
      time: '06',
      onlineCount: 23
    },
    {
      time: '07',
      onlineCount: 68
    },
    {
      time: '08',
      onlineCount: 103
    },
    {
      time: '09',
      onlineCount: 287
    },
    {
      time: '10',
      onlineCount: 367
    },
    {
      time: '11',
      onlineCount: 568
    },
    {
      time: '12',
      onlineCount: 400
    },
    {
      time: '13',
      onlineCount: 346
    },
    {
      time: '14',
      onlineCount: 287
    },
    {
      time: '15',
      onlineCount: 200
    },
    {
      time: '16',
      onlineCount: 236
    },
    {
      time: '17',
      onlineCount: 426
    },
    {
      time: '18',
      onlineCount: 563
    },
    {
      time: '19',
      onlineCount: 214
    },
    {
      time: '20',
      onlineCount: 654
    }
  ];
  const index = data1.findIndex((i) => {
    return nowTime === i.time;
  });
  let data2 = deepClone(data1);
  data2.splice(index + 1);
  return [
    {
      data: data2.map((item) => [yearMonthDay + item.time, item.onlineCount]),
      type: 'line',
      smooth: true,
      name: t(`${configHead}.lineStateDataFun.fwl`) || '访问量',
      displayName: t(`${configHead}.lineStateDataFun.fwl`)
    }
  ];
};

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '累计充电量',
      num: data?.cumulativeCharge,
      unit: data?.cumulativeChargeUnit || '亿度',
      displayName: t(`${configHead}.pageNumFun.ljcdl`),
      displayUnit: t(`${configHead}.pageNumFun.unitYidu`)
    },
    {
      name: '累计充电次数',
      num: data?.cumChargeCount,
      unit: data?.cumChargeCountUnit || '万次',
      displayName: t(`${configHead}.pageNumFun.ljccs`),
      displayUnit: t(`${configHead}.pageNumFun.unitWanci`)
    },
    {
      name: '累计充电时长',
      num: data?.cumChargeTime,
      unit: data?.cumChargeTimeUnit || '万小时',
      displayName: t(`${configHead}.pageNumFun.ljcdsc`),
      displayUnit: t(`${configHead}.pageNumFun.unitWanxs`)
    },
    {
      name: '本年充电总量',
      num: data?.yearTotalCharge,
      unit: data?.yearTotalChargeUnit || '亿度',
      displayName: t(`${configHead}.pageNumFun.bncdzl`),
      displayUnit: t(`${configHead}.pageNumFun.unitYidu`)
    }
  ];
};

export const hotChargingDataFun = () => {
  return [
    {
      num: 6399,
      unit: 'kW',
      name: '充电站总量',
      displayName: t(`${configHead}.hotChargingDataFun.cdlzl`)
    },
    {
      num: 201,
      unit: 'kW',
      name: '已接入运营企业总量',
      displayName: t(`${configHead}.hotChargingDataFun.yjryyqyzl`)
    },
    {
      num: 48,
      unit: 'kW',
      name: '新能源汽车总量',
      displayName: t(`${configHead}.hotChargingDataFun.xnyqczl`)
    },
    {
      num: 201,
      unit: 'kW',
      name: '已接入运营企业总量',
      displayName: t(`${configHead}.hotChargingDataFun.yjryyqyzl`)
    },
    {
      num: 48,
      unit: 'kW',
      name: '新能源汽车总量',
      displayName: t(`${configHead}.hotChargingDataFun.xnyqczl`)
    }
  ];
};

export const deviceDataFun = (data = {}) => {
  return [
    {
      img: clientUsage,
      // num: data?.equipmentCount,
      num: 25639,
      name: '昨日访问量/次',
      iconStyle: {
        width: '0.78rem',
        height: '0.58rem'
      },
      numStyle: {
        lineHeight: '0.32rem',
        fontSize: '0.32rem',
        background: 'linear-gradient(180deg, #00F7FF 0%, #D5FEFF 52.08%, #00F7FF 100%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      },
      nameStyle: {
        fontSize: '0.14rem',
        lineHeight: '0.22rem'
      },
      displayName: t(`${configHead}.deviceDataFun.zrfwlci`)
    },
    {
      img: clientUsage,
      // num: data?.gunCount,
      num: 19323,
      name: '今日访问量/次',
      iconStyle: {
        width: '0.78rem',
        height: '0.58rem'
      },
      numStyle: {
        lineHeight: '0.32rem',
        fontSize: '0.32rem',
        background: 'linear-gradient(180deg, #F9E900 0%, #FFFFFF 52.08%, #F9E900 100%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      },
      nameStyle: {
        fontSize: '0.14rem',
        lineHeight: '0.22rem'
      },
      displayName: t(`${configHead}.deviceDataFun.jrfwlci`)
    }
  ];
};

export const chargingTypesTabsFun = () => {
  return [
    {
      code: 'pile',
      label: '充电桩',
      displayLabel: t(`${configHead}.chargingTypesTabsFun.cdz`),
    },
    {
      code: 'gun',
      label: '充电枪',
      displayLabel: t(`${configHead}.chargingTypesTabsFun.cdq`),
    }
  ];
};

export const chargingTypePieDataFun = (code = 'pile', data = {}) => {
  if (code === 'pile') {
    return [
      {
        value: data?.offLine,
        name: '离线',
        extraName: '离线充电桩',
        unit: '个',
        displayName: t(`${configHead}.chargingTypePieDataFun.lx`),
        displayExtraName: t(`${configHead}.chargingTypePieDataFun.lxcdz`),
        displayUnit: t(`${configHead}.chargingTypePieDataFun.unitGe`),
      },
      { value: data?.occupy, 
        name: '占用', 
        extraName: '占用充电桩', 
        unit: '个',
        displayName: t(`${configHead}.chargingTypePieDataFun.zy`),
        displayExtraName: t(`${configHead}.chargingTypePieDataFun.zycdz`),
        displayUnit: t(`${configHead}.chargingTypePieDataFun.unitGe`),
      },
      { value: data?.malfunction, 
        name: '故障', 
        extraName: '故障充电桩', 
        unit: '个',
        displayName: t(`${configHead}.chargingTypePieDataFun.gz`),
        displayExtraName: t(`${configHead}.chargingTypePieDataFun.gzcdz`),
        displayUnit: t(`${configHead}.chargingTypePieDataFun.unitGe`),
      },
      { value: data?.free, 
        name: '闲置', 
        extraName: '闲置充电桩', 
        unit: '个',
        displayName: t(`${configHead}.chargingTypePieDataFun.xz`),
        displayExtraName: t(`${configHead}.chargingTypePieDataFun.xzcdz`),
        displayUnit: t(`${configHead}.chargingTypePieDataFun.unitGe`), }
    ];
  } else {
    return [
      { value: data?.offLine, 
        name: '离线', 
        extraName: '离线充电枪', 
        unit: '个',
        displayName: t(`${configHead}.chargingTypePieDataFun.lx`),
        displayExtraName: t(`${configHead}.chargingTypePieDataFun.lxcdq`),
        displayUnit: t(`${configHead}.chargingTypePieDataFun.unitGe`),
      },
      { value: data?.occupy, 
        name: '占用', 
        extraName: '占用充电枪', 
        unit: '个',
        displayName: t(`${configHead}.chargingTypePieDataFun.zy`),
        displayExtraName: t(`${configHead}.chargingTypePieDataFun.zycdq`),
        displayUnit: t(`${configHead}.chargingTypePieDataFun.unitGe`),
      },
      { value: data?.malfunction, 
        name: '故障', 
        extraName: '故障充电枪', 
        unit: '个',
        displayName: t(`${configHead}.chargingTypePieDataFun.gz`),
        displayExtraName: t(`${configHead}.chargingTypePieDataFun.gzcdq`),
        displayUnit: t(`${configHead}.chargingTypePieDataFun.unitGe`),
      },
      { value: data?.free, 
        name: '闲置', 
        extraName: '闲置充电枪', 
        unit: '个',
        displayName: t(`${configHead}.chargingTypePieDataFun.xz`),
        displayExtraName: t(`${configHead}.chargingTypePieDataFun.xzcdq`),
        displayUnit: t(`${configHead}.chargingTypePieDataFun.unitGe`),
      }
    ];
  }
};

export const monthRateDataFun = () => {
  return [
    {
      num: 6399,
      unit: '个',
      name: '南山区',
      displayName: t(`${configHead}.monthRateDataFun.nsq`),
      displayUnit: t(`${configHead}.monthRateDataFun.unitGe`),
    },
    {
      num: 201,
      unit: '个',
      name: '宝安区',
      displayName: t(`${configHead}.monthRateDataFun.baq`),
      displayUnit: t(`${configHead}.monthRateDataFun.unitGe`),
    },
    {
      num: 48,
      unit: '个',
      name: '罗湖区',
      displayName: t(`${configHead}.monthRateDataFun.lhq`),
      displayUnit: t(`${configHead}.monthRateDataFun.unitGe`),
    },
    {
      num: 201,
      unit: '个',
      name: '龙华区',
      displayName: t(`${configHead}.monthRateDataFun.longhq`),
      displayUnit: t(`${configHead}.monthRateDataFun.unitGe`),
    },
    {
      num: 48,
      unit: '个',
      name: '龙岗区',
      displayName: t(`${configHead}.monthRateDataFun.longgq`),
      displayUnit: t(`${configHead}.monthRateDataFun.unitGe`),
    },
    {
      num: 6399,
      unit: '个',
      name: '南山区',
      displayName: t(`${configHead}.monthRateDataFun.nsq`),
      displayUnit: t(`${configHead}.monthRateDataFun.unitGe`),
    },
    {
      num: 201,
      unit: '个',
      name: '宝安区',
      displayName: t(`${configHead}.monthRateDataFun.baq`),
      displayUnit: t(`${configHead}.monthRateDataFun.unitGe`),
    },
    {
      num: 48,
      unit: '个',
      name: '罗湖区',
      displayName: t(`${configHead}.monthRateDataFun.lhq`),
      displayUnit: t(`${configHead}.monthRateDataFun.unitGe`),
    },
    {
      num: 201,
      unit: '个',
      name: '龙华区',
      displayName: t(`${configHead}.monthRateDataFun.longhq`),
      displayUnit: t(`${configHead}.monthRateDataFun.unitGe`),
    },
    {
      num: 48,
      unit: '个',
      name: '大鹏新区',
      displayName: t(`${configHead}.monthRateDataFun.dpxq`),
      displayUnit: t(`${configHead}.monthRateDataFun.unitGe`),
    }
  ];
};

export const chargingStationTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电功率',
      displayLabel: t(`${configHead}.chargingStationTabsFun.cdgl`),
    },
    {
      code: 2,
      label: '充电次数',
      displayLabel: t(`${configHead}.chargingStationTabsFun.cdcs`),
    }
  ];
};

export const columnDataHotFun = () => {
  return [
    {
      prop: 'stationName',
      label: t(`${configHead}.columnDataHotFun.cdzmc`) || '充电站名称',
      minWidth: 2.8,
      displayLabel: t(`${configHead}.columnDataHotFun.cdzmc`),
    },
    {
      prop: 'operatorName',
      label: t(`${configHead}.columnDataHotFun.yyqymc`) || '运营企业名称',
      minWidth: 2,
      displayLabel: t(`${configHead}.columnDataHotFun.yyqymc`),
    },
    {
      prop: 'areaName',
      label: t(`${configHead}.columnDataHotFun.ssqy`) || '所属区域',
      minWidth: 1,
      filterMultiple: true,
      displayLabel: t(`${configHead}.columnDataHotFun.ssqy`),
    },
    {
      prop: 'power',
      label:  t(`${configHead}.columnDataHotFun.cdgl`) || '充电功率',
      minWidth: '2',
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      displayLabel: t(`${configHead}.columnDataHotFun.cdgl`),
    },
    {
      prop: 'amount',
      label: t(`${configHead}.columnDataHotFun.cdcs`) || '充电次数',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      displayLabel: t(`${configHead}.columnDataHotFun.cdcs`),
    }
  ];
};

// 数据过滤的选项
export const filters = [
  {
    id: 1,
    label: '全部',
    displayLabel: t(`${configHead}.filters.all`),
    children: [
      {
        id: 440303,
        label: '罗湖区',
        displayLabel: t(`${configHead}.filters.lhq`),
      },
      {
        id: 440304,
        label: '福田区',
        displayLabel: t(`${configHead}.filters.ftq`),
      },
      {
        id: 440305,
        label: '南山区',
        displayLabel: t(`${configHead}.filters.nsq`),
      },
      {
        id: 440306,
        label: '宝安区',
        displayLabel: t(`${configHead}.filters.baq`),
      },
      {
        id: 440307,
        label: '龙岗区',
        displayLabel: t(`${configHead}.filters.longgq`),
      },
      {
        id: 440308,
        label: '盐田区',
        displayLabel: t(`${configHead}.filters.ytq`),
      },
      {
        id: 440309,
        label: '龙华区',
        displayLabel: t(`${configHead}.filters.longhq`),
      },
      {
        id: 440310,
        label: '坪山区',
        displayLabel: t(`${configHead}.filters.psq`),
      },
      {
        id: 440311,
        label: '光明区',
        displayLabel: t(`${configHead}.filters.gmq`),
      },
      {
        id: 440343,
        label: '大鹏新区',
        displayLabel: t(`${configHead}.filters.dpxq`),
      },
      {
        id: 441521,
        label: '深汕特别合作区',
        displayLabel: t(`${configHead}.filters.sstbhzq`),
      }
    ]
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
      left: 30
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
        color: 'rgba(19,171,194, 0.8)'
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
      },
      formatter: `{b}: {c}${t(`${configHead}.ecOptionFun.unitGe`) || '个'}`
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
      name: t(`${configHead}.ecOptionFun.yAxisName`) || '单位/个',
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
        color: '#B4C0CC'
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
        name: t(`${configHead}.ecOptionFun.wtsl`) || '问题数量',
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
                color: 'rgba(0, 163, 255, 0.000001)'
              },
              {
                offset: 0,
                color: '#13ABC2'
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
      //   symbolSize: ['16', '3'],
      //   symbolPosition: 'end',
      //   data: data,
      //   z: 3
      // }
    ]
  };
};

export const columnDataDetailFun = () => {
  return [
    {
      prop: 'stationName',
      label: t(`${configHead}.columnDataDetailFun.stationName`) || '充电站名称',
      minWidth: 2,
      displayLabel: t(`${configHead}.columnDataDetailFun.stationName`)
    },
    {
      prop: 'operatorName',
      label: t(`${configHead}.columnDataDetailFun.operatorName`) || '运营企业名称',
      minWidth: 2,
      displayLabel: t(`${configHead}.columnDataDetailFun.operatorName`)
    },
    {
      prop: 'problemType',
      label: t(`${configHead}.columnDataDetailFun.problemType`) || '问题类型',
      minWidth: 1,
      filterMultiple: true,
      displayLabel: t(`${configHead}.columnDataDetailFun.problemType`)
    },
    {
      prop: 'problemDescribe',
      label: t(`${configHead}.columnDataDetailFun.problemDescribe`) || '问题描述',
      minWidth: '1.5',
      displayLabel: t(`${configHead}.columnDataDetailFun.problemDescribe`)
    },
    {
      prop: 'principal',
      label: t(`${configHead}.columnDataDetailFun.principal`) || '负责人',
      minWidth: 1,
      displayLabel: t(`${configHead}.columnDataDetailFun.principal`)
    },
    {
      prop: 'phone',
      label: t(`${configHead}.columnDataDetailFun.phone`) || '联系电话',
      minWidth: 1.5,
      displayLabel: t(`${configHead}.columnDataDetailFun.phone`)
    },
    {
      prop: 'timeDim',
      label: t(`${configHead}.columnDataDetailFun.timeDim`) || '时间',
      minWidth: 2,
      displayLabel: t(`${configHead}.columnDataDetailFun.timeDim`)
    }
  ];
};

// 市民问题类型
export const filtersDetail = [
  {
    id: 'all',
    label: '全部',
    displayLabel: t(`${configHead}.filtersDetail.all`),
    children: [
      {
        id: '有车站位',
        label: '有车站位',
        displayLabel: t(`${configHead}.filtersDetail.yczw`),
      },
      {
        id: '桩位不放开',
        label: '桩位不放开',
        displayLabel: t(`${configHead}.filtersDetail.zwvfk`),
      },
      {
        id: '无法充电',
        label: '无法充电',
        displayLabel: t(`${configHead}.filtersDetail.wfcd`),
      },
      {
        id: '找不到电桩',
        label: '找不到电桩',
        displayLabel: t(`${configHead}.filtersDetail.zbddz`),
      },
      {
        id: '其他',
        label: '其他',
        displayLabel: t(`${configHead}.filtersDetail.qt`),
      }
    ]
  }
];
//区级的柱状图
export const mapQuBar = () => {
  return [
    {
      areaCode: 440303,
      enrollment: 24667,
      visits: 1265
    },
    {
      areaCode: 440304,
      enrollment: 42456,
      visits: 2678
    },
    {
      areaCode: 440305,
      enrollment: 38543,
      visits: 2346
    },
    {
      areaCode: 440306,
      enrollment: 42345,
      visits: 3142
    },
    {
      areaCode: 440307,
      enrollment: 55284,
      visits: 2689
    },
    {
      areaCode: 440308,
      enrollment: 14567,
      visits: 690
    },
    {
      areaCode: 440309,
      enrollment: 50879,
      visits: 3786
    },
    {
      areaCode: 440310,
      enrollment: 21567,
      visits: 1461
    },
    {
      areaCode: 440311,
      enrollment: 12345,
      visits: 476
    },
    {
      areaCode: 440343,
      enrollment: 9683,
      visits: 478
    },
    {
      areaCode: 441521,
      enrollment: 6542,
      visits: 312
    }
  ];
};
