import cdzzl from './images/cdzzl.png';
import xnyqczl from './images/xnyqczl.png';
import yjryyqyzl from './images/yjryyqyzl.png';

import zlcd from './images/zlcd.png';
import jlcd from './images/jlcd.png';
import fast from './images/fast.png';
import slow from './images/slow.png';
import speed from './images/speed.png';
import v2g from './images/v2g.png';
import ztsyl from './images/ztsyl.png';
import zxzl from './images/zxzl.png';

import zgl from './images/zgl.png';
import ssgl from './images/ssgl.png';

import dayjs from 'dayjs';

import i18n from '@/locales/i18n'; 
const { t } = i18n.global;
const configHead  = `charging-station.config`;

export const cdsszlFun = (data = {}) => {
  return [
    {
      img: cdzzl,
      num: data?.totalChargingStations,
      unit: t(`${configHead}.cdsszlFun.unitGe`),
      name: '充电站总量',
      displayUnit: t(`${configHead}.cdsszlFun.unitGe`),
      displayName: t(`${configHead}.cdsszlFun.cdzzl`),
    },
    {
      img: xnyqczl,
      num: data?.totalOperating,
      unit: t(`${configHead}.cdsszlFun.unitGe`),
      name: '已接入运营企业总量',
      displayUnit: t(`${configHead}.cdsszlFun.unitGe`),
      displayName: t(`${configHead}.cdsszlFun.yjryyqyzl`),
    },
    {
      img: yjryyqyzl,
      num: data?.totalNewEnergyVehicles,
      unit: t(`${configHead}.cdsszlFun.unitWanLiang`) || '万辆',
      name: '新能源汽车总量',
      displayUnit: t(`${configHead}.cdsszlFun.unitWanLiang`),
      displayName: t(`${configHead}.cdsszlFun.xnyqczl`),
    }
  ];
};

export const projectListFun = () => {
  //  || '个'
  return [
    {
      num: 6399,
      unit: t(`${configHead}.projectListFun.unitGe`),
      name: '充电站总量',
      displayUnit: t(`${configHead}.projectListFun.unitGe`),
      displayName: t(`${configHead}.projectListFun.cdzzl`),
    },
    {
      num: 5555,
      unit: t(`${configHead}.projectListFun.unitGe`),
      name: '已接入运营企业总量',
      displayUnit: t(`${configHead}.projectListFun.unitGe`),
      displayName: t(`${configHead}.projectListFun.yjryyqyzl`),
    },
    {
      num: 666,
      unit: t(`${configHead}.projectListFun.unitGe`),
      name: '新能源汽车总量',
      displayUnit: t(`${configHead}.projectListFun.unitGe`),
      displayName: t(`${configHead}.projectListFun.xnyqczl`),
    },
    {
      num: 2010,
      unit: t(`${configHead}.projectListFun.unitGe`),
      name: '已接入运营企业总量',
      displayUnit: t(`${configHead}.projectListFun.unitGe`),
      displayName: t(`${configHead}.projectListFun.yjryyqyzl`),
    },
    {
      num: 4800,
      unit: t(`${configHead}.projectListFun.unitGe`),
      name: '新能源汽车总量',
      displayUnit: t(`${configHead}.projectListFun.unitGe`),
      displayName: t(`${configHead}.projectListFun.xnyqczl`),
    },
    {
      num: 6399,
      unit: t(`${configHead}.projectListFun.unitGe`),
      name: '充电站总量',
      displayUnit: t(`${configHead}.projectListFun.unitGe`),
      displayName: t(`${configHead}.projectListFun.cdzzl`),
    },
    {
      num: 2010,
      unit: t(`${configHead}.projectListFun.unitGe`),
      name: '已接入运营企业总量',
      displayUnit: t(`${configHead}.projectListFun.unitGe`),
      displayName: t(`${configHead}.projectListFun.yjryyqyzl`),
    },
    {
      num: 4800,
      unit: t(`${configHead}.projectListFun.unitGe`),
      name: '新能源汽车总量',
      displayUnit: t(`${configHead}.projectListFun.unitGe`),
      displayName: t(`${configHead}.projectListFun.xnyqczl`),
    },
    {
      num: 2010,
      unit: t(`${configHead}.projectListFun.unitGe`),
      name: '已接入运营企业总量',
      displayUnit: t(`${configHead}.projectListFun.unitGe`),
      displayName: t(`${configHead}.projectListFun.yjryyqyzl`),
    },
    {
      num: 4800,
      unit: t(`${configHead}.projectListFun.unitGe`),
      name: '新能源汽车总量',
      displayUnit: t(`${configHead}.projectListFun.unitGe`),
      displayName: t(`${configHead}.projectListFun.xnyqczl`),
    }
  ];
};

export const chargingStationTabsFun = () => {
  return [
    {
      code: 1,
      chargingType: 'speed',
      typeCharge: 'pile',
      label: '充电桩类型',
      displayLabel: t(`${configHead}.chargingStationTabsFun.cdzlx`),
    },
    {
      code: 2,
      chargingType: 'electricity',
      typeCharge: 'pile',
      label: '充电桩电流类型',
      displayLabel: t(`${configHead}.chargingStationTabsFun.cdzdllx`),
    }
  ];
};

export const chargingStationGunTabsFun = () => {
  return [
    {
      code: 1,
      chargingType: 'speed',
      typeCharge: 'gun',
      label: '充电枪类型',
      displayLabel: t(`${configHead}.chargingStationGunTabsFun.cdqlx`),
    },
    {
      code: 2,
      chargingType: 'electricity',
      typeCharge: 'gun',
      label: '充电枪电流类型',
      displayLabel: t(`${configHead}.chargingStationGunTabsFun.cdqdllx`),
    },
    {
      code: 3,
      chargingType: 'speed',
      typeCharge: 'gun',
      label: '充电枪类型',
      displayLabel: t(`${configHead}.chargingStationGunTabsFun.cdqlx`),
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
      displayUnit: t(`${configHead}.pageNumFun.unitYidu`),
    },
    {
      name: '累计充电次数',
      num: parseInt(data?.cumChargeCount),
      unit: data?.cumChargeCountUnit || '万次',
      displayName: t(`${configHead}.pageNumFun.ljcdcs`),
      displayUnit: t(`${configHead}.pageNumFun.unitWanci`),
    },
    {
      name: '累计充电时长',
      num: data?.cumChargeTime,
      unit: data?.cumChargeTimeUnit || '小时',
      displayName: t(`${configHead}.pageNumFun.ljcdsc`),
      displayUnit: t(`${configHead}.pageNumFun.unitHour`),
    },
    {
      name: '本年充电总量',
      num: data?.yearTotalCharge,
      unit: data?.yearTotalChargeUnit || '亿度',
      displayName: t(`${configHead}.pageNumFun.bncdzl`),
      displayUnit: t(`${configHead}.pageNumFun.unitYidu`),
    }
  ];
};

export const pileChargerFun = (code = 1, data = {}, maintab = 1) => {
  if (maintab === 1) {
    // 充电桩
    if (code === 1) {
      return [
        {
          img: fast,
          // num:29982,
          num: data?.fastChargeEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '快充桩总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.kczzl`),
        },
        {
          img: slow,
          // num:142337,
          num: data?.slowChargeEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '慢充桩总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.mczzl`),
        },
        {
          img: speed,
          // num:26,
          num: data?.overchargeEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '超充桩总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.cczzl`),
        },
        {
          img: v2g,
          // num:21,
          num: data?.v2GEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: 'V2G桩总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.v2gzzl`),
        }
      ];
    } else {
      return [
        {
          img: zlcd,
          num: data?.directEquCount,
          // num: 30008,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '直流桩总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.zlzzl`),
        },
        {
          img: jlcd,
          // num: 142337,
          num: data?.exchangeEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '交流桩总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.jlzzl`),
        },
        {
          img: jlcd,
          num: data?.acandDCCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '直交流桩总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.zjlzzl`),
        },
        {
          img: jlcd,
          num: data?.othersCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '其他桩总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.qtzzl`),
        },
        {
          img: v2g,
          // num: 21,
          num: data?.v2GEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: 'V2G桩总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.v2gzzl`),
        }
      ];
    }
  } else {
    if (code === 1) {
      return [
        {
          img: fast,
          num: data?.fastChargeEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '快充枪总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.kcqzl`),
        },
        {
          img: slow,
          num: data?.slowChargeEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '慢充枪总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.mcqzl`),
        },
        {
          img: speed,
          num: data?.overchargeEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '超充枪总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.ccqzl`),
        },
        {
          img: v2g,
          num: data?.v2GEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: 'V2G枪总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.v2qzl`),
        }
      ];
    } else {
      return [
        {
          img: zlcd,
          num: data?.directEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '直流枪总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.zlqzl`),
        },
        {
          img: jlcd,
          num: data?.exchangeEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '交流枪总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.jlqzl`),
        },
        {
          img: jlcd,
          num: data?.acandDCCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '直交流枪总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.zjlqzl`),
        },
        {
          img: jlcd,
          num: data?.othersCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: '其他枪总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.qtqzl`),
        },
        {
          img: v2g,
          num: data?.v2GEquCount,
          unit: t(`${configHead}.pileChargerFun.unitGe`), //'个',
          name: 'V2G枪总量',
          displayUnit: t(`${configHead}.pileChargerFun.unitGe`),
          displayName: t(`${configHead}.pileChargerFun.v2gqzl`),
        }
      ];
    }
  }
};

export const operatingTabsFun = () => {
  return [
    {
      code: 'station',
      label: '充电站',
      displayLabel: t(`${configHead}.operatingTabsFun.cdzhan`),
    },
    {
      code: 'pile',
      label: '充电桩',
      displayLabel: t(`${configHead}.operatingTabsFun.cdzhuang`),
    },
    {
      code: 'gun',
      label: '充电枪',
      displayLabel: t(`${configHead}.operatingTabsFun.cdq`),
    }
  ];
};

export const todayTabsFun = () => {
  return [
    {
      code: 'pile',
      label: '充电桩信息',
      displayLabel: t(`${configHead}.todayTabsFun.cdzxx`),
    },
    {
      code: 'gun',
      label: '充电枪信息',
      displayLabel: t(`${configHead}.todayTabsFun.cdqxx`),
    }
  ];
};

export const todayInfoNumDataFun = (data = {}) => {
  return [
    {
      img: ztsyl,
      num:
        data?.overallUtilization || data?.overallUtilization === 0
          ? data?.overallUtilization + '%'
          : '--',
      name: '整体使用率',
      classStyleType: 'leftRightStyleGreen',
      displayName: t(`${configHead}.todayInfoNumDataFun.ztsyl`),
    },
    {
      img: zxzl,
      num: data?.totalOnline,
      unit: t(`${configHead}.todayInfoNumDataFun.unitGe`), // '个',
      name: '在线总量',
      classStyleType: 'leftRightStyleYellow',
      displayName: t(`${configHead}.todayInfoNumDataFun.zxzl`),
      displayUnit: t(`${configHead}.todayInfoNumDataFun.unitGe`),
    }
  ];
};

export const lineTimeDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  return [
    // {
    //   data: data.map((item) => [yearMonthDay + item.timeDim, item.ratedPower]),
    //   type: 'line',
    //   smooth: true,
    //   name: '额定功率'
    // },
    {
      data: data.map((item) => [yearMonthDay + item.timeDim, item.realTimePower]),
      type: 'line',
      smooth: true,
      name: t(`${configHead}.lineTimeDataFun.ssgl`) || '实时功率',
      displayName: t(`${configHead}.lineTimeDataFun.ssgl`),
    }
  ];
};

export const warningTabsDataFun = (data = {}) => {
  return [
    {
      label: '一级人身安全',
      icon: 'first-level',
      num: data?.firstLevel,
      code: '1',
      color: '#FA2A2D',
      displayLabel: t(`${configHead}.warningTabsDataFun.yjrsaq`),
    },
    {
      label: '二级设备安全',
      icon: 'second-level',
      num: data?.secondLevel,
      code: '2',
      color: '#FF7500',
      displayLabel: t(`${configHead}.warningTabsDataFun.ejsbaq`),
    },
    {
      label: '三级告警提示',
      icon: 'third-level',
      num: data?.thirdLevel,
      code: '3',
      color: '#FFBF00',
      displayLabel: t(`${configHead}.warningTabsDataFun.sjgjts`),
    }
  ];
};

export const warningListFun = () => {
  return [
    {
      date: '12:30:12',
      message: '充电桩排队人数过多充电桩排队人数过多',
      area: '南山区充电桩排队人数过多',
      displayMessage: t(`${configHead}.warningListFun.cdzpdrsgdcdzpdrsgd`),
      displayArea: t(`${configHead}.warningListFun.nsqcdzpdrsgd`),
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区',
      displayMessage: t(`${configHead}.warningListFun.cdzpdrsgd`),
      displayArea: t(`${configHead}.warningListFun.nsq`),
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区',
      displayMessage: t(`${configHead}.warningListFun.cdzpdrsgd`),
      displayArea: t(`${configHead}.warningListFun.nsq`),
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区',
      displayMessage: t(`${configHead}.warningListFun.cdzpdrsgd`),
      displayArea: t(`${configHead}.warningListFun.nsq`),
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区',
      displayMessage: t(`${configHead}.warningListFun.cdzpdrsgd`),
      displayArea: t(`${configHead}.warningListFun.nsq`),
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多充电桩排队人数过多',
      area: '南山区充电桩排队人数过多',
      displayMessage: t(`${configHead}.warningListFun.cdzpdrsgdcdzpdrsgd`),
      displayArea: t(`${configHead}.warningListFun.nsqcdzpdrsgd`),
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区',
      displayMessage: t(`${configHead}.warningListFun.cdzpdrsgd`),
      displayArea: t(`${configHead}.warningListFun.nsq`),
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区',
      displayMessage: t(`${configHead}.warningListFun.cdzpdrsgd`),
      displayArea: t(`${configHead}.warningListFun.nsq`),
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区',
      displayMessage: t(`${configHead}.warningListFun.cdzpdrsgd`),
      displayArea: t(`${configHead}.warningListFun.nsq`),
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区',
      displayMessage: t(`${configHead}.warningListFun.cdzpdrsgd`),
      displayArea: t(`${configHead}.warningListFun.nsq`),
    }
  ];
};

export const bottomTabDataFun = () => {
  return [
    {
      code: 1,
      label: '充电站',
      displayLabel: t(`${configHead}.bottomTabDataFun.cdz`)
    },
    {
      code: 2,
      label: '充电功率',
      displayLabel: t(`${configHead}.bottomTabDataFun.cdgl`)
    }
  ];
};


export const columnDataFun = () => {
  return [
    {
      prop: 'operatorName',
      label: t(`${configHead}.columnDataFun.yysmc`) || '运营商名称',
      minWidth: 2.0,
      displayLabel: t(`${configHead}.columnDataFun.yysmc`)
    },
    {
      prop: 'stationName',
      label: t(`${configHead}.columnDataFun.cdzmc`) || '充电站名称',
      minWidth: '2',
      displayLabel: t(`${configHead}.columnDataFun.cdzmc`)
    },
    {
      prop: 'alarmLevelName',
      label: t(`${configHead}.columnDataFun.gjjb`) || '告警级别',
      minWidth: 1,
      filterMultiple: true,
      displayLabel: t(`${configHead}.columnDataFun.gjjb`)
    },
    {
      prop: 'alarmTypeName',
      label: t(`${configHead}.columnDataFun.gjlx`) || '告警类型',
      minWidth: '1',
      displayLabel: t(`${configHead}.columnDataFun.gjlx`)
    },
    {
      prop: 'alarmDesc',
      label: t(`${configHead}.columnDataFun.gjms`) || '告警描述',
      minWidth: '2',
      displayLabel: t(`${configHead}.columnDataFun.gjms`)
    },
    {
      prop: 'alarmTime',
      label: t(`${configHead}.columnDataFun.gjsj`) || '告警时间',
      minWidth: 2,
      displayLabel: t(`${configHead}.columnDataFun.gjsj`)
    },
    {
      prop: 'contactPerson',
      label: t(`${configHead}.columnDataFun.aqfzr`) || '安全负责人',
      minWidth: 1,
      displayLabel: t(`${configHead}.columnDataFun.aqfzr`)
    },
    {
      prop: 'contactTel',
      label: t(`${configHead}.columnDataFun.lxdh`) || '联系电话',
      minWidth: 1.8,
      displayLabel: t(`${configHead}.columnDataFun.lxdh`)
    }
  ];
};
// 运营商详情弹窗

export const columnDataRankFun = () => {
  return [
    // {
    //   type: 'index',
    //   label: '序号',
    //   index:(index)=>(pageObj.currentPage - 1) * pageObj.pageSize + index + 1,
    //   minWidth:1
    // },
    {
      prop: 'operatorName',
      label: t(`${configHead}.columnDataRankFun.operatorName`) || '运营商名称',
      minWidth: 2,
      displayLabel: t(`${configHead}.columnDataRankFun.operatorName`)
    },
    {
      prop: 'stationNumber',
      label: t(`${configHead}.columnDataRankFun.stationNumber`) || '充电站',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      displayLabel: t(`${configHead}.columnDataRankFun.stationNumber`)
    },
    {
      prop: 'pileNumber',
      label: t(`${configHead}.columnDataRankFun.pileNumber`) || '充电桩',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      displayLabel: t(`${configHead}.columnDataRankFun.pileNumber`)
    },
    {
      prop: 'gunNumber',
      label: t(`${configHead}.columnDataRankFun.gunNumber`) || '充电枪',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      displayLabel: t(`${configHead}.columnDataRankFun.gunNumber`)
    },
    {
      prop: 'principal',
      label: t(`${configHead}.columnDataRankFun.principal`) || '负责人',
      minWidth: 1,
      displayLabel: t(`${configHead}.columnDataRankFun.principal`)
    },
    {
      prop: 'phone',
      label: t(`${configHead}.columnDataRankFun.phone`) || '联系电话',
      minWidth: 2,
      displayLabel: t(`${configHead}.columnDataRankFun.phone`)
    }
  ];
};

// 充电设施
export const columnDataChargeFun = () => {
  return [
    {
      prop: 'stationName',
      label: '充电站名称',
      minWidth: 2.8,
      displayLabel: t(`${configHead}.columnDataChargeFun.stationName`)
    },
    {
      prop: 'pileNumber',
      label: '充电桩/个',
      minWidth: 1.5,
      displayLabel: t(`${configHead}.columnDataChargeFun.pileNumber`)
    },
    {
      prop: 'gunNumber',
      label: '充电枪/个',
      minWidth: 1.5,
      displayLabel: t(`${configHead}.columnDataChargeFun.gunNumber`)
    },
    {
      prop: 'alarmNumber',
      label: '今日告警/次',
      minWidth: 1.5,
      displayLabel: t(`${configHead}.columnDataChargeFun.alarmNumber`)
    }
  ];
};
// 数据过滤的选项

export const filtersAlarmLevelName = [
  {
    id: 'all',
    label: t(`${configHead}.filtersAlarmLevelName.all`) || '全部',
    displayLabel: t(`${configHead}.filtersAlarmLevelName.all`),
    children: [
      {
        id: '1',
        label: t(`${configHead}.filtersAlarmLevelName.yjrsaq`) || '一级人身安全',
        displayLabel: t(`${configHead}.filtersAlarmLevelName.yjrsaq`)
      },
      {
        id: '2',
        label: t(`${configHead}.filtersAlarmLevelName.ejsbaq`) || '二级设备安全',
        displayLabel: t(`${configHead}.filtersAlarmLevelName.ejsbaq`)
      },
      {
        id: '3',
        label: t(`${configHead}.filtersAlarmLevelName.sjgjts`) || '三级告警提示',
        displayLabel: t(`${configHead}.filtersAlarmLevelName.sjgjts`)
      }
    ]
  }
];

// 警告类型数据过滤的选项
export const filtersAlarmTypeName = [
  {
    id: 'all',
    label: t(`${configHead}.filtersAlarmTypeName.all`)|| '全部',
    displayLabel: t(`${configHead}.filtersAlarmTypeName.all`),
    children: [
      {
        id: '1',
        label: t(`${configHead}.filtersAlarmTypeName.cdxt`) || '充电系统',
        displayLabel: t(`${configHead}.filtersAlarmTypeName.cdxt`),
      },
      {
        id: '2',
        label: t(`${configHead}.filtersAlarmTypeName.dcxt`) || '电池系统',
        displayLabel: t(`${configHead}.filtersAlarmTypeName.dcxt`),
      },
      {
        id: '3',
        label: t(`${configHead}.filtersAlarmTypeName.pdxt`) || '配电系统',
        displayLabel: t(`${configHead}.filtersAlarmTypeName.pdxt`),
      }
    ]
  }
];
