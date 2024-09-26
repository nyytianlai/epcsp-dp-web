import request from '@sutpc/axios';

// 高渲染站点详情/底部菜单栏，stationId:站点id，operatorId:运营商id
export const viewMenuData = (params) => {
  return request.post({
    url: '/dp/api/v1/map/viewMenuData',
    data: params
  });
};

// 设备详情/标题下四个统计数，stationId:站点id，operatorId:运营商id
export const selectStationStatistics = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectStationStatistics',
    data: params
  });
};

// 设备详情/站点信息
export const selectStationInfoByStationId = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectStationInfoByStationId',
    data: params
  });
};

// 设备详情/设备设施信息
export const selectEquipmentCountByStationId = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectEquipmentCountByStationId',
    data: params
  });
};

//设备详情/告警信息列表
export const selectWarningInfoByStationId = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectWarningInfoByStationId',
    data: params
  });
};
//设备详情/站点充电桩状态
export const selectEquipmentStatusByStationId = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectEquipmentStatusByStationId',
    data: params
  });
};

//设备详情/充电设施日使用信息
export const selectEquipmentUseRateByStationId = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectEquipmentUseRateByStationId',
    data: params
  });
};
//设备详情/站点实时功率
export const selectStationRealTimePowerByStationId = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectStationRealTimePowerByStationId',
    data: params
  });
};
//设备详情/告警信息统计
export const selectWarningStatisticByStationId = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectWarningStatisticByStationId',
    data: params
  });
};

//设备详情/摄像头信息，stationId:站点id，operatorId:运营商id
export const selectCameraByStationId = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectCameraByStationId',
    data: params
  });
};

// /dp/api/v1/equipmentManageDetail/selectEquipmentInfoByEquipmentId 设备详情/桩基本信息
export const selectEquipmentInfoByEquipmentId = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectEquipmentInfoByEquipmentId',
    data: params
  });
};

// /dp/api/v1/equipmentManageDetail/selectEquipmentDynamicInfo 设备详情/桩枪动态信息
export const selectEquipmentDynamicInfo = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectEquipmentDynamicInfo',
    data: params
  });
};

// /dp/api/v1/equipmentManageDetail/selectEquipmentDynamicInfoGroupByTime设备详情/桩枪动态信息分时列表
export const selectEquipmentDynamicInfoGroupByTime = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectEquipmentDynamicInfoGroupByTime',
    data: params
  });
};

// /dp/api/v1/equipmentManageDetail/selectEquipmentAlarmByPage设备详情/根据桩号查询告警信息分页
export const selectEquipmentAlarmByPage = (params) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectEquipmentAlarmByPage',
    data: params
  });
};
// 实时告警趋势情况
export const alarmLevelAndTypeByTIme = (param) => {
  return request.post({
    url: '/safetySupervision/stationAlarmStaticsByTime',
    data: {
      ...param
    }
  });
};
// 设备设施信息
export const selectDetailChargeCount = (data) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectDetailChargeCount',
    data
  });
};
// 告警列表
export const getAlarmList = (data) => {
  return request.post({
    url: '/alarmInfo/alarmList',
    data
  });
};
// 运营商响应信息
export const getOperatorResponseInfo = (data) => {
  return request.post({
    url: '/dp/api/v1/operator/getOperatorResponseInfo',
    data
  });
};
// 运营商充电站信息
export const getStationInfoPage = (data) => {
  return request.post({
    url: '/dp/api/v1/operator/getStationInfoPage',
    data
  });
};
// 根据站点id查询枪状态信息
export const connectorStatusInfo = (data) => {
  return request.post({
    url: '/connectorStatusInfo/connectorStatusInfo',
    data
  });
};
// 根据站点id查询枪状态信息
export const selectConnectorStatusByStationId = (data) => {
  return request.post({
    url: '/dp/api/v1/equipmentManageDetail/selectConnectorStatusByStationId',
    data
  });
};
