/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-19 10:48:39
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-19 15:35:46
 * @FilePath: \epcsp-dp-web\src\api\deviceManage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@sutpc/axios';
// 地图区级下钻撒点
// export const getQuStation = (areaCode) => {
//   return request.post({
//     url: '/dp/api/v1/equipmentManage/selectChargeStationByAreaCode',
//     data: {
//       areaCode
//     }
//   });
// };
// 地图区级下钻撒点
export const getJdStation = (streetId) => {
  return request.post({
    url: '/dp/api/v1/equipmentManage/selectStationInfoByStreetId',
    data: {
      streetId
    }
  });
};
// 设备管理/充电桩数量 /dp/api/v1/equipmentManage/selectChargeCount
export const selectChargeCount = (data) => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectChargeCount',
    data
  });
};
// 设备管理/充电高峰区域情况 /dp​/api​/v1​/equipmentManage​/selectChargeCountByArea
export const selectChargeCountByArea = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectChargeCountByArea'
  });
};

//设备管理/标题下四个统计数 /dp/api/v1/equipmentManage/selectChargeEquipmentStatistics
export const selectChargeEquipmentStatistics = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectChargeEquipmentStatistics'
  });
};

// 设备管理/充电站数字孪生 /dp/api/v1/equipmentManage/selectHrStationInfo
export const selectHrStationInfo = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectHrStationInfo'
  });
};

// 设备管理/在线运行状态情况 /dp/api/v1/equipmentManage/selectPowerSumByDayTime
export const selectPowerSumByDayTime = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectPowerSumByDayTime'
  });
};

// 设备管理/充电桩-枪状态，equipmentType:类型-1：充电桩；2：充电枪；3：充电站 /dp/api/v1/equipmentManage/selectChargeEquipmentStatus
export const selectChargeEquipmentStatus = (equipmentType) => {
  return request.post({
    url: '/dp/api/v1/equipmentManage/selectChargeEquipmentStatus',
    data: {
      equipmentType
    }
  });
};

//设备管理/充电桩-枪状态分时列表，equipmentType:类型-1：充电桩；2：充电枪；3：充电站 /dp/api/v1/equipmentManage/selectChargeEquipmentStatusByTime
export const selectChargeEquipmentStatusByTime = (equipmentType) => {
  return request.post({
    url: '/dp/api/v1/equipmentManage/selectChargeEquipmentStatusByTime',
    data: {
      equipmentType
    }
  });
};

// 运行情况 /dp/api/v1/equipmentManage/selectChargeEquipmentUseRate 类型-1：充电桩；2：充电枪；3：充电站
export const selectChargeEquipmentUseRate = (equipmentType) => {
  return request.post({
    url: '/dp/api/v1/equipmentManage/selectChargeEquipmentUseRate',
    data: {
      equipmentType
    }
  });
};

//运行情况分时列表，equipmentType:类型-1：充电桩；2：充电枪；3：充电站 /dp/api/v1/equipmentManage/selectChargeEquipmentStatusByTime
export const selectChargeEquipmentUseRateByTime = (equipmentType) => {
  return request.post({
    url: '/dp/api/v1/equipmentManage/selectChargeEquipmentUseRateByTime',
    data: {
      equipmentType
    }
  });
};
