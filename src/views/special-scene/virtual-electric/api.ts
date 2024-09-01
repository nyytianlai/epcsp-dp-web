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
  // 右上-虚拟电厂公告
  vppNotice(data = {}) {
    return request.post({
      url: '/virtualPowerPlant/vppNotice',
      data
    });
  },
  // 右上-调度运行情况
  dispatchInfo(data) {
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
  adjustDemandHourInfo(data) {
    return request.post({
      url: '/virtualPowerPlant/adjustDemandHourInfo',
      data
    });
  },
  // 获取中间屏幕时间轴信息
  getVppAdjustTime(data) {
    return request.post({
      url: '/virtualPowerPlant/getVppAdjustTime',
      data
    });
  }, 
  // 获取中间地图热力图数据
  getVppAdjustData() {
    return request.post({
      url: '/virtualPowerPlant/getVppAdjustData',
      data: {}
    });
  },
  // 地图上方指标
  getAdjustOverViewByTime(data) {
    return request.post({
      url: '/virtualPowerPlant/getAdjustOverViewByTime',
      data
    });
  },
  requestGeojsonData(fileName) {
    return getStaticFile(`static/geojson/${fileName}.geojson`);
  }
};
