/*
 * @Author: niyayong
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @Date: 2022-06-07 09:23:20
 * @LastEditTime: 2023-04-23 19:00:30
 * @FilePath: \zndd-web\src\router\permission.js
 * @Description: FilePath
 */
import router from './index';
import store from '../store';
router.beforeEach(async (to, from, next) => {
  store.commit('CHANGE_SHOW_COMPONENT', true);
  store.commit('CHANGE_SHOW_PANEL', true);
  store.commit('CHANGE_SHOW_DETAIL', {
    show: false,
    params: {}
  });
  store.commit('CHANGE_CURRENTPOSITION', '深圳市');
  store.commit('CHANGE_CURRENTPOSITIONBAK', '');
  store.commit('CHANGE_CURRENTHRSTATIONID', '');
  next();
});
