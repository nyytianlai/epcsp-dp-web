import request from '@sutpc/axios'; 

//地图告警柱状图
export const districtAlarmLevelStatics = () => {
  return request.get({
    url: '/safetySupervision/districtAlarmLevelStatics'
  })
}

// 累计告警数据信息
export const safetySupervisionAccumulated = () => {
  return request.get({
    url: '/safetySupervision/safetySupervisionAccumulated'
  })
}
