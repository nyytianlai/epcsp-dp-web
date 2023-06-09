import request from '@sutpc/axios';
// 数字孪生站点
export const selectHrStationInfoForOverview = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectHrStationInfoForOverview',
  });
};