import gfzzl from './images/gfzzl.png';
import zjzrl from './images/zjzrl.png';
import jrqyzs from './images/jrqyzs.png';
import tyfsqd from './images/tyfsqd.png';
import jrswdl from './images/jrswdl.png';
import jrfdzl from './images/jrfdzl.png';
import jrssgl from './images/jrssgl.png';
import jrzdgl from './images/jrzdgl.png';
import nscgfld from './images/nscgfld.png';
import nco2jpl from './images/nco2jpl.png';
import dayjs from 'dayjs';
import { deepClone } from '@/utils/index';

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '年累计发电量',
      // num: data?.cumulativeCharge,
      num: 4.29,
      unit: '亿kWh'
    },
    {
      name: '年累计生产绿证',
      // num: data?.cumChargeCount,
      num: 42.9,
      unit: '万个'
    },
    {
      name: '全社会用电量比例',
      // num: data?.cumChargeTime,
      num: 0.41,
      unit: '%'
    }
  ];
};
export const cdzzlFun = (data = {}) => {
  return [
    {
      img: gfzzl,
      num: 1190,
      unit: '个',
      name: '光伏站总量'
    },
    {
      img: zjzrl,
      num: 392.55,
      unit: 'MW',
      name: '装机总容量'
    },
    {
      img: jrqyzs,
      num: 979,
      unit: '个',
      name: '接入企业总数'
    }
  ];
};
export const unitTotalFun = (data = {}) => {
  return {
      img: nscgfld,
      num: 351.31,
      unit: '/MW',
      name: '并网总容量'
    }
  
};
export const surfSortPieDataFun = (data = {}) => {
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
    }
  ];
};
export const surfTitle = [
  {
    code: 1,
    label: '上网方式分类'
  }
];

export const companyRank = [
  {
    code: 1,
    label: '站点并网容量'
  },
  {
    code: 2,
    label: '光伏站数量'
  }
];
export const jrgfdzFun = (data = {}) => {
  return [
    {
      img: tyfsqd,
      num: 892,
      unit: '/W/m²',
      name: '太阳辐射强度',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    },
    {
      img: jrswdl,
      num: 85.83,
      unit: '/万kWh',
      name: '今日上网电量',
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    },
    {
      img: jrfdzl,
      num: 220.07,
      unit: '/万kWh',
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
    label: '今日光伏站功率信息'
  }
];
export const powerTodayCardFun = (data = {}) => {
  return [
    {
      img: jrzdgl,
      num: 338.31,
      unit: '/MW',
      name: '今日最大功率',
      classStyleType: 'leftRightStyleYellow5858'
    },
    {
      img: jrssgl,
      num: 283.97,
      unit: '/MW',
      name: '今日实时功率',
      classStyleType: 'leftRightStyleYellow5858'
    }
  ];
};
export const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  const nowTime = dayjs().format('HH')
  data = [
    {
      time: '00',
      useRate: 0,
      troubleRate: 0
    },
    {
      time: '01',
      useRate: 0,
      troubleRate: 0
    },
    {
      time: '02',
      useRate: 0,
      troubleRate: 0
    },
    {
      time: '03',
      useRate: 0,
      troubleRate: 0
    },
    {
      time: '04',
      useRate: 0,
      troubleRate: 0
    },
    {
      time: '05',
      useRate: 0,
      troubleRate: 0
    },
    {
      time: '06',
      useRate: 23.02,
      troubleRate: 0
    },
    {
      time: '07',
      useRate: 50.32,
      troubleRate: 0
    },
    {
      time: '08',
      useRate: 114.55,
      troubleRate: 0
    },
    {
      time: '09',
      useRate: 213.31,
      troubleRate: 0.12
    },
    {
      time: '10',
      useRate: 254.75,
      troubleRate: 0.13
    },
    {
      time: '11',
      useRate: 330.54,
      troubleRate: 0.13
    },
    {
      time: '12',
      useRate: 342.32,
      troubleRate: 0.13
    },
    {
      time: '13',
      useRate: 338.31,
      troubleRate: 0.13
    },
    {
      time: '14',
      useRate: 308.332,
      troubleRate: 0.13
    },
    {
      time: '15',
      useRate: 283.97,
      troubleRate: 0.13
    },
    {
      time: '16',
      useRate: 222.15,
      troubleRate: 0.13
    },
    {
      time: '17',
      useRate: 126.33,
      troubleRate: 0.13
    },
    {
      time: '18',
      useRate: 53.53,
      troubleRate: 0.13
    },
    {
      time: '19',
      useRate: 13.92,
      troubleRate: 0.13
    },
    {
      time: '20',
      useRate: 0,
      troubleRate: 0.13
    },
    {
      time: '21',
      useRate: 0,
      troubleRate: 0.13
    },
    {
      time: '22',
      useRate: 0,
      troubleRate: 0.13
    },
    {
      time: '23',
      useRate: 0,
      troubleRate: 0.13
    }
  ];
  const index = data.findIndex(i=>i.time === nowTime)
  let dataC = deepClone(data)
  dataC.splice(index+1)
  return [
    {
      data: dataC.map((item) => [yearMonthDay + item.time, item.useRate]),
      type: 'line',
      smooth: true,
      name: '实时功率'
    }
  ];
};
export const socialBenefitFun = (data = {}) => {
  return [
    {
      img: nscgfld,
      num: 4.29,
      unit: '/亿度',
      name: '年生产光伏绿电'
    },
    {
      img: nco2jpl,
      num: 44.77,
      unit: '/万吨',
      name: '年CO2减排量'
    }
  ];
};
//区级的柱状图
export const mapQuBar = () => {
  return [
    {
      areaCode: 440303,
      stationCount: 9
    },
    {
      areaCode: 440304,
      stationCount: 18
    },
    {
      areaCode: 440305,
      stationCount: 15
    },
    {
      areaCode: 440306,
      stationCount: 32
    },
    {
      areaCode: 440307,
      stationCount: 42
    },
    {
      areaCode: 440308,
      stationCount: 12
    },
    {
      areaCode: 440309,
      stationCount: 27
    },
    {
      areaCode: 440310,
      stationCount: 13
    },
    {
      areaCode: 440311,
      stationCount: 16
    },
    {
      areaCode: 440343,
      stationCount: 7
    },
    {
      areaCode: 441521,
      stationCount: 37
    }
  ];
};
//街道级的柱状图
export const mapJdBar = () => {
  return [
    {
      streetId: 21,
      stationCount: 0
    },
    {
      streetId: 22,
      stationCount: 1
    },
    {
      streetId: 23,
      stationCount: 2
    },
    {
      streetId: 24,
      stationCount: 0
    },
    {
      streetId: 25,
      stationCount: 2
    },
    {
      streetId: 26,
      stationCount: 4
    },
    {
      streetId: 27,
      stationCount: 3
    },
    {
      streetId: 28,
      stationCount: 2
    },
    {
      streetId: 52,
      stationCount: 1
    }
  ];
};
//南山区的撒点数据
export const mapJdStationPoint = () => {
  return [
    {
      stationId: '120',
      stationName: '怡化金融大厦交流光伏站',
      lng: 113.942336,
      lat: 22.531837,
      operatorId: 'MA5FGLRY4',
      isHr: 1,
      status: 300,
      quickCount: 3,
      noQuickCount: 0,
      superCount: 0,
      sid: '005476',
      v2GCount: 0
    },
    {
      stationId: '87',
      stationName: '三诺大厦交流充光伏站',
      lng: 113.943899,
      lat: 22.527977,
      operatorId: 'MA5FGLRY4',
      isHr: 1,
      status: 300,
      quickCount: 0,
      noQuickCount: 20,
      superCount: 0,
      sid: '005474',
      v2GCount: 0
    },
    {
      stationId: '536107916714987520',
      stationName: '中山大学光伏站',
      lng: 113.94332,
      lat: 22.527021,
      operatorId: '326400952',
      isHr: 1,
      status: 300,
      quickCount: 21,
      noQuickCount: 4,
      superCount: 0,
      sid: '004896',
      v2GCount: 0
    },
    {
      stationId: '574497300803493888',
      stationName: '赛百诺大厦光伏站',
      lng: 113.936067,
      lat: 22.548526,
      operatorId: '326400952',
      isHr: 1,
      status: 300,
      quickCount: 0,
      noQuickCount: 32,
      superCount: 0,
      sid: '004894',
      v2GCount: 0
    }
  ];
};
