
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
