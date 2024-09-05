export default {
  cdzdxx: 'Charging site information', //'充电站点信息',
  sbssxx: 'Equipment and facility information', //'设备设施信息',
  cdzzs: 'Total number of charging stations', //'充电桩总数',
  cdqzs: 'Total number of charging guns', //'充电枪总数',
  gjxx: 'Alarm information', //'告警信息',
  zdcdzzt: 'Charging station status of the site', //'站点充电桩状态',
  cdssrsyxx: 'Daily usage information of charging facilities', //'充电设施日使用信息',
  zdssgl: 'Real-time power of the site', //'站点实时功率'
  tabList: {
    pile: 'pile', // '桩',
    gun: 'gun' //'枪',
  },
  config: {
    lianhuaPowerFun: {
      swdl: 'On-grid energy ', // '上网电量',
      fddl: 'Power generation capacity' // '发电电量',
    },
    lianhuaWarnFun: {
      today: 'Today', // '今日',
      gjs: 'Number of alarms' // '告警数',
    },
    lianhuaWarnOption: {
      unitGe: '', // '个',
      gjs: 'Number of alarms', // '告警数',
      yAxisName: 'Unit:', // '单位:个',
      day: 'day' // '日'
    },
    lianhuaRealtimeOption: {
      ssgl: 'Real-time power', // '实时功率',
      yAxisName: 'Unit: kW', // '单位:kW ',
      seriesName: 'Real-time power' // '实时功率',
    },
    deviceInfoFun: {
      zdzjrl: 'Site installed capacity', // '站点装机容量',
      zdgfbmj: 'Site photovoltaic panel area' // '站点光伏板面积',
    },
    facilitiesLabel: {
      electricalRoom: 'Power distribution room', // "配电房",
      toilet: 'Toilet', // "卫生间",
      store: 'Convenience Store', // '便利店',
      rest: 'lounge', // '休息区',
      maintenance: 'Maintenance area', // '维修区',
      bigHouse: 'Exhibition Hall', // '展示馆',
      bigHouse1: 'Conference Hall', // '会议馆',
      bigHouse2: 'Trading Hall', // '交易馆',
      monitorCenter: 'Real-time monitoring center', // '实时监测中心',
      microgridBox: 'Micro net cage transformation', // '微网箱变',
      energyStorageBox: 'Energy storage box', // '储能箱',
      chargingTerminal: 'Charging terminal', // '充电终端',
      PVPanel: 'Photovoltaic panels', // '光伏电池板',
      chargingStation: 'Charging station', // '充电站',
      chargingTerminal1: 'Centralized controlled charging terminal', // '充电集控终端',
      V2G: 'V2G pile', // 'V2G桩',
      chargingTerminal2: 'Liquid cooled high-power charging terminal', // '液冷大功率充电终端',
      chargingStack: 'Charging pile', // '充电堆',
      batteryRoom: 'Battery Equipment Room', // '电池设备室',
      energyStorageBox1: 'Energy storage cabinet', // '储能柜',
      rest1: 'lounge', // '休息室',
      microgridBox1: '1 # Box Transformer', // '1#箱变',
      microgridBox2: '2 # Box Transformer', // '2#箱变',
      microgridBox3: '3 # Box Transformer', // '3#箱变',
      microgridBox4: '4 # Box Transformer', // '4#箱变',
      microgridBox5: '5 # Box Transformer', // '5#箱变',
      building: 'Building for Indoor power distribution equipment', // '户内配电装置楼',
      photovoltaic: 'Photovoltaic panels', // '光伏电池板',
      building1: 'Building for main control communication', // '主控通信楼',
      fan: 'Fan', // '风机',
      machineRoom: 'computer room', // '机房',
      microwave: 'microwave', // '微波',
      '5GAntenna': '5G antenna' //  '5G天线',
    },
    floor1SpaceMarker: {
      gypds: 'High voltage distribution room', // '高压配电室',
      pdbyqs: 'Distribution Transformer Room', // '配电变压器室',
      pcss: 'PCS room', // 'PCS室',
      dcds1: '#1. Battery stack room', // '#1电池堆室',
      dcds3: '#3 Battery Stack Room', // '#3电池堆室',
      dcc: 'Battery cluster' // '电池簇',
    },
    floor2SpaceMarker: {
      dzk: 'Lifting hole', // '吊装孔',
      cndcds5: '#5 Battery stack room', // '储能电池堆室#5',
      ktjf: 'AC Room', // '空调机房',
      dcds2: '#2 Battery Stack Room', // '#2电池堆室',
      dcds4: '#4 Battery Stack Room' // '#4电池堆室',
    },
    floor1DeviceMarker: {
      pcsgyzhq: 'PCS protocol converter', // 'PCS规约转换器',
      dcc: 'Battery cluster' // '电池簇',
    },
    floor2DeviceMarker: {
      dcc: 'Battery cluster' // '电池簇',
    },
    pageNumFun: {
      zdcdl: 'Site charging capacity', // '站点充电量',
      KWH: 'kWh', // 'kWh',
      zdcdcs: 'Site charging frequency', // '站点充电次数',
      unitCi: '', // '次',
      zdcdsc: 'Site charging duration', // '站点充电时长',
      unitHour: 'hr', // '小时',
      zdgzcs: 'Number of Site malfuction' // '站点故障次数',
    },
    deviceInfoDataFun: {
      cdzg: 'Charging station/piece', // '充电桩/个',
      cdqg: 'Charging gun/piece' // '充电枪/个',
    },
    warningTabsDataFun: {
      yjrsaq: 'First-level personal safety alarm', // '一级人身安全',
      ejsbaq: 'Second-level equipment safety alarm', // '二级设备安全',
      sjgjts: 'Third-level alarm' // '三级告警提示',
    },
    chargingTypesTabsFun: {
      cdzsyqk: 'Usage of charging stations', // '充电桩使用情况',
      cdqsyqk: 'Usage of charging gun' // '充电枪使用情况',
    },
    chargingTypesFun: {
      dqsyl: 'Current usage rate', // '当前使用率',
      unitCi: 'time/s', // '次',
      sycs: 'Usage frequency' // '使用次数',
    },
    linePowerDataFun: {
      ssgl: 'Real-time power' // '实时功率',
    },
    columnDataFun: {
      yysmc: 'Operator name', // '运营商名称',
      cdzmc: 'Charging station name', // '充电站名称',
      gjjb: 'Alarm level', // '告警级别',
      gjms: 'Alarm description', // '告警描述',
      gjlx: 'Alarm Type ', // '告警类型',
      gjsj: 'Alarm time', // '告警时间',
      aqfzr: 'Safety Manager', // '安全负责人',
      lxdh: 'contact number' // '联系电话',
    },
    realtimeTrendFun: {
      gjs: 'Number of alarms' // '告警数'
    },
    stationWarnFun: {
      gjs: 'Number of alarms' // '告警数'
    },
    stationWarnOption: {
      unitGe: '', // '个',
      gjs: 'Number of alarms', // '告警数',
      yAxisName: 'Unit:', // '单位:个',
      day: 'Day' // '日',
    },
    batterySOHOption: {
      dccgl: 'Battery cluster power', // '电池簇功率',
      yAxisName: 'Unit: kW', // '单位：kW',
      seriesName: 'Battery cluster power' // '电池簇功率'
    },
    batteryTempOption: {
      czdwd: 'Cluster lowest temperature', // '簇最低温度',
      yAxisName: 'Unit: ℃', // '单位:℃',
      seriesName: 'Cluster lowest temperature' // '簇最低温度'
    },
    pageNumBaoqingFun: {
      rcdl: 'Daily charging capacity', // '日充电量',
      unitMWh: 'MWh', // 'MWh',
      rfdl: 'Daily discharging capacity', // '日放电量',
      soc: 'SOC', // 'SOC',
      unitPer: '%', // '%',
      soh: 'SOH', // 'SOH',
      rgzcs: 'Daily number of malfunctions', // '日故障次数',
      unitCi: 'time/s' // '次',
    },
    runingFun: {
      zdkcglmv: 'Maximum chargeable power/MW', // '最大可充功率/MW',
      zdkfglmv: 'Maximum dischargeable power/MW', // '最大可放功率/MW',
      zdkcsjmin: 'Maximum chargeable time/min', // '最大可充时间/min',
      zdkfsjmin: 'Maximum dischargeable time/min' // '最大可放时间/min',
    },
    warnList: {
      message1: 'Protection against BCMS internal communication failure', // '保护[BCMS内部通讯故障]发生故…',
      area1: '#1 battery cluster', // '#1电池簇',
      message2: 'Protection against BCMS internal communication failure', // '保护[BCMS内部通讯故障]发生',
      area2: '#2 battery clusters', // '#2电池簇',
      message3: 'Alarm: large individual voltage difference', // '告警[单体压差大]产生',
      area3: '#3 battery clusters', // '#3电池簇',
      message4: 'Alarm: large individual voltage difference', // '告警[单体压差大]产生',
      area4: '#8 battery clusters', // '#8电池簇',
      message5: 'Alarm: large individual voltage difference', // '告警[单体压差大]产生',
      area5: '#9 battery clusters', // '#9电池簇',
      message6: 'Alarm: large individual voltage difference', // '告警[单体压差大]产生',
      area6: '#9 battery clusters', // '#9电池簇',
      message7: 'Alarm: large individual voltage difference', // '告警[单体压差大]产生',
      area7: '#9 battery clusters' // '#9电池簇',
    },
    baoqingSytemStatusFun: {
      fxt: 'subsystem' // '分系统',
    },
    baoqingRealtimeOption: {
      yAxisName: 'Unit:GWH', // '单位:GWH',
      seriesName: 'Real-time charging and discharging' // '实时充放',
    },
    baoqingWarnOption: {
      unitGe: '', // '个',
      yAxisName: 'Unit:', // '单位:个',
      seriesName: 'Number of alarms' // '告警数'
    },
    msgList: {
      fxtsbms: 'Subsystem equipment mode', // '分系统设备模式',
      kx: 'Empty Line', // '空线',
      fxtgzzt: 'Working status of subsystems', // '分系统工作状态',
      yx: 'functioning', // '运行',
      fxtzdkcgl: 'Maximum charging power of the subsystem', // '分系统最大可充功率',
      fxtzdkfgl: 'Maximum discharging power of the subsystem', // '分系统最大可放功率',
      fxtkfdl: 'Discharging capacity of subsystems', // '分系统可放电量',
      fxtkcdl: 'Rechargeable capacity of subsystems', // '分系统可充电量',
      fxtzcdl: 'Total charging capacity of subsystems', // '分系统总充电量',
      fxtzfdl: 'Total discharge capacity of subsystems' // '分系统总放电量',
    },
    msgPopList: {
      zdqy: 'Station area', // '站点区域',
      ftq: 'Futian District', // '福田区',
      jtdz: 'Specific address', // '具体地址',
      address: '深圳市福田区红荔西路与香蜜湖路东北交叉口',
      //'Northeast Intersection of Hongli West Road and Xiangmihu Road, Futian District, Shenzhen', // '深圳市福田区红荔西路与香蜜湖路东北交叉口',
      zdxz: 'Site feature', // '站点性质',
      '5gjz': '5G base station' // '5G基站',
    },
    popRealtimeOption: {
      yAxisName: 'Unit: kw', // '单位:kw',
      seriesName: 'Real-time charging and discharging' // '实时充放'
    },
    pageNumLianhuaxiFun: {
      nljfdl: 'Annual cumulative power generation', // '年累计发电量',
      wanKwh: '10000 kWh', // '万kWh',
      nyxlyxss: 'Annual effective utilization hours', // '年有效利用小时数',
      unitHour: 'hour', // '小时',
      nljco2jpl: 'Annual cumulative carbon dioxide emission reduction', // '年累计CO²减排量',
      unitTon: 'ton' // '吨',
    },
    chargingStationTabsFun: {
      cdzlx: 'Type of charging station', // '充电桩类型',
      cdzdllx: 'charging station current type' // '充电桩电流类型',
    },
    chargingStationGunTabsFun: {
      cdqlx: 'Charging gun type', // '充电枪类型',
      cdqdllx: 'Charging gun current type' // '充电枪电流类型',
    },
    chargingStationPieDataFun: {
      kcz: 'Fast charging pile', // '快充桩',
      mcz: 'Slow charging pile', // '慢充桩',
      ccz: 'Supercharging pile', // '超充桩',
      v2gz: 'V2G charging pile', // 'V2G桩',
      zlz: 'DC charging pile', // '直流桩',
      jlz: 'AC pile', // '交流桩',
      jzlz: 'AC/DC pile', // '交直流桩',
      qtz: 'Other piles', // '其他桩',
      kcq: 'Quick charging gun', // '快充枪',
      mcq: 'Slow charging gun', // '慢充枪',
      ccq: 'Supercharging gun', // '超充枪',
      v2gq: 'V2G charging gun', // 'V2G枪',
      zlq: 'DC charging gun', // '直流枪',
      jlq: 'AC charging gun', // '交流枪',
      jzlq: 'AC/DC charging gun', // '交直流枪',
      qtq: 'Other charging guns', // '其他枪',
      unitGe: '' // '个',
    },
    batteryMsgFun: {
      zdfdl: 'Maximum discharging capacity', // '最大放电量',
      fddy: 'discharging voltage ', // '放电电压',
      cddy: 'Charging voltage' // '充电电压'
    },
    getSuperHeaderData: {
      zd: 'site', // '站点',
      cc: 'Supercharging', // '超充',
      cdl: 'Charging capacity', // '充电量',
      cdcs: 'Number of charging times', // '充电次数',
      zdfdl: 'Charging duration', // '充电时长',
      unitHour: 'hour', // '小时',
      zdgzcs: 'Number of site malfunctions', // '站点故障次数',
      unitCi: '', // '次',
      w: 'W'
    }
  },
  components: {
    baiqing: {
      floors: {
        all: 'All', // '全部',
        F1: 'F1',
        F2: 'F2',
        F3: 'F3'
      },
      floorMenu: {
        'space-distribution': 'space distribution ', // '空间分布',
        'device-functions': 'Equipment functions' // '设备功能'
      },
      tabName: {
        zdzl: 'Site Overview' // '站点总览'
      },
      bottomTabs: {
        zdzl: 'Site Overview', // '站点总览',
        sjmy: 'Perspective Roaming', // '视角漫游',
        znss: 'On-site facilities' // '站内设施'
      },
      floor3Marker: {
        gfdcb: 'Photovoltaic panels' //  '光伏电池板'
      }
    },
    'baoqing-child': {
      bqcnz: 'Baoqing Energy Storage Site', // '宝清储能站',
      cnfxt1: '#1 Energy storage subsystem', // ' #1储能分系统',
      fxtjcxx: 'Basic information of subsystems', // '分系统基础信息',
      pcsgjxx: 'PCS alarm information', // 'PCS告警信息',
      btnList: {
        cdys: 'Charging demonstration', // '充电演示',
        fdys: 'Discharge demonstration' // '放电演示',
      }
    },
    'baoqing-system-status': {
      state: {
        offline: 'offline', // '离线',
        online: 'online' // '在线',
      }
    },
    baoqingchuneng: {
      zdjbxx: 'Basic information of the site', // '站点基本信息',
      stationName: 'Southern Power Grid Shenzhen Baoqing Energy Storage Power Site', // '南方电网深圳宝清储能电站',
      companyName: 'ID:1928479400029287', // 'ID:1928479400029287',
      normal: 'normal', // '正常',
      zdsjxx: 'Site data information', // '站点数据信息',
      gjxx: 'Alarm information', // '告警信息',
      cnfxtzt: 'Energy storage subsystem status', // '储能分系统状态',
      sscfqk: 'Real-time charging and discharging status', // '实时充放情况',
      infoListData: {
        zdsjrl: 'Site design capacity:', // '站点设计容量：',
        zdzdmj: 'Site area:', // '站点占地面积：',
        zdzdmjValue: '12000 square meters', // '12000平方米',
        jtdz: 'Specific address:', // '具体地址：',
        jtdzValue: 'No. 27 Qingfeng Avenue, Longgang District, Shenzhen', // '深圳市龙岗区清风大道27号',
        yys: 'Operator:', // '运营商：',
        yysValue: 'Shenzhen Southern Power Grid Co., Ltd', // '深圳市南方电网有限公司',
        fzr: 'Superintendent：', // '负责人：',
        fzrValue: 'Zhang Xiaohui', // '张小辉',
        lxfs: 'contact information:', // '联系方式：',
        lxfsValue: '010-2891029839'
      }
    },
    'battery-msg': {
      infoListFun: {
        csoh: 'Cluster SOH', // '簇SOH',
        csoc: 'Cluster SOC', // '簇SOC',
        'jydz+': 'Insulation resistance+', // '绝缘电阻+',
        'jydz-': 'Insulation resistance-', // '绝缘电阻-',
        cssgl: 'Cluster real-time power', // '簇实时功率',
        cdl: 'Cluster current', // '簇电流',
        cljcdl: 'Accumulated charging capacity of clusters', // '簇累计充电量',
        cljfdl: 'Accumulated discharging capacity of clusters' // '簇累计放电量',
      }
    },
    'charging-state': {
      state: {
        offline: 'offline', // '离线',
        nowork: 'unoccupied', // '空闲',
        charging: 'Charging', // '充电中',
        errorwork: 'malfunction' // '故障',
      },
      warnState: {
        chargingWarning: 'alarm' // '告警'
      },
      typeFormate: {
        kc: 'Fast charging', // '快充',
        mc: 'Slow charging', // '慢充',
        cc: 'Supercharging' // '超充',
      }
    },
    'dialog-battery': {
      cxx: 'Cluster information', // '簇信息',
      cdywd: 'Cluster voltage/temperature' // '簇电压/温度'
    },
    'dialog-msg': {
      leftList: {
        pcsabmxdy: 'PCS AB bus voltage', // 'PCS AB母线电压',
        pcsbcmxdy: 'PCS BC bus voltage', // 'PCS BC母线电压',
        pcscamxdy: 'PCS CA bus voltage', // 'PCS CA母线电压',
        pcsaxdl: 'PCS A-phase current', // 'PCS A相电流',
        pcsbxdl: 'PCS B-phase current', // 'PCS B相电流',
        pcscxdl: 'PCS C-phase current', // 'PCS C相电流',
        pcspl: 'PCS frequency' // 'PCS 频率',
      },
      rightList: {
        pcstxzt: 'PCS telecom status', // 'PCS 通讯状态',
        zc: 'normal', // '正常',
        pcsyfkz: 'PCS remote control', // 'PCS 远方控制',
        pcsyxzt: 'PCS running status', // 'PCS 运行状态',
        pcsgzzt: 'PCS malfunction status', // 'PCS 故障状态',
        pcsgjzt: 'PCS alarm status' // 'PCS 告警状态',
      }
    },
    'honglixi-popup': {
      ssgl: 'Real-time power' // '实时功率'
    },
    honglixi: {
      zdjbxx: 'Basic information of the site', // '站点基本信息',
      stationName: 'Hongli West 5G Demonstration Station', // '红荔西5G示范站',
      companyName: 'China Tower Corporation Shenzhen Branch', // '中国铁塔股份有限公司深圳市分公司',
      zc: 'normal', // '正常',
      cndcxx: 'Energy storage battery information', // '储能电池信息',
      sscfqk: 'Real-time charging and discharging status' // '实时充放情况',
    },
    'lianhua-popup': {
      ssfdgl: 'Real-time power generation efficiency' // '实时发电功率',
    },
    lianhuajinggui: {
      state: {
        offline: 'off-line', // '离线',
        online: 'on-line' // '在线',
      }
    },
    lianhuaxi: {
      zdjbxx: 'Basic information of the site', // '站点基本信息',
      stationName: 'Lianhua Village Subway Station Distributed Photovoltaic Station', // '莲花村地铁站分布式光伏站',
      companyName: 'Shenzhen Shenran New Energy Technology Co., Ltd', // '深圳市深燃新能源科技有限公司',
      normal: 'normal', // '正常',
      sssbxx: 'Facility and equipment information', // '设施设备信息',
      zdgjxx: 'Station alarm information', // '站点告警信息',
      djgzjzt: 'Status of monocrystalline silicon components', // '单晶硅组件状态',
      jrdlxx: "Today's power storage information", // '今日电量信息',
      zdssgl: 'Real-time power of the site', // '站点实时功率',
      infoListFun: {
        yzdw: 'Owner:', // '业主单位：',
        yzdwValue: 'Shenzhen Metro Group Co., Ltd', // '深圳市地铁集团有限公司',
        jtdz: 'Specific address:', // '具体地址：',
        jtdzValue: 'Metro Line 10 Project in Futian District, Shenzhen, Guangdong Province', // '广东省深圳市福田区轨道交通10号线工程-主…',
        zdqy: 'Site area:', // '站点区域：',
        zdqyValue: 'Futian District', // '福田区',
        bwqk: 'Grid connection status:', // '并网情况：',
        bwqkValue: 'Connected to the grid', // '已并网',
        lxfs: 'contact information:', // '联系方式：',
        lxfsValue: '13682341234'
      }
    },
    'pop-box': {
      hlx5gsfz: 'Hongli West 5G Demonstration Station', // '红荔西5G示范站',
      cndcxx: 'Battery information', // '储能电池信息',
      zdzdfdl: 'Maximum discharging capacity of the station', // '站点最大放电量',
      zdsscfqk: 'Real-time charging and discharging status of the site', // '站点实时充放情况',
      warnBottomList: {
        fddy: 'discharging voltage ', // '放电电压',
        cddy: 'Charging voltage' // '充电电压',
      }
    },
    'station-info': {
      stationProperty: {
        gy: 'open to public', // '公用',
        zy: 'dedicated' // '专用',
      },
      stationStatus: {
        wz: 'unknown', // '未知',
        jsz: 'Under construction', // '建设中',
        gbxx: 'closed', // '关闭下线',
        whz: 'Under maintenance', // '维护中',
        zcsy: 'open to use' // '正常使用',
      },
      stationType: {
        gg: 'public', // '公共',
        gr: 'private', // '个人',
        gjzy: 'for bus only', // '公交（专用）',
        hwzy: 'for public sanitation truck only', // '环卫（专用）',
        wlzy: 'for logistics vehicle only', // '物流（专用）',
        czczy: 'for taxi only', // '出租车（专用）',
        qt: 'other' // '其他',
      },
      infoListFun: {
        zdqy: 'Site area:', // '站点区域：',
        jtdz: 'Specific address:', // '具体地址：',
        zdxz: 'Site feature:', // '站点性质：',
        zdlx: 'Site type:', // '站点类型：',
        fzr: 'superintendent:', // '负责人：',
        lxfs: 'contact information:' // '联系方式：',
      }
    },
    'temperature-msg': {
      infoListFun: {
        totalVoltage: 'Total voltage of the cluster', // '簇总电压',
        prechargeVoltage: 'Pre-charging voltage of the cluster', // '簇预充电压',
        avgVoltage: 'Aerage voltage of the cluster', // '簇平均电压',
        avgTemperature: 'Cluster average temperature' // '簇平均温度',
      }
    },
    'pile-dialog': {
      'active-message': {
        infoListFun: {
          ljcdl: 'Accumulated charging capacity', // '累计充电量',
          ljfdl: 'Accumulated discharging capacity', // '累计放电量',
          ljcdsc: 'Accumulated charging time', // '累计充电时长',
          ljcdcs: 'Accumulated charging times', // '累计充电次数',
          unitCi: 'time/s', // '次',
          ssgl: 'Real-time power', // '实时功率',
          gzl: 'malfunction rate', // '故障率',
          lyl: 'usage rate', // '利用率',
          nbwd: 'inner temperature' // '内部温度',
        },
        state: {
          offline: 'off-line', // '离线',
          normal: 'normal', // '正常',
          warning: 'malfunction' // '故障',
        }
      },
      'base-info': {
        cdz: 'Charging station', // '充电桩',
        cdq: 'Charging gun', // '充电枪',
        state: {
          offline: 'off-line', // '离线',
          online: 'normal', // '正常',
          warning: 'malfunction' // '故障',
        },
        equipmentTypeFun: {
          zlsb: 'DC equipment', // '直流设备',
          jlsb: 'Communication equipment', // '交流设备',
          jzlytsb: 'AC/DC integrated equipment', // '交直流一体设备',
          wxsb: 'Wireless charging', // '无线充电',
          cfdsb: 'Charging and discharging equipment', // '充放电设备',
          qt: 'other' // '其他',
        },
        listDataFun: {
          equipmentName: 'Equipment Name:', // '设备名称：',
          equipmentType: 'Equipment type:', // '设备类型：',
          equipmentId: 'Equipment Number:', // '设备编号：',
          equipmentStatus: 'Equipment status:', // '设备状态：',
          equipmentModel: 'Equipment model:', // '设备型号：',
          equipmentPower: 'Total power of equipment:', // '设备总功率：',
          gunSum: 'Total number of guns:', // '总枪数：',
          ratedPower: 'Rated power:' // '额定功率：',
        },
        messageColumnKeyListFun: {
          index: 'No.', // '序号',
          connectorName: 'Equipment interface name', // '设备接口名称',
          connectorId: 'Equipment interface code' // '设备接口编码',
        }
      },
      'normal-pile': {
        jbxx: 'essential information', // '基本信息',
        dtxx: 'dynamic information ', // '动态信息',
        gjxx: 'alarm' // '告警信息',
      },
      'pile-dialog': {
        ckgjxq: 'View alarm details', // '查看告警详情',
        state: {
          offline: 'off-line', // '离线',
          online: 'normal', // '在线',
          warning: 'malfunction' // '故障',
        }
      },
      'warning-box': {
        ckjbxx: 'View basic information', // '查看基本信息',
        state: {
          offline: 'off-line', // '离线',
          online: 'normal', // '在线',
          warning: 'malfunction' // '故障',
        }
      },
      'warning-message': {
        messageColumnKeyListFun: {
          index: 'No.', // '序号',
          alarmTime: 'Alarm time', // '告警时间',
          alarmType: 'Alarm Type ', // '告警类型',
          alarmDesc: 'Alarm description' // '告警描述',
        }
      },
      'warning-pile': {
        yjdd: 'One click power-off', // '一键断电',
        yjhj: 'One click call', // '一键呼叫',
        qrxf: 'Confirm repair', // '确认修复',
        'name-pile': 'Li Qiang - BYD Minle Charging Site - Safety Manager', // '李强-比亚迪民乐充电站-安全负责人',
        userName: 'Li Qiang', // '李强',
        alarmLevelData: {
          yjrsaq: 'First-level personal safety alarm', // '一级人身安全',
          ejsbaq: 'Second-level equipment safety alarm', // '二级设备安全',
          sjgjts: 'Third-level alarm' // '三级告警提示',
        },
        equipmentTypes: {
          zlsb: 'DC equipment', // '直流设备',
          jlsb: 'Communication equipment', // '交流设备',
          jzlytsb: 'AC/DC integrated equipment', // '交直流一体设备',
          wxcd: 'Wireless charging', // '无线充电',
          cfdsb: 'Charging and discharging equipment', // '充放电设备',
          qt: 'other' // '其他',
        },
        alarmTypes: {
          cdxtgz: 'Charging system malfunction', // '充电系统故障',
          dcxtgz: 'Battery system malfunction', // '电池系统故障',
          pdxtgz: 'Power distribution system malfunction' // '配电系统故障',
        },
        affirms: {
          unaffirms: 'Not confirmed', // '未确认',
          affirms: 'Confirmed' // '已确认',
        },
        listDataLeftFun: {
          equipmentName: 'Equipment Name:', // '设备名称：',
          equipmentId: 'Equipment Number:', // '设备编号：',
          alarmType: 'Alarm type:', // '告警类型：',
          alarmTime: 'Alarm time:', // '告警时间：',
          affirm: 'Confirmation result:' // '确认结果：',
        },
        listDataRightFun: {
          equipmentType: 'Equipment type:', // '设备类型：',
          connectorId: 'Equipment interface code:', // '设备接口编码：',
          alarmDesc: 'Alarm description:', // '告警描述：',
          reportingTime: 'Report time:', // '上报时间：',
          contactTel: 'Superintendent contact number:' // '负责人电话：',
        },
        btnList: {
          video: 'video', // '视频',
          voice: 'Microphone', // '麦克风',
          hangup: 'ring up' // '挂断',
        }
      }
    }
  }
};
