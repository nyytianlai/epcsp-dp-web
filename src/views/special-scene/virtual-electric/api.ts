/*
 * @Author: niyayong@sutpc.com
 * @Date: 2024-08-13 14:31:47
 * @LastEditors: niyayong@sutpc.com
 * @LastEditTime: 2024-08-14 17:16:13
 * @Description:
 * @FilePath: /epcsp-dp-web/src/views/special-scene/virtual-electric/api.ts
 */
import request, { getStaticFile } from '@sutpc/axios';
import { mapRequestCancelId } from '@/global/config/map';
export default {
  // 左上方-资源接入总览
  resourceAccessOverview() {
    return request.post({
      url: '/virtualPowerPlant/resourceAccessOverview',
      data: {}
    });
  },
  // 左中-资源分布占比
  resourceDistribution() {
    return request.post({
      url: '/virtualPowerPlant/resourceDistribution',
      data: {}
    });
  },
  // 左下方-可调容量区域分布 -地图
  adjustableCapacityDistribution(data = {}) {
    return request.post({
      url: '/virtualPowerPlant/adjustableCapacityDistribution',
      data
    });
  },
  // 右上-调度运行情况
  dispatchInfo(data = {}) {
    return request.post({
      url: '/virtualPowerPlant/dispatchInfo',
      data
    });
  },
  // 右中-今日调度总览
  adjustOverview(data = {}) {
    return request.post({
      url: '/virtualPowerPlant/adjustOverview',
      data
    });
  },
  // 右下-实时聚合运行情况
  adjustDemandHourInfo() {
    return request.post({
      url: '/virtualPowerPlant/adjustDemandHourInfo',
      data: {}
    });
  },
  requestGeojsonData(fileName) {
    return getStaticFile(`static/geojson/${fileName}.geojson`);
  }
};
