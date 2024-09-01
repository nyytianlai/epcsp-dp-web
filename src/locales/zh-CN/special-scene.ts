export default {
  'power-combine':{
    'config': {
      bottomTabDataFun:{
        jnxt: '交能协同',
        tcyt: '停充一体',
      },
      parkingChargeAreaColumn: {
        areaName: '行政区',
        totalParkingSpace: '车位数(个)',
        totalGun: '充电枪数(个)',
        stopChargeRatio: '车充配比',  
      },
      parkingChargeOperationColumn: {
        areaName: '行政区',
        dailyParkingVolume: '停车量(辆)',
        dailyChargingVolume: '充电量(kWh)',
        rate: '车位/充电枪利用率(%)',  
      },
      powerDistributedColumn:{
        areaName: '行政区',
        soltNum: '巴士剩余电量(kWh)',
        connectorNum: '巴士数量(辆)',
      },
      parkingChargeOperationColumn1:{
        areaName: '行政区',
        parkingNum: '停车量(辆)',
        power: '充电量(kWh)',
        rate: '车位/充电枪利用率(%)',
      },
      operationTrendConfig:{
        busNum: '巴士数量',
        unitCar: '辆',
        busCapacity: '巴士剩余电量',
        unitKwh: 'kwh',
      },
      adjustTrendConfig:{
        busNum: '调节次数',
        unitCi: '次',
        busCapacity: '调节功率',
        unitMw: 'MW',  
      }
    },
    'map-layer':{
      sl: '数量',
      legendListData:{
        tcw: '停车位',
        cdq: '充电枪',  
      }
    },
    'components':{
      'parking-charge-area':{
        qytcyxqk: '区域停充运行情况'
      },
      'parking-charge-distributed':{
        tcqyfb: '停充区域分布'
      },
      'parking-charge-operation':{
        tcrjyxzl: '停充日均运行总览',
        bottomCardConfig:{
          cwlyl: '车位利用率',
          cdqlyl: '充电枪利用率',
          cdl: '充电量',
          cdsc: '充电时长',
          unitHour: '小时',
          tcl: '停车量',
          unitCar: '辆',
          tcsc: '停车时长',
        }
      },
      'parking-charge-overview':{
        tcjrzl: '停充接入总览',
        topCardConfig:{
          zcws: '总车位数',
          unitGe: '个',
          cdqs: '充电枪数',
        },
        rate: {
          stopChargeRatio: '停充配比'
        },
        bottomCardConfig:{
          tclsl: '停车场数量',
          unitGe: '个',
          cdzsl: '充电站数量',
        }
      },
      'parking-charge-rank':{
        tcythtccpm: '停充一体化停车场排名',
        tcws: '停车位数',
        cdqs: '充电枪数',
        tcpb: '停充配比',
        legend:{
          totalParkingSpace: '车位',
          totalGun: '充电枪',
        }
      },
      'parking-charge-trend':{
        tcyxqsfx: '停充运行趋势分析',
        dw: '单位',
        chartConfig:{
          dailyGunUtilizationRate: '充电枪利用率',
          dailyParkingSpaceUtilizationRate: '车位利用率',
        }
      },
      'adjust-overview':{
        bottomCardConfig: {
          jrtjzxq: '今日调节总需求',
          unitMW: 'MW',
          jrtjcs: '今日调节次数',
          unitCi: '次',
          rjtjxq: '日均调节需求',
          rjtjcs: '日均调节次数',
        },
        xndctjzl: '虚拟电厂调节总览'
      },
      'adjust-trend-analysis':{
        tjqsfx: '调节趋势分析',
        unitCi: '单位:次',
        unitMw: '单位:MW'
      },
      'bus-power-distributed':{
        bssydlfb: '巴士剩余电量分布'
      },
      'bus-power-trend':{
        bskynlts: '巴士可用能量态势',
        unitLiang: '单位:辆',
        unitKWH: '单位:kwh'
      },
      'operation-bus-overview':{
        yybsyxzl: '营运巴士运行总览',
        bottomCardConfig: {
          jzznh: '今日总耗能',
          rjxslc: '今日行驶里程',
          rjnh: '日均能耗',
          rjlc: '日均里程',
        }
      },
      'today-adjust-demand':{
        jrtjxq: '今日调节需求',
        unitMW: '单位:MW',
        tjxq: '调节需求',
      }
    }
  },
  'super-charging-building': {
    config: {
      common: {
        cczhan: '超充站',
        yunyingshang: '运营商',
        changsuofenbu: '场所分布',
        gonglvfenbu: '功率分布',
        chagnsuoleixing: '场所类型',
        cczhange: '超充站(个)',
        cczhuangge: '超充桩(个)',
        cccdcs: '超充充电次数',
        unitCi: '次',
        cccdcsCi: '超充充电次数(次）',
        cccdl: '超充充电量',
        unitDu: '度',
        cccdlDu: '超充充电量(度)',
        jinri: '今日',
        jinqiri: '近七日',
        yingyun: '营运',
        jianshe: '建设',
        guihua: '规划',
        unitGe: '个',
        cczhuang: '超充桩',
        zhuangjigonglv: '装机功率',
        unitKW: 'kW',
        ccyys: '超充运营商',
        unitJia: '家',
        jsz: '建设中',
        sl: '数量',
        jiansheqiye: '建设企业',
        yingyunqiye: '营运企业',
        ccbs: '超充标识',
        cdz: '充电站',
        sq: '申请',
        sqtgs: '申请通过数',
        cdq: '充电枪',
        xzqmc: '行政区名称',
        jrcdl: '今日充电量',
        jrcdsc: '今日充电时长',
        unitHour: '小时',
        jrcddds: '今日充电订单数',
        ccrjlyl: '超充日均利用率',
      }
    },
    components: {
      xzqfbqk: '行政区分布情况',
      jryxpm: '今日运行排名',
      yxqs: '运行趋势',
      unitCi: '单位：次',
      unitDu: '单位：度',
      ccyyfbqk: '超充营运分布情况',
      cczl: '超充总览',
      hour: '时',
      unitDay: '日',
    },
    'map-layers': {
      ds: '点数',
    }
  },
  'virtual-electric': {
    components: {
      baseline: '基线',
      planNum: '计划',
      actualNum: '实际',
      ssjhyxqk: "实时聚合运行情况",
      unitMW: '单位:MW',
      ktrlqyfb: '可调容量区域分布',
      ddyxqk: '调度运行情况',
      today: '今日',
      lj: '累计',
      xftjcs: '调节次数',
      unitCi: '次',
      xftjl: '调节量',
      zyfbzb: '资源分布占比',
      zyjrzl: '资源接入总览',
      xndcsl: '虚拟电厂数量',
      unitJia: '家',
      ktzy: '可调资源',
      unitGe: '个',
      bzrl: '报装容量',
      unitMVA: 'MVA',
      ktjrl: '可调节容量',
      unitMW1: 'MW',
      ssjrgl: '实时接入功率',
      jhzl: '计划总量',
      zxzl: '执行总量',
      pczl: '偏差总量',
      jrddzl: '今日调度总览',
      wcl: '完成率(%)'
    }
  }
}