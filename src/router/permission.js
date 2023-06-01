/*
 * @Author: niyayong
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @Date: 2022-06-07 09:23:20
 * @LastEditTime: 2023-05-10 12:01:45
 * @FilePath: \zndd-web\src\router\permission.js
 * @Description: FilePath
 */
import router from './index';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
import { useMapStore } from '@/stores/map';
import { getToken } from '@/utils/auth';
const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if (hasToken) {
    const storeVisible = useVisibleComponentStore();
    const store = useMapStore();

    storeVisible.changeShowComponent(true);
    storeVisible.changeShowPanel(true);
    storeVisible.changeShowDetail({
      show: false,
      params: {}
    });
    store.changeCurrentPosition('深圳市');
    store.changeCurrentPositionBak('');
    store.changeCurrentHrStationId('');
    store.changeCurrentQu('');
    store.changeCurrentJd('');
    store.changeStationType([]);
    store.changeButtomTabCode(1);
    store.changeCurrentJdCode('');
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
    }
  }

  // const storeVisible = useVisibleComponentStore();
  // const store = useMapStore();

  // storeVisible.changeShowComponent(true);
  // storeVisible.changeShowPanel(true);
  // storeVisible.changeShowDetail({
  //   show: false,
  //   params: {}
  // });
  // store.changeCurrentPosition('深圳市');
  // store.changeCurrentPositionBak('');
  // store.changeCurrentHrStationId('');
  // store.changeCurrentQu('');
  // store.changeCurrentJd('');
  // store.changeStationType([]);
  // store.changeButtomTabCode(1);
  // store.changeCurrentJdCode('');
  // next();
});
