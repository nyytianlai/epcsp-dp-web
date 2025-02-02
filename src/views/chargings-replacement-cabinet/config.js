import chdzsszl from './images/chdzsszl.png';
import jrqyzs from './images/jrqyzs.png';
import ztsyl from './images/ztsyl.png';
import zxzl from './images/zxzl.png';
import edzgl from './images/edzgl.png';
import sszgl from './images/sszgl.png';
import dayjs from 'dayjs';
import { deepClone } from '@/utils/index';

import i18n from '@/locales/i18n';
const { t } = i18n.global;
// 排名
export const facilitiesRankData = [
  {
    num: 145,
    // unit: '个',
    // name: '猛犸出行-三角楼3号',
    unit: t('chargings-replacement-cabinet.unit.unitGe'),
    name: t('chargings-replacement-cabinet.facilitiesRankData.0')
  },
  {
    num: 123,
    // unit: '个',
    unit: t('chargings-replacement-cabinet.unit.unitGe'),
    // name: '猛犸出行-罗丰路五巷5号'
    name: t('chargings-replacement-cabinet.facilitiesRankData.1')
  },
  {
    num: 121,
    // unit: '个',
    unit: t('chargings-replacement-cabinet.unit.unitGe'),
    // name: '猛犸出行-机电市场4'
    name: t('chargings-replacement-cabinet.facilitiesRankData.2')
  },
  {
    num: 95,
    // unit: '个',
    unit: t('chargings-replacement-cabinet.unit.unitGe'),
    // name: '猛犸出行-井水龙新一巷10号'
    name: t('chargings-replacement-cabinet.facilitiesRankData.3')
  },
  {
    num: 87,
    // unit: '个',
    unit: t('chargings-replacement-cabinet.unit.unitGe'),
    // name: '猛犸出行-盘古石村1-4号'
    name: t('chargings-replacement-cabinet.facilitiesRankData.4')
  },
  {
    num: 63,
    // unit: '个',
    unit: t('chargings-replacement-cabinet.unit.unitGe'),
    // name: '猛犸出行-松子坑路二巷17号'
    name: t('chargings-replacement-cabinet.facilitiesRankData.5')
  },
  {
    num: 55,
    // unit: '个',
    unit: t('chargings-replacement-cabinet.unit.unitGe'),
    // name: '猛犸出行-东坑路7-1号'
    name: t('chargings-replacement-cabinet.facilitiesRankData.6')
  },
  {
    num: 51,
    // unit: '个',
    unit: t('chargings-replacement-cabinet.unit.unitGe'),
    // name: '猛犸出行-深圳均衡精密五金制品有限公司'
    name: t('chargings-replacement-cabinet.facilitiesRankData.7')
  },
  {
    num: 50,
    // unit: '个',
    unit: t('chargings-replacement-cabinet.unit.unitGe'),
    // name: '猛犸出行-西坑村22号'
    name: t('chargings-replacement-cabinet.facilitiesRankData.8')
  },
  {
    num: 49,
    // unit: '个',
    unit: t('chargings-replacement-cabinet.unit.unitGe'),
    // name: '猛犸出行-东坑路8号'
    name: t('chargings-replacement-cabinet.facilitiesRankData.9')
  }
];

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '年累计充电量',
      // num: data?.cumulativeCharge,
      num: 0.11,
      unit: '亿kWh'
    },
    {
      name: '年累计充电次数',
      // num: data?.cumChargeCount,
      num: 58.02,
      unit: '万次'
    },
    {
      name: '年累计充电时长',
      // num: data?.cumChargeTime,
      num: 4033.12,
      unit: '万h'
    },
    {
      name: '年累计换电次数',
      // num: data?.cumChargeTime,
      num: 663.25,
      unit: '万次'
    }
  ];
};
export const chdsszlFun = (data = {}) => {
  return [
    {
      img: chdzsszl,
      num: data?.total,
      // unit: '个',
      // name: '充换电柜总量'
      unit: t('chargings-replacement-cabinet.unit.unitGe'),
      name: t('chargings-replacement-cabinet.chdsszlFun.chdgzl')
    },
    {
      img: jrqyzs,
      num: data?.operatorAmount,
      // unit: '个',
      // name: '接入企业总数'
      unit: t('chargings-replacement-cabinet.unit.unitGe'),
      name: t('chargings-replacement-cabinet.chdsszlFun.jrqyzs')
    }
  ];
};
export const chargingType = [
  {
    code: 1,
    // label: '充换电柜类型'
    label: t('chargings-replacement-cabinet.chargingType.hdglx')
  }
];
export const chargingTypeDataFun = (data = []) => {
  return [
    {
      value: data?.[0]?.intAmount,
      name: data?.[0]?.type,
      // unit: '个'
      unit: t('chargings-replacement-cabinet.unit.unitGe')
    },
    {
      value: data?.[1]?.intAmount,
      name: data?.[1]?.type,
      // unit: '个'
      unit: t('chargings-replacement-cabinet.unit.unitGe')
    }
  ];
};
export const todayFacilities = [
  {
    code: 1,
    // label: '充电桩'
    label: t('chargings-replacement-cabinet.todayFacilities.cdz')
  },
  {
    code: 2,
    // label: '换电柜'
    label: t('chargings-replacement-cabinet.todayFacilities.hdg')
  }
];
export const todayFacilitiesCardFun = (data = {}, code = 1) => {
  if (code === 1) {
    return [
      {
        img: ztsyl,
        num: 62.66,
        unit: '%',
        // name: '整体使用率',
        name: t('chargings-replacement-cabinet.todayFacilitiesCardFun.ztsyl'),
        classStyleType: 'leftRightStyleGreen'
      },
      {
        img: zxzl,
        num: 1482,
        unit: '',
        // name: '在线总量',
        name: t('chargings-replacement-cabinet.todayFacilitiesCardFun.zxzl'),
        classStyleType: 'leftRightStyleYellow'
      }
    ];
  } else if (code === 2) {
    return [
      {
        img: ztsyl,
        num: 52.32,
        unit: '%',
        // name: '整体使用率',
        name: t('chargings-replacement-cabinet.todayFacilitiesCardFun.ztsyl'),
        classStyleType: 'leftRightStyleGreen'
      },
      {
        img: zxzl,
        num: 1927,
        unit: '',
        // name: '在线总量',
        name: t('chargings-replacement-cabinet.todayFacilitiesCardFun.zxzl'),
        classStyleType: 'leftRightStyleYellow'
      }
    ];
  }
};
export const powerTodayCardFun = (data = {}) => {
  return [
    {
      img: edzgl,
      num: 49509,
      unit: '',
      // name: '昨日换电次数',
      name: t('chargings-replacement-cabinet.powerTodayCardFun.zrhdcs'),
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: sszgl,
      num: 32431,
      unit: '',
      // name: '今日换电次数',
      name: t('chargings-replacement-cabinet.powerTodayCardFun.jrhdcs'),
      classStyleType: 'leftRightStyleYellow'
    }
  ];
};
export const linePowerDataFun = (data = []) => {
  data = [
    {
      time: '00',
      useRate: 570,
      troubleRate: 741
    },
    {
      time: '01',
      useRate: 513,
      troubleRate: 616
    },
    {
      time: '02',
      useRate: 399,
      troubleRate: 359
    },
    {
      time: '03',
      useRate: 228,
      troubleRate: 183
    },
    {
      time: '04',
      useRate: 342,
      troubleRate: 359
    },
    {
      time: '05',
      useRate: 456,
      troubleRate: 470
    },
    {
      time: '06',
      useRate: 856,
      troubleRate: 890
    },
    {
      time: '07',
      useRate: 2224,
      troubleRate: 1891
    },
    {
      time: '08',
      useRate: 3536,
      troubleRate: 3855
    },
    {
      time: '09',
      useRate: 1939,
      troubleRate: 2133
    },
    {
      time: '10',
      useRate: 1825,
      troubleRate: 2190
    },
    {
      time: '11',
      useRate: 2053,
      troubleRate: 1992
    },
    {
      time: '12',
      useRate: 2396,
      troubleRate: 2060
    },
    {
      time: '13',
      useRate: 2510,
      troubleRate: 2560
    },
    {
      time: '14',
      useRate: 2681,
      troubleRate: 2815
    },
    {
      time: '15',
      useRate: 2966,
      troubleRate: 2907
    },
    {
      time: '16',
      useRate: 3080,
      troubleRate: 2988
    },
    {
      time: '17',
      useRate: 3650,
      troubleRate: 3504
    },
    {
      time: '18',
      useRate: 4449,
      troubleRate: 4538
    },
    {
      time: '19',
      useRate: 3536,
      troubleRate: 3819
    },
    {
      time: '20',
      useRate: 3023,
      troubleRate: 3083
    },
    {
      time: '21',
      useRate: 2681,
      troubleRate: 2815
    },
    {
      time: '22',
      useRate: 2167,
      troubleRate: 2124
    },
    {
      time: '23',
      useRate: 1426,
      troubleRate: 1540
    }
  ];
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  const nowTime = dayjs().format('HH');
  const index = data.findIndex((i) => i.time === nowTime);
  let dataC = deepClone(data);
  dataC.splice(index + 1);
  return [
    {
      data: data.map((item) => [yearMonthDay + item.time, item.useRate]),
      type: 'line',
      smooth: true,
      // name: '昨日换电次数'
      name: t('chargings-replacement-cabinet.powerTodayCardFun.zrhdcs')
    },
    {
      data: dataC.map((item) => [yearMonthDay + item.time, item.troubleRate]),
      type: 'line',
      smooth: true,
      // name: '今日换电次数'
      name: t('chargings-replacement-cabinet.powerTodayCardFun.jrhdcs')
    }
  ];
};
export const warnData = [
  {
    id: 322830143,
    operatorId: 'MA5EJ5RU3',
    stationId: '356422',
    eid: '164837',
    operatorName: '深圳市深巴车电新能源有限公司',
    // stationName: '龙悦腾新能源有限公司太白路4128号充电站',
    stationName: t('chargings-replacement-cabinet.warnData.0.stationName'),
    alarmLevel: '1',
    alarmLevelName: '一级 人身安全',
    // alarmDesc: '动力蓄电池绝缘状态',
    alarmDesc: t('chargings-replacement-cabinet.warnData.0.alarmDesc'),
    alarmType: '2',
    alarmTypeName: '电池系统故障',
    alarmTime: '2023-06-08 13:45:33',
    contactPerson: '李明',
    contactTel: '18319310387',
    isHr: 1,
    stationLng: '114.121201',
    stationLat: '22.577544'
  },
  {
    id: 322830125,
    operatorId: '061402628',
    stationId: '440203006',
    eid: '023810',
    operatorName: '深圳市鹏电跃能能源技术有限公司',
    // stationName: '深圳宝安区石岩客运站东广场充电站',
    stationName: t('chargings-replacement-cabinet.warnData.1.stationName'),
    alarmLevel: '1',
    alarmLevelName: '一级 人身安全',
    // alarmDesc: '动力蓄电池绝缘状态',
    alarmDesc: t('chargings-replacement-cabinet.warnData.1.alarmDesc'),
    alarmType: '2',
    alarmTypeName: '电池系统故障',
    alarmTime: '2023-06-08 13:44:19',
    contactPerson: '吴涛',
    contactTel: '15818635291',
    isHr: 1,
    stationLng: '113.929582',
    stationLat: '22.683547'
  },
  {
    id: 322830080,
    operatorId: '061402628',
    stationId: '440203006',
    eid: '023810',
    operatorName: '深圳市鹏电跃能能源技术有限公司',
    // stationName: '深圳宝安区石岩客运站东广场充电站',
    stationName: t('chargings-replacement-cabinet.warnData.2.stationName'),
    alarmLevel: '1',
    alarmLevelName: '一级 人身安全',
    // alarmDesc: '动力蓄电池绝缘状态',
    alarmDesc: t('chargings-replacement-cabinet.warnData.2.alarmDesc'),
    alarmType: '2',
    alarmTypeName: '电池系统故障',
    alarmTime: '2023-06-08 13:43:16',
    contactPerson: '吴涛',
    contactTel: '15818635291',
    isHr: 1,
    stationLng: '113.929582',
    stationLat: '22.683547'
  },
  {
    id: 322827925,
    operatorId: 'MA5EJ5RU3',
    stationId: '356422',
    eid: '164837',
    operatorName: '深圳市深巴车电新能源有限公司',
    // stationName: '龙悦腾新能源有限公司太白路4128号充电站',
    stationName: t('chargings-replacement-cabinet.warnData.3.stationName'),
    alarmLevel: '1',
    alarmLevelName: '一级 人身安全',
    // alarmDesc: '动力蓄电池绝缘状态',
    alarmDesc: t('chargings-replacement-cabinet.warnData.3.alarmDesc'),
    alarmType: '2',
    alarmTypeName: '电池系统故障',
    alarmTime: '2023-06-08 12:32:45',
    contactPerson: '李明',
    contactTel: '18319310387',
    isHr: 1,
    stationLng: '114.121201',
    stationLat: '22.577544'
  },
  {
    id: 322826764,
    operatorId: '708457903',
    stationId: '48',
    eid: '137270',
    operatorName: '深圳市恒誉光明运输集团有限公司',
    // stationName: '流塘充电站',
    stationName: t('chargings-replacement-cabinet.warnData.4.stationName'),
    alarmLevel: '1',
    alarmLevelName: '一级 人身安全',
    // alarmDesc: '维修门开停止充电',
    alarmDesc: t('chargings-replacement-cabinet.warnData.4.alarmDesc'),
    alarmType: '1',
    alarmTypeName: '充电系统故障',
    alarmTime: '2023-06-08 11:17:04',
    contactPerson: '雷雄彪',
    contactTel: '13632797092',
    isHr: 1,
    stationLng: '113.886758',
    stationLat: '22.575183'
  }
];
//区级的柱状图
export const mapQuBar = () => {
  return [
    {
      areaCode: 440303,
      stationCount: 561
    },
    {
      areaCode: 440304,
      stationCount: 983
    },
    {
      areaCode: 440305,
      stationCount: 1187
    },
    {
      areaCode: 440306,
      stationCount: 1330
    },
    {
      areaCode: 440307,
      stationCount: 1712
    },
    {
      areaCode: 440308,
      stationCount: 234
    },
    {
      areaCode: 440309,
      stationCount: 771
    },
    {
      areaCode: 440310,
      stationCount: 227
    },
    {
      areaCode: 440311,
      stationCount: 211
    },
    {
      areaCode: 440343,
      stationCount: 64
    },
    {
      areaCode: 441521,
      stationCount: 5
    }
  ];
};
//街道级的柱状图
export const mapJdBar = () => {
  return [
    {
      streetId: 21,
      stationCount: 14
    },
    {
      streetId: 22,
      stationCount: 24
    },
    {
      streetId: 23,
      stationCount: 8
    },
    {
      streetId: 24,
      stationCount: 11
    },
    {
      streetId: 25,
      stationCount: 17
    },
    {
      streetId: 26,
      stationCount: 20
    },
    {
      streetId: 27,
      stationCount: 15
    },
    {
      streetId: 28,
      stationCount: 29
    },
    {
      streetId: 52,
      stationCount: 1
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
      status: 100,
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
      status: 100,
      quickCount: 0,
      noQuickCount: 0,
      superCount: 3,
      sid: '009092',
      v2GCount: 0
    },
    {
      stationId: '772',
      stationName: '充电有道四达大厦慢充站',
      lng: 22.515621,
      lat: 113.93167,
      operatorId: '398461164',
      isHr: 1,
      status: 100,
      quickCount: 0,
      noQuickCount: 11,
      superCount: 0,
      sid: '009006',
      v2GCount: 0
    },
    {
      stationId: '725',
      stationName: '充电有道紫光信息港慢充站',
      lng: 22.561201,
      lat: 113.95462,
      operatorId: '398461164',
      isHr: 1,
      status: 100,
      quickCount: 0,
      noQuickCount: 60,
      superCount: 0,
      sid: '008565',
      v2GCount: 0
    },
    {
      stationId: '765',
      stationName: '充电有道万利达科技大厦储能站',
      lng: 22.546255,
      lat: 113.94028,
      operatorId: '398461164',
      isHr: 1,
      status: 200,
      quickCount: 0,
      noQuickCount: 37,
      superCount: 0,
      sid: '008527',
      v2GCount: 0
    },
    {
      stationId: '630',
      stationName: '充电有道万海大厦停车场储能站',
      lng: 22.49787,
      lat: 113.923,
      operatorId: '398461164',
      isHr: 1,
      status: 200,
      quickCount: 0,
      noQuickCount: 35,
      superCount: 0,
      sid: '008470',
      v2GCount: 0
    },
    {
      stationId: '809',
      stationName: '充电有道新一代国际公寓储能站',
      lng: 22.511007,
      lat: 113.93135,
      operatorId: '398461164',
      isHr: 1,
      status: 200,
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
      status: 200,
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
      status: 300,
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
      status: 300,
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
      status: 300,
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
      status: 300,
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
      status: 400,
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
      status: 400,
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
      status: 400,
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
      status: 100,
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
      status: 100,
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
      status: 100,
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
      status: 100,
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
      status: 100,
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
      status: 100,
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
      status: 100,
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
      status: 100,
      quickCount: 10,
      noQuickCount: 5,
      superCount: 0,
      sid: '000257',
      v2GCount: 0
    }
  ];
};
