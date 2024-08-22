export default{
  config:{
    clientInfo: {
      clientRealtimeInfo: 'Real time client information', // '客户端实时信息',
    },
    clientRealtimeTrend: {
      clientRealtimeTrendInfo: 'Real time trend situation on the client side', // '客户端实时趋势情况',
    },
    lineStateDataFun: {
      fwl: 'Traffic volume', // '访问量'
    },
    pageNumFun: {
      ljcdl: 'Accumulated charging capacity', // '累计充电量',
      unitYidu: 'Billion kilowatt hours of electricity', // '亿度',
      ljccs: 'Accumulated charging times', // '累计充电次数',
      unitWanci: 'Ten thousand times', // '万次',
      ljcdsc: 'Accumulated charging time', // '累计充电时长',
      unitWanxs: 'Ten thousand hours', // '万小时',
      bncdzl: 'Total amount of charging this year', // '本年充电总量',
    },
    hotChargingDataFun: {
      cdlzl: 'Total number of charging stations', //'充电站总量',
      yjryyqyzl: 'Total number of connected operating enterprises', //'已接入运营企业总量',
      xnyqczl: 'Total number of new energy vehicles', //'新能源汽车总量',
    },
    deviceDataFun: {
      zrfwlci: "Yesterday's visit volume/time", //'昨日访问量/次',
      jrfwlci: "Today's visit volume/times", //'今日访问量/次',
    },
    chargingTypesTabsFun: {
      cdz: 'Charging station', //'充电桩',
      cdq: 'Charging gun', //'充电枪',  
    },
    chargingTypePieDataFun: {
      lx: 'off-line', //'离线',
      lxcdz: 'Offline charging station', //'离线充电桩',
      unitGe: 'individual', //'个',
      zy: 'occupy', //'占用',
      zycdz: 'Occupying charging stations', //'占用充电桩',
      gz: 'fault', //'故障',
      gzcdz: 'Fault charging station', //'故障充电桩',
      xz: 'let ... lie idle', //'闲置',
      xzcdz: 'Idle charging station', //'闲置充电桩',
      lxcdq: 'Offline charging gun', //'离线充电枪',
      zycdq: 'Occupy the charging gun', //'占用充电枪',
      gzcdq: 'Malfunctioning charging gun', //'故障充电枪',
      xzcdq: 'Idle charging gun', //'闲置充电枪',
    },
    monthRateDataFun: {
      unitGe: "individual", // '个',
      nsq: "Nanshan District", // '南山区',
      baq: "Bao'an District", // '宝安区',
      lhq: "Luohu District", // '罗湖区',
      longhq: "Longhua District", // '龙华区',
      longgq: "Longgang District", // '龙岗区',
      dpxq: "Dapeng New Area", // '大鹏新区',
    },
    chargingStationTabsFun: {
      cdgl: 'Charging power', // '充电功率',
      cdcs: 'Charging times', // '充电次数',
    },
    columnDataHotFun: {
      cdzmc: 'Name of charging station', // '充电站名称',
      yyqymc: 'Name of operating enterprise', // '运营企业名称',
      ssqy: 'Belonging region', // '所属区域',
      cdgl: 'Charging power', // '充电功率',
      cdcs: 'Charging times', // '充电次数',  
    },
    filters: {
      all: "whole", // '全部',
      lhq: "Luohu District", // '罗湖区',
      ftq: "Futian District", // '福田区',
      nsq: "Nanshan District", // '南山区',
      baq: "Bao'an District", // '宝安区',
      longgq: "Longgang District", // '龙岗区',
      ytq: "Yantian District", // '盐田区',
      longhq: "Longhua District", // '龙华区',
      psq: "Pingshan District", // '坪山区',
      gmq: "Guangming District", // '光明区',
      dpxq: "Dapeng New Area", // '大鹏新区',
      sstbhzq: "Shenzhen Shantou Special Cooperation Zone", // '深汕特别合作区',  
    },
    ecOptionFun: {
      unitGe: "individual", // '个',
      yAxisName: "Unit/piece", // '单位/个',
      wtsl: "Number of questions", // '问题数量',
    },
    columnDataDetailFun: {
      stationName: 'Name of charging station', // '充电站名称',
      operatorName: 'Name of operating enterprise', // '运营企业名称',
      problemType: 'Problem type', // '问题类型',
      problemDescribe: 'Problem description', // '问题描述',
      principal: 'person in charge', // '负责人',
      phone: 'contact number', // '联系电话',
      timeDim: 'time', // '时间',  
    },
    filtersDetail: {
      all: 'whole', // '全部',
      yczw: 'There are station seats available', // '有车站位',
      zwvfk: 'The pile position is not released', // '桩位不放开',
      wfcd: 'Unable to charge', // '无法充电',
      zbddz: 'Unable to find the electric pile', // '找不到电桩',
      qt: 'other', // '其他',
    },
  },
  'left-panel': {
    unitCi: "second", // '次',
    smfkqk: "Feedback from citizens", // '市民反馈情况',
    rmcdzpm: "Ranking of popular charging stations", // '热门充电站排名',
    tabList: {
      day: "day", // '日',
      month: "month", // '月',
      year: "year", // '年',
    }
  },
  'right-panel': {
    kmdsyqk: "Client usage", // '客户端使用情况',
    xzqsblylqk: "Utilization rate of administrative equipment", // '行政区设备利用率情况'
  },
  'citizens-feedback-dialog': {
    xh: "Serial number", // '序号',
    smfkqklb: "List of feedback from citizens", // '市民反馈情况列表',
    qsr: "Please enter", // '请输入'
  },
  'client-usage': {
    khdzcyhr: "Client registered user/person", // '客户端注册用户/人'
  },
  'hot-station-rank-dialog': {
    rmcdzpm: "Ranking of popular charging stations", // '热门充电站排名',
    qsr: "Please enter", // '请输入',
    cz: "operation", // '操作',
    xq: "details", // '详情'
  },
  'map-layer': {
    rsr: "Number of people/person", // '人数/人',
    legendListData: {
      zcrs: "Number of registrations", // '注册人数',
      jrfwl: "Today's visit volume", // '今日访问量',
    }
  },
  'scroll-table': {
    columnKeyList: {
      index: 'Serial number', // '序号
      typeName: 'Problem type', // '问题类型
      desc: 'Related description', // '相关描述
      cnt: 'Quantity (piece)', // '数量（个）
    }
  }
}