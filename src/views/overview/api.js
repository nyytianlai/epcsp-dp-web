import request from '@sutpc/axios';
import { mapRequestCancelId } from '@/global/config/map';

// 数字孪生站点
export const selectHrStationInfoForOverview = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectHrStationInfoForOverview'
  });
};
// 新能源汽车充电站
// export const chargingStation = () => {
//   return request.get({
//     url: '/overviews/all/chargingStation'
//   });
// };

export const chargingStation = () => {
  return request.get({
    url: '/dp/api/v1/overview/getOverviewStationStatistics'
  });
};

//总览区柱状图
export const getDistrictBar = () => {
  request.cancel(mapRequestCancelId);
  return request.get({
    url: '/overviews/all/areaMap',
    cancelId: mapRequestCancelId
  });
};
//总览街道柱状图
export const getStreetBar = (data) => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/overviews/all/streetMap',
    data,
    cancelId: mapRequestCancelId
  });
};
//总览街道撒点
export const getStreetPoint = (data) => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/overviews/all/stationLocationInfo',
    data,
    cancelId: mapRequestCancelId
  });
};
//电动自行车
export const totalStatistics = () => {
  return request.get({
    url: '/chargingCabinet/totalStatistics'
  });
};
// 历年数据
export const yearChargingStation = () => {
  return request.get({
    url: '/overviews/all/yearChargingStation'
  });
};

// 超充站列表
export const getSuperChargeStationStatistics = () => {
  return request.get({
    url: '/dp/api/v1/overview/getSuperChargeStationStatistics'
  });
};
// v2G站列表
export const getV2GStationStatistics = () => {
  return request.get({
    url: '/dp/api/v1/overview/getV2GStationStatistics'
  });
};
// 欧标站列表
export const getEuStandardStationStatistics = (data) => {
  return request.post({
    url: '/dp/api/v1/overview/getEuStandardStationStatistics',
    data
  });
};

// 储能站列表
export const getEnergyStorageStationStatistics = (data) => {
  return request.post({
    url: '/dp/api/v1/overview/getEnergyStorageStationStatistics',
    data
  });
};
// 光伏站列表
export const getPhotovoltaicStationStatistics = () => {
  return request.get({
    url: '/dp/api/v1/overview/getPhotovoltaicStationStatistics'
  });
};

// 按行政区 充电站行政区 充电场站数量 登记枪数 动态接入枪 动态接入率 v2g桩数量 v2g站点数 超充站 运营商数量
export const getOverviewStationStatisticsByArea = () => {
  return request.get({
    url: '/dp/api/v1/overview/getOverviewStationStatisticsByArea'
  });
};
