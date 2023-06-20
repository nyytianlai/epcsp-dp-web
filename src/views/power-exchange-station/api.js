import request from '@sutpc/axios';
//充换电柜区柱状图
export const getDistrictBar = () => {
  return request.post({
    url: '/powerStation/stationCountAreaMap'
  });
};
//充换电柜街道柱状图
export const getStreetBar = (data) => {
  return request.post({
    url: '/powerStation/stationCountStreetMap',
    data
  });
};
//充换电柜街道撒点
export const getStreetPoint = (data) => {
  return request.post({
    url: '/powerStation/stationLocationInfo',
    data
  });
};