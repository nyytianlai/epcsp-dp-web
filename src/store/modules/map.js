const getters = {};
const state = {
  currentPosition: '深圳市',
  currentPositionBak: '',
  currentHrStationID: '',
  lastPosition: '',
  currentJd: '',
  currentQu: '',
  lastJd: '',
  lastQu: ''
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
  },
  CHANGE_LASTPOSITION: (state, lastPosition) => {
    state.lastPosition = lastPosition;
  },
  CHANGE_CURRENTJD: (state, currentJd) => {
    state.currentJd = currentJd;
  },
  CHANGE_CURRENTQU: (state, currentQu) => {
    state.currentQu = currentQu;
  },
  CHANGE_LASTJD: (state, lastJd) => {
    state.lastJd = lastJd;
  },
  CHANGE_LASTQU: (state, lastQu) => {
    state.lastQu = lastQu;
  }
};

export default {
  state,
  mutations,
  getters
};
