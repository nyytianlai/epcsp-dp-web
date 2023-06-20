import request from '@sutpc/axios';
// 数字孪生站点
export const selectHrStationInfoForOverview = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectHrStationInfoForOverview',
  });
};
// 新能源汽车充电站
export const chargingStation = () => {
  return request.post({
    url: '/overviews/all/chargingStation',
  });
};

//总览区柱状图
export const getDistrictBar = () => {
  return request.post({
    url: '/overviews/all/areaMap'
  });
};
//总览街道柱状图
export const getStreetBar = (data) => {
  return request.post({
    url: '/overviews/all/streetMap',
    data
  });
};
//总览街道撒点
export const getStreetPoint = (data) => {
  return request.post({
    url: '/overviews/all/stationLocationInfo',
    data
  });
};
//电动自行车
export const totalStatistics = () => {
  return request.post({
    url: '/chargingCabinet/totalStatistics',
  });
};
// 历年数据
export const yearChargingStation = () => {
  return request.post({
    url: '/overviews/all/yearChargingStation',
  });
};