import gfzzl from './images/gfzzl.png'
import zjzrl from './images/zjzrl.png'
import jrqyzs from './images/jrqyzs.png'
import gzfsqd from './images/gzfsqd.png'
import jrswdl from './images/jrswdl.png'
import jrfdzl from './images/jrfdzl.png'
import jrssgl from './images/jrssgl.png'
import jrzdgl from './images/jrzdgl.png'
import nscgfld from './images/nscgfld.png'
import nco2jpl from './images/nco2jpl.png'
import dayjs from 'dayjs';
export const pageNumFun = (data = {}) => {
  return [
    {
      name: '年累计发电量',
      // num: data?.cumulativeCharge,
      num: 2.06,
      unit: '亿kWh'
    },
    {
      name: '年累计生产绿证',
      // num: data?.cumChargeCount,
      num: 20.6,
      unit: '万个'
    },
    {
      name: '全社会用电量比例',
      // num: data?.cumChargeTime,
      num: 0.41,
      unit: '%'
    }
  ]
}
export const cdzzlFun = (data = {}) => {
  return [
    {
      img: gfzzl,
      num: 229,
      unit: '个',
      name: '光伏站总量'
    },
    {
      img: zjzrl,
      num: 39.82,
      unit: 'MW',
      name: '装机总容量'
    },
    {
      img: jrqyzs,
      num: 106,
      unit: '个',
      name: '接入企业总数'
    }
  ];
};
export const surfSortPieDataFun = (data={})=>{
  return [
    {
      value: 161,
      name: '余电上网',
      unit: '个'
    },
    {
      value: 50,
      name: '全额上网',
      unit: '个'
    },
    {
      value: 18,
      name: '全额自用',
      unit: '个'
    },
  ];
}
export const surfTitle = [
  {
    code: 1,
    label: '上网方式分类'
  }
]

export const  companyRank = [
  {
    code: 1,
    label: '项目装机容量排名'
  },
  {
    code: 2,
    label: '光伏站数量'
  },
]
export const jrgfdzFun =(data = {}) => {
  return [
    {
      img: gzfsqd,
      num: 1350,
      unit: '/度(m².a)',
      name: '光照辐射强度',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    },
    {
      img: jrswdl,
      num: 417.62,
      unit: '/万度',
      name: '今日上网电量',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    },
    {
      img: jrfdzl,
      num: 506.57,
      unit: '/万度',
      name: '今日发电总量',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    }
  ];
};

export const powerTodayTitle = [
  {
    code: 1,
    label: '今日功率信息'
  }
]
export const powerTodayCardFun = (data = {}) => {
  return [
    {
      img: jrzdgl,
      num: 753.18,
      unit: '/MW',
      name: '今日最大功率',
      classStyleType: 'leftRightStyleYellow5858'
    },
    {
      img: jrssgl,
      num: 587.11,
      unit: '/MW',
      name: '今日实时功率',
      classStyleType: 'leftRightStyleYellow5858'
    }
  ];
};
export const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  data = [
    {
      "time": "01",
      "useRate": 0,
      "troubleRate": 0
    },
    {
      "time": "02",
      "useRate": 0,
      "troubleRate": 0
    },
    {
      "time": "03",
      "useRate": 0,
      "troubleRate": 0
    },
    {
      "time": "04",
      "useRate": 0,
      "troubleRate": 0
    },
    {
      "time": "05",
      "useRate": 0,
      "troubleRate": 0
    },
    {
      "time": "06",
      "useRate": 25.29,
      "troubleRate": 0
    },
    {
      "time": "07",
      "useRate": 95.29,
      "troubleRate": 0
    },
    {
      "time": "08",
      "useRate": 175.88,
      "troubleRate": 0
    },
    {
      "time": "09",
      "useRate":244.41,
      "troubleRate": 0.12
    },
    {
      "time": "10",
      "useRate": 312.94,
      "troubleRate": 0.13
    },
    {
      "time": "11",
      "useRate": 363.24,
      "troubleRate": 0.13
    },
    {
      "time": "12",
      "useRate": 376.18,
      "troubleRate": 0.13
    },
    {
      "time": "13",
      "useRate": 371.76,
      "troubleRate": 0.13
    },
    {
      "time": "14",
      "useRate": 338.82,
      "troubleRate": 0.13
    },
    {
      "time": "15",
      "useRate": 312.06,
      "troubleRate": 0.13
    },
    {
      "time": "16",
      "useRate": 254.12,
      "troubleRate": 0.13
    },
    {
      "time": "17",
      "useRate": 148.82,
      "troubleRate": 0.13
    },
    {
      "time": "18",
      "useRate": 68.82,
      "troubleRate": 0.13
    },
    {
      "time": "19",
      "useRate": 25.29,
      "troubleRate": 0.13
    },
    {
      "time": "20",
      "useRate": 0,
      "troubleRate": 0.13
    },
    {
      "time": "21",
      "useRate": 0,
      "troubleRate": 0.13
    },
    {
      "time": "22",
      "useRate": 0,
      "troubleRate": 0.13
    },
    {
      "time": "23",
      "useRate": 0,
      "troubleRate": 0.13
    },
  ]
  return [
    {
      data: data.map((item) => [yearMonthDay + item.time, item.useRate]),
      type: 'line',
      smooth: true,
      name: '实时功率'
    },
  ];
};
export const socialBenefitFun = (data={})=>{
  return [
    {
      img: nscgfld,
      num: 4.29,
      unit: '/亿度',
      name: '年生产光伏绿电',
    },
    {
      img: nco2jpl,
      num: 42.77,
      unit: '/万吨',
      name: '年CO2减排量',
    }
  ]
}