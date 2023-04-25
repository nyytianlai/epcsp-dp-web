const getters = {};
const state = {
  currentPosition: '深圳市',
  currentPositionBak: '',
  currentHrStationID: ''
};
const mutations = {
  CHANGE_CURRENTPOSITION: (state, currentPosition) => {
    state.currentPosition = currentPosition;
  },
  CHANGE_CURRENTPOSITIONBAK: (state, currentPositionBak) => {
    state.currentPositionBak = currentPositionBak;
  },
  CHANGE_CURRENTHRSTATIONID: (state, currentHrStationID) => {
    state.currentHrStationID = currentHrStationID;
  }
};

export default {
  state,
  mutations,
  getters
};
