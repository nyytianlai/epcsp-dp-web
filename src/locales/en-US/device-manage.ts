export default {
  config:{
    pageNumFun: {
      cdzhanzl: 'Total number of charging stations', // '充电站总量',
      unitGe: 'individual', // '个',
      cdzhuangzl: 'Total number of charging stations', // '充电桩总量',
      cdqzl: 'Total number of charging guns', // '充电枪总量',
      cdzgl: 'Total charging power', // '充电总功率',
      unitWanKW: '10000 kW', // '万kW',
    },
    chargingStationTabsFun: {
      cdzlx: 'Type of charging station', // '充电桩类型',
      cdzdllx: 'Charging pile current type', // '充电桩电流类型',  
    },
    chargingStationGunTabsFun: {
      cdqlx: 'Charging gun type', // '充电枪类型',
      cdqdllx: 'Charging gun current type', // '充电枪电流类型', 
    },
    chargingStationPieDataFun: {
      kcz: 'Fast charging pile', // '快充桩',
      unitGe: 'individual', // '个',
      mcz: 'Slow charging pile', // '慢充桩',
      ccz: 'Supercharging pile', // '超充桩',
      zzz: 'DC pile', // '直流桩',
      jlz: 'Communication pile', // '交流桩',
      jzlz: 'AC/DC pile', // '交直流桩',
      qtz: 'Other piles', // '其他桩',
      kcq: 'Quick charging gun', // '快充枪',
      mcq: 'Slow charging gun', // '慢充枪',
      ccq: 'Supercharging gun', // '超充枪',
      zlq: 'DC gun', // '直流枪',
      jlq: 'Communication gun', // '交流枪',
      jzlq: 'AC/DC gun', // '交直流枪',
      qtq: 'Other guns', // '其他枪',
    },
    areaRankDataFun: {
      unitCi: 'second', // '次',
      nsq: 'Nanshan District', // '南山区',
      baq: "Bao'an District", // '宝安区',
      lhq: 'Luohu District', // '罗湖区',
      longhq: 'Longhua District', // '龙华区',
      longgq: 'Longgang District', // '龙岗区',
      dpxq: 'Dapeng New Area', // '大鹏新区',
    },
    chargingTypesTabsFun: {
      cdzzt: 'Charging station status', // '充电桩状态',
      cdqzt: 'Charging gun status', // '充电枪状态',
    },
    chargingTypesFun: {
      unitGe: 'individual', // '个',
      dqzx: 'Currently online', // '当前在线',
      dqlx: 'Currently offline', // '当前离线',
    },
    lineStateDataFun: {
      zx: 'on-line', // '在线',
      lx: 'off-line', // '离线',  
    },
    chargingRunTabsFun: {
      cdzyxqk: 'Operation status of charging station', // '充电桩运行情况',
      cdqyxqk: 'Operation status of charging gun', // '充电枪运行情况',
    },
    chargingRunDataFun: {
      dqsyl: 'Current usage rate', // '当前使用率',
      dqgzl: 'Current failure rate', // '当前故障率',  
    },
    lineRunDataFun: {
      zsyl: 'Pile utilization rate', // '桩使用率',
      qsyl: 'Gun usage rate', // '枪使用率',
      zgzl: 'Pile failure rate', // '桩故障率',
      qgzl: 'Gun failure rate', // '枪故障率',
    },
    bottomTabDataFun: {
      cdz: 'Charging station', // '充电桩',
      cdq: 'Charging gun', // '充电枪',
    },
    columnDataFun: {
      stationName: 'Name of charging station', // '充电站名称',
      operatorName: 'Name of operating enterprise', // '运营企业名称',
      areaName: 'Belonging region', // '所属区域',
      equipmentCount: 'Charging station', // '充电桩',
      gunCount: 'Charging gun', // '充电枪',
      equipmentPower: 'Rated total power/kw', // '额定总功率/kw',
    },
    filters: {
      all: 'whole', // '全部',
      lhq: 'Luohu District', // '罗湖区',
      ftq: 'Futian District', // '福田区',
      nsq: 'Nanshan District', // '南山区',
      baq: "Bao'an District", // '宝安区',
      longgq: 'Longgang District', // '龙岗区',
      ytq: 'Yantian District', // '盐田区',
      longhq: 'Longhua District', // '龙华区',
      psq: 'Pingshan District', // '坪山区',
      gmq: 'Guangming District', // '光明区',
      dpxq: 'Dapeng New Area', // '大鹏新区',
      sstbhzq: 'Shenzhen Shantou Special Cooperation Zone', // '深汕特别合作区',
    }
  },
  'left-panel': {
    unitCi: 'second', // '次',
    tabList:{
      day: 'day', // '日',
      month: 'month', // '月',
      year: 'year', // '年',
    },
    cdsszl: 'Total number of charging facilities', // '充电设施总量',
    cdzzs: 'Total number of charging stations', // '充电桩总数',  
    cdqzs: 'Total number of charging guns', // '充电枪总数',
    xzqcdcsqk: 'Charging frequency situation in administrative regions', // '行政区充电次数情况',
    cdzszls: 'Charging station digital twin', // '充电站数字孪生'
  },
  'right-panel': {
    zxyxztqk: 'Online operation status', // '在线运行状态情况',
    unitGe: 'individual', // '个'
  },
  'charging-realtime-power': {
    sscdgl: 'Real time charging power', // '充电实时功率'
  },
  'charging-station-list-dialog':{
    cdzsslb: 'List of charging station facilities', // '充电站设施列表',
    qsr: 'Please enter', // '请输入',
    cz: 'operation', // '操作',
    xq: 'details', // '详情',
    xh: 'Serial Number', //'序号',
  },
  'map-layer':{
    legendListData: {
      kcz: 'Fast charging pile', // '快充桩',
      mcz: 'Slow charging pile', // '慢充桩',
      ccz: 'Supercharging pile', // '超充桩',
    },
    cdzsg: 'Number of charging stations/piece', // '充电桩数/个',
    cdqsg: 'Number of charging guns/piece', // '充电枪数/个'
  }
}