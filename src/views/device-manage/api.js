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
export const selectChargeCountByArea = (data) => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectChargeCountByArea',
    data
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
// 设备管理/充电站设施列表分页
export const selectStationInfoByPage = (data) => {
  return request.post({
    url: '/dp/api/v1/equipmentManage/selectStationInfoByPage',
    data: data
  });
};
