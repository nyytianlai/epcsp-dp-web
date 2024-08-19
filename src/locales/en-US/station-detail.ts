export default {
  cdzdxx: 'Charging station information', //'充电站点信息',
  sbssxx: 'Equipment and facility information', //'设备设施信息',
  cdzzs: 'Total number of charging stations', //'充电桩总数',
  cdqzs: 'Total number of charging guns', //'充电枪总数',
  gjxx: 'Alarm information', //'告警信息',
  zdcdzzt: 'Station charging station status', //'站点充电桩状态',
  cdssrsyxx: 'Daily usage information of charging facilities', //'充电设施日使用信息',
  zdssgl: 'Real time power of the site', //'站点实时功率'
  config: {
    lianhuaPowerFun: {
      swdl: '上网电量',
      fddl: '发电电量',
    },
    lianhuaWarnFun: {
      today: '今日',
      gjs: '告警数',
    },
    lianhuaWarnOption: {
      unitGe: '个',
      gjs: '告警数',
      yAxisName: '单位:个',
      day: '日'
    },
    lianhuaRealtimeOption: {
      ssgl: '实时功率',
      yAxisName: '单位:kW ',
      seriesName: '实时功率',
    },
    deviceInfoFun: {
      zdzjrl: '站点装机容量',
      zdgfbmj: '站点光伏板面积',
    },
    facilitiesLabel: {
      electricalRoom: "配电房",
      toilet: "卫生间",
      store: '便利店',
      rest: '休息区',
      maintenance: '维修区',
      bigHouse: '展示馆',
      bigHouse1: '会议馆',
      bigHouse2: '交易馆',
      monitorCenter: '实时监测中心',
      microgridBox: '微网箱变',
      energyStorageBox: '储能箱',
      chargingTerminal: '充电终端',
      PVPanel: '光伏电池板',
      chargingStation: '充电站',
      chargingTerminal1: '充电集控终端',
      V2G: 'V2G桩',
      chargingTerminal2: '液冷大功率充电终端',
      chargingStack: '充电堆',
      batteryRoom: '电池设备室',
      energyStorageBox1: '储能柜',
      rest1: '休息室',
      microgridBox1: '1#箱变',
      microgridBox2: '2#箱变',
      microgridBox3: '3#箱变',
      microgridBox4: '4#箱变',
      microgridBox5: '5#箱变',
      building: '户内配电装置楼',
      photovoltaic: '光伏电池板',
      building1: '主控通信楼',
      fan: '风机',
      machineRoom: '机房',
      microwave: '微波',
      '5GAntenna': '5G天线',
    },
    floor1SpaceMarker: {
      gypds: '高压配电室',
      pdbyqs: '配电变压器室',
      pcss: 'PCS室',
      dcds1: '#1电池堆室',
      dcds3: '#3电池堆室',
      dcc: '电池簇',
    },
    floor2SpaceMarker: {
      dzk: '吊装孔',
      cndcds5: '储能电池堆室#5',
      ktjf: '空调机房',
      dcds2: '#2电池堆室',
      dcds4: '#4电池堆室',
    },
    floor1DeviceMarker: {
      pcsgyzhq: 'PCS规约转换器',
      dcc: '电池簇',
    },
    floor2DeviceMarker: {
      dcc: '电池簇',
    },
    pageNumFun: {
      zdcdl: '站点充电量',
      KWH: 'kWh',
      zdcdcs: '站点充电次数',
      unitCi: '次',
      zdcdsc: '站点充电时长',
      unitHour: '小时',
      zdgzcs: '站点故障次数',
    },
    deviceInfoDataFun: {
      cdzg: '充电桩/个',
      cdqg: '充电枪/个',
    },
    warningTabsDataFun: {
      yjrsaq: '一级人身安全',
      ejsbaq: '二级设备安全',
      sjgjts: '三级告警提示',
    },
    chargingTypesTabsFun: {
      cdzsyqk: '充电桩使用情况',
      cdqsyqk: '充电枪使用情况',
    },
    chargingTypesFun: {
      dqsyl: '当前使用率',
      unitCi: '次',
      sycs: '使用次数',
    },
    linePowerDataFun: {
      ssgl: '实时功率',
    },
    columnDataFun: {
      yysmc: '运营商名称',
      cdzmc: '充电站名称',
      gjjb: '告警级别',
      gjms: '告警描述',
      gjlx: '告警类型',
      gjsj: '告警时间',
      aqfzr: '安全负责人',
      lxdh: '联系电话',
    },
    realtimeTrendFun: {
      gjs: '告警数'
    },
    stationWarnFun: {
      gjs: '告警数'
    },
    stationWarnOption: {
      unitGe: '个',
      gjs: '告警数',
      yAxisName: '单位:个'
    },
    batterySOHOption: {
      dccgl: '电池簇功率',
      yAxisName: '单位：kW',
      seriesName: '电池簇功率'
    },
    batteryTempOption: {
      czdwd: '簇最低温度',
      yAxisName: '单位:℃',
      seriesName: '簇最低温度'
    },
    pageNumBaoqingFun: {
      rcdl: '日充电量',
      unitMWh: 'MWh',
      rfdl: '日放电量',
      soc: 'SOC',
      unitPer: '%',
      soh: 'SOH',
      rgzcs: '日故障次数',
      unitCi: '次',
    },
    runingFun: {
      zdkcglmv: '最大可充功率/MW',
      zdkfglmv: '最大可放功率/MW',
      zdkcsjmin: '最大可充时间/min',
      zdkfsjmin: '最大可放时间/min',
    },
    warnList: {
      message1: '保护[BCMS内部通讯故障]发生故…',
      area1: '#1电池簇',
      message2: '保护[BCMS内部通讯故障]发生',
      area2: '#2电池簇',
      message3: '告警[单体压差大]产生',
      area3: '#3电池簇',
      message4: '告警[单体压差大]产生',
      area4: '#8电池簇',
      message5: '告警[单体压差大]产生',
      area5: '#9电池簇',
      message6: '告警[单体压差大]产生',
      area6: '#9电池簇',
      message7: '告警[单体压差大]产生',
      area7: '#9电池簇',
    },
    baoqingSytemStatusFun: {
      fxt: '分系统',
    },
    baoqingRealtimeOption: {
      yAxisName: '单位:GWH',
      seriesName: '实时充放',
    },
    baoqingWarnOption: {
      unitGe: '个',
      yAxisName: '单位:个',
      seriesName: '告警数'
    },
    msgList: {
      fxtsbms: '分系统设备模式',
      kx: '空线',
      fxtgzzt: '分系统工作状态',
      yx: '运行',
      fxtzdkcgl: '分系统最大可充功率',
      fxtzdkfgl: '分系统最大可放功率',
      fxtkfdl: '分系统可放电量',
      fxtkcdl: '分系统可充电量',
      fxtzcdl: '分系统总充电量',
      fxtzfdl: '分系统总放电量',
    },
    msgPopList: {
      zdqy: '站点区域',
      ftq: '福田区',
      jtdz: '具体地址',
      address: '深圳市福田区红荔西路与香蜜湖路东北交叉口',
      zdxz: '站点性质',
      '5gjz': '5G基站',
    },
    popRealtimeOption: {
      yAxisName:'单位:kw',
      seriesName:'实时充放'
    },
    pageNumLianhuaxiFun: {
      nljfdl: '年累计发电量',
      wanKwh: '万kWh',
      nyxlyxss: '年有效利用小时数',
      unitHour: '小时',
      nljco2jpl: '年累计CO²减排量',
      unitTon: '吨',
    },
    chargingStationTabsFun: {
      cdzlx: '充电桩类型',
      cdzdllx: '充电桩电流类型',
    },
    chargingStationGunTabsFun: {
      cdqlx: '充电枪类型',
      cdqdllx: '充电枪电流类型',
    },
    chargingStationPieDataFun: {
      kcz: '快充桩',
      mcz: '慢充桩',
      ccz: '超充桩',
      v2gz: 'V2G桩',
      zlz: '直流桩',
      jlz: '交流桩',
      jzlz: '交直流桩',
      qtz: '其他桩',
      kcq: '快充枪',
      mcq: '慢充枪',
      ccq: '超充枪',
      v2gq: 'V2G枪',
      zlq: '直流枪',
      jlq: '交流枪',
      jzlq: '交直流枪',
      qtq: '其他枪',
      unitGe: '个',
    },
    batteryMsgFun: {
      zdfdl: '最大放电量',
      fddy: '放电电压',
      cddy: '充电电压'
    },
    getSuperHeaderData: {
      zd: '站点',
      cc: '超充',
      cdl: '充电量',
      cdcs: '充电次数',
      zdfdl: '充电时长',
      unitHour: '小时',
      zdgzcs: '站点故障次数',
      unitCi: '次',
    },
  }
}