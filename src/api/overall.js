/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 15:15:30
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-19 16:31:55
 * @FilePath: \epcsp-dp-web\src\api\overall.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@sutpc/axios';
import dayjs from 'dayjs';

// 总览上面4个指标
export const overTotalCount = () => {
  return request.get({
    url: '/dp/api/v1/overview/overTotalCount'
  });
};
//充电设施总量
export const totalFacilities = () => {
  return request.get({
    url: '/dp/api/v1/overview/totalFacilities'
  });
};
// 充电桩总量：pile，充电枪总量：gun
export const totalEquipment = (type) => {
  return request.post({
    url: '/dp/api/v1/overview/totalEquipment',
    data: {
      type
    }
  });
};
//运营企业年度TOP10-充电桩:pile,充电枪:gun,充电站:station
export const stationOpeTop10 = (type) => {
  return request.post({
    url: '/dp/api/v1/overview/stationOpeTop10',
    data: {
      type
    }
  });
};
//地图柱状图
export const getRectBar = () => {
  return request.get({
    url: '/dp/api/v1/equipmentManage/selectChargeEquipmentByArea'
  });
};
//地图热力图
export const getHeatMap = () => {
  return request.get({
    url: 'dp/api/v1/overview/areaPower'
  });
};
//今日-充电桩/充电枪信息充电桩:pile,充电枪:gun
export const dayEquInfo = (type) => {
  return request.post({
    url: '/dp/api/v1/overview/dayEquInfo',
    data: {
      type,
      startTime: '2022-04-18 00:00:00',
      endTime: '2022-04-18 23:59:59'
    }
  });
};

// 今日充电功率信息
export const dayPower = () => {
  return request.post({
    url: '/dp/api/v1/overview/dayPower',
    data: {
      startTime: '2023-04-18 00:00:00',
      endTime: '2023-04-18 23:59:59'
    }
  });
};

// 今日告警统计数据
export const alarmCount = (params) => {
  return request.post({
    url: '/dp/api/v1/overview/alarmCount',
    data: {
      startTime: '2023-03-01 00:00:00',
      endTime: '2023-03-01 23:59:59'
    }
  });
};

//今日告警信息 /dp/api/v1/overview/alarmInfo
export const alarmInfo = (params) => {
  return request.post({
    url: '/dp/api/v1/overview/alarmInfo',
    data: {
      startTime: '2023-03-01 00:00:00',
      endTime: '2023-03-01 23:59:59',
      ...params
    }
  });
};

// /dp/api/v1/overview/timePowerGraph 实时功率图表
export const timePowerGraph = () => {
  return request.post({
    url: '/dp/api/v1/overview/timePowerGraph',
    data: {
      startTime: '2023-04-18 00:00:00',
      endTime: '2023-04-18 23:59:59'
    }
  });
};
