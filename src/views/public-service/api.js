import request from '@sutpc/axios';
import dayjs from 'dayjs';
const timeParams = () => ({
  startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
});
// 热门充电站TOP10
export const hotCharging = (data) => {
  return request.post({
    url: '/massService/stationRanking',
    data
  });
};
// 地图街道柱状图
// export const jdMonthRate = (areacode) => {
//   return request.get({
//     url: '/massService/queryStatisticsLeftAreaToMonthUseRatio',
//     data: {
//       areacode
//     }
//   });
// };
// 地图街道撒点
// export const getQuPoint = (areaCode) => {
//   return request.post({
//     url: '/massService/locationInfoByArea',
//     data: {
//       areaCode
//     }
//   });
// };
// 右下-本月日均利用率 以及地图柱状图
export const monthRate = () => {
  return request.get({
    url: '/massService/queryStatisticsLeftAreaToMonthUseRatio'
  });
};
// 大屏-公众服务-市民反馈，调取/personFeedback/query 中台默认接口
export const personFeedback = () => {
  return request.get({
    url: '/massService/citizenFeedback'
  });
};
// 设备管理/标题下四个统计数 实时设备信息统计
export const selectChargeEquipmentStatistics = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectChargeEquipmentStatistics'
  });
};

// 总览上面4个指标
export const overTotalCount = () => {
  return request.get({
    url: '/dp/api/v1/overview/overTotalCount'
  });
};

// 实时设备信息饼图
export const getChargeStatus = (type) => {
  return request.post({
    url: '/massService/getChargeStatus',
    data: {
      ...timeParams(),
      type
    }
  });
};

// 热门列表
export const stationRankingDetail = (data) => {
  return request.post({
    url: '/massService/stationRankingDetail',
    data
  });
};
// 反馈列表
export const feedbackDetail = (data) => {
  return request.post({
    url: '/massService/feedbackDetail',
    data
  });
};
