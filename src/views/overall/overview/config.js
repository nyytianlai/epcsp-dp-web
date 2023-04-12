import cdzzl from '@/assets/images/overall/cdzzl.png';
import xnyqczl from '@/assets/images/overall/xnyqczl.png';
import yjryyqyzl from '@/assets/images/overall/yjryyqyzl.png';

import zlcd from '@/assets/images/overall/zlcd.png';
import jlcd from '@/assets/images/overall/jlcd.png';
import fast from '@/assets/images/overall/fast.png';
import slow from '@/assets/images/overall/slow.png';
import speed from '@/assets/images/overall/speed.png';
import v2g from '@/assets/images/overall/v2g.png';

export const cdsszlFun = () => {
  return [
    {
      img: cdzzl,
      num: 6399,
      unit: '个',
      name: '充电站总量'
    },
    {
      img: xnyqczl,
      num: 201,
      unit: '个',
      name: '已接入运营企业总量'
    },
    {
      img: yjryyqyzl,
      num: 48,
      unit: '万辆',
      name: '新能源汽车总量'
    }
  ];
};

export const projectListFun = () => {
  return [
    {
      num: 6399,
      unit: '个',
      name: '充电站总量'
    },
    {
      num: 201,
      unit: '个',
      name: '已接入运营企业总量'
    },
    {
      num: 48,
      unit: '个',
      name: '新能源汽车总量'
    },
    {
      num: 201,
      unit: '个',
      name: '已接入运营企业总量'
    },
    {
      num: 48,
      unit: '个',
      name: '新能源汽车总量'
    }
  ];
};

export const tabDataFun = () => {
  return [
    {
      code: 1,
      label: '充电桩总量'
    },
    {
      code: 2,
      label: '充电枪总量'
    }
  ];
};

export const pageNumFun = () => {
  return [
    {
      name: '累计充电量',
      num: 7.4,
      unit: '亿元'
    },
    {
      name: '累计充电次数',
      num: 1703.63,
      unit: '万次'
    },
    {
      name: '累计充电时长',
      num: 2017.22,
      unit: '小时'
    },
    {
      name: '本年充电总量',
      num: 7.4,
      unit: '亿度'
    }
  ];
};

export const pileChargerFun = (code = 1) => {
  if (code === 1) {
    return [
      {
        img: zlcd,
        num: 28529,
        unit: '个',
        name: '直流桩总量'
      },
      {
        img: jlcd,
        num: 63279,
        unit: '个',
        name: '交流桩总量'
      },
      {
        img: fast,
        num: 33256,
        unit: '个',
        name: '快充桩总量'
      },
      {
        img: slow,
        num: 58552,
        unit: '个',
        name: '慢充桩总量'
      },
      {
        img: speed,
        num: 63279,
        unit: '个',
        name: '超充桩总量'
      },
      {
        img: v2g,
        num: 58552,
        unit: '个',
        name: 'V2G桩总量'
      }
    ];
  } else {
    return [
      {
        img: zlcd,
        num: 28529,
        unit: '个',
        name: '直流枪总量'
      },
      {
        img: jlcd,
        num: 63279,
        unit: '个',
        name: '交流枪总量'
      },
      {
        img: fast,
        num: 33256,
        unit: '个',
        name: '快充枪总量'
      },
      {
        img: slow,
        num: 58552,
        unit: '个',
        name: '慢充枪总量'
      },
      {
        img: speed,
        num: 63279,
        unit: '个',
        name: '超充枪总量'
      },
      {
        img: v2g,
        num: 58552,
        unit: '个',
        name: 'V2G枪总量'
      }
    ];
  }
};

export const operatingTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电站'
    },
    {
      code: 2,
      label: '充电桩'
    },
    {
      code: 3,
      label: '充电枪'
    }
  ];
};

export const todayTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电桩信息'
    },
    {
      code: 2,
      label: '充电枪信息'
    }
  ];
};

export const todayInfoNumDataFun = () => {
  return [
    {
      img: cdzzl,
      num: 6399,
      unit: '个',
      name: '充电站总量'
    },
    {
      img: xnyqczl,
      num: 201,
      unit: '个',
      name: '已接入运营企业总量'
    },
    {
      img: yjryyqyzl,
      num: 48,
      unit: '万辆',
      name: '新能源汽车总量'
    }
  ];
};
