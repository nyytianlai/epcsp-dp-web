import ztsyl from './images/ztsyl.png';

import { merge } from 'lodash';
import dayjs from 'dayjs';
export const pageNumFun = (data = {}) => {
  return [
    {
      name: '累计充电量',
      num: data?.cumulativeCharge,
      unit: '亿度'
    },
    {
      name: '累计充电次数',
      num: data?.cumChargeCount,
      unit: '万次'
    },
    {
      name: '累计充电时长',
      num: data?.cumChargeTime,
      unit: '小时'
    },
    {
      name: '本年充电总量',
      num: data?.yearTotalCharge,
      unit: '亿度'
    }
  ];
};
export const hotChargingDataFun = () => {
  return [
    {
      num: 6399,
      unit: 'KW',
      name: '充电站总量'
    },
    {
      num: 201,
      unit: 'KW',
      name: '已接入运营企业总量'
    },
    {
      num: 48,
      unit: 'KW',
      name: '新能源汽车总量'
    },
    {
      num: 201,
      unit: 'KW',
      name: '已接入运营企业总量'
    },
    {
      num: 48,
      unit: 'KW',
      name: '新能源汽车总量'
    }
  ]; 
}

export const deviceDataFun = (data={}) => {
  return [
    {
      img: ztsyl,
      num: data?.equipmentCount,
      name: '充电桩总数/个',
      classStyleType:'leftRightStyleGreen6656'
    },
    {
      img: ztsyl,
      num: data?.gunCount,
      name: '充电枪总数/个',
      classStyleType:'leftRightStyleGreen6656'
    }
  ];
}

export const chargingTypesTabsFun = ()=>{
  return [
    {
      code: 'pile',
      label: '充电桩'
    },
    {
      code: 'gun',
      label: '充电枪'
    }
  ];
}

export const chargingTypePieDataFun = (code = 'pile',data={})=>{
  if(code === 'pile'){
    return [
      { value: data?.offLine, name: '离线',extraName:'离线充电桩', unit: '个' },
      { value: data?.occupy, name: '占用', extraName:'占用充电桩',unit: '个' },
      { value: data?.malfunction, name: '故障',  extraName:'故障充电桩',unit: '个' },
      { value: data?.free, name: '闲置',  extraName:'闲置充电桩',unit: '个' }
    ]
  }else{
    return [
      { value: data?.offLine, name: '离线',extraName:'离线充电枪', unit: '个' },
      { value: data?.occupy, name: '占用', extraName:'占用充电枪',unit: '个' },
      { value: data?.malfunction, name: '故障',  extraName:'故障充电枪',unit: '个' },
      { value: data?.free, name: '闲置',  extraName:'闲置充电枪',unit: '个' }
    ]
  }
}

export const monthRateDataFun = () => {
  return [
    {
      num: 6399,
      unit: '个',
      name: '南山区'
    },
    {
      num: 201,
      unit: '个',
      name: '宝安区'
    },
    {
      num: 48,
      unit: '个',
      name: '罗湖区'
    },
    {
      num: 201,
      unit: '个',
      name: '龙华区'
    },
    {
      num: 48,
      unit: '个',
      name: '龙岗区'
    },
    {
      num: 6399,
      unit: '个',
      name: '南山区'
    },
    {
      num: 201,
      unit: '个',
      name: '宝安区'
    },
    {
      num: 48,
      unit: '个',
      name: '罗湖区'
    },
    {
      num: 201,
      unit: '个',
      name: '龙华区'
    },
    {
      num: 48,
      unit: '个',
      name: '大鹏新区'
    },
  ];
}
export const chargingStationTabsFun = () => {
  return [
    {
      code: 1,
      label: '充电功率'
    },
    {
      code: 2,
      label: '充电次数'
    }
  ];
};

export const columnDataHotFun = () => {
  return [
    {
      prop: 'stationName',
      label: '充电站名称',
      minWidth: 2.8
    },
    {
      prop: 'operatorName',
      label: '运营企业名称',
      minWidth: 2,
    },
    {
      prop: 'areaName',
      label: '所属区域',
      minWidth:1,
      filterMultiple: true
    },
    {
      prop: 'power',
      label: '充电功率',
      minWidth: '2',
      sortable: 'custom',
      sortOrders: ['ascending','descending']
    },
    {
      prop: 'amount',
      label: '充电次数',
      minWidth: 2,
      sortable: 'custom',
      sortOrders: ['ascending','descending']
    },
  ]
}
// 数据过滤的选项
export const  filters =[
  {
    id: 1,
    label: '全部',
    children:[
      {
        id: 440303,
        label: '罗湖区',
      },
      {
        id: 440304,
        label: '福田区',
      },
      {
        id: 440305,
        label: '南山区',
      },
      {
        id: 440306,
        label: '宝安区',
      },
      {
        id: 440307,
        label: '龙岗区',
      },
      {
        id: 440308,
        label: '盐田区',
      },
      {
        id: 440309,
        label: '龙华区',
      },
      {
        id: 440310,
        label: '坪山区',
      },
      {
        id: 440311,
        label: '光明区',
      },
      {
        id: 440343,
        label: '大鹏新区',
      },
      {
        id: 441521,
        label: '深汕特别合作区',
      },
    ]
  }
]
export const ecOptionFun = (data=[], xaxis = [])=>{
  xaxis = xaxis.map(i=>{
     return {value: i,textStyle: { overflow:'break',width: 100}}
    })
  return {
    grid: {
      top: 30,
      bottom: 24,
      right: 5,
      left: 30
    },
    legend: {
      itemWidth: 16,
      itemHeight: 10,
      right: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Source Han Sans CN',
        fontSize: 14,
        color: '#FFF',
      },
      itemStyle:{
        color: 'rgba(19,171,194, 0.8)'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 163, 255, 0.5)',
      borderWidth: 0,
      textStyle: {
        color: '#fff'
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: xaxis,
      
      boundaryGap: ['2%', '2%'],
      axisLine: {
        lineStyle: {
          color: '#BAE7FF'
        }
      },
      axisTick: {
        show:false,

      },
      axisLabel: {
        fontFamily: 'Source Han Sans CN',
        fontSize: 12,
        lineHeight: 18,
        color: '#FFF',
        interval:0,
      },
      splitLine: {
        show: false
      },
    },
    yAxis: {
      type: 'value',
      name: '单位/个',
      minInterval:1,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 16,
        color: '#B4C0CC',
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
        data: data,
        type: 'bar',
        name: '问题数量',
        label: {
          show: true,
          position: 'top',
          fontSize: 14,
          fontfamily: 'Helvetica',
          color: '#fff'
        },
        itemStyle: {
          color:()=>{
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: '#13ABC2',
              },
              {
                offset: 0,
                color: 'rgba(0, 163, 255, 0.000001)',
              },
            ])
          }
        }
      },
        {
          // 顶部
          tooltip: {
            show: false
          },
          type: 'pictorialBar',
          itemStyle: {
            // 顶部
            color: '#13ABC2'
          },
          symbol: 'rect',
          symbolSize: ['100%', '3'],
          symbolPosition: 'end',
          data: data,
          z: 3
        },
    ]
  }
}
export const columnDataDetailFun = ()=>{
  return [
    {
      prop: 'stationName',
      label: '充电站名称',
      minWidth: 2
    },
    {
      prop: 'operatorName',
      label: '运营企业名称',
      minWidth: 2,
    },
    {
      prop: 'problemType',
      label: '问题类型',
      minWidth:1,
      filterMultiple: true
    },
    {
      prop: 'problemDescribe',
      label: '问题描述',
      minWidth: '2',
    },
    {
      prop: 'principal',
      label: '负责人',
      minWidth: 1,
    },
    {
      prop: 'phone',
      label: '联系电话',
      minWidth: 1.5,
    },
    {
      prop: 'timeDim',
      label: '时间',
      minWidth: 1.2,
    },
  ]
}
// 市民问题类型
export const  filtersDetail =[
  {
    id: 'all',
    label: '全部',
    children:[
      {
        id: '有车站位',
        label: '有车站位',
      },
      {
        id: '桩位不放开',
        label: '桩位不放开',
      },
      {
        id: '无法充电',
        label: '无法充电',
      },
      {
        id: '找不到电桩',
        label: '找不到电桩',
      },
      {
        id: '其他',
        label: '其他',
      },
    ]
  }
]