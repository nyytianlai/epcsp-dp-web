export default {
  config:{
    pageNumFun: {
      cdzhanzl: 'Total number of charging sites', // '充电站总量',
      unitGe: '', // '个',
      cdzhuangzl: 'Total number of charging sites', // '充电桩总量',
      cdqzl: 'Total number of charging guns', // '充电枪总量',
      cdzgl: 'Total charging power', // '充电总功率',
      unitWanKW: '10K kW', // '万kW',
    },
    chargingStationTabsFun: {
      cdzlx: 'Charging station type', // '充电桩类型',
      cdzdllx: 'Charging station current type', // '充电桩电流类型',  
    },
    chargingStationGunTabsFun: {
      cdqlx: 'Charging gun type', // '充电枪类型',
      cdqdllx: 'Charging gun current type', // '充电枪电流类型', 
    },
    chargingStationPieDataFun: {
      kcz: 'Fast charging statio', // '快充桩',
      unitGe: '', // '个',
      mcz: 'Slow charging station', // '慢充桩',
      ccz: 'Supercharging station', // '超充桩',
      zzz: 'DC station', // '直流桩',
      jlz: 'AC station', // '交流桩',
      jzlz: 'AC/DC station', // '交直流桩',
      qtz: 'other station', // '其他桩',
      kcq: 'Fast charging gun', // '快充枪',
      mcq: 'Slow charging guns', // '慢充枪',
      ccq: 'Supercharging guns', // '超充枪',
      zlq: 'DC gun', // '直流枪',
      jlq: 'AC gun', // '交流枪',
      jzlq: 'AC/DC gun', // '交直流枪',
      qtq: 'other gun', // '其他枪',
    },
    areaRankDataFun: {
      unitCi: '', // '次',
      nsq: 'Nanshan', // '南山区',
      baq: "Bao'an", // '宝安区',
      lhq: 'Luohu', // '罗湖区',
      longhq: 'Longhua', // '龙华区',
      longgq: 'Longgang', // '龙岗区',
      dpxq: 'Dapeng', // '大鹏新区',
    },
    chargingTypesTabsFun: {
      cdzzt: 'Charging station status', // '充电桩状态',
      cdqzt: 'Charging gun status', // '充电枪状态',
    },
    chargingTypesFun: {
      unitGe: '', // '个',
      dqzx: 'Currently online', // '当前在线',
      dqlx: 'Currently offline', // '当前离线',
    },
    lineStateDataFun: {
      zx: 'on-line', // '在线',
      lx: 'off-line', // '离线',  
    },
    chargingRunTabsFun: {
      cdzyxqk: 'Running status of charging station', // '充电桩运行情况',
      cdqyxqk: 'Running status of charging gun', // '充电枪运行情况',
    },
    chargingRunDataFun: {
      dqsyl: 'Current usage rate', // '当前使用率',
      dqgzl: 'Current malfunction rate', // '当前故障率',  
    },
    lineRunDataFun: {
      zsyl: 'Charging station usage rate', // '桩使用率',
      qsyl: 'Gun usage rate', // '枪使用率',
      zgzl: 'Station malfunction rate', // '桩故障率',
      qgzl: 'Gun malfunction rate', // '枪故障率',
    },
    bottomTabDataFun: {
      cdz: 'Charging station', // '充电桩',
      cdq: 'Charging gun', // '充电枪',
    },
    columnDataFun: {
      stationName: 'Charging station name', // '充电站名称',
      operatorName: 'Operating enterprise name', // '运营企业名称',
      areaName: 'District belonged', // '所属区域',
      equipmentCount: 'Charging station', // '充电桩',
      gunCount: 'Charging gun', // '充电枪',
      equipmentPower: 'Total rated power/kw', // '额定总功率/kw',
    },
    filters: {
      all: 'all', // '全部',
      lhq: 'Luohu', // '罗湖区',
      ftq: 'Futian', // '福田区',
      nsq: 'Nanshan', // '南山区',
      baq: "Bao'an", // '宝安区',
      longgq: 'Longgang', // '龙岗区',
      ytq: 'Yantian', // '盐田区',
      longhq: 'Longhua', // '龙华区',
      psq: 'Pingshan', // '坪山区',
      gmq: 'Guangming', // '光明区',
      dpxq: 'Dapeng', // '大鹏新区',
      sstbhzq: 'Shenzhen-Shantou Special Cooperation Zone', // '深汕特别合作区',
    }
  },
  'left-panel': {
    unitCi: '', // '次',
    tabList:{
      day: 'day', // '日',
      month: 'month', // '月',
      year: 'year', // '年',
    },
    cdsszl: 'Total number of charging facilities', // '充电设施总量',
    cdzzs: 'Total number of charging stations', // '充电桩总数',  
    cdqzs: 'Total number of charging guns', // '充电枪总数',
    xzqcdcsqk: 'Charging frequency in each disctrict', // '行政区充电次数情况',
    cdzszls: 'Charging site digital twin', // '充电站数字孪生'
  },
  'right-panel': {
    zxyxztqk: 'Online operating status', // '在线运行状态情况',
    unitGe: '', // '个'
  },
  'charging-realtime-power': {
    sscdgl: 'Real-time charging power', // '充电实时功率'
  },
  'charging-station-list-dialog':{
    cdzsslb: 'Charging site list', // '充电站设施列表',
    qsr: 'Please enter', // '请输入',
    cz: 'operation', // '操作',
    xq: 'details', // '详情',
    xh: 'No.', //'序号',
  },
  'map-layer':{
    legendListData: {
      kcz: 'Fast charging station', // '快充桩',
      mcz: 'Slow charging station', // '慢充桩',
      ccz: 'Supercharging station', // '超充桩',
    },
    cdzsg: 'Number of charging stations', // '充电桩数/个',
    cdqsg: 'Number of charging guns', // '充电枪数/个'
  }
}