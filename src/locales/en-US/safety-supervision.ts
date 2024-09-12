export default {
  config: {
    pageNumFun: {
      ljgjzs: 'Accumulated number of alarms', // '累计告警总数',
      unitGe: '', // '个',
      yfs: 'Happened', // '已发生',
      yhf: 'Recovered' // '已恢复',
    },
    totalWarningTabsFun: {
      yys: 'Operator', // '运营商',
      cdz: 'Charging site' // '充电站',
    },
    areaRankDataFun: {
      unitCi: '', // "次",
      nsq: 'Nanshan', // "南山区",
      baq: "Bao'an", // "宝安区",
      lhq: 'Luohu', // "罗湖区",
      longhq: 'Longhua', // "龙华区",
      longgq: 'Longgang', // "龙岗区",
      dpxq: 'Dapeng' // "大鹏新区",
    },
    warningMonitorTabsFun: {
      gjjb: 'Alarm level', // '告警级别',
      gjlx: 'Alarm Type ' // '告警类型',
    },
    warningMonitorPieDataFun: {
      ysrsaq: 'First-level personal safety alarm', // '一级人身安全',
      rsaq: 'Personal safety', // '人身安全',
      unitGe: '', // '个',
      ejsbaq: 'Second-level equipment safety alarm', // '二级设备安全',
      sbaq: 'Equipment safety', // '设备安全',
      sjgjts: 'Third-level alarm', // '三级告警提示',
      gjts: 'Alarm', // '告警提示',
      cdxt: 'Charging system', // '充电系统',
      dcxt: 'Battery system', // '电池系统',
      pdxt: 'Distribution system' // '配电系统',
    },
    realtimeStateTabsFun: {
      cdzhan: 'Charging site', // '充电站',
      cdzhuang: 'Charging station', // '充电桩',
      cdq: 'Charging gun' // '充电枪',
    },
    realtimeStateDataFun: {
      zcg: 'Normal', // '正常/个',
      zc: 'normal', // '正常',
      yjg: 'Alert', // '预警/个',
      yj: 'Alert', // '预警',
      wsxg: 'Not online yet', // '未上线/个',
      wsx: 'Not online yet', // '未上线',
      gzg: 'Malfunction/', // '故障/个',
      zxg: 'Online/', // '在线/个',
      lxg: 'Offline/', // '离线/个',
      zyg: 'Occupation/', // '占用/个',
      kxg: 'Unoccupied/' // '空闲/个',
    },
    realtimeTrendFun: {
      gjs: 'Number of alarms' // '告警数',
    },
    bottomTabDataFun: {
      gjxx: 'Alarm information', // '告警信息',
      cdzzt: 'Charging site status' // '充电站状态',
    },
    columnDataFun: {
      operatorName: 'Operator name', // '运营商名称',
      stationName: 'Charging site name', // '充电站名称',
      alarmLevelName: 'Alarm level', // '告警级别',
      alarmTypeName: 'Alarm Type ', // '告警类型',
      alarmDesc: 'Alarm description', // '告警描述',
      alarmTime: 'Alarm time', // '告警时间',
      contactPerson: 'Safety Superintendent', // '安全负责人',
      contactTel: 'Contact number' // '联系电话',
    },
    filtersAlarmLevelName: {
      all: 'All', // '全部',
      yjrsaq: 'First-level personal safety alarm', // '一级人身安全',
      ejsbaq: 'Second-level equipment safety alarm', // '二级设备安全',
      sjgjts: 'Third-level alarm' // '三级告警提示',
    },
    filtersAlarmTypeName: {
      all: 'All', // '全部',
      cdxt: 'Charging system', // '充电系统',
      dcxt: 'Battery system', // '电池系统',
      pdxt: 'Power distribution system' // '配电系统'
    },
    columnKeyListFun: {
      yysmc: 'Operator name', // '运营商名称',
      cdzmc: 'Charging site name', // '充电站名称',
      gjs: 'Number of alarms', // '告警数',
      yfs: 'Happened', // '已发生',
      yhf: 'Recovered' // '已恢复',
    },
    messageColumnKeyListFun: {
      yysmc: 'Operator name', // '运营商名称',
      cdzmc: 'Charging site name', // '充电站名称',
      gjzs: 'Number of alarms', // '告警总数',
      wqr: 'Unconfirmed', // '未确认',
      yqr: 'Confirmed', // '已确认',
      yhf: 'Recovered', // '已恢复',
      fzr: 'Superintendent', // '负责人',
      lxdh: 'Contact number' // '联系电话',
    },
    legendList: {
      cdzhan: 'Charging site', // '充电站',
      cdzhuang: 'Charging station', // '充电桩',
      cdq: 'Charging gun' // '充电枪',
    }
  },
  'left-panel': {
    ljgjsjxx: 'Accumulated number of alarm', // '累计告警数据信息',
    ckgd: 'View more', // '查看更多',
    xzqgjsjqk: 'Alarm number in each district', // '行政区告警数据情况',
    unitCi: '', //'次',
    tabList: {
      day: 'day', // '日',
      month: 'month', // '月',
      year: 'year' // '年'
    }
  },
  'right-panel': {
    gjlb: 'Alarm List', //'告警列表',
    jrsbgjjk: "Today's equipment alarm", //'今日设备告警监控',
    ssztqk: 'Real-time status', //'实时状态情况',
    ssgjqsqk: 'Real-time alarm trend', //'实时告警趋势情况',
    tabList: {
      day: 'day', //'日',
      month: 'month', //'月',
      year: 'year' //'年'
    },
    hj: 'Total'
  },
  'map-layer': {
    gjjbg: 'Alarm level', //'告警级别（个）',
    legendListData1: {
      yjrsaq: 'First-level personal safety alarm', //'一级 人身安全',
      ejsbaq: 'Second-level equipment safety alarm', //'二级 设备安全',
      sjgjts: 'Third-level alarm' //'三级 告警提示',
    },
    cdzzt: 'Charging site status', //'充电站状态',
    legendListData2: {
      zc: 'normal', //'正常',
      yj: 'Warning', //'预警',
      wsx: 'Not online yet' //'未上线',
    }
  },
  'warn-count-list-dialog': {
    gjxxlb: 'Alarm List', //'告警信息列表',
    qsr: 'Please enter', //'请输入',
    cz: 'operation', //'操作',
    xq: 'details', //'详情',
    yysgjlb: 'Operator alarm list', //'运营商告警列表',
    cdzgjlb: 'Charging site Alarm List' //'充电站告警列表',
  },
  'warn-info-list-dialog': {
    gjxxlb: 'Alarm List', //'告警信息列表',
    qsr: 'Please enter', //'请输入',
    cz: 'operation', //'操作',
    xq: 'details' //'详情',
  }
};
