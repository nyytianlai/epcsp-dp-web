/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-19 17:53:02
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-20 15:06:18
 * @FilePath: \epcsp-dp-web\src\api\publicService.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@sutpc/axios';
// 热门充电站TOP10
export const hotCharging = () => {
    return request.get({
        url: '/massService/queryStatisticsLeftOperatorToMonthChargingSum'
      })
}

// 右下-本月日均利用率
export const monthRate = () => {
    return request.get({
        url: '/massService/queryStatisticsLeftAreaToMonthUseRatio'
      })
}
// 大屏-公众服务-市民反馈，调取/personFeedback/query 中台默认接口
export const personFeedback = () => {
  return request.get({
      url: '/personFeedback/query'
    })
}
// 设备管理/标题下四个统计数 实时设备信息统计
export const selectChargeEquipmentStatistics = () => {
  return request.get({
      url: '/dp/api/v1/equipmentManage/selectChargeEquipmentStatistics'
    })
}