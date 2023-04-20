/*
 * @Author: niyayong
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @Date: 2022-04-18 17:27:55
 * @LastEditTime: 2023-04-20 18:50:12
 * @FilePath: \zndd-web\src\store\getters.js
 * @Description: FilePath
 */
const getters = {
  rootFontSize: (state) => state.system.rootFontSize,
  vHeight: (state) => state.system.vHeight,
  showComponent: (state) => state.visibleComponent.showComponent,
  showDetail: (state) => state.visibleComponent.showDetail,
  detailParams: (state) => state.visibleComponent.detailParams,
};
export default getters;
