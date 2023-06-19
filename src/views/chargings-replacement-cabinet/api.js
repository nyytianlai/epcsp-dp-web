import request from '@sutpc/axios';
//充换电柜区柱状图
export const getDistrictBar = () => {
  return request.post({
    url: '/chargingCabinet/cabinetCountAreaMap'
  });
};
//充换电柜街道柱状图
export const getStreetBar = (data) => {
  return request.post({
    url: '/chargingCabinet/cabinetCountStreetMap',
    data
  });
};
//充换电柜街道撒点
export const getStreetPoint = (data) => {
  return request.post({
    url: '/chargingCabinet/cabinetLocationInfo',
    data
  });
};
//充换电柜总量统计
export const totalStatistics = () => {
  return request.post({
    url: '/chargingCabinet/totalStatistics',
  });
};
//充换电柜总量统计
export const typeAndNumber = () => {
  return request.post({
    url: '/chargingCabinet/typeAndNumber',
  });
};
