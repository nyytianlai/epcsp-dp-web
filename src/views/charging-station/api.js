import request from '@sutpc/axios';
import dayjs from 'dayjs';
const timeParams = () => ({
  startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
});
const timeOnNow = () => ({
  startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
});
// 总览上面4个指标
export const overTotalCount = () => {
  return request.get({
    url: '/dp/api/v1/overview/overTotalCount'
  });
};
//充电设施总量
export const totalFacilities = () => {
  return request.get({
    url: '/dp/api/v1/overview/totalFacilities'
  });
};
// 充电桩总量：pile，充电枪总量：gun
export const totalEquipment = (data) => {
  return request.post({
    url: '/dp/api/v1/overview/totalEquipment',
    data
  });
};
//运营企业年度TOP10-充电桩:pile,充电枪:gun,充电站:station
export const stationOpeTop10 = (type) => {
  return request.post({
    url: '/dp/api/v1/overview/stationOpeTop10',
    data: {
      type
    }
  });
};
//地图柱状图 区
export const getRectBar = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectChargeEquipmentByArea'
  });
};
//地图柱状图 街道
export const getRectBarByStreet = (areaCode) => {
  return request.post({
    url: '/dp/api/v1/equipmentManage/selectStreetChargeEquipmentByAreaCode',
    data: {
      areaCode
    }
  });
};
// //地图柱状图 街道
// export const getRectBarByStreet = (streetId) => {
//   return request.post({
//     url: '/dp/api/v1/equipmentManage/selectStationInfoByStreetId',
//     data: {
//       streetId
//     }
//   });
// };
//地图热力图
export const getHeatMap = () => {
  return request.get({
    url: 'dp/api/v1/overview/areaPower'
  });
};
//今日-充电桩/充电枪信息充电桩:pile,充电枪:gun
export const dayEquInfo = (type) => {
  return request.post({
    url: '/dp/api/v1/overview/dayEquInfo',
    data: {
      type,
      ...timeOnNow()
    }
  });
};

// 今日充电功率信息
export const dayPower = () => {
  return request.post({
    url: '/dp/api/v1/overview/dayPower',
    data: {
      ...timeOnNow()
    }
  });
};

// 今日告警统计数据
export const alarmCount = () => {
  return request.post({
    url: '/dp/api/v1/overview/alarmCount',
    data: {
      ...timeOnNow()
    }
  });
};

//今日告警信息 /dp/api/v1/overview/alarmInfo
export const alarmInfo = (params) => {
  return request.post({
    url: '/dp/api/v1/overview/alarmInfo',
    data: {
      ...timeOnNow(),
      ...params
    }
  });
};

// /dp/api/v1/overview/timePowerGraph 实时功率图表
export const timePowerGraph = () => {
  return request.post({
    url: '/dp/api/v1/overview/timePowerGraph',
    data: {
      ...timeParams()
    }
  });
};

// 总览-运营商企业排名列表
export const operatorInfoList = (data) => {
  return request.post({
    url: '/dp/api/v1/operator/overview/operatorInfoList',
    data
  });
};
// 总览-运营商基本信息
export const operatorBasicInfo = (data) => {
  return request.post({
    url: '/dp/api/v1/operator/overview/operatorBasicInfo',
    data
  });
};
// 充电设施
export const equInfo = (data) => {
  return request.post({
    url: '/dp/api/v1/operator/overview/equInfo',
    data
  });
};
// 充电设施列表
export const stationInfoList = (data) => {
  return request.post({
    url: '/dp/api/v1/operator/overview/stationInfoList',
    data
  });
};
