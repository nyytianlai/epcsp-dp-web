import request from '@sutpc/axios';

// 地图区级下钻撒点
export const getQuStation = (areaCode: string) => {
  return request.post({
    url: '/dp/api/v1/equipmentManage/selectChargeStationByAreaCode',
    data: {
      areaCode
    }
  });
};
