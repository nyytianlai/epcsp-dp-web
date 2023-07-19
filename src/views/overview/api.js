import request from '@sutpc/axios';
import { mapRequestCancelId } from '@/global/config/map';

// 数字孪生站点
export const selectHrStationInfoForOverview = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectHrStationInfoForOverview'
  });
};
// 新能源汽车充电站
export const chargingStation = () => {
  return request.get({
    url: '/overviews/all/chargingStation'
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
