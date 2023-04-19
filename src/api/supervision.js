import request from '@sutpc/axios'; 

export const districtAlarmLevelStatics = () => {
  return request.get({
    url: '/safetySupervision/districtAlarmLevelStatics'
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
export const alarmLevelAndTypeByTime = () => {
  return request.get({
    url: '/safetySupervision/alarmLevelAndTypeByTime'
  })
}

// 实时告警趋势情况
export const alarmLevelAndTypeByTIme = () => {
  return request.get({
    url: '/safetySupervision/alarmLevelAndTypeByTIme'
  })
}