import request from '@sutpc/axios';
//储能站区柱状图
export const getDistrictBar = () => {
  return request.post({
    url: '/energyStorage/areaMap'
  });
};
//储能站街道柱状图
export const getStreetBar = (data) => {
  return request.post({
    url: '/energyStorage/streetMap',
    data
  });
};
//储能站街道撒点
export const getStreetPoint = (data) => {
  return request.post({
    url: '/energyStorage/locationInfo',
    data
  });
};
