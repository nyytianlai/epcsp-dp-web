/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-19 10:48:39
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-19 11:29:04
 * @FilePath: \epcsp-dp-web\src\api\deviceManage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@sutpc/axios';
// 设备管理/充电桩数量 /dp/api/v1/equipmentManage/selectChargeCount
export const selectChargeCount = () => {
    return request.get({
        url: '/dp/api/v1/equipmentManage/selectChargeCount'
      })
}
// 设备管理/充电高峰区域情况 /dp​/api​/v1​/equipmentManage​/selectChargeCountByArea
export const selectChargeCountByArea = () => {
    return request.get({
        url: '/dp/api/v1/equipmentManage/selectChargeCountByArea'
      })
}

//设备管理/标题下四个统计数 /dp/api/v1/equipmentManage/selectChargeEquipmentStatistics 
export const selectChargeEquipmentStatistics = () => {
    return request.get({
        url: '/dp/api/v1/equipmentManage/selectChargeEquipmentStatistics'
      })
}