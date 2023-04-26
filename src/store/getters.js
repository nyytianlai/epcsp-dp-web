/*
 * @Author: niyayong
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @Date: 2022-04-18 17:27:55
 * @LastEditTime: 2023-04-23 14:46:45
 * @FilePath: \zndd-web\src\store\getters.js
 * @Description: FilePath
 */
const getters = {
  rootFontSize: (state) => state.system.rootFontSize,
  vHeight: (state) => state.system.vHeight,
  showComponent: (state) => state.visibleComponent.showComponent,
  showDetail: (state) => state.visibleComponent.showDetail,
  detailParams: (state) => state.visibleComponent.detailParams,
  isInDetail: (state) => state.visibleComponent.isInDetail,
  panelShow: (state) => state.visibleComponent.panelShow,
  currentPosition: (state) => state.map.currentPosition,
  currentPositionBak: (state) => state.map.currentPositionBak,
  currentHrStationID: (state) => state.map.currentHrStationID
};
export default getters;
