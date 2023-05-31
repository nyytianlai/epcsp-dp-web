import request from '@sutpc/axios';
//全局站点搜索
export const stationSearch = (stationName) => {
  return request.post({
    url: '/global/stationSearch',
    data:{
        stationName
    }
  });
};