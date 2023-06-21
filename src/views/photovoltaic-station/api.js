import request from '@sutpc/axios';
import { mapRequestCancelId } from '@/global/config/map';

//光伏区柱状图
export const getDistrict = () => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/photovoltaic/photovoltaicAreaMap',
    cancelId: mapRequestCancelId
  });
};
//光伏街道柱状图
export const getStreet = (data) => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/photovoltaic/photovoltaicStreetMap',
    data,
    cancelId: mapRequestCancelId
  });
};
//光伏街道撒点
export const getPoint = (data) => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/photovoltaic/photovoltaicLocationInfo',
    data,
    cancelId: mapRequestCancelId
  });
};
//站点容量排名
export const capacityRanking = () => {
  return request.post({
    url: '/photovoltaic/capacityRanking',

  });
};

//光伏站数量排名
export const projectRanking = () => {
  return request.post({
    url: '/photovoltaic/projectRanking',
  });
};
