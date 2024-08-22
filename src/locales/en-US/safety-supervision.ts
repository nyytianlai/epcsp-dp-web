export default {
  config:{
    pageNumFun: {
      ljgjzs: 'Accumulated total number of alarms', // '累计告警总数',
      unitGe: 'individual', // '个',
      yfs: 'Already occurred', // '已发生',
      yhf: 'Recovered', // '已恢复',
    },
    totalWarningTabsFun: {
      yys: 'Operator', // '运营商',
      cdz: 'Charging station', // '充电站',
    },
    areaRankDataFun:{
      unitCi: 'second', // "次",
      nsq: 'Nanshan District', // "南山区",
      baq: "Bao'an District", // "宝安区",
      lhq: 'Luohu District', // "罗湖区",
      longhq: 'Longhua District', // "龙华区",
      longgq: 'Longgang District', // "龙岗区",
      dpxq: 'Dapeng New Area', // "大鹏新区",
    },
    warningMonitorTabsFun: {
      gjjb: 'Alarm level', // '告警级别',
      gjlx: 'Alarm Type ', // '告警类型',
    },
    warningMonitorPieDataFun: {
      ysrsaq: 'First level personal safety', // '一级人身安全',
      rsaq: 'Personal safety', // '人身安全',
      unitGe: 'individual', // '个',
      ejsbaq: 'Secondary equipment safety', // '二级设备安全',
      sbaq: 'Equipment safety', // '设备安全',
      sjgjts: 'Level 3 alarm prompt', // '三级告警提示',
      gjts: 'Alarm prompt', // '告警提示',
      cdxt: 'Charging system', // '充电系统',
      dcxt: 'Battery system', // '电池系统',
      pdxt: 'Distribution system', // '配电系统',
    },
    realtimeStateTabsFun: {
      cdzhan: 'Charging station', // '充电站',
      cdzhuang: 'Charging station', // '充电桩',
      cdq: 'Charging gun', // '充电枪',
    },
    realtimeStateDataFun: {
      zcg: 'Normal/one', // '正常/个',
      zc: 'normal', // '正常',
      yjg: 'Warning/one', // '预警/个',
      yj: 'early warning', // '预警',
      wsxg: 'Not online/one', // '未上线/个',
      wsx: 'Not online yet', // '未上线',
      gzg: 'Fault/one', // '故障/个',
      zxg: 'Online/one', // '在线/个',
      lxg: 'Offline/one', // '离线/个',
      zyg: 'Occupation/piece', // '占用/个',
      kxg: 'Idle/one', // '空闲/个',
    },
    realtimeTrendFun: {
      gjs: 'Number of alarms', // '告警数',
    },
    bottomTabDataFun: {
      gjxx: 'Alarm information', // '告警信息',
      cdzzt: 'Charging station status', // '充电站状态',
    },
    columnDataFun: {
      operatorName: 'Operator name', // '运营商名称',
      stationName: 'Name of charging station', // '充电站名称',
      alarmLevelName: 'Alarm level', // '告警级别',
      alarmTypeName: 'Alarm Type ', // '告警类型',
      alarmDesc: 'Alarm description', // '告警描述',
      alarmTime: 'Alarm time', // '告警时间',
      contactPerson: 'Safety Manager', // '安全负责人',
      contactTel: 'contact number', // '联系电话',
    },
    filtersAlarmLevelName: {
      all: 'whole', // '全部',
      yjrsaq: 'First level personal safety', // '一级人身安全',
      ejsbaq: 'Secondary equipment safety', // '二级设备安全',
      sjgjts: 'Level 3 alarm prompt', // '三级告警提示',
    },
    filtersAlarmTypeName: {
      all: 'whole', // '全部',
      cdxt: 'Charging system', // '充电系统',
      dcxt: 'Battery system', // '电池系统',
      pdxt: 'Distribution system', // '配电系统'
    },
    columnKeyListFun: {
      yysmc: 'Operator name', // '运营商名称',
      cdzmc: 'Name of charging station', // '充电站名称',
      gjs: 'Number of alarms', // '告警数',
      yfs: 'Already occurred', // '已发生',
      yhf: 'Recovered', // '已恢复',
    },
    messageColumnKeyListFun: {
      yysmc: 'Operator name', // '运营商名称',
      cdzmc: 'Name of charging station', // '充电站名称',
      gjzs: 'Total number of alarms', // '告警总数',
      wqr: 'Not confirmed', // '未确认',
      yqr: 'Confirmed', // '已确认',
      yhf: 'Recovered', // '已恢复',
      fzr: 'person in charge', // '负责人',
      lxdh: 'contact number', // '联系电话',
    },
    legendList: {
      cdzhan: 'Charging station', // '充电站',
      cdzhuang: 'Charging station', // '充电桩',
      cdq: 'Charging gun', // '充电枪',
    }
  },
  'left-panel': {
    ljgjsjxx: 'Accumulated alarm data information', // '累计告警数据信息',
    ckgd: 'View more', // '查看更多',
    xzqgjsjqk: 'Administrative region alarm data situation', // '行政区告警数据情况',
    unitCi: 'times', //'次',
    tabList:{
      day: 'day', // '日',
      month: 'month', // '月',
      year: 'year', // '年'
    }
  },
  'right-panel': {
    gjlb: 'Alarm List', //'告警列表',
    jrsbgjjk: "Today's equipment alarm monitoring", //'今日设备告警监控',
    ssztqk: 'Real time status', //'实时状态情况',
    ssgjqsqk: 'Real time alarm trend situation', //'实时告警趋势情况',
    tabList: {
      day: 'day', //'日', 
      month: 'month', //'月', 
      year: 'year', //'年'
    }
  },
  'map-layer':{
    gjjbg: 'Alarm level (s)', //'告警级别（个）',
    legendListData1:{
      yjrsaq: 'First level personal safety', //'一级 人身安全',
      ejsbaq: 'Secondary equipment safety', //'二级 设备安全',
      sjgjts: 'Level 3 alarm prompt', //'三级 告警提示',
    },
    cdzzt: 'Charging station status', //'充电站状态',
    legendListData2:{
      zc: 'normal', //'正常',
      yj: 'early warning', //'预警',
      wsx: 'Not online yet', //'未上线',
    }
  },
  'warn-count-list-dialog': {
    gjxxlb: 'Alarm Information List', //'告警信息列表',
    qsr: 'Please enter', //'请输入',
    cz: 'operation', //'操作',
    xq: 'details', //'详情',
    yysgjlb: 'Operator alarm list', //'运营商告警列表',
    cdzgjlb: 'Charging Station Alarm List', //'充电站告警列表',
  },
  'warn-info-list-dialog':{
    gjxxlb: 'Alarm Information List', //'告警信息列表',
    qsr: 'Please enter', //'请输入',
    cz: 'operation', //'操作',
    xq: 'details', //'详情',
  }
}