export default {
  config:{
    cdsszlFun: {
      unitGe: '', // '个',
      cdzzl: 'Total number of charging sites', // '充电站总量',
      yjryyqyzl: 'Total number of connected operating enterprises', // '已接入运营企业总量',
      unitWanLiang: 'Ten thousand vehicles', // '万辆',
      xnyqczl: 'Total number of electric vehicles', // '新能源汽车总量',
    },
    projectListFun: {
      unitGe: '', // '个',
      cdzzl: 'Total number of charging sites', // '充电站总量',
      yjryyqyzl: 'Total number of connected operating enterprises', // '已接入运营企业总量',
      xnyqczl: 'Total number of electric vehicles', // '新能源汽车总量',
    },
    chargingStationTabsFun: {
      cdzlx: 'Charging station type', // '充电桩类型',
      cdzdllx: 'Charging station current type', // '充电桩电流类型',
    },
    chargingStationGunTabsFun: {
      cdqlx: 'Charging gun type', // '充电枪类型',
      cdqdllx: 'Charging gun current type', // '充电枪电流类型',
    },
    pageNumFun: {
      ljcdl: 'Accumulated charging capacity', // '累计充电量',
      unitYidu: 'Billion degrees', // '亿度',
      ljcdcs: 'Accumulated charging times', // '累计充电次数',
      unitWanci: 'Ten thousand times', // '万次',
      ljcdsc: 'Accumulated charging time', // '累计充电时长',
      unitHour: 'hour', // '小时',
      bncdzl: 'Total amount of charging this year', // '本年充电总量',
    },
    pileChargerFun: {
      unitGe: '', // '个',
      kczzl: 'Total amount of fast charging station', // '快充桩总量',
      mczzl: 'Total amount of slow charging station', // '慢充桩总量',
      cczzl: 'Total amount of supercharging station', // '超充桩总量',
      v2gzzl: 'Total amount of V2G station', // 'V2G桩总量',
      zlzzl: 'Total number of DC station', // '直流桩总量',
      jlzzl: 'Total number of communication stations', // '交流桩总量',
      zjlzzl: 'Total number of AC/DC stations', // '直交流桩总量',
      qtzzl: 'Total number of other station', // '其他桩总量',
      kcqzl: 'Total number of fast charging guns', // '快充枪总量',
      mcqzl: 'Total number of slow charging guns', // '慢充枪总量',
      ccqzl: 'Total number of supercharging guns', // '超充枪总量',
      v2qzl: 'Total number of V2G guns', // 'V2G枪总量',
      zlqzl: 'Total number of DC guns', // '直流枪总量',
      jlqzl: 'Total number of AC guns', // '交流枪总量',
      zjlqzl: 'Total number of AC/DC guns', // '直交流枪总量',
      qtqzl: 'Total number of other guns', // '其他枪总量',
      v2gqzl: 'Total number of V2G guns', // 'V2G枪总量',
    },
    operatingTabsFun: {
      cdzhan: 'Charging site', // '充电站',
      cdzhuang: 'Charging station', // '充电桩',
      cdq: 'Charging gun', // '充电枪',
    },
    todayTabsFun: {
      cdzxx: 'Charging station information', // '充电桩信息',
      cdqxx: 'Charging gun information', // '充电枪信息',
    },
    todayInfoNumDataFun: {
      ztsyl: 'Overall usage rate', // '整体使用率',
      zxzl: 'Total number of online station', // '在线总量',
      unitGe: '', // '个',
    },
    lineTimeDataFun: {
      ssgl: 'Real-time power', // '实时功率'
    },
    warningTabsDataFun: {
      yjrsaq: 'First-level personal safety alarm', // '一级人身安全',
      ejsbaq: 'Second-level equipment safety alarm', // '二级设备安全',
      sjgjts: 'Third-level alarm', // '三级告警提示',
    },
    warningListFun: {
      cdzpdrsgdcdzpdrsgd: 'Too many people queuing up for charging', // '充电桩排队人数过多充电桩排队人数过多',
      nsqcdzpdrsgd: 'Too many people queuing up for charging in Nanshan', // '南山区充电桩排队人数过多',
      cdzpdrsgd: 'Too many people queuing up for charging', // '充电桩排队人数过多',
      nsq: 'Nanshan', // '南山区',
    },
    bottomTabDataFun: {
      cdz: 'Charging station', // '充电站',
      cdgl: 'Charging power', // '充电功率',
    },
    columnDataFun: {
      yysmc: 'Operator name', // '运营商名称',
      cdzmc: 'Name of charging site', // '充电站名称',
      gjjb: 'Alarm level', // '告警级别',
      gjlx: 'Alarm Type ', // '告警类型',
      gjms: 'Alarm description', // '告警描述',
      gjsj: 'Alarm time', // '告警时间',
      aqfzr: 'Safety Manager', // '安全负责人',
      lxdh: 'Contact number', // '联系电话',
    },
    columnDataRankFun: {
      operatorName: 'Operator name', // '运营商名称',
      stationNumber: 'Charging site', // '充电站',
      pileNumber: 'Charging station', // '充电桩',
      gunNumber: 'Charging gun', // '充电枪',
      principal: 'Superintendent', // '负责人',
     phone: 'Contact number', // '联系电话',
    },
    columnDataChargeFun: {
      stationName: 'Name of charging site', //  '充电站名称',
      pileNumber: 'Charging station', //  '充电桩/个',
      gunNumber: 'Charging gun', //  '充电枪/个',
      alarmNumber: "Today's alarm/times", //  '今日告警/次',
    },
    filtersAlarmLevelName: {
      all: 'All', // '全部',
      yjrsaq: 'First-level personal safety alarm', // '一级人身安全',
      ejsbaq: 'Second-level equipment safety alarm', // '二级设备安全',
      sjgjts: 'Level 3 alarm prompt', // 'Third-level alarm',
    },
    filtersAlarmTypeName: {
      all: 'All', // '全部',
      cdxt: 'Charging system', // '充电系统',
      dcxt: 'Battery system', // '电池系统',
      pdxt: 'Distribution system', // '配电系统',
    }
  },
  'left-panel': {
    tabList: {
      pile: 'pile', // '桩',
      gun: 'gun', // '枪',
    },
    unitGe: '', // '个',
    ztjrxx: 'Overall access information', // '整体接入信息',
    yyqypm: 'Operating enterprises ranking', // '运营企业排名',
  },
  'right-panel': {
    jrcdssglxx: "Real-time power information for today's charging", // '今日充电实时功率信息',
    jrcdsssjxx: "Today's charging facility data information", // '今日充电设施数据信息',
    jrgjxx: "Today's alarm information", // '今日告警信息'
  },
  'charging-realtime-power': {
    ssgl: 'Real-time power', // '实时功率'
  },
  'enterprise-rank-list-dialog': {
    yyqypmlb: 'Operating enterprises ranking', // '运营企业排名列表',
    qsr: 'Please enter', // '请输入',
    cz: 'operation', // '操作',
    xq: 'details', // '详情',
    xh: 'Number', // '序号'
  },
  'map-layer': {
    cdslg: 'Charging quantity (pcs)', // '充电数量(个)',
    cdglkw: 'Charging power (kW)', // '充电功率(kW)'
  },
  'rank-detail':{
    tyshxym: 'Unified Social Credit Code:', // '统一社会信用码：',
    jbxx: 'Basic information', // '基本信息' ,
    cdss: 'Charging facilities', // '充电设施',
    cz: 'Operation', // '操作',
    xq: 'details', // '详情',
    BASE_MSG_SEETING: {
      areaName: 'Enterprise Registration district', // '企业注册行政区',
      chargeSafePersonTel: 'Safety number', // '安全负责电话',
      companySize: 'Enterprise scale', // '企业规模',
      companyType: 'Enterprise type', // '企业类型',
      contactEmail: 'Contact email', // '联系人邮箱',
      contactPerson: 'Safety Manager', // '安全负责人',
      contactTel: 'Contact number', // '联系人电话',
      foundDate: 'Incorporation date', // '成立日期',
      operatorId: 'Social Credit Code', // '社会信用码',
      operatorName: 'Operator name', // '运营商名称',
      operatorRegAddress: 'Registered address', // '注册地',
      regCapital: 'Registered capital(10 thousand)', // '注册资本(万)',
      serviceTel: 'customer service number', // '客服电话',
      streetName: 'Enterprise registration street', // '企业注册街道',
    },
    CHARGE_SETTING: {
      cdzhanzl: 'Total number of charging sites', // '充电站总量',
      unitZ: '', // '座',
      cdzhuangzl: 'Total number of charging stations', // '充电桩总量',
      unitGe: '', // '个',
      cdqzl: 'Total number of charging guns', // '充电枪总量',
      jrgjzl: "Today's total number of alerts", // '今日告警总量',
      unitCi: '', // '次',
    },
    xh: 'No.', // '序号'
  },
  'today-warn-dialog': {
    gjxxlb: 'Alarm List', // '告警信息列表',
    qsr: 'Please enter', // '请输入',
    cz: 'Operation', // '操作',
    xq: 'details', // '详情'
  }
}