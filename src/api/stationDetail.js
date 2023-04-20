import request from '@sutpc/axios';
// 设备详情/标题下四个统计数，stationId:站点id，operatorId:运营商id
export const selectStationStatistics = (params) => {
    return request.post({
        url: '/dp/api/v1/equipmentManageDetail/selectStationStatistics',
        data: params
      })
}

// 设备详情/站点信息
export const selectStationInfoByStationId = (params) => {
  return request.post({
      url: '/dp/api/v1/equipmentManageDetail/selectStationInfoByStationId',
      data: params
    })
}

// 设备详情/设备设施信息
export const selectEquipmentCountByStationId = (params) => {
    return request.post({
        url: '/dp/api/v1/equipmentManageDetail/selectEquipmentCountByStationId',
        data: params
      })
}

//设备详情/告警信息列表
export const selectWarningInfoByStationId = (params) => {
  return request.post({
      url: '/dp/api/v1/equipmentManageDetail/selectWarningInfoByStationId',
      data: params
    })
}
//设备详情/站点充电桩状态
export const selectEquipmentStatusByStationId = (params) => {
  return request.post({
      url: '/dp/api/v1/equipmentManageDetail/selectEquipmentStatusByStationId',
      data: params
    })
}

//设备详情/充电设施日使用信息
export const selectEquipmentUseRateByStationId = (params) => {
  return request.post({
      url: '/dp/api/v1/equipmentManageDetail/selectEquipmentUseRateByStationId',
      data: params
    })
}
//设备详情/站点实时功率
export const selectStationRealTimePowerByStationId = (params) => {
  return request.post({
      url: '/dp/api/v1/equipmentManageDetail/selectStationRealTimePowerByStationId',
      data: params
    })
}
//设备详情/告警信息统计
export const selectWarningStatisticByStationId = (params) => {
  return request.post({
      url: '/dp/api/v1/equipmentManageDetail/selectWarningStatisticByStationId',
      data: params
    })
}