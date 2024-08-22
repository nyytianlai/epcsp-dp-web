export default{
  config:{
    clientInfo: {
      clientRealtimeInfo: '客户端实时信息',
    },
    clientRealtimeTrend: {
      clientRealtimeTrendInfo: '客户端实时趋势情况',
    },
    lineStateDataFun: {
      fwl: '访问量'
    },
    pageNumFun: {
      ljcdl: '累计充电量',
      unitYidu: '亿度',
      ljccs: '累计充电次数',
      unitWanci: '万次',
      ljcdsc: '累计充电时长',
      unitWanxs: '万小时',
      bncdzl: '本年充电总量',
    },
    hotChargingDataFun: {
      cdlzl: '充电站总量',
      yjryyqyzl: '已接入运营企业总量',
      xnyqczl: '新能源汽车总量',
    },
    deviceDataFun: {
      zrfwlci: '昨日访问量/次',
      jrfwlci: '今日访问量/次',
    },
    chargingTypesTabsFun: {
      cdz: '充电桩',
      cdq: '充电枪',  
    },
    chargingTypePieDataFun: {
      lx: '离线',
      lxcdz: '离线充电桩',
      unitGe: '个',
      zy: '占用',
      zycdz: '占用充电桩',
      gz: '故障',
      gzcdz: '故障充电桩',
      xz: '闲置',
      xzcdz: '闲置充电桩',
      lxcdq: '离线充电枪',
      zycdq: '占用充电枪',
      gzcdq: '故障充电枪',
      xzcdq: '闲置充电枪',
    },
    monthRateDataFun: {
      unitGe: '个',
      nsq: '南山区',
      baq: '宝安区',
      lhq: '罗湖区',
      longhq: '龙华区',
      longgq: '龙岗区',
      dpxq: '大鹏新区',
    },
    chargingStationTabsFun: {
      cdgl: '充电功率',
      cdcs: '充电次数',
    },
    columnDataHotFun: {
      cdzmc: '充电站名称',
      yyqymc: '运营企业名称',
      ssqy: '所属区域',
      cdgl: '充电功率',
      cdcs: '充电次数',  
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
    },
    ecOptionFun: {
      unitGe: '个',
      yAxisName: '单位/个',
      wtsl: '问题数量',
    },
    columnDataDetailFun: {
      stationName: '充电站名称',
      operatorName: '运营企业名称',
      problemType: '问题类型',
      problemDescribe: '问题描述',
      principal: '负责人',
      phone: '联系电话',
      timeDim: '时间',  
    },
    filtersDetail: {
      all: '全部',
      yczw: '有车站位',
      zwvfk: '桩位不放开',
      wfcd: '无法充电',
      zbddz: '找不到电桩',
      qt: '其他',
    },
  },
  'left-panel': {
    unitCi: '次',
    smfkqk: '市民反馈情况',
    rmcdzpm: '热门充电站排名',
    tabList: {
      day: '日',
      month: '月',
      year: '年',
    }
  },
  'right-panel': {
    kmdsyqk: '客户端使用情况',
    xzqsblylqk: '行政区设备利用率情况'
  },
  'citizens-feedback-dialog': {
    xh: '序号',
    smfkqklb: '市民反馈情况列表',
    qsr: '请输入'
  },
  'client-usage': {
    khdzcyhr: '客户端注册用户/人'
  },
  'hot-station-rank-dialog': {
    rmcdzpm: '热门充电站排名',
    qsr: '请输入',
    cz: '操作',
    xq: '详情'
  },
  'map-layer': {
    rsr: '人数/人',
    legendListData: {
      zcrs: '注册人数',
      jrfwl: '今日访问量',
    }
  },
  'scroll-table': {
    columnKeyList: {
      index: '序号',
      typeName: '问题类型',
      desc: '相关描述',
      cnt: '数量（个）',
    }
  }
}