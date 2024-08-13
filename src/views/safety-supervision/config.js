import stateBlueB from './images/state-blue-b.png';
import stateBlueS from './images/state-blue-s.png';
import stateGrayB from './images/state-gray-b.png';
import stateGrayS from './images/state-gray-s.png';
import stateGreenS from './images/state-green-s.png';
import stateYellowB from './images/state-yellow-b.png';
import stateYellowS from './images/state-yellow-s.png';
import { merge } from 'lodash-es';
import dayjs from 'dayjs';
export const pageNumFun = (data) => {
  return [
    {
      name: '累计告警总数',
      num: data?.sumCount,
      unit: '个',
      nameColor: '#FF6B4B'
    },
    {
      name: '当前告警总数',
      num: data?.dealCount,
      unit: '个',
      nameColor: '#F9E900'
    },
    {
      name: '已确认总数',
      num: data?.affirmCount,
      unit: '个',
      nameColor: '#FF6B4B'
    },
    {
      name: '已恢复总数',
      num: data?.recCount,
      unit: '个',
      nameColor: '#FF6B4B'
    }
  ];
};

export const totalWarningTabsFun = () => {
  return [
    {
      code: 1,
      label: '运营商'
    },
    {
      code: 2,
      label: '充电站'
    }
  ];
};

export const areaRankDataFun = () => {
  return [
    {
      num: 6399,
      unit: '次',
      name: '南山区'
    },
    {
      num: 201,
      unit: '次',
      name: '宝安区'
    },
    {
      num: 48,
      unit: '次',
      name: '罗湖区'
    },
    {
      num: 201,
      unit: '次',
      name: '龙华区'
    },
    {
      num: 48,
      unit: '次',
      name: '龙岗区'
    },
    {
      num: 6399,
      unit: '次',
      name: '南山区'
    },
    {
      num: 201,
      unit: '次',
      name: '宝安区'
    },
    {
      num: 48,
      unit: '次',
      name: '罗湖区'
    },
    {
      num: 201,
      unit: '次',
      name: '龙华区'
    },
    {
      num: 48,
      unit: '次',
      name: '大鹏新区'
    }
  ];
};

export const warningMonitorTabsFun = () => {
  return [
    {
      code: 1,
      label: '告警级别'
    },
    {
      code: 2,
      label: '告警类型'
    }
  ];
};
export const warningMonitorPieDataFun = (code = 1, data = {}) => {
  if (code === 1) {
    return [
      {
        value: data['1'],
        name: '一级人身安全',
        extraName: '人身安全',
        unit: '个',
        isChoose: true,
        typeCode: 1,
        positionCode: 1
      },
      {
        value: data['2'],
        name: '二级设备安全',
        extraName: '设备安全',
        unit: '个',
        isChoose: true,
        typeCode: 2,
        positionCode: 1
      },
      {
        value: data['3'],
        name: '三级告警提示',
        extraName: '告警提示',
        unit: '个',
        isChoose: true,
        typeCode: 3,
        positionCode: 1
      }
    ];
  } else {
    return [
      { value: data['1'], name: '充电系统', unit: '个' },
      { value: data['2'], name: '电池系统', unit: '个' },
      { value: data['3'], name: '配电系统', unit: '个' }
    ];
  }
};

export const realtimeStateTabsFun = () => {
  return [
    {
      code: 3,
      label: '充电站'
    },
    {
      code: 1,
      label: '充电桩'
    },
    {
      code: 2,
      label: '充电枪'
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
        positionCode: 2
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
        })
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
        })
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
        })
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
        })
      },
      {
        img: stateBlueS,
        num: data?.safeWarningEquipmentStatisticVo?.onlineCount,
        name: '在线/个',
        ...formatStyle({
          iconStyle: iconStyleS
        })
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
        })
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
        })
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
        })
      },
      {
        img: stateBlueS,
        num: data?.safeWarningGunStatisticVo?.notUseCount,
        name: '空闲/个',
        ...formatStyle({
          iconStyle: iconStyleS
        })
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
        })
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
        name: '告警数'
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
        name: '告警数'
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
        name: '告警数'
      }
    ];
  }
};

export const bottomTabDataFun = () => {
  return [
    {
      code: 1,
      label: '告警信息'
    },
    {
      code: 2,
      label: '充电站状态'
    }
  ];
};

export const columnDataFun = () => {
  return [
    {
      prop: 'operatorName',
      label: '运营商名称',
      minWidth: 2.8
    },
    {
      prop: 'stationName',
      label: '充电站名称',
      minWidth: '2'
    },
    {
      prop: 'alarmLevelName',
      label: '告警级别',
      minWidth: 1,
      filterMultiple: true
    },
    {
      prop: 'alarmTypeName',
      label: '告警类型',
      minWidth: '1'
    },
    {
      prop: 'alarmDesc',
      label: '告警描述',
      minWidth: '2'
    },
    {
      prop: 'alarmTime',
      label: '告警时间',
      minWidth: 2
    },
    {
      prop: 'contactPerson',
      label: '安全负责人',
      minWidth: 1
    },
    {
      prop: 'contactTel',
      label: '联系电话',
      minWidth: 1.8
    }
  ];
};
// 数据过滤的选项
export const filtersAlarmLevelName = [
  {
    id: 'all',
    label: '全部',
    children: [
      {
        id: '1',
        label: '一级人身安全'
      },
      {
        id: '2',
        label: '二级设备安全'
      },
      {
        id: '3',
        label: '三级告警提示'
      }
    ]
  }
];
// 警告类型数据过滤的选项
export const filtersAlarmTypeName = [
  {
    id: 'all',
    label: '全部',
    children: [
      {
        id: '1',
        label: '充电系统'
      },
      {
        id: '2',
        label: '电池系统'
      },
      {
        id: '3',
        label: '配电系统'
      }
    ]
  }
];
export const columnKeyListFun = (type = 1) => {
  return [
    {
      prop: type === 1 ? 'operatorName' : 'stationName',
      label: type === 1 ? '运营商名称' : '充电站名称',
      width: 4
    },
    { prop: 'cnt', label: '告警数', width: 2 },
    { prop: 'affirmCnt', label: '已确认', width: 2 },
    { prop: 'recCnt', label: '恢复数', width: 2 }
  ];
};

export const messageColumnKeyListFun = (type = 1) => {
  return [
    {
      prop: type === 1 ? 'operatorName' : 'stationName',
      label: type === 1 ? '运营商名称' : '充电站名称',
      minWidth: 4
    },
    {
      prop: 'cnt',
      label: '告警总数',
      minWidth: 1.5,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending']
    },
    {
      prop: 'unAffirmCnt',
      label: '未确认',
      minWidth: 1.5
    },
    {
      prop: 'affirmCnt',
      label: '已确认',
      minWidth: 1.5
    },
    {
      prop: 'recCnt',
      label: '已恢复',
      minWidth: 1.5
    },
    { prop: 'contactPerson', label: '负责人', minWidth: 1.5 },
    { prop: 'contactTel', label: '联系电话', minWidth: 2 }
  ];
};

export const legendList = [
  {
    color: 'linear-gradient(178.17deg, #59FFFF 4.74%, #002E2D 95.4%)',
    name: '充电站'
  },
  {
    color: 'linear-gradient(178.21deg, #5678F9 6.05%, #003077 94.76%)',
    name: '充电桩'
  },
  {
    color: 'linear-gradient(178.1deg, #4AD9FC 3.02%, #003077 97.03%)',
    name: '充电枪'
  }
];
