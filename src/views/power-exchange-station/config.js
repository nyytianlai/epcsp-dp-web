import gfzzl from '@/views/photovoltaic-station/images/gfzzl.png';
import zjzrl from '@/views/photovoltaic-station/images/zjzrl.png';
import jrqyzs from '@/views/photovoltaic-station/images/jrqyzs.png';
import edzgl from '@/views/chargings-replacement-cabinet/images/edzgl.png';
import sszgl from '@/views/chargings-replacement-cabinet/images/sszgl.png';
import LowerVoltageLimit from './images/lower-voltage-limit.png';
import UpperVoltageLimit from './images/upper-voltage-limit.png';
import RatedCurrent from './images/rated-current.png';
import dayjs from 'dayjs';
import i18n from '@/locales/i18n';
import { powerTodayLineData } from './data';
// 换电站整体信息

const { t } = i18n.global;

export const powerExchangeAllInfoFun = (data = {}) => {
  return [
    {
      img: gfzzl,
      num: 43,
      unit: '个',
      // name: '换电站总量',
      name: t('power-exchange-station.powerExchangeAllInfoFun.hdzzl')
    },
    {
      img: zjzrl,
      num: 503,
      unit: '个',
      // name: '充电仓数量'
      name: t('power-exchange-station.powerExchangeAllInfoFun.cdcsl')
    },
    {
      img: jrqyzs,
      num: 1,
      unit: '个',
      // name: '接入企业总数'
      name: t('power-exchange-station.powerExchangeAllInfoFun.jrqyzs')
    }
  ];
};
// 换电设备信息
export const deviceInfoTabs = [
  {
    code: 1,
    // label: '换电设备信息'
    label: t('power-exchange-station.deviceInfoTabs.hdsbxx')
  }
];
export const deviceInfoDataFun = (data = {}) => {
  return [
    {
      img: UpperVoltageLimit,
      num: '500V',
      unit: '',
      // name: '额定电压上限',
      name: t('power-exchange-station.deviceInfoDataFun.eddysx'),
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    },
    {
      img: LowerVoltageLimit,
      num: '200V',
      unit: '',
      // name: '额定电压下限',
      name: t('power-exchange-station.deviceInfoDataFun.eddyxx'),
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    },
    {
      img: RatedCurrent,
      num: '144A',
      unit: '',
      // name: '额定电流',
      name: t('power-exchange-station.deviceInfoDataFun.eddl'),
      numStyle: {
        background: 'linear-gradient(180deg, #00F7FF -71.43%, #D5FEFF 16%, #00F7FF 96.43%)',
        textFillColor: 'transparent',
        '-webkit-background-clip': 'text'
      }
    }
  ];
};
// 今日站点换电次数排名
export const rankDataFun = () => {
  return [
    {
      num: 61,
      unit: '次',
      name: '深圳福田圣廷苑'
    },
    {
      num: 59,
      unit: '次',
      name: '深圳坂田交付中心'
    },
    {
      num: 44,
      unit: '次',
      name: '深圳南山浩昇体育公园'
    },
    {
      num: 43,
      unit: '次',
      name: '深圳龙华北站中心公园'
    },
    {
      num: 39,
      unit: '次',
      name: '深圳福田安培瓦特'
    },
    {
      num: 32,
      unit: '次 ',
      name: '深圳西丽E动空间'
    },
    {
      num: 31,
      unit: '次 ',
      name: '深圳宝安高新技术工业园'
    },
    {
      num: 28,
      unit: '次 ',
      name: '深圳中粮031创意园'
    }
  ];
};

// 今日换电站状态
export const powerExchangeStatusDataFun = (data = {}) => {
  return [
    {
      value: 0,
      // name: '建设中',
      name: t('power-exchange-station.powerExchangeStatusDataFun.jsz'),
      // unit: '个'
      unit: t('power-exchange-station.unit.unitGe')
    },
    {
      value: 2,
      // name: '维护中',
      name: t('power-exchange-station.powerExchangeStatusDataFun.whz'),
      // unit: '个'
      unit: t('power-exchange-station.unit.unitGe')
    },
    {
      value: 43,
      // name: '运营中',
      name: t('power-exchange-station.powerExchangeStatusDataFun.yyz'),
      // unit: '个'
      unit: t('power-exchange-station.unit.unitGe')
    }
  ];
};

// 今日换电次数信息
export const powerTodayCardFun = (data = {}) => {
  return [
    {
      img: edzgl,
      num: 736,
      unit: '',
      // name: '昨日换电次数',
      name: t('power-exchange-station.powerTodayCardFun.zrhdcs'),
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: sszgl,
      num: 432,
      unit: '',
      // name: '今日换电次数',
      name: t('power-exchange-station.powerTodayCardFun.jrhdcs'),
      classStyleType: 'leftRightStyleYellow'
    }
  ];
};

export const handlePowerTodayLineData = (data) => {
  let xAxis = [];
  let todaySeriesData = [];
  let yesterdaySeriesData = [];
  const hours = dayjs().hour();
  const minutes = dayjs().minute();
  console.log(hours, minutes);
  for (let i = 0; i < data.length; i++) {
    xAxis.push(data[i].time);
    const date = data[i].time.split(':');
    // 判断小时和分钟是否小于当前时刻
    if (hours > Number(date[0]) || (Number(date[0]) <= hours && Number(date[1]) <= minutes)) {
      todaySeriesData.push(data[i].today);
    }
    yesterdaySeriesData.push(data[i].yesterday);
    // console.log(dayjs(    ).format('YYYY-MM-DD HH:mm'));
    // xAxis.push(dayjs().set('hour', i).set('minute', '00').format('YYYY-MM-DD HH:mm'));
  }
  return {
    xAxis,
    todaySeriesData,
    yesterdaySeriesData
  };
};
const datas = handlePowerTodayLineData(powerTodayLineData);
export const powerTodayCardOption = {
  grid: {
    top: 30,
    bottom: 24,
    right: 15,
    left: 48
  },
  tooltip: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    trigger: 'axis',
    formatter: (params) => {
      const val = params[0];
      let str = `<div class="time-tooltip">`;
      str += `<div class="time">${val.axisValueLabel}</div>`;
      params.map((item) => {
        str += `<div class="item-data">
          <span class="left-data">
            ${item?.marker}
            <span class="name">${item?.seriesName}</span>
          </span>
          <span class="right-data">
            <span class="value">${item.value}</span>
            <span class="unit">次</span>
          </span>
        </div>`;
      });
      str += '</div>';
      return str;
    }
  },
  legend: {
    data: [
      t('power-exchange-station.powerTodayCardOption.zrhdzfhqx'), // 昨日换电站负荷曲线
      t('power-exchange-station.powerTodayCardOption.jrhdzfhqx') // 今日换电站负荷曲线
    ],
    textStyle: {
      color: '#fff'
    },
    x: 'right'
  },
  xAxis: {
    type: 'category',
    data: datas.xAxis,
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#BAE7FF'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#BAE7FF'
      }
    },
    axisLabel: {
      fontFamily: 'Source Han Sans CN',
      fontSize: 12,
      lineHeight: 18,
      color: '#B4C0CC'
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    name: `${t('power-exchange-station.unit.unitName')}：${t(
      'power-exchange-station.unit.unitCi'
    )}`, // '单位：次'
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    nameTextStyle: {
      align: 'right'
    },
    axisLabel: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 16,
      color: '#B4C0CC',
      formatter: (value) => {
        return value >= 0 ? value : '';
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(230, 247, 255, 0.2)',
        type: 'dashed'
      }
    }
  },
  series: [
    {
      data: datas.yesterdaySeriesData,
      type: 'line',
      smooth: true,
      showSymbol: false,
      // name: '昨日换电站负荷曲线',
      name: t('power-exchange-station.powerTodayCardOption.zrhdzfhqx'),
      areaStyle: {
        origin: 'start',
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#00FFF9' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(217, 217, 217, 0)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      itemStyle: {
        color: '#00FFF9'
      }
    },
    {
      data: datas.todaySeriesData,
      type: 'line',
      smooth: true,
      showSymbol: false,
      // name: '今日换电站负荷曲线',
      name: t('power-exchange-station.powerTodayCardOption.jrhdzfhqx'),
      areaStyle: {
        origin: 'start',
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#FF7A00' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(217, 217, 217, 0)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      itemStyle: {
        color: '#FF7A00'
      }
    }
  ]
};
// 今日告警信息
export const warnData = [
  {
    id: 322830143,
    date: '2023-06-21 12:30:12',
    message: '换电系统发生故障',
    area: '深圳福田圣廷苑',
    isClick: false
  },
  {
    id: 322830125,
    date: '2023-06-21 12:18:56',
    message: '换电系统发生故障',
    area: '深圳坂田交付中心',
    isClick: false
  },
  {
    id: 322830080,
    date: '2023-06-21 12:03:23',
    message: '换电系统发生故障',
    area: '深圳南山浩昇体育公园',
    isClick: false
  },
  {
    id: 322827925,
    date: '2023-06-21 11:40:22',
    message: '换电系统发生故障',
    area: '深圳龙华北站中心公园',
    isClick: false
  },
  {
    id: 322826764,
    date: '2023-06-21 11:19:35',
    message: '换电系统发生故障',
    area: '深圳福田安培瓦特',
    isClick: false
  },
  {
    id: 322826756,
    date: '2023-06-21 10:26:11',
    message: '换电系统发生故障',
    area: '深圳宝安高新技术工业园',
    isClick: false
  },
  {
    id: 322830069,
    date: '2023-06-21 09:41:32',
    message: '换电系统发生故障',
    area: '深圳南山浩昇体育公园',
    isClick: false
  }
];
