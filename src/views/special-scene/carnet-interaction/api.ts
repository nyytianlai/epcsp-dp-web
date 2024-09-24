import request from '@sutpc/axios';
import dayjs from 'dayjs';
export default {
  // 车网互动-左-车网互动总览
  getVehicleNetInterOverview() {
    return request.post({
      url: '/vehicle/net/inter/getVehicleNetInterOverview'
    });
  },
  // 车网互动-左-V2G区域分布
  getV2GDistribution() {
    return request.post({
      url: '/vehicle/net/inter/getV2GDistribution'
    });
  },
  // 车网互动-右-虚拟电厂调节总览
  getV2GRankByOperator() {
    return request.post({
      url: '/vehicle/net/inter/getV2GRankByOperator'
    });
  },
  // 车网互动-地图V2G站点分布
  getV2GStationDistribution() {
    return request.post({
      url: '/vehicle/net/inter/getV2GStationDistribution'
    });
  },
  // 车网互动-地图V2G站点分布
  getV2GStationDistributionRealData() {
    return request.post({
      url: '/vehicle/net/inter/getV2GStationDistributionRealData'
    });
  },
  // 车网互动-V2G建设情况
  getV2GResourceDistribution() {
    return request.post({
      url: '/vehicle/net/inter/getV2GResourceDistribution'
    });
  },
  // 车网互动-V2G建设情况
  getV2GStationPlaceDistribution() {
    return request.post({
      url: '/vehicle/net/inter/getV2GStationPlaceDistribution'
    });
  },
  // 用电高峰
  getV2GChargeCapacityHour() {
    return request.post({
      url: '/vehicle/net/inter/getV2GChargeCapacityHour'
    });
  },
  // 用电高峰
  getV2GChargeCapacityHourByTime() {
    return request.post({
      url: '/vehicle/net/inter/getV2GChargeCapacityHourByTime',
      data: {
        startTime: dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
    });
  },
  // 用电高峰
  getV2GChargeCapacityStat(type: 0 | 1) {
    // 0:今年1今日
    return request.post({
      url: '/vehicle/net/inter/getV2GChargeCapacityStat',
      data: {
        startTime: !type
          ? dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss')
          : dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
    });
  }
};
