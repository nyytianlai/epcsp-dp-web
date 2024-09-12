import dqzx from './images/dqzx.png';
import dqlx from './images/dqlx.png';
import dqsyl from './images/dqsyl.png';
import dqgzl from './images/dqgzl.png';
import dayjs from 'dayjs';
import i18n from '@/locales/i18n';
const { t } = i18n.global;
const configHead = `device-manage.config`;

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '充电站总量',
      // num: 7257,
      num: data?.stationCount,
      unit: t(`${configHead}.pageNumFun.unitGe`), // '个',
      displayName: t(`${configHead}.pageNumFun.cdzhanzl`),
      displayUnit: t(`${configHead}.pageNumFun.unitGe`)
    },
    {
      name: '充电桩总量',
      // num: 172319,
      num: data?.equipmentCount,
      unit: t(`${configHead}.pageNumFun.unitGe`), // '个',
      displayName: t(`${configHead}.pageNumFun.cdzhuangzl`),
      displayUnit: t(`${configHead}.pageNumFun.unitGe`)
    },
    {
      name: '充电枪总量',
      // num: 198963,
      num: data?.gunCount,
      unit: t(`${configHead}.pageNumFun.unitGe`), // '个',
      displayName: t(`${configHead}.pageNumFun.cdqzl`),
      displayUnit: t(`${configHead}.pageNumFun.unitGe`)
    },
    {
      name: '充电总功率',
      num: data?.chargeTotalRate / 10000,
      digits: 2,
      unit: '万kW',
      displayName: t(`${configHead}.pageNumFun.cdzgl`),
      displayUnit: t(`${configHead}.pageNumFun.unitWanKW`)
    }
  ];
};

export const chargingStationTabsFun = () => {
  return [
    {
      code: 'cdzlx',
      index: 1,
      label: '充电桩类型',
      displayLabel: t(`${configHead}.chargingStationTabsFun.cdzlx`)
    },
    {
      code: 'cdzdllx',
      index: 2,
      label: '充电桩电流类型',
      displayLabel: t(`${configHead}.chargingStationTabsFun.cdzdllx`)
    }
  ];
};

export const chargingStationGunTabsFun = () => {
  return [
    {
      code: 'cdqlx',
      index: 1,
      label: '充电枪类型',
      displayLabel: t(`${configHead}.chargingStationGunTabsFun.cdqlx`)
    },
    {
      code: 'cdqdllx',
      index: 2,
      label: '充电枪电流类型',
      displayLabel: t(`${configHead}.chargingStationGunTabsFun.cdqlx`)
    }
  ];
};

export const chargingStationPieDataFun = (code = 1, data = {}, maintab = 1) => {
  let res = [];
  switch (code) {
    case 'cdzlx':
      res = [
        {
          value: data?.chargeCountByChargeTypeDto?.quickCount,
          // value: 29982,
          name: '快充桩',
          code: 1,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.kcz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByChargeTypeDto?.noQuickCount,
          // value: 142337,
          name: '慢充桩',
          code: 2,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.mcz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByChargeTypeDto?.superCount,
          // value: 26,
          name: '超充桩',
          code: 3,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.ccz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        }
        // {
        //   value: data?.chargeCountByChargeTypeDto?.v2gCount,
        //   // value: 21,
        //   name: 'V2G桩',
        //   code: 4,
        //   unit: '个',
        //   isChoose: true
        // }
      ];
      break;
    case 'cdzdllx':
      res = [
        {
          value: data?.chargeCountByElectricityTypeDto?.directCurrentCount,
          name: '直流桩',
          isChoose: false,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.zzz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.exchangeCount,
          name: '交流桩',
          isChoose: false,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.jlz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.directAndExchangeCount,
          name: '交直流桩',
          isChoose: false,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.jzlz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.otherCount,
          name: '其他桩',
          isChoose: false,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.qtz`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        }
        // {
        //   value: data?.chargeCountByElectricityTypeDto?.v2gCount,
        //   name: 'V2G桩',
        //   isChoose: false,
        //   unit: '个'
        // }
      ];
      break;
    case 'cdqlx':
      res = [
        {
          value: data?.chargeCountByChargeTypeDto?.quickCount,
          name: '快充枪',
          code: 1,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.kcq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByChargeTypeDto?.noQuickCount,
          name: '慢充枪',
          code: 2,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.mcq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByChargeTypeDto?.superCount,
          name: '超充枪',
          code: 3,
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          isChoose: true,
          displayName: t(`${configHead}.chargingStationPieDataFun.ccq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        }
        // {
        //   value: data?.chargeCountByChargeTypeDto?.v2gCount,
        //   name: 'V2G枪',
        //   code: 4,
        //   unit: '个',
        //   isChoose: true
        // }
      ];
      break;
    case 'cdqdllx':
      res = [
        {
          value: data?.chargeCountByElectricityTypeDto?.directCurrentCount,
          name: '直流枪',
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.zlq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.exchangeCount,
          name: '交流枪',
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.jlq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.directAndExchangeCount,
          name: '交直流枪',
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.jzlq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        },
        {
          value: data?.chargeCountByElectricityTypeDto?.otherCount,
          name: '其他枪',
          unit: t(`${configHead}.chargingStationPieDataFun.unitGe`), //'个',
          displayName: t(`${configHead}.chargingStationPieDataFun.qtq`),
          displayUnit: t(`${configHead}.chargingStationPieDataFun.unitGe`)
        }
        // { value: data?.chargeCountByElectricityTypeDto?.v2gCount, name: 'V2G枪', unit: '个' }
      ];
      break;
    default:
      break;
  }
  res = res.filter((i) => i.value);
  return res;
};

export const areaRankDataFun = () => {
  return [
    {
      num: 6399,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), //'次',
      name: '南山区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.nsq`)
    },
    {
      num: 201,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), //'次',
      name: '宝安区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.baq`)
    },
    {
      num: 48,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), //'次',
      name: '罗湖区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.lhq`)
    },
    {
      num: 201,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), //'次',
      name: '龙华区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.longhq`)
    },
    {
      num: 48,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), //'次',
      name: '龙岗区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.longgq`)
    },
    {
      num: 6399,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), //'次',
      name: '南山区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.nsq`)
    },
    {
      num: 201,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), //'次',
      name: '宝安区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.baq`)
    },
    {
      num: 48,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), //'次',
      name: '罗湖区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.lhq`)
    },
    {
      num: 201,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), //'次',
      name: '龙华区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.longhq`)
    },
    {
      num: 48,
      unit: t(`${configHead}.areaRankDataFun.unitCi`), //'次',
      name: '大鹏新区',
      displayUnit: t(`${configHead}.areaRankDataFun.unitCi`),
      displayName: t(`${configHead}.areaRankDataFun.dpxq`)
    }
  ];
};

export const chargingTypesTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电桩状态',
      displayLabel: t(`${configHead}.chargingTypesTabsFun.cdzzt`)
    },
    {
      code: 2,
      label: '充电枪状态',
      displayLabel: t(`${configHead}.chargingTypesTabsFun.cdqzt`)
    }
  ];
};

export const chargingTypesFun = (data = {}) => {
  return [
    {
      img: dqzx,
      num: data?.onlineCount || 0,
      unit: t(`${configHead}.chargingTypesFun.unitGe`), // '个',
      name: '当前在线',
      classStyleType: 'leftRightStyleGreen6656',
      displayUnit: t(`${configHead}.chargingTypesFun.unitGe`),
      displayName: t(`${configHead}.chargingTypesFun.dqzx`)
    },
    {
      img: dqlx,
      num: data?.offlineCount || 0,
      unit: t(`${configHead}.chargingTypesFun.unitGe`), // '个',
      name: '当前离线',
      classStyleType: 'leftRightStyleGray6656',
      displayUnit: t(`${configHead}.chargingTypesFun.unitGe`),
      displayName: t(`${configHead}.chargingTypesFun.dqlx`)
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
      name: t(`${configHead}.lineStateDataFun.zx`) || '在线',
      displayName: t(`${configHead}.lineStateDataFun.zx`)
    },
    {
      yAxisIndex: 1,
      data: data.map((item) => [yearMonthDay + item.time, item.offlineCount]),
      type: 'line',
      smooth: true,
      name: t(`${configHead}.lineStateDataFun.lx`) || '离线',
      displayName: t(`${configHead}.lineStateDataFun.lx`)
    }
  ];
};

export const chargingRunTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电桩运行情况',
      displayLabel: t(`${configHead}.chargingRunTabsFun.cdzyxqk`)
    },
    {
      code: 2,
      label: '充电枪运行情况',
      displayLabel: t(`${configHead}.chargingRunTabsFun.cdqyxqk`)
    }
  ];
};

export const chargingRunDataFun = (data = {}) => {
  return [
    {
      img: dqsyl,
      num: data?.useRate ? data?.useRate + '%' : '0%',
      // unit: '%',
      name: '当前使用率',
      classStyleType: 'leftRightStyleGreen6656',
      displayName: t(`${configHead}.chargingRunDataFun.dqsyl`)
    },
    {
      img: dqgzl,
      num: data?.troubleRate ? data?.troubleRate + '%' : '0%',
      // unit: '%',
      name: '当前故障率',
      classStyleType: 'leftRightStyleGray6656',
      displayName: t(`${configHead}.chargingRunDataFun.dqgzl`)
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
      name:
        code === 1
          ? t(`${configHead}.lineRunDataFun.zsyl`) || '桩使用率'
          : t(`${configHead}.lineRunDataFun.qsyl`) || '枪使用率'
    },
    {
      yAxisIndex: 1,
      data: data.map((item) => [yearMonthDay + item.time, item.troubleRate]),
      type: 'line',
      smooth: true,
      name:
        code === 1
          ? t(`${configHead}.lineRunDataFun.zgzl`) || '桩故障率'
          : t(`${configHead}.lineRunDataFun.qgzl`) || '枪故障率'
    }
  ];
};

export const bottomTabDataFun = () => {
  return [
    {
      code: 1,
      // label: '充电桩',
      label: t(`${configHead}.bottomTabDataFun.cdz`)
    },
    {
      code: 2,
      // label: '充电枪',
      label: t(`${configHead}.bottomTabDataFun.cdq`)
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
      label: t(`${configHead}.columnDataFun.stationName`) || '充电站名称',
      minWidth: 2.8,
      displayName: t(`${configHead}.columnDataFun.stationName`)
    },
    {
      prop: 'operatorName',
      label: t(`${configHead}.columnDataFun.operatorName`) || '运营企业名称',
      minWidth: 2,
      displayName: t(`${configHead}.columnDataFun.operatorName`)
    },
    {
      prop: 'areaName',
      label: t(`${configHead}.columnDataFun.areaName`) || '所属区域',
      minWidth: 2,
      filterMultiple: true,
      displayName: t(`${configHead}.columnDataFun.areaName`)
    },
    {
      prop: 'equipmentCount',
      label: t(`${configHead}.columnDataFun.equipmentCount`) || '充电桩',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      displayName: t(`${configHead}.columnDataFun.equipmentCount`)
    },
    {
      prop: 'gunCount',
      label: t(`${configHead}.columnDataFun.gunCount`) || '充电枪',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      displayName: t(`${configHead}.columnDataFun.gunCount`)
    },
    {
      prop: 'equipmentPower',
      label: t(`${configHead}.columnDataFun.equipmentPower`) || '额定总功率/kw',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      displayName: t(`${configHead}.columnDataFun.equipmentPower`)
    }
  ];
};
// 数据过滤的选项

export const filters = [
  {
    id: 1,
    label: '全部',
    displayLabel: t(`${configHead}.filters.all`),
    children: [
      {
        id: 440303,
        label: '罗湖区',
        displayLabel: t(`${configHead}.filters.lhq`)
      },
      {
        id: 440304,
        label: '福田区',
        displayLabel: t(`${configHead}.filters.ftq`)
      },
      {
        id: 440305,
        label: '南山区',
        displayLabel: t(`${configHead}.filters.nsq`)
      },
      {
        id: 440306,
        label: '宝安区',
        displayLabel: t(`${configHead}.filters.baq`)
      },
      {
        id: 440307,
        label: '龙岗区',
        displayLabel: t(`${configHead}.filters.longgq`)
      },
      {
        id: 440308,
        label: '盐田区',
        displayLabel: t(`${configHead}.filters.ytq`)
      },
      {
        id: 440309,
        label: '龙华区',
        displayLabel: t(`${configHead}.filters.longhq`)
      },
      {
        id: 440310,
        label: '坪山区',
        displayLabel: t(`${configHead}.filters.psq`)
      },
      {
        id: 440311,
        label: '光明区',
        displayLabel: t(`${configHead}.filters.gmq`)
      },
      {
        id: 440343,
        label: '大鹏新区',
        displayLabel: t(`${configHead}.filters.dpxq`)
      },
      {
        id: 441521,
        label: '深汕特别合作区',
        displayLabel: t(`${configHead}.filters.sstbhzq`)
      }
    ]
  }
];
