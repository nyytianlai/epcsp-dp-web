import dqzx from './images/dqzx.png';
import dqlx from './images/dqlx.png';
import dqsyl from './images/dqsyl.png';
import dqgzl from './images/dqgzl.png';
import dayjs from 'dayjs';

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '充电站总量',
      // num: 7257,
      num: data?.stationCount,
      unit: '个'
    },
    {
      name: '充电桩总量',
      // num: 172319,
      num: data?.equipmentCount,
      unit: '个'
    },
    {
      name: '充电枪总量',
      // num: 198963,
      num: data?.gunCount,
      unit: '个'
    },
    {
      name: '充电总功率',
      num: data?.chargeTotalRate / 10000,
      digits: 2,
      unit: '万kW'
    }
  ];
};

export const chargingStationTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电桩类型'
    },
    {
      code: 2,
      label: '充电桩电流类型'
    }
  ];
};
export const chargingStationGunTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电枪类型'
    },
    {
      code: 2,
      label: '充电枪电流类型'
    }
  ];
};
export const chargingStationPieDataFun = (code = 1, data = {}, maintab = 1) => {
  if (maintab === 1) {
    // 充电桩
    if (code === 1) {
      return [
        {
          value: data?.chargeCountByChargeTypeDto?.quickCount,
          // value: 29982,
          name: '快充桩',
          code: 1,
          unit: '个',
          isChoose: true
        },
        {
          value: data?.chargeCountByChargeTypeDto?.noQuickCount,
          // value: 142337,
          name: '慢充桩',
          code: 2,
          unit: '个',
          isChoose: true
        },
        {
          value: data?.chargeCountByChargeTypeDto?.superCount,
          // value: 26,
          name: '超充桩',
          code: 3,
          unit: '个',
          isChoose: true
        },
        {
          value: data?.chargeCountByChargeTypeDto?.v2GCount,
          // value: 21,
          name: 'V2G桩',
          code: 4,
          unit: '个',
          isChoose: true
        }
      ];
    } else {
      return [
        {
          value: data?.chargeCountByElectricityTypeDto?.directCurrentCount,
          name: '直流桩',
          unit: '个'
        },
        { value: data?.chargeCountByElectricityTypeDto?.exchangeCount, name: '交流桩', unit: '个' },
        {
          value: data?.chargeCountByElectricityTypeDto?.directAndExchangeCount,
          name: '交直流桩',
          unit: '个'
        },
        { value: data?.chargeCountByElectricityTypeDto?.otherCount, name: '其他桩', unit: '个' },
        { value: data?.chargeCountByElectricityTypeDto?.v2GCount, name: 'V2G桩', unit: '个' }
      ];
    }
  } else {
    // 充电枪
    if (code === 1) {
      return [
        {
          value: data?.chargeCountByChargeTypeDto?.quickCount,
          name: '快充枪',
          code: 1,
          unit: '个',
          isChoose: true
        },
        {
          value: data?.chargeCountByChargeTypeDto?.noQuickCount,
          name: '慢充枪',
          code: 2,
          unit: '个',
          isChoose: true
        },
        {
          value: data?.chargeCountByChargeTypeDto?.superCount,
          name: '超充枪',
          code: 3,
          unit: '个',
          isChoose: true
        },
        {
          value: data?.chargeCountByChargeTypeDto?.v2GCount,
          name: 'V2G枪',
          code: 4,
          unit: '个',
          isChoose: true
        }
      ];
    } else {
      return [
        {
          value: data?.chargeCountByElectricityTypeDto?.directCurrentCount,
          name: '直流枪',
          unit: '个'
        },
        { value: data?.chargeCountByElectricityTypeDto?.exchangeCount, name: '交流枪', unit: '个' },
        {
          value: data?.chargeCountByElectricityTypeDto?.directAndExchangeCount,
          name: '交直流枪',
          unit: '个'
        },
        { value: data?.chargeCountByElectricityTypeDto?.otherCount, name: '其他枪', unit: '个' },
        { value: data?.chargeCountByElectricityTypeDto?.v2GCount, name: 'V2G枪', unit: '个' }
      ];
    }
  }
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

export const chargingTypesTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电桩状态'
    },
    {
      code: 2,
      label: '充电枪状态'
    }
  ];
};

export const chargingTypesFun = (data = {}) => {
  return [
    {
      img: dqzx,
      num: data?.onlineCount,
      unit: '个',
      name: '当前在线',
      classStyleType: 'leftRightStyleGreen6656'
    },
    {
      img: dqlx,
      num: data?.offlineCount,
      unit: '个',
      name: '当前离线',
      classStyleType: 'leftRightStyleGray6656'
    }
  ];
};

export const lineStateDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  return [
    {
      data: data.map((item) => [yearMonthDay + item.time, item.onlineCount]),
      type: 'line',
      smooth: true,
      name: '在线'
    },
    {
      data: data.map((item) => [yearMonthDay + item.time, item.offlineCount]),
      type: 'line',
      smooth: true,
      name: '离线'
    }
  ];
};

export const chargingRunTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电桩运行情况'
    },
    {
      code: 2,
      label: '充电枪运行情况'
    }
  ];
};

export const chargingRunDataFun = (data = {}) => {
  return [
    {
      img: dqsyl,
      num: data?.useRate,
      unit: '%',
      name: '当前使用率',
      classStyleType: 'leftRightStyleGreen6656'
    },
    {
      img: dqgzl,
      num: data?.troubleRate,
      unit: '%',
      name: '当前故障率',
      classStyleType: 'leftRightStyleGray6656'
    }
  ];
};

export const lineRunDataFun = (data = [], code = 1) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  return [
    {
      data: data.map((item) => [yearMonthDay + item.time, item.useRate]),
      type: 'line',
      smooth: true,
      name: code === 1 ? '桩使用率' : '枪使用率'
    },
    {
      data: data.map((item) => [yearMonthDay + item.time, item.troubleRate]),
      type: 'line',
      smooth: true,
      name: code === 1 ? '桩故障率' : '枪故障率'
    }
  ];
};

export const bottomTabDataFun = () => {
  return [
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

// 设备详情弹窗
export const columnDataFun = () => {
  return [
    // {
    //   type: 'index',
    //   label: '序号',
    //   index:(index)=>(pageObj.currentPage - 1) * pageObj.pageSize + index + 1,
    //   minWidth:1
    // },
    {
      prop: 'stationName',
      label: '充电站名称',
      minWidth: 2.8
    },
    {
      prop: 'operatorName',
      label: '运营企业名称',
      minWidth: 2
    },
    {
      prop: 'areaName',
      label: '所属区域',
      minWidth: 1,
      filterMultiple: true
    },
    {
      prop: 'equipmentCount',
      label: '充电桩',
      minWidth: 1,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending']
    },
    {
      prop: 'gunCount',
      label: '充电枪',
      minWidth: 1,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending']
    },
    {
      prop: 'equipmentPower',
      label: '额定总功率/kw',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending']
    }
  ];
};
// 数据过滤的选项
export const filters = [
  {
    id: 1,
    label: '全部',
    children: [
      {
        id: 440303,
        label: '罗湖区'
      },
      {
        id: 440304,
        label: '福田区'
      },
      {
        id: 440305,
        label: '南山区'
      },
      {
        id: 440306,
        label: '宝安区'
      },
      {
        id: 440307,
        label: '龙岗区'
      },
      {
        id: 440308,
        label: '盐田区'
      },
      {
        id: 440309,
        label: '龙华区'
      },
      {
        id: 440310,
        label: '坪山区'
      },
      {
        id: 440311,
        label: '光明区'
      },
      {
        id: 440343,
        label: '大鹏新区'
      },
      {
        id: 441521,
        label: '深汕特别合作区'
      }
    ]
  }
];
