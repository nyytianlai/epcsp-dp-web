import gfzzl from './images/gfzzl.png';
import bwzrl from './images/bwzrl.png';
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
import { electricData } from './data';
import i18n from '@/locales/i18n';
const { t } = i18n.global;
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
      // name: '光伏站总量'
      name: t('photovoltaic-station.cdzzlFun.gfzzl')
    },
    {
      img: bwzrl,
      num: 351.31,
      unit: 'MW',
      // name: '并网总容量'
      name: t('photovoltaic-station.cdzzlFun.bwzrl')
    },
    {
      img: jrqyzs,
      num: 979,
      unit: '个',
      // name: '接入企业总数'
      name: t('photovoltaic-station.cdzzlFun.jrqyzs')
    }
  ];
};
export const unitTotalFun = (data = {}) => {
  return {
    img: nscgfld,
    num: 351.31,
    unit: '/MW',
    name: '并网总容量'
  };
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
    // label: '站点并网容量'
    label: t('photovoltaic-station.companyRank.zdbwrl')
  },
  {
    code: 2,
    // label: '光伏站数量'
    label: t('photovoltaic-station.companyRank.gfzsl')
  }
];
export const jrgfdzFun = (data = {}) => {
  return [
    {
      img: tyfsqd,
      num: data.radiation,
      unit: 'W/m²',
      // name: '太阳辐射强度',
      name: t('photovoltaic-station.jrgfdzFun.tyfsqd'),
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    },
    {
      img: jrswdl,
      num: data.onlineElec, // 今日发电总量 x 0.4
      unit: '万kWh',
      // name: '今日上网电量',
      name: t('photovoltaic-station.jrgfdzFun.jrswdl'),
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    },
    {
      img: jrfdzl,
      num: data.total,
      unit: '万kWh',
      // name: '今日发电总量',
      name: t('photovoltaic-station.jrgfdzFun.jrfdzl'),
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
    // label: '今日光伏站功率信息'
    label: t('photovoltaic-station.powerTodayTitle.jrgfzglxx')
  }
];
export const powerTodayCardFun = (data = {}) => {
  return [
    {
      img: jrzdgl,
      num: 338.31,
      unit: '/MW',
      // name: '今日最大功率',
      name: t('photovoltaic-station.powerTodayCardFun.jrzdgl'),
      classStyleType: 'leftRightStyleYellow5858'
    },
    {
      img: jrssgl,
      num: data?.realtime,
      unit: '/MW',
      // name: '今日实时功率',
      name: t('photovoltaic-station.powerTodayCardFun.jrssgl'),
      classStyleType: 'leftRightStyleYellow5858'
    }
  ];
};
export const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  const temp = [];
  const hours = dayjs().hour();
  const minutes = dayjs().minute();
  for (let i = 0; i < electricData.length; i++) {
    const date = electricData[i].time.split(':');
    // 判断小时和分钟是否小于当前时刻
    if (hours > Number(date[0]) || (Number(date[0]) <= hours && Number(date[1]) <= minutes)) {
      temp.push(electricData[i]);
    }
    // console.log(dayjs(    ).format('YYYY-MM-DD HH:mm'));
    // xAxis.push(dayjs().set('hour', i).set('minute', '00').format('YYYY-MM-DD HH:mm'));
  }
  return [
    {
      data: temp.map((item) => [yearMonthDay + item.time, item.power]),
      type: 'line',
      smooth: true,
      // name: '实时功率'
      name: t('photovoltaic-station.linePowerDataFun.ssgl')
    }
  ];
};
export const socialBenefitFun = (data = {}) => {
  return [
    {
      img: nscgfld,
      num: 4.29,
      // unit: '/亿度',
      // name: '年生产光伏绿电'
      unit: `/${t('photovoltaic-station.units.yd')}`,
      name: t('photovoltaic-station.socialBenefitFun.nscgfld')
    },
    {
      img: nco2jpl,
      num: 44.77,
      // unit: '/万吨',
      // name: '年CO2减排量'
      unit: `/${t('photovoltaic-station.units.wd')}`,
      name: t('photovoltaic-station.socialBenefitFun.nco2jpl')
    }
  ];
};
