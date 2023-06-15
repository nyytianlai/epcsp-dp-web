import request from '@sutpc/axios';
//光伏区柱状图
export const getDistrict = () => {
  return request.post({
    url: '/photovoltaic/photovoltaicAreaMap'
  });
};
//光伏街道柱状图
export const getStreet = (data) => {
  return request.post({
    url: '/photovoltaic/photovoltaicStreetMap',
    data
  });
};
//光伏街道撒点
export const getPoint = (data) => {
  return request.post({
    url: '/photovoltaic/photovoltaicLocationInfo',
    data
  });
};
