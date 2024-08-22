export default {
  config:{
    pageNumFun: {
      cdzhanzl: '充电站总量',
      unitGe: '个',
      cdzhuangzl: '充电桩总量',
      cdqzl: '充电枪总量',
      cdzgl: '充电总功率',
      unitWanKW: '万kW',
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
      unitGe: '个',
      mcz: '慢充桩',
      ccz: '超充桩',
      zzz: '直流桩',
      jlz: '交流桩',
      jzlz: '交直流桩',
      qtz: '其他桩',
      kcq: '快充枪',
      mcq: '慢充枪',
      ccq: '超充枪',
      zlq: '直流枪',
      jlq: '交流枪',
      jzlq: '交直流枪',
      qtq: '其他枪',
    },
    areaRankDataFun: {
      unitCi: '次',
      nsq: '南山区',
      baq: '宝安区',
      lhq: '罗湖区',
      longhq: '龙华区',
      longgq: '龙岗区',
      dpxq: '大鹏新区',
    },
    chargingTypesTabsFun: {
      cdzzt: '充电桩状态',
      cdqzt: '充电枪状态',
    },
    chargingTypesFun: {
      unitGe: '个',
      dqzx: '当前在线',
      dqlx: '当前离线',
    },
    lineStateDataFun: {
      zx: '在线',
      lx: '离线',  
    },
    chargingRunTabsFun: {
      cdzyxqk: '充电桩运行情况',
      cdqyxqk: '充电枪运行情况',
    },
    chargingRunDataFun: {
      dqsyl: '当前使用率',
      dqgzl: '当前故障率',  
    },
    lineRunDataFun: {
      zsyl: '桩使用率',
      qsyl: '枪使用率',
      zgzl: '桩故障率',
      qgzl: '枪故障率',
    },
    bottomTabDataFun: {
      cdz: '充电桩',
      cdq: '充电枪',
    },
    columnDataFun: {
      stationName: '充电站名称',
      operatorName: '运营企业名称',
      areaName: '所属区域',
      equipmentCount: '充电桩',
      gunCount: '充电枪',
      equipmentPower: '额定总功率/kw',
    },
    filters: {
      all: '全部',
      lhq: '罗湖区',
      ftq: '福田区',
      nsq: '南山区',
      baq: '宝安区',
      longgq: '龙岗区',
      ytq: '盐田区',
      longhq: '龙华区',
      psq: '坪山区',
      gmq: '光明区',
      dpxq: '大鹏新区',
      sstbhzq: '深汕特别合作区',
    }
  },
  'left-panel': {
    unitCi: '次',
    tabList:{
      day: '日',
      month: '月',
      year: '年',
    },
    cdsszl: '充电设施总量',
    cdzzs: '充电桩总数',  
    cdqzs: '充电枪总数',
    xzqcdcsqk: '行政区充电次数情况',
    cdzszls: '充电站数字孪生'
  },
  'right-panel': {
    zxyxztqk: '在线运行状态情况',
    unitGe: '个'
  },
  'charging-realtime-power': {
    sscdgl: '充电实时功率'
  },
  'charging-station-list-dialog':{
    cdzsslb: '充电站设施列表',
    qsr: '请输入',
    cz: '操作',
    xq: '详情',
    xh: '序号',
  },
  'map-layer':{
    legendListData: {
      kcz: '快充桩',
      mcz: '慢充桩',
      ccz: '超充桩',
    },
    cdzsg: '充电桩数/个',
    cdqsg: '充电枪数/个'
  }
}