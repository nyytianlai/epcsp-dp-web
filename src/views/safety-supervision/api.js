/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-19 15:23:24
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 19:55:25
 * @FilePath: \epcsp-dp-web\src\api\supervision.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  return request.post({
    url: '/safetySupervision/getAlarmUpStatics'
  });
};

// 累计告警数据信息
export const safetySupervisionAccumulated = (params) => {
  return request.get({
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
export const alarmLevelAndTypeByTIme = (param) => {
  return request.get({
    url: '/safetySupervision/alarmLevelAndTypeByTIme',
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
  endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
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
