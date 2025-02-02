import request from '@sutpc/axios';
import dayjs from 'dayjs';
//地图告警柱状图
export const districtAlarmLevelStatics = (areaCode) => {
  return request.get({
    url: '/safetySupervision/districtAlarmLevelStatics',
    data: {
      areaCode
    }
  });
};

//地图站点状态柱状图
export const getMapAreaStationByPower = (areaCode) => {
  return request.post({
    url: '/safetySupervision/getMapAreaStationByPower',
    data: { areaCode }
  });
};
// 地图区级下钻撒点
export const getQuStationWithAlarm = (areaCode) => {
  return request.post({
    url: '/safetySupervision/selectStationAlarmInfoByArea',
    data: {
      areaCode
    }
  });
};
export const getAlarmUpStatics = () => {
  return request.get({
    url: '/safetySupervision/getAlarmUpStatics'
  });
};

// 累计告警数据信息
export const safetySupervisionAccumulated = (params) => {
  return request.post({
    url: '/safetySupervision/safetySupervisionAccumulated',
    data: {
      ...params
    }
  });
};

// 行政区告警数据
export const districtAlarmStatics = (data) => {
  return request.get({
    url: '/safetySupervision/districtAlarmStatics',
    data
  });
};

// 今日设备告警监控
export const alarmLevelAndTypeByTime = (param) => {
  return request.get({
    url: '/safetySupervision/alarmLevelAndTypeByTime',
    data: {
      ...param
    }
  });
};

// 实时告警趋势情况
export const periodAlarmStaticsByTime = (param) => {
  return request.get({
    url: '/safetySupervision/periodAlarmStaticsByTime',
    data: {
      ...param
    }
  });
};

// 实时状态情况
export const getOnlineStatus = (type) => {
  return request.get({
    url: '/safetySupervision/getOnlineStatus',
    data: {
      type
    }
  });
};
const timeParams = () => ({
  startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
});
//今日告警信息 /dp/api/v1/overview/alarmInfo
export const alarmInfo = (params) => {
  return request.post({
    url: '/dp/api/v1/overview/alarmInfo',
    data: {
      ...timeParams(),
      ...params
    }
  });
};
