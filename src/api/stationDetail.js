import request from '@sutpc/axios';
// 设备详情/标题下四个统计数，stationId:站点id，operatorId:运营商id
export const selectStationStatistics = (params) => {
    return request.post({
        url: '/dp/api/v1/equipmentManageDetail/selectStationStatistics',
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