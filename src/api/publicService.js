/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-19 17:53:02
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-19 18:29:12
 * @FilePath: \epcsp-dp-web\src\api\publicService.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@sutpc/axios';
// 总览上面4个指标
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
