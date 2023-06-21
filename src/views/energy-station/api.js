import request from '@sutpc/axios';
import { mapRequestCancelId } from '@/global/config/map';

//储能站区柱状图
export const getDistrictBar = () => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/energyStorage/areaMap',
    cancelId: mapRequestCancelId
  });
};
//储能站街道柱状图
export const getStreetBar = (data) => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/energyStorage/streetMap',
    data,
    cancelId: mapRequestCancelId
  });
};
//储能站街道撒点
export const getStreetPoint = (data) => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/energyStorage/locationInfo',
    data,
    cancelId: mapRequestCancelId
  });
};
//站点容量排名
export const capacityRanking = () => {
  return request.post({
    url: '/energyStorage/capacityRanking',
  });
};