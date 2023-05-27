/*
 * @Author: niyayong
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @Date: 2022-06-07 09:23:20
 * @LastEditTime: 2023-05-10 12:01:45
 * @FilePath: \zndd-web\src\router\permission.js
 * @Description: FilePath
 */
import router from './index';
import { useVisibleComponentStore } from '@/stores/visibleComponent'
import { useMapStore } from '@/stores/map'
router.beforeEach(async (to, from, next) => {
  const storeVisible = useVisibleComponentStore()
  const store = useMapStore()

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
  next();
});
