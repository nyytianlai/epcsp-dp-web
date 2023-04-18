import charging from '@/assets/images/stationDetail/charging.png'
import camera from '@/assets/images/stationDetail/camera.png'
import dLock from '@/assets/images/stationDetail/dLock.png'
import rate from '@/assets/images/stationDetail/rate.png';
import num from '@/assets/images/stationDetail/num.png';
import dayjs from 'dayjs';
export const pageNumFun = () => {
    return [
      {
        name: '站点充电量',
        num: 7.4,
        unit: 'kwh'
      },
      {
        name: '站点充电次数',
        num: 1703.63,
        unit: '次'
      },
      {
        name: '站点充电时长',
        num: 2017.22,
        unit: '小时'
      },
      {
        name: '站点故障次数',
        num: 7.4,
        unit: '次'
      }
    ];
};
  
export const deviceInfoDataFun = () => {
      return [
        {
          img: charging,
          num: 28529,
          name: '充电桩/个'
        },
        {
          img: camera,
          num: 63279,
          name: '摄像头/个'
        },
        {
          img: charging,
          num: 33256,
          name: '充电枪/个'
        },
        {
          img: dLock,
          num: 58552,
          name: '地锁/个'
        }
      ];
    
};
  
export const warningTabsDataFun = () => {
    return [
      {
        label: '一级人身安全',
        icon: 'first-level',
        num: 100000000,
        code: 1,
        color: '#FA2A2D'
      },
      {
        label: '二级设备安全',
        icon: 'second-level',
        num: 1090,
        code: 2,
        color: '#FF7500'
      },
      {
        label: '三级告警提示',
        icon: 'third-level',
        num: 549,
        code: 3,
        color: '#FFBF00'
      },
    ]
  }
  
  export const warningListFun = () => {
    return [
      {
        date: '12:30:12',
        message: '充电桩排队人数过多充电桩排队人数过多',
        area:'南山区充电桩排队人数过多'
      },
      {
        date: '12:30:12',
        message: '充电桩排队人数过多',
        area:'南山区'
      },
      {
        date: '12:30:12',
        message: '充电桩排队人数过多',
        area:'南山区'
      },
      {
        date: '12:30:12',
        message: '充电桩排队人数过多',
        area:'南山区'
      },
      {
        date: '12:30:12',
        message: '充电桩排队人数过多',
        area:'南山区'
      },
      {
        date: '12:30:12',
        message: '充电桩排队人数过多充电桩排队人数过多',
        area:'南山区充电桩排队人数过多'
      },
      {
        date: '12:30:12',
        message: '充电桩排队人数过多',
        area:'南山区'
      },
      {
        date: '12:30:12',
        message: '充电桩排队人数过多',
        area:'南山区'
      },
      {
        date: '12:30:12',
        message: '充电桩排队人数过多',
        area:'南山区'
      },
      {
        date: '12:30:12',
        message: '充电桩排队人数过多',
        area:'南山区'
      }
    ]
}
  
export const chargingTypesTabsFun = ()=>{
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
}
  
export const chargingTypesFun = ()=>{
    return [
      {
        img: rate,
        num: '16%',
        name: '整体使用率',
        classStyleType:'leftRightStyleGreen'
      },
      {
        img: num,
        num: 655,
        unit: '次',
        name: '使用次数',
        classStyleType:'leftRightStyleYellow'
      }
    ];
}
const timeData = ()=>(new Array(25).fill(0)).map((item,index)=>[dayjs().hour(index).format('YYYY-MM-DD HH:00'),Math.ceil(Math.random() * 100)])

export const linePowerDataFun = () => {
    return [{
        data:timeData(),
        type: 'line',
        smooth: true,
        name:'实时功率'
      }]
}