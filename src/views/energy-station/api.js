import request from '@sutpc/axios';
//站点容量排名
export const capacityRanking = () => {
  return request.post({
    url: '/energyStorage/capacityRanking',
  });
};