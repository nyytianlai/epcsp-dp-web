
import request from '@sutpc/axios';
// /dp/api/v1/equipmentManageDetail/selectEquipmentDynamicInfo 设备详情/桩枪动态信息
export const selectEquipmentDynamicInfo = (params) => {
    return request.post({
        url: '/dp/api/v1/equipmentManageDetail/selectEquipmentDynamicInfo',
        data: params
      })
}
  
  // /dp/api/v1/equipmentManageDetail/selectEquipmentDynamicInfoGroupByTime设备详情/桩枪动态信息分时列表
export const selectEquipmentDynamicInfoGroupByTime = (params) => {
    return request.post({
        url: '/dp/api/v1/equipmentManageDetail/selectEquipmentDynamicInfoGroupByTime',
        data: params
      })
}
  
// /dp/api/v1/equipmentManageDetail/selectEquipmentInfoByEquipmentId 设备详情/桩基本信息
export const selectEquipmentInfoByEquipmentId = (params) => {
    return request.post({
        url: '/dp/api/v1/equipmentManageDetail/selectEquipmentInfoByEquipmentId',
        data: params
      })
}
  
// /dp/api/v1/equipmentManageDetail/selectEquipmentAlarmByPage设备详情/根据桩号查询告警信息分页
export const selectEquipmentAlarmByPage = (params) => {
    return request.post({
        url: '/dp/api/v1/equipmentManageDetail/selectEquipmentAlarmByPage',
        data: params
      })
  }
// 告警
  export const selectEquipmentWarningInfoByEquipmentId = (params) => {
    return request.post({
        url: '/dp/api/v1/equipmentManageDetail/selectEquipmentWarningInfoByEquipmentId',
        data: params
      })
  }