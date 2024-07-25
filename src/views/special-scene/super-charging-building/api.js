import request from '@sutpc/axios';
import { mapRequestCancelId } from '@/global/config/map';
export default {
  // 左上方-超充站总量
  getSuperChargeStationCount() {
    return request.post({
      url: '/dp/superChargeStation/getSuperChargeStationCount',
      data: {}
    });
  },
  // 左下方-行政区分布情况
  getAreaDistribute() {
    return request.post({
      url: '/dp/superChargeStation/getAreaDistribute',
      data: {}
    });
  },
  // 右上方-运行趋势
  getChargeTrend(data) {
    return request.post({
      url: '/dp/superChargeStation/getChargeTrend',
      data
    });
  },
  // 右中-运营商运行排名
  getOperatorChargeStat() {
    return request.post({
      url: '/dp/superChargeStation/getOperatorChargeStat',
      data: {}
    });
  },
  // 右中-超充站运行排名
  getStationChargeStat() {
    return request.post({
      url: '/dp/superChargeStation/getStationChargeStat',
      data: {}
    });
  },
  // 右下-超充运营情况:场所分布
  getConstructionStationDistribute() {
    return request.post({
      url: '/dp/superChargeStation/getConstructionStationDistribute',
      data: {}
    });
  },
  // 右下-超充运营情况:功率分布
  getChargeCapacityDistribute() {
    return request.post({
      url: '/dp/superChargeStation/getChargeCapacityDistribute',
      data: {}
    });
  },
  // 顶部-超充站-总览上面4个指标:今日
  overTodayCount() {
    return request.post({
      url: '/dp/superChargeStation/overTodayCount',
      data: {}
    });
  },

  //总览区柱状图
  getDistrictBar() {
    request.cancel(mapRequestCancelId);
    return request.get({
      url: '/overviews/all/areaMap',
      cancelId: mapRequestCancelId
    });
  },
  //总览街道柱状图
  getStreetBar(data) {
    request.cancel(mapRequestCancelId);
    return request.post({
      url: '/overviews/all/streetMap',
      data,
      cancelId: mapRequestCancelId
    });
  }
};
