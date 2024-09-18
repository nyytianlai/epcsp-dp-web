import request from '@sutpc/axios';
export default {
  // 交能协同-左-营运巴士运行总览
  busCanRunOverview(data) {
    return request.post({
      url: '/busCan/busCanRunOverview',
      data
    });
  },
  // 交能协同-左-巴士可用能量态势
  busCanEnergy(data) {
    return request.post({
      url: '/busCan/busCanEnergy',
      data
    });
  },
  // 交能协同-左-巴士剩余电量分布
  busCanDistribution(data) {
    return request.post({
      url: '/busCan/busCanDistribution',
      data
    });
  },
  // 交能协同-右-虚拟电厂调节总览
  busCanAdjustmentOverview(data) {
    return request.post({
      url: '/busCan/busCanAdjustmentOverview',
      data
    });
  },
  // 交能协同-右-今日调节需求
  busCanAdjustmentDemand(data) {
    return request.post({
      url: '/busCan/busCanAdjustmentDemand',
      data
    });
  },
  // 交能协同-右-调节趋势分析
  busCanAdjustmentTrend(data) {
    return request.post({
      url: '/busCan/busCanAdjustmentTrend',
      data
    });
  },
  // 获取所有巴士gps
  getAllBus(data = {}) {
    return request.post({
      url: '/busCan/getAllBus',
      data
    });
  },
  // 传入参数后去gps 升序
  getGpsByPlateNumber(data) {
    return request.post({
      url: '/busCan/getGpsByPlateNumber',
      data
    });
  },
  // 获取围V2G充电站
  getNearestV2GStations(data) {
    return request.post({
      url: '/busCan/getNearestV2GStations',
      data
    });
  }
};
