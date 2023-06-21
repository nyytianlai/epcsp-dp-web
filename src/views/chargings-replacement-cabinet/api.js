import request from '@sutpc/axios';
import { mapRequestCancelId } from '@/global/config/map';

//充换电柜区柱状图
export const getDistrictBar = () => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/chargingCabinet/cabinetCountAreaMap',
    cancelId: mapRequestCancelId
  });
};
//充换电柜街道柱状图
export const getStreetBar = (data) => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/chargingCabinet/cabinetCountStreetMap',
    data,
    cancelId: mapRequestCancelId
  });
};
//充换电柜街道撒点
export const getStreetPoint = (data) => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/chargingCabinet/cabinetLocationInfo',
    data,
    cancelId: mapRequestCancelId
  });
};
//充换电柜总量统计
export const totalStatistics = () => {
  return request.post({
    url: '/chargingCabinet/totalStatistics',
  });
};
//
export const typeAndNumber = () => {
  return request.post({
    url: '/chargingCabinet/typeAndNumber',
  });
};
