export default{
  config:{
    clientInfo: {
      clientRealtimeInfo: 'Real time client side information', // '客户端实时信息',
    },
    clientRealtimeTrend: {
      clientRealtimeTrendInfo: 'Real time trend on client side', // '客户端实时趋势情况',
    },
    lineStateDataFun: {
      fwl: 'visits', // '访问量'
    },
    pageNumFun: {
      ljcdl: 'Accumulated charging capacity', // '累计充电量',
      unitYidu: 'Billion KWh', // '亿度',
      ljccs: 'Accumulated charging times', // '累计充电次数',
      unitWanci: 'Ten thousand times', // '万次',
      ljcdsc: 'Accumulated charging duration', // '累计充电时长',
      unitWanxs: 'Ten thousand hours', // '万小时',
      bncdzl: 'Total charging capacity this year', // '本年充电总量',
    },
    hotChargingDataFun: {
      cdlzl: 'Total number of charging sites', //'充电站总量',
      yjryyqyzl: 'Total number of connected operating enterprises', //'已接入运营企业总量',
      xnyqczl: 'Total number of electric vehicle', //'新能源汽车总量',
    },
    deviceDataFun: {
      zrfwlci: "Yesterday's visits", //'昨日访问量/次',
      jrfwlci: "Today's visits", //'今日访问量/次',
    },
    chargingTypesTabsFun: {
      cdz: 'Charging station', //'充电桩',
      cdq: 'Charging gun', //'充电枪',  
    },
    chargingTypePieDataFun: {
      lx: 'off-line', //'离线',
      lxcdz: 'Off-line charging station', //'离线充电桩',
      unitGe: '', //'个',
      zy: 'occupy', //'占用',
      zycdz: 'Occupying charging stations', //'占用充电桩',
      gz: 'malfunction', //'故障',
      gzcdz: 'malfunctioned charging station', //'故障充电桩',
      xz: 'unoccupied', //'闲置',
      xzcdz: 'unoccupied charging station', //'闲置充电桩',
      lxcdq: 'Off-line charging gun', //'离线充电枪',
      zycdq: 'use the charging gun', //'占用充电枪',
      gzcdq: 'malfunctioned charging gun', //'故障充电枪',
      xzcdq: 'unoccupied charging gun', //'闲置充电枪',
    },
    monthRateDataFun: {
      unitGe: "", // '个',
      nsq: "Nanshan", // '南山区',
      baq: "Bao'an", // '宝安区',
      lhq: "Luohu", // '罗湖区',
      longhq: "Longhua", // '龙华区',
      longgq: "Longgang", // '龙岗区',
      dpxq: "Dapeng", // '大鹏新区',
    },
    chargingStationTabsFun: {
      cdgl: 'Charging power', // '充电功率',
      cdcs: 'number of charging times', // '充电次数',
    },
    columnDataHotFun: {
      cdzmc: 'charging site name', // '充电站名称',
      yyqymc: 'Operating enterprise name', // '运营企业名称',
      ssqy: 'District belonged', // '所属区域',
      cdgl: 'Charging power', // '充电功率',
      cdcs: 'Charging times', // '充电次数',  
    },
    filters: {
      all: "all", // '全部',
      lhq: "Luohu", // '罗湖区',
      ftq: "Futian", // '福田区',
      nsq: "Nanshan", // '南山区',
      baq: "Bao'an", // '宝安区',
      longgq: "Longgang", // '龙岗区',
      ytq: "Yantian", // '盐田区',
      longhq: "Longhua", // '龙华区',
      psq: "Pingshan", // '坪山区',
      gmq: "Guangming", // '光明区',
      dpxq: "Dapeng", // '大鹏新区',
      sstbhzq: "Shenzhen-Shantou Special Cooperation Zone", // '深汕特别合作区',  
    },
    ecOptionFun: {
      unitGe: "", // '个',
      yAxisName: "Unit/", // '单位/个',
      wtsl: "Number of problems", // '问题数量',
    },
    columnDataDetailFun: {
      stationName: 'Charging site name', // '充电站名称',
      operatorName: 'Operating enterprise name', // '运营企业名称',
      problemType: 'Problem type', // '问题类型',
      problemDescribe: 'Problem description', // '问题描述',
      principal: 'Superintendent', // '负责人',
      phone: 'Contact number', // '联系电话',
      timeDim: 'time', // '时间',  
    },
    filtersDetail: {
      all: 'all', // '全部',
      yczw: 'There are stations available', // '有车站位',
      zwvfk: 'The station is not available', // '桩位不放开',
      wfcd: 'Unable to charge', // '无法充电',
      zbddz: 'Unable to find the electric pile', // '找不到电桩',
      qt: 'others', // '其他',
    },
  },
  'left-panel': {
    unitCi: "", // '次',
    smfkqk: "Residents feedback", // '市民反馈情况',
    rmcdzpm: "Hot charging sites rank", // '热门充电站排名',
    tabList: {
      day: "day", // '日',
      month: "month", // '月',
      year: "year", // '年',
    }
  },
  'right-panel': {
    kmdsyqk: "Client side usage", // '客户端使用情况',
    xzqsblylqk: "Usage rate in each district", // '行政区设备利用率情况'
  },
  'citizens-feedback-dialog': {
    xh: "No.", // '序号',
    smfkqklb: "Residents feedback list", // '市民反馈情况列表',
    qsr: "Please enter", // '请输入'
  },
  'client-usage': {
    khdzcyhr: "Registered number user", // '客户端注册用户/人'
  },
  'hot-station-rank-dialog': {
    rmcdzpm: "Hot charging sites rank", // '热门充电站排名',
    qsr: "Please enter", // '请输入',
    cz: "operation", // '操作',
    xq: "details", // '详情'
  },
  'map-layer': {
    rsr: "Number of people", // '人数/人',
    legendListData: {
      zcrs: "Number of registrations", // '注册人数',
      jrfwl: "Today's visits", // '今日访问量',
    }
  },
  'scroll-table': {
    columnKeyList: {
      index: 'No.', // '序号
      typeName: 'Problem type', // '问题类型
      desc: 'Related description', // '相关描述
      cnt: 'number', // '数量（个）
    }
  }
}