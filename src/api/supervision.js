import request from '@sutpc/axios'; 

//地图告警柱状图
export const districtAlarmLevelStatics = () => {
  return request.get({
    url: '/safetySupervision/districtAlarmLevelStatics'
  })
}

export const getAlarmUpStatics = () => {
  return request.post({
    url: '/safetySupervision/getAlarmUpStatics'
  })
}

// 累计告警数据信息
export const safetySupervisionAccumulated = (type) => {
  return request.get({
    url: '/safetySupervision/safetySupervisionAccumulated',
    data: {
      type
    }
  })
}

// 行政区告警数据
export const districtAlarmStatics = () => {
  return request.get({
    url: '/safetySupervision/districtAlarmStatics'
  })
}

// 今日设备告警监控
export const alarmLevelAndTypeByTime = (param) => {
  return request.get({
    url: '/safetySupervision/alarmLevelAndTypeByTime',
    data: {
      ...param
    }
  })
}

// 实时告警趋势情况
export const alarmLevelAndTypeByTIme = (param) => {
  return request.get({
    url: '/safetySupervision/alarmLevelAndTypeByTIme',
    data: {
      ...param
    }
  })
}