import charging from '@/assets/images/stationDetail/charging.png';
import camera from '@/assets/images/stationDetail/camera.png';
import dLock from '@/assets/images/stationDetail/dLock.png';
import rate from '@/assets/images/stationDetail/rate.png';
import num from '@/assets/images/stationDetail/num.png';
import dayjs from 'dayjs';

//民乐站配套设施标签
export const facilitiesLabel = () => {
  return [
    {
      value: '配电房',
      position: [504774.168125, 2499575.52, 96.99998046875],
      img: 'electricalRoom'
    },
    {
      value: '配电房',
      position: [504753.5603125, 2499558.88, 97.00000976562501],
      img: 'electricalRoom'
    },
    {
      value: '配电房',
      position: [504741.674375, 2499550.24, 97.00000976562501],
      img: 'electricalRoom'
    },
    {
      value: '卫生间',
      position: [504675.3878125, 2499607.36, 98.3817578125],
      img: 'toilet'
    },
    {
      value: '便利店',
      position: [504672.74375, 2499624.8000000003, 96.959091796875],
      img: 'store'
    },
    {
      value: '休息区',
      position: [504657.135625, 2499639.04, 98.2],
      img: 'rest'
    },
    {
      value: '维修区',
      position: [504635.49562500004, 2499664.96, 98.5],
      img: 'maintenance'
    },
    {
      value: '配电房',
      position: [504684.1375, 2499708.64, 97],
      img: 'electricalRoom'
    }
  ];
};
//民乐站电流标签
export const currentLabel = () => {
  return [
    {
      value: '220V 50HZ',
      position: [504774.7628125, 2499640.8000000003, 92.8]
    },
    {
      value: '220V 50HZ',
      position: [504758.515625, 2499630.24, 92.8]
    },
    {
      value: '220V 50HZ',
      position: [504741.965625, 2499619.68, 92.8]
    },
    {
      value: '220V 50HZ',
      position: [504725.815625, 2499608.64, 92.8]
    },
    {
      value: '220V 50HZ',
      position: [504709.5103125, 2499596.48, 92.8]
    }
  ];
};
//民乐站棚顶的id
export const ceilingId = () => {
  return [
    'Shape036',
    'Shape037',
    'Shape038',
    'Shape039',
    'Rectangle092',
    'Shape045',
    'Shape044',
    'Shape041',
    'Shape042',
    'Line140'
  ];
};

//还有一个场站初始化默认视角
export const tabCameraInfo = () => {
  return {
    站内设施: [
      504793.48203125, 2499688.4006250002, 248.09537109375, -60.87890625, 148.35487365722656
    ],
    车辆充电: [
      504704.88390625, 2499655.3351562503, 114.912919921875, -57.08574295043945, 55.92612838745117
    ],
    电流流转: 4,
    运营商分布: [
      504819.34391601564, 2499694.298125, 217.183515625, -46.425331115722656, 145.0386505126953
    ]
  };
};

export const pageNumFun = (data = {}) => {
  return [
    {
      name: '站点充电量',
      num: data?.stationChargeCapacity,
      unit: 'kwh'
    },
    {
      name: '站点充电次数',
      num: data?.stationChargeCount,
      unit: '次'
    },
    {
      name: '站点充电时长',
      num: data?.stationChargeDuration,
      unit: '小时'
    },
    {
      name: '站点故障次数',
      num: data?.stationFailureNumber,
      unit: '次'
    }
  ];
};

export const deviceInfoDataFun = (data = {}) => {
  return [
    {
      img: charging,
      num: data?.equipmentCount,
      name: '充电桩/个'
    },
    {
      img: camera,
      num: data?.cameraCount || 63279,
      name: '摄像头/个'
    },
    {
      img: charging,
      num: data?.gunCount,
      name: '充电枪/个'
    },
    {
      img: dLock,
      num: data?.lockCount || 58552,
      name: '地锁/个'
    }
  ];
};

export const warningTabsDataFun = (data = []) => {
  const levelData = {};
  data.map((item) => {
    levelData[item.levelType] = item.levelCount;
  });
  return [
    {
      label: '一级人身安全',
      icon: 'first-level',
      num: levelData[1],
      code: 1,
      color: '#FA2A2D'
    },
    {
      label: '二级设备安全',
      icon: 'second-level',
      num: levelData[2],
      code: 2,
      color: '#FF7500'
    },
    {
      label: '三级告警提示',
      icon: 'third-level',
      num: levelData[3],
      code: 3,
      color: '#FFBF00'
    }
  ];
};

export const warningListFun = () => {
  return [
    {
      date: '12:30:12',
      message: '充电桩排队人数过多充电桩排队人数过多',
      area: '南山区充电桩排队人数过多'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多充电桩排队人数过多',
      area: '南山区充电桩排队人数过多'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
    },
    {
      date: '12:30:12',
      message: '充电桩排队人数过多',
      area: '南山区'
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
      img: rate,
      num: data?.useRate + '%',
      name: '整体使用率',
      classStyleType: 'leftRightStyleGreen'
    },
    {
      img: num,
      num: data?.useCount,
      unit: '次',
      name: '使用次数',
      classStyleType: 'leftRightStyleYellow'
    }
  ];
};

export const linePowerDataFun = (data = []) => {
  const yearMonthDay = dayjs().format('YYYY-MM-DD ');
  return [
    {
      data: data.map((item) => [yearMonthDay + item.time, item.power]),
      type: 'line',
      smooth: true,
      name: '实时功率'
    }
  ];
};
