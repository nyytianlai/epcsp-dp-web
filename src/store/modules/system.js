/*
 * @Author: niyayong
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @Date: 2022-04-18 17:27:55
 * @LastEditTime: 2023-04-11 11:52:47
 * @FilePath: \zndd-web\src\store\modules\system.js
 * @Description: FilePath
 */

const getters = {};
const state = {
  rootFontSize: 100,
  vHeight: 1080
};
const mutations = {
  CHANGE_ROOT_FONTSIZE: (state, { rootFontSize, vHeight }) => {
    state.rootFontSize = rootFontSize;
    state.vHeight = vHeight;
  }
};

export default {
  state,
  mutations,
  getters
};
