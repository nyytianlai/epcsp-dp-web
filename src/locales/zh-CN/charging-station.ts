export default {
  config:{
    cdsszlFun: {
      unitGe: '个',
      cdzzl: '充电站总量',
      yjryyqyzl: '已接入运营企业总量',
      unitWanLiang: '万辆',
      xnyqczl: '新能源汽车总量',
    },
    projectListFun: {
      unitGe: '个',
      cdzzl: '充电站总量',
      yjryyqyzl: '已接入运营企业总量',
      xnyqczl: '新能源汽车总量',
    },
    chargingStationTabsFun: {
      cdzlx: '充电桩类型',
      cdzdllx: '充电桩电流类型',
    },
    chargingStationGunTabsFun: {
      cdqlx: '充电枪类型',
      cdqdllx: '充电枪电流类型',
    },
    pageNumFun: {
      ljcdl: '累计充电量',
      unitYidu: '亿度',
      ljcdcs: '累计充电次数',
      unitWanci: '万次',
      ljcdsc: '累计充电时长',
      unitHour: '小时',
      bncdzl: '本年充电总量',
    },
    pileChargerFun: {
      unitGe: '个',
      kczzl: '快充桩总量',
      mczzl: '慢充桩总量',
      cczzl: '超充桩总量',
      v2gzzl: 'V2G桩总量',
      zlzzl: '直流桩总量',
      jlzzl: '交流桩总量',
      zjlzzl: '直交流桩总量',
      qtzzl: '其他桩总量',
      kcqzl: '快充枪总量',
      mcqzl: '慢充枪总量',
      ccqzl: '超充枪总量',
      v2qzl: 'V2G枪总量',
      zlqzl: '直流枪总量',
      jlqzl: '交流枪总量',
      zjlqzl: '直交流枪总量',
      qtqzl: '其他枪总量',
      v2gqzl: 'V2G枪总量',
    },
    operatingTabsFun: {
      cdzhan: '充电站',
      cdzhuang: '充电桩',
      cdq: '充电枪',
    },
    todayTabsFun: {
      cdzxx: '充电桩信息',
      cdqxx: '充电枪信息',
    },
    todayInfoNumDataFun: {
      ztsyl: '整体使用率',
      zxzl: '在线总量',
      unitGe: '个',
    },
    lineTimeDataFun: {
      ssgl: '实时功率'
    },
    warningTabsDataFun: {
      yjrsaq: '一级人身安全',
      ejsbaq: '二级设备安全',
      sjgjts: '三级告警提示',
    },
    warningListFun: {
      cdzpdrsgdcdzpdrsgd: '充电桩排队人数过多充电桩排队人数过多',
      nsqcdzpdrsgd: '南山区充电桩排队人数过多',
      cdzpdrsgd: '充电桩排队人数过多',
      nsq: '南山区',
    },
    bottomTabDataFun: {
      cdz: '充电站',
      cdgl: '充电功率',
    },
    columnDataFun: {
      yysmc: '运营商名称',
      cdzmc: '充电站名称',
      gjjb: '告警级别',
      gjlx: '告警类型',
      gjms: '告警描述',
      gjsj: '告警时间',
      aqfzr: '安全负责人',
      lxdh: '联系电话',
    },
    columnDataRankFun: {
      operatorName: '运营商名称',
      stationNumber: '充电站',
      pileNumber: '充电桩',
      gunNumber: '充电枪',
      principal: '负责人',
      phone: '联系电话',
    },
    columnDataChargeFun: {
      stationName: '充电站名称',
      pileNumber: '充电桩/个',
      gunNumber: '充电枪/个',
      alarmNumber: '今日告警/次',
    },
    filtersAlarmLevelName: {
      all: '全部',
      yjrsaq: '一级人身安全',
      ejsbaq: '二级设备安全',
      sjgjts: '三级告警提示',
    },
    filtersAlarmTypeName: {
      all: '全部',
      cdxt: '充电系统',
      dcxt: '电池系统',
      pdxt: '配电系统',
    }
  },
  'left-panel': {
    tabList: {
      pile: '桩',
      gun: '枪',
    },
    unitGe: '个',
    ztjrxx: '整体接入信息',
    yyqypm: '运营企业排名',
  },
  'right-panel': {
    jrcdssglxx: '今日充电实时功率信息',
    jrcdsssjxx: '今日充电设施数据信息',
    jrgjxx: '今日告警信息'
  },
  'charging-realtime-power': {
    ssgl: '实时功率'
  },
  'enterprise-rank-list-dialog': {
    yyqypmlb: '运营企业排名列表',
    qsr: '请输入',
    cz: '操作',
    xq: '详情',
    xh: '序号'
  },
  'map-layer': {
    cdslg: '充电数量(个)',
    cdglkw: '充电功率(kW)'
  },
  'rank-detail':{
    tyshxym: '统一社会信用码：',
    jbxx: '基本信息' ,
    cdss: '充电设施',
    cz: '操作',
    xq: '详情',
    BASE_MSG_SEETING: {
      areaName: '企业注册行政区',
      chargeSafePersonTel: '安全负责电话',
      companySize: '企业规模',
      companyType: '企业类型',
      contactEmail: '联系人邮箱',
      contactPerson: '安全负责人',
      contactTel: '联系人电话',
      foundDate: '成立日期',
      operatorId: '社会信用码',
      operatorName: '运营商名称',
      operatorRegAddress: '注册地',
      regCapital: '注册资本(万)',
      serviceTel: '客服电话',
      streetName: '企业注册街道',
    },
    CHARGE_SETTING: {
      cdzhanzl: '充电站总量',
      unitZ: '座',
      cdzhuangzl: '充电桩总量',
      unitGe: '个',
      cdqzl: '充电枪总量',
      jrgjzl: '今日告警总量',
      unitCi: '次',
    },
    xh: '序号'
  },
  'today-warn-dialog': {
    gjxxlb: '告警信息列表',
    qsr: '请输入',
    cz: '操作',
    xq: '详情'
  }
}