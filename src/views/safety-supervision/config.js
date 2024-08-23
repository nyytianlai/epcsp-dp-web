import stateBlueB from './images/state-blue-b.png';
import stateBlueS from './images/state-blue-s.png';
import stateGrayB from './images/state-gray-b.png';
import stateGrayS from './images/state-gray-s.png';
import stateGreenS from './images/state-green-s.png';
import stateYellowB from './images/state-yellow-b.png';
import stateYellowS from './images/state-yellow-s.png';
import { merge } from 'lodash-es';
import dayjs from 'dayjs';

import i18n from '@/locales/i18n'; 
const { t } = i18n.global;
const configHead = `safety-supervision.config`;

export const pageNumFun = (data) => {
  return [
    {
      name: '累计告警总数',
      num: data?.sumCount,
      unit: t(`${configHead}.pageNumFun.unitGe`), // '个',
      nameColor: '#FF6B4B',
      displayName: t(`${configHead}.pageNumFun.ljgjzs`),
      displayUnit: t(`${configHead}.pageNumFun.unitGe`)
    },
    // {
    //   name: '当前告警总数',
    //   num: data?.dealCount,
    //   unit: '个',
    //   nameColor: '#F9E900'
    // },
    // {
    //   name: '已确认总数',
    //   num: data?.affirmCount,
    //   unit: '个',
    //   nameColor: '#FF6B4B'
    // },
    {
      name: '已发生',
      num: data?.occurCount,
      unit: t(`${configHead}.pageNumFun.unitGe`), // '个',
      nameColor: '#FF6B4B',
      displayName: t(`${configHead}.pageNumFun.yfs`),
      displayUnit: t(`${configHead}.pageNumFun.unitGe`)
    },
    {
      name: '已恢复',
      num: data?.recCount,
      unit: t(`${configHead}.pageNumFun.unitGe`), //'个',
      nameColor: '#FF6B4B',
      displayName: t(`${configHead}.pageNumFun.yhf`),
      displayUnit: t(`${configHead}.pageNumFun.unitGe`)
    }
  ];
};

export const totalWarningTabsFun = () => {
  return [
    {
      code: 1,
      label: '运营商',
      displayLabel: t(`${configHead}.totalWarningTabsFun.yys`),
    },
    {
      code: 2,
      label: '充电站',
      displayLabel: t(`${configHead}.totalWarningTabsFun.cdz`),
    }
  ];
};

export const areaRankDataFun = () => {
  return [
    {
      num: 6399,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), // '次',
      name: '南山区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.nsq`),
    },
    {
      num: 201,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), // '次',
      name: '宝安区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.baq`),
    },
    {
      num: 48,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), // '次',
      name: '罗湖区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.lhq`),
    },
    {
      num: 201,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), // '次',
      name: '龙华区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.longhq`),
    },
    {
      num: 48,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), // '次',
      name: '龙岗区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.longgq`),
    },
    {
      num: 6399,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), // '次',
      name: '南山区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.nsq`),
    },
    {
      num: 201,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), // '次',
      name: '宝安区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.baq`),
    },
    {
      num: 48,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), // '次',
      name: '罗湖区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.lhq`),
    },
    {
      num: 201,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), // '次',
      name: '龙华区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.longhq`),
    },
    {
      num: 48,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), // '次',
      name: '大鹏新区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.dpxq`),
    }
  ];
};

export const warningMonitorTabsFun = () => {
  return [
    {
      code: 1,
      label: '告警级别',
      displayLabel: t(`${configHead}.warningMonitorTabsFun.gjjb`)
    },
    {
      code: 2,
      label: '告警类型',
      displayLabel: t(`${configHead}.warningMonitorTabsFun.gjlx`)
    }
  ];
};

export const warningMonitorPieDataFun = (code = 1, data = {}) => {
  if (code === 1) {
    return [
      {
        value: data['1'],
        name: t(`${configHead}.warningMonitorPieDataFun.ysrsaq`) || '一级人身安全',
        extraName: t(`${configHead}.warningMonitorPieDataFun.rsaq`) || '人身安全',
        unit: t(`${configHead}.warningMonitorPieDataFun.unitGe`), // || '个',
        isChoose: true,
        typeCode: 1,
        positionCode: 1,
        displayName: t(`${configHead}.warningMonitorPieDataFun.ysrsaq`),
        displayExtraName: t(`${configHead}.warningMonitorPieDataFun.rsaq`),
        displayUnit: t(`${configHead}.warningMonitorPieDataFun.unitGe`),
      },
      {
        value: data['2'],
        name: t(`${configHead}.warningMonitorPieDataFun.ejsbaq`) || '二级设备安全',
        extraName: t(`${configHead}.warningMonitorPieDataFun.sbaq`) || '设备安全',
        unit: t(`${configHead}.warningMonitorPieDataFun.unitGe`), // || '个',
        isChoose: true,
        typeCode: 2,
        positionCode: 1,
        displayName: t(`${configHead}.warningMonitorPieDataFun.ejsbaq`),
        displayExtraName: t(`${configHead}.warningMonitorPieDataFun.sbaq`),
        displayUnit: t(`${configHead}.warningMonitorPieDataFun.unitGe`),
      },
      {
        value: data['3'],
        name: t(`${configHead}.warningMonitorPieDataFun.sjgjts`) ||'三级告警提示',
        extraName: t(`${configHead}.warningMonitorPieDataFun.gjts`) ||'告警提示',
        unit: t(`${configHead}.warningMonitorPieDataFun.unitGe`), // ||'个',
        isChoose: true,
        typeCode: 3,
        positionCode: 1,
        displayName: t(`${configHead}.warningMonitorPieDataFun.sjgjts`),
        displayExtraName: t(`${configHead}.warningMonitorPieDataFun.gjts`),
        displayUnit: t(`${configHead}.warningMonitorPieDataFun.unitGe`),
      }
    ];
  } else {
    return [
      {
        value: data['1'],
        name: t(`${configHead}.warningMonitorPieDataFun.cdxt`) || '充电系统',
        unit: t(`${configHead}.warningMonitorPieDataFun.unitGe`), // || '个',
        displayName: t(`${configHead}.warningMonitorPieDataFun.cdxt`),
        displayUnit: t(`${configHead}.warningMonitorPieDataFun.unitGe`),
      },
      {
        value: data['2'],
        name: t(`${configHead}.warningMonitorPieDataFun.dcxt`) || '电池系统',
        unit: t(`${configHead}.warningMonitorPieDataFun.unitGe`), // || '个',
        displayName: t(`${configHead}.warningMonitorPieDataFun.dcxt`),
        displayUnit: t(`${configHead}.warningMonitorPieDataFun.unitGe`), },
      {
        value: data['3'],
        name: t(`${configHead}.warningMonitorPieDataFun.pdxt`) || '配电系统',
        unit: t(`${configHead}.warningMonitorPieDataFun.unitGe`), // || '个',
        displayName: t(`${configHead}.warningMonitorPieDataFun.pdxt`),
        displayUnit: t(`${configHead}.warningMonitorPieDataFun.unitGe`), }
    ];
  }
};

export const realtimeStateTabsFun = () => {
  return [
    {
      code: 3,
      label: '充电站',
      displayLabel: t(`${configHead}.realtimeStateTabsFun.cdzhan`)
    },
    {
      code: 1,
      label: '充电桩',
      displayLabel: t(`${configHead}.realtimeStateTabsFun.cdzhuang`)
    },
    {
      code: 2,
      label: '充电枪',
      displayLabel: t(`${configHead}.realtimeStateTabsFun.cdq`)
    }
  ];
};

const formatStyle = (style = {}) => {
  const styleDefault = {
    iconStyle: {
      width: '1.03rem',
      height: '1.2rem'
    },
    numStyle: {
      fontFamily: 'DIN Condensed',
      color: '#00F7FF',
      fontSize: '0.28rem',
      background: 'transparent'
    },
    nameStyle: {
      color: 'rgba(255, 255, 255, 0.8)'
    }
  };
  style = merge(styleDefault, style);
  return style;
};
const iconStyleS = {
  width: '0.9rem',
  height: '1.06rem'
};

export const realtimeStateDataFun = (code = 1, data = {}) => {
  if (+code === 3) {
    return [
      {
        img: stateBlueB,
        num: data?.safeWarningStationStatisticVo?.normalCount,
        name: '正常/个',
        ...formatStyle(),
        isChoose: false,
        typeCode: 1,
        extraName: '正常',
        positionCode: 2,
        displayName: t(`${configHead}.realtimeStateDataFun.zcg`),
        displayExtraName: t(`${configHead}.realtimeStateDataFun.zc`),
      },
      {
        img: stateYellowB,
        num: data?.safeWarningStationStatisticVo?.warningCount,
        name: '预警/个',
        isChoose: false,
        typeCode: 2,
        extraName: '预警',
        positionCode: 2,
        ...formatStyle({
          numStyle: {
            color: '#FFB713'
          }
        }),
        displayName: t(`${configHead}.realtimeStateDataFun.yjg`),
        displayExtraName: t(`${configHead}.realtimeStateDataFun.yj`),
      },
      {
        img: stateGrayB,
        num: data?.safeWarningStationStatisticVo?.offlineCount,
        name: '未上线/个',
        isChoose: false,
        typeCode: 3,
        positionCode: 2,
        extraName: '未上线',
        ...formatStyle({
          numStyle: {
            color: '#FFFFFF'
          }
        }),
        displayName: t(`${configHead}.realtimeStateDataFun.wsxg`),
        displayExtraName: t(`${configHead}.realtimeStateDataFun.wsx`),
      }
    ];
  } else if (+code === 1) {
    return [
      {
        img: stateGreenS,
        num: data?.safeWarningEquipmentStatisticVo?.normalCount,
        name: '正常/个',
        ...formatStyle({
          iconStyle: iconStyleS,
          numStyle: {
            color: '#00FFB2'
          }
        }),
        displayName: t(`${configHead}.realtimeStateDataFun.zcg`),
      },
      {
        img: stateYellowS,
        num: data?.safeWarningEquipmentStatisticVo?.warningCount,
        name: '故障/个',
        ...formatStyle({
          iconStyle: iconStyleS,
          numStyle: {
            color: '#FFB713'
          }
        }),
        displayName: t(`${configHead}.realtimeStateDataFun.gzg`),
      },
      {
        img: stateBlueS,
        num: data?.safeWarningEquipmentStatisticVo?.onlineCount,
        name: '在线/个',
        ...formatStyle({
          iconStyle: iconStyleS
        }),
        displayName: t(`${configHead}.realtimeStateDataFun.zxg`),
      },
      {
        img: stateGrayS,
        num: data?.safeWarningEquipmentStatisticVo?.offlineCount,
        name: '离线/个',
        ...formatStyle({
          iconStyle: iconStyleS,
          numStyle: {
            color: '#FFFFFF'
          }
        }),
        displayName: t(`${configHead}.realtimeStateDataFun.lxg`),
      }
    ];
  } else {
    return [
      {
        img: stateGreenS,
        num: data?.safeWarningGunStatisticVo?.useCount,
        name: '占用/个',
        ...formatStyle({
          iconStyle: iconStyleS,
          numStyle: {
            color: '#00FFB2'
          }
        }),
        displayName: t(`${configHead}.realtimeStateDataFun.zyg`),
      },
      {
        img: stateYellowS,
        num: data?.safeWarningGunStatisticVo?.warningCount,
        name: '故障/个',
        ...formatStyle({
          iconStyle: iconStyleS,
          numStyle: {
            color: '#FFB713'
          }
        }),
        displayName: t(`${configHead}.realtimeStateDataFun.gzg`),
      },
      {
        img: stateBlueS,
        num: data?.safeWarningGunStatisticVo?.notUseCount,
        name: '空闲/个',
        ...formatStyle({
          iconStyle: iconStyleS
        }),
        displayName: t(`${configHead}.realtimeStateDataFun.kxg`),
      },
      {
        img: stateGrayS,
        num: data?.safeWarningGunStatisticVo?.offlineCount,
        name: '离线/个',
        ...formatStyle({
          iconStyle: iconStyleS,
          numStyle: {
            color: '#FFFFFF'
          }
        }),
        displayName: t(`${configHead}.realtimeStateDataFun.lxg`),
      }
    ];
  }
};

export const realtimeTrendFun = (data = [], type = 1) => {
  if (type === 1) {
    // 日

    return [
      {
        data: data.map((item) => [item.time, item.cnt]),
        type: 'line',
        smooth: true,
        name: t(`${configHead}.realtimeTrendFun.gjs`) || '告警数',
        displayName: t(`${configHead}.realtimeTrendFun.gjs`),
      }
    ];
  } else if (type === 2) {
    // 周
    return [
      {
        data: data.map((item) => [
          item.time.length >= 10 ? item.time.substr(5) : item.time,
          item.cnt
        ]),
        type: 'line',
        smooth: true,
        name: t(`${configHead}.realtimeTrendFun.gjs`) || '告警数',
        displayName: t(`${configHead}.realtimeTrendFun.gjs`),
      }
    ];
  } else {
    // 月
    const yearMonthDay = dayjs().format('YYYY-');
    return [
      {
        data: data.map((item) => [item.time, item.cnt]),
        type: 'line',
        smooth: true,
        name: t(`${configHead}.realtimeTrendFun.gjs`) || '告警数',
        displayName: t(`${configHead}.realtimeTrendFun.gjs`),
      }
    ];
  }
};

export const bottomTabDataFun = () => {
  return [
    {
      code: 1,
      label: '告警信息',
      displayLabel: t(`${configHead}.bottomTabDataFun.gjxx`),
    },
    {
      code: 2,
      label: '充电站状态',
      displayLabel: t(`${configHead}.bottomTabDataFun.cdzzt`),
    }
  ];
};

export const columnDataFun = () => {
  return [
    {
      prop: 'operatorName',
      label: t(`${configHead}.columnDataFun.operatorName`) || '运营商名称',
      minWidth: 2.8,
      displayLabel: t(`${configHead}.columnDataFun.operatorName`),
    },
    {
      prop: 'stationName',
      label: t(`${configHead}.columnDataFun.stationName`) || '充电站名称',
      minWidth: '2',
      displayLabel: t(`${configHead}.columnDataFun.stationName`),
    },
    {
      prop: 'alarmLevelName',
      label: t(`${configHead}.columnDataFun.alarmLevelName`) || '告警级别',
      minWidth: 1,
      filterMultiple: true,
      displayLabel: t(`${configHead}.columnDataFun.alarmLevelName`),
    },
    {
      prop: 'alarmTypeName',
      label: t(`${configHead}.columnDataFun.alarmTypeName`) || '告警类型',
      minWidth: '1',
      displayLabel: t(`${configHead}.columnDataFun.alarmTypeName`),
    },
    {
      prop: 'alarmDesc',
      label: t(`${configHead}.columnDataFun.alarmDesc`) || '告警描述',
      minWidth: '2',
      displayLabel: t(`${configHead}.columnDataFun.alarmDesc`),
    },
    {
      prop: 'alarmTime',
      label: t(`${configHead}.columnDataFun.alarmTime`) || '告警时间',
      minWidth: 2,
      displayLabel: t(`${configHead}.columnDataFun.alarmTime`),
    },
    {
      prop: 'contactPerson',
      label: t(`${configHead}.columnDataFun.contactPerson`) || '安全负责人',
      minWidth: 1,
      displayLabel: t(`${configHead}.columnDataFun.contactPerson`),
    },
    {
      prop: 'contactTel',
      label: t(`${configHead}.columnDataFun.contactTel`) || '联系电话',
      minWidth: 1.8,
      displayLabel: t(`${configHead}.columnDataFun.contactTel`),
    }
  ];
};

// 数据过滤的选项
export const filtersAlarmLevelName = [
  {
    id: 'all',
    label: t(`${configHead}.filtersAlarmLevelName.all`) || '全部',
    displayLabel: t(`${configHead}.filtersAlarmLevelName.all`),
    children: [
      {
        id: '1',
        label: t(`${configHead}.filtersAlarmLevelName.yjrsaq`) || '一级人身安全',
        displayLabel: t(`${configHead}.filtersAlarmLevelName.yjrsaq`),
      },
      {
        id: '2',
        label: t(`${configHead}.filtersAlarmLevelName.ejsbaq`) || '二级设备安全',
        displayLabel: t(`${configHead}.filtersAlarmLevelName.ejsbaq`),
      },
      {
        id: '3',
        label: t(`${configHead}.filtersAlarmLevelName.sjgjts`) || '三级告警提示',
        displayLabel: t(`${configHead}.filtersAlarmLevelName.sjgjts`),
      }
    ]
  }
];

// 警告类型数据过滤的选项
export const filtersAlarmTypeName = [
  {
    id: 'all',
    label: t(`${configHead}.filtersAlarmTypeName.all`) || '全部',
    displayLabel: t(`${configHead}.filtersAlarmTypeName.all`),
    children: [
      {
        id: '1',
        label: t(`${configHead}.filtersAlarmTypeName.cdxt`) || '充电系统',
        displayLabel: t(`${configHead}.filtersAlarmTypeName.cdxt`),
      },
      {
        id: '2',
        label: t(`${configHead}.filtersAlarmTypeName.dcxt`) || '电池系统',
        displayLabel: t(`${configHead}.filtersAlarmTypeName.dcxt`),
      },
      {
        id: '3',
        label: t(`${configHead}.filtersAlarmTypeName.pdxt`) || '配电系统',
        displayLabel: t(`${configHead}.filtersAlarmTypeName.pdxt`),
      }
    ]
  }
];

export const columnKeyListFun = (type = 1) => {
  return [
    {
      prop: type === 1 ? 'operatorName' : 'stationName',
      label: type === 1 ? t(`${configHead}.columnKeyListFun.yysmc`) || '运营商名称' : t(`${configHead}.columnKeyListFun.cdzmc`) || '充电站名称',
      width: 4,
      displayLabel: type === 1 ? t(`${configHead}.columnKeyListFun.yysmc`) : t(`${configHead}.columnKeyListFun.cdzmc`)
    },
    {
      prop: 'cnt',
      label: t(`${configHead}.columnKeyListFun.gjs`) || '告警数',
      width: 2,
      displayLabel: t(`${configHead}.columnKeyListFun.gjs`)
    },
    {
      prop: 'occurCount',
      label: t(`${configHead}.columnKeyListFun.yfs`) || '已发生',
      width: 2,
      displayLabel: t(`${configHead}.columnKeyListFun.yfs`)
    },
    {
      prop: 'affirmCnt',
      label: t(`${configHead}.columnKeyListFun.yhf`) || '已恢复',
      width: 2,
      displayLabel: t(`${configHead}.columnKeyListFun.yhf`)
    }
  ];
};

export const messageColumnKeyListFun = (type = 1) => {
  return [
    {
      prop: type === 1 ? 'operatorName' : 'stationName',
      label: type === 1 ? t(`${configHead}.messageColumnKeyListFun.yysmc`) || '运营商名称' : t(`${configHead}.messageColumnKeyListFun.cdzmc`) || '充电站名称',
      minWidth: 3,
      displayLabel: type === 1 ? t(`${configHead}.messageColumnKeyListFun.yysmc`) : t(`${configHead}.messageColumnKeyListFun.cdzmc`)
    },
    {
      prop: 'cnt',
      label: t(`${configHead}.messageColumnKeyListFun.gjzs`) || '告警总数',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      displayLabel: t(`${configHead}.messageColumnKeyListFun.gjzs`)
    },
    {
      prop: 'unAffirmCnt',
      label: t(`${configHead}.messageColumnKeyListFun.wqr`) || '未确认',
      minWidth: 1.5,
      displayLabel: t(`${configHead}.messageColumnKeyListFun.wqr`)
    },
    {
      prop: 'affirmCnt',
      label: t(`${configHead}.messageColumnKeyListFun.yqr`) || '已确认',
      minWidth: 1.5,
      displayLabel: t(`${configHead}.messageColumnKeyListFun.yqr`)
    },
    {
      prop: 'recCnt',
      label: t(`${configHead}.messageColumnKeyListFun.yhf`) || '已恢复',
      minWidth: 1.5,
      displayLabel: t(`${configHead}.messageColumnKeyListFun.yhf`)
    },
    { prop: 'contactPerson', label: t(`${configHead}.messageColumnKeyListFun.fzr`) || '负责人', minWidth: 1.5,
      displayLabel: t(`${configHead}.messageColumnKeyListFun.fzr`) },
    { prop: 'contactTel', label: t(`${configHead}.messageColumnKeyListFun.lxdh`) ||'联系电话', minWidth: 2,
      displayLabel: t(`${configHead}.messageColumnKeyListFun.lxdh`) }
  ];
};

export const legendList = [
  {
    color: 'linear-gradient(178.17deg, #59FFFF 4.74%, #002E2D 95.4%)',
    name: '充电站',
    displayName: t(`${configHead}.legendList.cdzhan`)
  },
  {
    color: 'linear-gradient(178.21deg, #5678F9 6.05%, #003077 94.76%)',
    name: '充电桩',
    displayName: t(`${configHead}.legendList.cdzhuang`)
  },
  {
    color: 'linear-gradient(178.1deg, #4AD9FC 3.02%, #003077 97.03%)',
    name: '充电枪',
    displayName: t(`${configHead}.legendList.cdq`)
  }
];
