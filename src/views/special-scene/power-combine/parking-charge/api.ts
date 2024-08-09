import request, { getStaticFile } from '@sutpc/axios';
import { mapRequestCancelId } from '@/global/config/map';
export default {
  // 左上方-停充接入总览
  parkChargingOverview() {
    return request.post({
      url: '/parkCharging/parkChargingOverview',
      data: {}
    });
  },
  // 左中-停车区域分布 显示当前数量；按照停充配比降序排名。
  parkChargingAreaDistribution() {
    return request.post({
      url: '/parkCharging/parkChargingAreaDistribution',
      data: {}
    });
  },
  // 左下方-停充一体化停车场排名 显示TOP10，按照停充配比降序排名
  parkChargingRank(data = {}) {
    return request.post({
      url: '/parkCharging/parkChargingRank',
      data
    });
  },
  // 右上-停充运行总览
  parkChargingRunOverview(data = {}) {
    return request.post({
      url: '/parkCharging/parkChargingRunOverview',
      data
    });
  },
  // 右中-区域停充运行情况
  parkChargingAreaRunOverview(data = {}) {
    return request.post({
      url: '/parkCharging/parkChargingAreaRunOverview',
      data
    });
  },
  // 右下-停充运行趋势分析
  parkChargingRunTrend() {
    return request.post({
      url: '/parkCharging/parkChargingRunTrend',
      data: {}
    });
  },
  //停车区域 、 街道 、站点 分布
  parkChargingDistribution(data) {
    request.cancel(mapRequestCancelId);
    return request.post({
      url: '/parkCharging/parkChargingDistribution',
      data
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
