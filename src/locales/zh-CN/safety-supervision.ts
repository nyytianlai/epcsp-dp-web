export default {
  config:{
    pageNumFun: {
      ljgjzs: '累计告警总数',
      unitGe: '个',
      yfs: '已发生',
      yhf: '已恢复',
    },
    totalWarningTabsFun: {
      yys: '运营商',
      cdz: '充电站',
    },
    areaRankDataFun:{
      unitCi: "次",
      nsq: "南山区",
      baq: "宝安区",
      lhq: "罗湖区",
      longhq: "龙华区",
      longgq: "龙岗区",
      dpxq: "大鹏新区",
    },
    warningMonitorTabsFun: {
      gjjb: '告警级别',
      gjlx: '告警类型',
    },
    warningMonitorPieDataFun: {
      ysrsaq: '一级人身安全',
      rsaq: '人身安全',
      unitGe: '个',
      ejsbaq: '二级设备安全',
      sbaq: '设备安全',
      sjgjts: '三级告警提示',
      gjts: '告警提示',
      cdxt: '充电系统',
      dcxt: '电池系统',
      pdxt: '配电系统',
    },
    realtimeStateTabsFun: {
      cdzhan: '充电站',
      cdzhuang: '充电桩',
      cdq: '充电枪',
    },
    realtimeStateDataFun: {
      zcg: '正常/个',
      zc: '正常',
      yjg: '预警/个',
      yj: '预警',
      wsxg: '未上线/个',
      wsx: '未上线',
      gzg: '故障/个',
      zxg: '在线/个',
      lxg: '离线/个',
      zyg: '占用/个',
      kxg: '空闲/个',
    },
    realtimeTrendFun: {
      gjs: '告警数',
    },
    bottomTabDataFun: {
      gjxx: '告警信息',
      cdzzt: '充电站状态',
    },
    columnDataFun: {
      operatorName: '运营商名称',
      stationName: '充电站名称',
      alarmLevelName: '告警级别',
      alarmTypeName: '告警类型',
      alarmDesc: '告警描述',
      alarmTime: '告警时间',
      contactPerson: '安全负责人',
      contactTel: '联系电话',
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
      pdxt: '配电系统'
    },
    columnKeyListFun: {
      yysmc: '运营商名称',
      cdzmc: '充电站名称',
      gjs: '告警数',
      yfs: '已发生',
      yhf: '已恢复',
    },
    messageColumnKeyListFun: {
      yysmc: '运营商名称',
      cdzmc: '充电站名称',
      gjzs: '告警总数',
      wqr: '未确认',
      yqr: '已确认',
      yhf: '已恢复',
      fzr: '负责人',
      lxdh: '联系电话',
    },
    legendList: {
      cdzhan: '充电站',
      cdzhuang: '充电桩',
      cdq: '充电枪',
    }
  },
  'left-panel': {
    ljgjsjxx: '累计告警数据信息',
    ckgd: '查看更多',
    xzqgjsjqk: '行政区告警数据情况',
    unitCi: '次',
    tabList:{
      day: '日',
      month: '月',
      year: '年'
    }
  },
  'right-panel': {
    gjlb: '告警列表',
    jrsbgjjk: '今日设备告警监控',
    ssztqk: '实时状态情况',
    ssgjqsqk: '实时告警趋势情况',
    tabList: {
      day: '日', 
      month: '月', 
      year: '年'
    }
  },
  'map-layer':{
    gjjbg: '告警级别（个）',
    legendListData1:{
      yjrsaq: '一级 人身安全',
      ejsbaq: '二级 设备安全',
      sjgjts: '三级 告警提示',
    },
    cdzzt: '充电站状态',
    legendListData2:{
      zc: '正常',
      yj: '预警',
      wsx: '未上线',
    }
  },
  'warn-count-list-dialog': {
    gjxxlb: '告警信息列表',
    qsr: '请输入',
    cz: '操作',
    xq: '详情',
    yysgjlb: '运营商告警列表',
    cdzgjlb: '充电站告警列表',
  },
  'warn-info-list-dialog':{
    gjxxlb: '告警信息列表',
    qsr: '请输入',
    cz: '操作',
    xq: '详情',
  }
}