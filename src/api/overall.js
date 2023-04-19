/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 15:15:30
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-18 16:11:59
 * @FilePath: \epcsp-dp-web\src\api\overall.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@sutpc/axios';

// 总览上面4个指标
export const overTotalCount = () => {
  return request.get({
    url: '/dp/api/v1/overview/overTotalCount'
  });
};
//充电设施总量
export const totalFacilities = () => {
  return request.get({
    url: '/dp/api/v1/overview/totalFacilities'
  });
};
// 充电桩总量：pile，充电枪总量：gun
export const totalEquipment = (type) => {
  return request.post({
    url: '/dp/api/v1/overview/totalEquipment',
    data: {
      type
    }
  });
};
//运营企业年度TOP10-充电桩:pile,充电枪:gun,充电站:station
export const stationOpeTop10 = (type) => {
  return request.post({
    url: '/dp/api/v1/overview/stationOpeTop10',
    data: {
      type
    }
  });
};
//地图柱状图
export const getRectBar = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectChargeEquipmentByArea',
  });
};
