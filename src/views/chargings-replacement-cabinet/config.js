import chdzsszl from './images/chdzsszl.png'
import jrqyzs from './images/jrqyzs.png'
import ztsyl from './images/ztsyl.png'
import zxzl from './images/zxzl.png'
import edzgl from './images/edzgl.png'
import sszgl from './images/sszgl.png'
import dayjs from 'dayjs';
export const pageNumFun = (data = {}) => {
  return [
    {
      name: '年累计充电量',
      // num: data?.cumulativeCharge,
      num: 1.25,
      unit: '亿kWh'
    },
    {
      name: '年累计充电次数',
      // num: data?.cumChargeCount,
      num: 1.14,
      unit: '亿次'
    },
    {
      name: '年累计充电时长',
      // num: data?.cumChargeTime,
      num: 7.39,
      unit: '亿h'
    },
    {
      name: '年累计换电次数',
      // num: data?.cumChargeTime,
      num: 5641,
      unit: '万次'
    }
  ]
}
export const chdsszlFun = (data = {}) => {
  return [
    {
      img: chdzsszl,
      num: 151769,
      unit: '个',
      name: '充换电站设施总量'
    },
    {
      img: jrqyzs,
      num: 12,
      unit: '个',
      name: '接入企业总数'
    },
  ];
};
export const chargingType = [
  {
    code: 1,
    label: '充换电设施类型'
  }
]
export const chargingTypeDataFun = (data={})=>{
  return [
    {
      value: 120625,
      name: '充电桩',
      unit: '个'
    },
    {
      value: 10583,
      name: '充电柜',
      unit: '个'
    },
    {
      value: 19802,
      name: '换电柜',
      unit: '个'
    },
    {
      value: 759,
      name: '其他',
      unit: '个'
    },
  ];
}
export const  todayFacilities = [
  {
    code: 1,
    label: '充电桩'
  },
  {
    code: 2,
    label: '充电柜'
  },
  {
    code: 3,
    label: '换电柜'
  },
]
export const todayFacilitiesCardFun = (data = {}) => {
  return [
    {
      img: ztsyl,
      num: 67.03,
      unit: '%',
      name: '整体使用率',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: zxzl,
      num: 80855,
      unit: '',
      name: '在线总量',
      classStyleType: 'leftRightStyleYellow'
    }
  ];
};
export const powerTodayCardFun = (data = {}) => {
  return [
    {
      img: edzgl,
      num: 45531,
      unit: '/kw',
      name: '额定总功率',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: sszgl,
      num: 29595,
      unit: '/kw',
      name: '实时总功率',
      classStyleType: 'leftRightStyleYellow'
    }
  ];
};
export const linePowerDataFun = (data = []) => {
  data = [
    {
      "time": "01",
      "useRate": 181.34,
      "troubleRate": 20
    },
    {
      "time": "02",
      "useRate": 282.34,
      "troubleRate": 30
    },
    {
      "time": "03",
      "useRate": 300,
      "troubleRate": 40
    },
    {
      "time": "04",
      "useRate": 18.34,
      "troubleRate": 10
    },
    {
      "time": "05",
      "useRate": 800,
      "troubleRate": 60
    },
    {
      "time": "06",
      "useRate": 400,
      "troubleRate": 30
    },
    {
      "time": "07",
      "useRate": 100,
      "troubleRate": 70
    },
    {
      "time": "08",
      "useRate": 900,
      "troubleRate": 50
    },
    {
      "time": "09",
      "useRate":632,
      "troubleRate": 90.12
    },
    {
      "time": "10",
      "useRate": 561,
      "troubleRate": 10.13
    },
    {
      "time": "11",
      "useRate": 73,
      "troubleRate": 150.13
    }
  ]
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  return [
    {
      data: data.map((item) => [yearMonthDay + item.time, item.useRate]),
      type: 'line',
      smooth: true,
      name: '额定功率'
    },
    {
      data: data.map((item) => [yearMonthDay + item.time, item.troubleRate]),
      type: 'line',
      smooth: true,
      name: '实时功率'
    },
  ];
};
export const warnData = [
  {
    "id": 322830143,
    "operatorId": "MA5EJ5RU3",
    "stationId": "356422",
    "eid": "164837",
    "operatorName": "深圳市深巴车电新能源有限公司",
    "stationName": "龙悦腾新能源有限公司太白路4128号充电站",
    "alarmLevel": "1",
    "alarmLevelName": "一级 人身安全",
    "alarmDesc": "动力蓄电池绝缘状态",
    "alarmType": "2",
    "alarmTypeName": "电池系统故障",
    "alarmTime": "2023-06-08 13:45:33",
    "contactPerson": "李明",
    "contactTel": "18319310387",
    "isHr": 1,
    "stationLng": "114.121201",
    "stationLat": "22.577544"
  },
  {
    "id": 322830125,
    "operatorId": "061402628",
    "stationId": "440203006",
    "eid": "023810",
    "operatorName": "深圳市鹏电跃能能源技术有限公司",
    "stationName": "深圳宝安区石岩客运站东广场充电站",
    "alarmLevel": "1",
    "alarmLevelName": "一级 人身安全",
    "alarmDesc": "动力蓄电池绝缘状态",
    "alarmType": "2",
    "alarmTypeName": "电池系统故障",
    "alarmTime": "2023-06-08 13:44:19",
    "contactPerson": "吴涛",
    "contactTel": "15818635291",
    "isHr": 1,
    "stationLng": "113.929582",
    "stationLat": "22.683547"
  },
  {
    "id": 322830080,
    "operatorId": "061402628",
    "stationId": "440203006",
    "eid": "023810",
    "operatorName": "深圳市鹏电跃能能源技术有限公司",
    "stationName": "深圳宝安区石岩客运站东广场充电站",
    "alarmLevel": "1",
    "alarmLevelName": "一级 人身安全",
    "alarmDesc": "动力蓄电池绝缘状态",
    "alarmType": "2",
    "alarmTypeName": "电池系统故障",
    "alarmTime": "2023-06-08 13:43:16",
    "contactPerson": "吴涛",
    "contactTel": "15818635291",
    "isHr": 1,
    "stationLng": "113.929582",
    "stationLat": "22.683547"
  },
  {
    "id": 322827925,
    "operatorId": "MA5EJ5RU3",
    "stationId": "356422",
    "eid": "164837",
    "operatorName": "深圳市深巴车电新能源有限公司",
    "stationName": "龙悦腾新能源有限公司太白路4128号充电站",
    "alarmLevel": "1",
    "alarmLevelName": "一级 人身安全",
    "alarmDesc": "动力蓄电池绝缘状态",
    "alarmType": "2",
    "alarmTypeName": "电池系统故障",
    "alarmTime": "2023-06-08 12:32:45",
    "contactPerson": "李明",
    "contactTel": "18319310387",
    "isHr": 1,
    "stationLng": "114.121201",
    "stationLat": "22.577544"
  },
  {
    "id": 322826764,
    "operatorId": "708457903",
    "stationId": "48",
    "eid": "137270",
    "operatorName": "深圳市恒誉光明运输集团有限公司",
    "stationName": "流塘充电站",
    "alarmLevel": "1",
    "alarmLevelName": "一级 人身安全",
    "alarmDesc": "维修门开停止充电",
    "alarmType": "1",
    "alarmTypeName": "充电系统故障",
    "alarmTime": "2023-06-08 11:17:04",
    "contactPerson": "雷雄彪",
    "contactTel": "13632797092",
    "isHr": 1,
    "stationLng": "113.886758",
    "stationLat": "22.575183"
  }
]