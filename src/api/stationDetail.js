/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-19 17:24:43
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-26 16:34:37
 * @FilePath: \epcsp-dp-web\src\api\stationDetail.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

//设备详情/摄像头信息，stationId:站点id，operatorId:运营商id
export const selectCameraByStationId = (params) => {
  return request.post({
      url: '/dp/api/v1/equipmentManageDetail/selectCameraByStationId',
      data: params
    })
}