import request, { getStaticFile } from '@sutpc/axios';
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
    request.cancel('/dp/superChargeStation/getChargeTrend');
    return request.post({
      url: '/dp/superChargeStation/getChargeTrend',
      data,
      cancelId: '/dp/superChargeStation/getChargeTrend'
    });
  },
  // 右中-运营商运行排名
  getOperatorChargeStat(data = {}) {
    request.cancel('/dp/superChargeStation/getOperatorChargeStat');
    return request.post({
      url: '/dp/superChargeStation/getOperatorChargeStat',
      data,
      cancelId: '/dp/superChargeStation/getOperatorChargeStat'
    });
  },
  // 右中-超充站运行排名
  getStationChargeStat(data = {}) {
    request.cancel('/dp/superChargeStation/getOperatorChargeStat');
    return request.post({
      url: '/dp/superChargeStation/getStationChargeStat',
      data,
      cancelId: '/dp/superChargeStation/getOperatorChargeStat'
    });
  },
  // 右下-超充运营情况:场所分布
  getConstructionStationDistribute() {
    request.cancel('/dp/superChargeStation/getConstructionStationDistribute');
    return request.post({
      url: '/dp/superChargeStation/getConstructionStationDistribute',
      data: {},
      cancelId: '/dp/superChargeStation/getConstructionStationDistribute'
    });
  },
  // 右下-超充运营情况:功率分布
  getChargeCapacityDistribute() {
    request.cancel('/dp/superChargeStation/getConstructionStationDistribute');
    return request.post({
      url: '/dp/superChargeStation/getChargeCapacityDistribute',
      data: {},
      cancelId: '/dp/superChargeStation/getConstructionStationDistribute'
    });
  },
  // 顶部-超充站-总览上面4个指标:今日
  overTodayCount(data = {}) {
    return request.post({
      url: '/dp/superChargeStation/overTodayCount',
      data
    });
  },

  //总览区柱状图
  getDistrictBar() {
    request.cancel(mapRequestCancelId);
    return request.post({
      url: '/dp/superChargeStation/getAreaDistribute',
      data: {}
    });
  },
  //地图-街道分布情况
  getStreetBar(data) {
    request.cancel(mapRequestCancelId);
    return request.post({
      url: '/dp/superChargeStation/getStreetDistribute',
      data,
      cancelId: mapRequestCancelId
    });
  },
  //地图-超充站分布情况
  getScStationDistribute(data) {
    request.cancel(mapRequestCancelId);
    return request.post({
      url: '/dp/superChargeStation/getScStationDistribute',
      data,
      cancelId: mapRequestCancelId
    });
  },
  //地图-撒点-通用
  // 设备管理/根据街道id查询站点信息，streetId:街道id；equipmentType（必填）:1-桩；2-枪；chargeType（选填）：1-快充；2-慢充；3-超充；4-V2G
  selectStationInfoByStreetId(data) {
    request.cancel(mapRequestCancelId);
    return request.post({
      url: '/dp/api/v1/equipmentManage/selectStationInfoByStreetId',
      data,
      cancelId: mapRequestCancelId
    });
  },
  requestGeojsonData(fileName) {
    return getStaticFile(`static/geojson/${fileName}.geojson`);
  }
};
