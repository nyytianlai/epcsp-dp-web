import request from '@sutpc/axios';
export default {
  // 车网互动-左-车网互动总览
  getVehicleNetInterOverview() {
    return request.post({
      url: '/vehicle/net/inter/getVehicleNetInterOverview',
    });
  },
  // 车网互动-左-V2G区域分布
  getV2GDistribution() {
    return request.post({
      url: '/vehicle/net/inter/getV2GDistribution',
    });
  },
  // 车网互动-右-虚拟电厂调节总览
  getV2GRankByOperator() {
    return request.post({
      url: '/vehicle/net/inter/getV2GRankByOperator',
    });
  },
  // 车网互动-V2G建设情况
  getV2GResourceDistribution() {
    return request.post({
      url: '/vehicle/net/inter/getV2GResourceDistribution',
    });
  },

}