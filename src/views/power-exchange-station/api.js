import request from '@sutpc/axios';
import { mapRequestCancelId } from '@/global/config/map';

//充换电柜区柱状图
export const getDistrictBar = () => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/powerStation/stationCountAreaMap',
    cancelId: mapRequestCancelId
  });
};
//充换电柜街道柱状图
export const getStreetBar = (data) => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/powerStation/stationCountStreetMap',
    data,
    cancelId: mapRequestCancelId
  });
};
//充换电柜街道撒点
export const getStreetPoint = (data) => {
  request.cancel(mapRequestCancelId);
  return request.post({
    url: '/powerStation/stationLocationInfo',
    data,
    cancelId: mapRequestCancelId
  });
};