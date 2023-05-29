/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-05-09 19:39:47
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 19:56:20
 * @FilePath: \epcsp-dp-web\src\components\map-layer\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@sutpc/axios';
//总览区级柱状图
export const getRectBar = () => {
  return request.post({
    url: '/dp/api/v1/overview/selectChargeEquipmentByArea'
  });
};
//总览街道级柱状图
export const getRectBarByStreet = (areaCode) => {
  return request.post({
    url: '/dp/api/v1/overview/selectStreetChargeEquipmentByAreaCode',
    data: {
      areaCode
    }
  });
};
// 地图区级下钻撒点 总览 设备管理 公众服务
export const getJdStation = (data) => {
    return request.post({
      url: '/dp/api/v1/equipmentManage/selectStationInfoByStreetId',
      data: data
    });
};
  
//设备管理地图柱状图 区
export const getEquipmentBar = (data) => {
    return request.post({
      url: '/dp/api/v1/equipmentManage/selectChargeEquipmentByArea',
      data
    });
  };
//设备管理地图柱状图 街道
export const getEquipmentBarByStreet = (data) => {
    return request.post({
      url: '/dp/api/v1/equipmentManage/selectStreetChargeEquipmentByAreaCode',
      data
    });
};
  
// 地图街道柱状图
export const jdMonthRate = (areacode) => {
    return request.get({
      url: '/massService/queryStatisticsLeftAreaToMonthUseRatio',
      data: {
        areacode
      }
    });
};
  
//地图告警柱状图
export const districtAlarmLevelStatics = (areaCode,alarmLevel) => {
  return request.post({
    url: '/safetySupervision/districtAlarmLevelStatics',
    data: {
      areaCode,
      alarmLevel
    }
  });
};

//地图站点状态柱状图
export const getMapStationStatistic = (areaCode,statusType) => {
  return request.post({
    url: '/safetySupervision/mapStationStatistic',
    data: { areaCode,statusType }
  });
};

// 地图区级下钻撒点
export const getQuStationWithAlarm = (data) => {
  return request.post({
    url: '/safetySupervision/selectStationAlarmInfoByArea',
    data
  });
};