/*
 * @Author: niyayong
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @Date: 2022-06-07 09:23:20
 * @LastEditTime: 2023-04-20 19:02:36
 * @FilePath: \zndd-web\src\router\permission.js
 * @Description: FilePath
 */
import router from './index';
import store from '../store'
router.beforeEach(async (to, from, next) => {
    console.log(store);
    store.commit('CHANGE_SHOW_COMPONENT', true);
    store.commit('CHANGE_SHOW_DETAIL', {
      show: false,
      params: {}
    });
    next()
});
