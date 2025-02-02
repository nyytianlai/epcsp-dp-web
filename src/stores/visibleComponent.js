import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useVisibleComponentStore = defineStore('visibleComponent', () => {
  const showComponent = ref(true);
  const showDetail = ref(false);
  const detailParams = ref({});
  const isInDetail = ref(false);
  const panelShow = ref(true);
  const showPromitionVideo = ref(true);

  function changeShowComponent(data) {
    showComponent.value = data;
    if (data) {
      isInDetail.value = false;
    }
  }

  function changeShowDetail({ show, params }) {
    showDetail.value = show;
    detailParams.value = { ...params };
    if (show) {
      isInDetail.value = true;
    }
  }

  function changeShowPanel(data) {
    panelShow.value = data;
  }
  function changeShowPromitionVideo(data) {
    showPromitionVideo.value = data;
  }
  return {
    showComponent,
    showDetail,
    detailParams,
    isInDetail,
    panelShow,
    showPromitionVideo,
    changeShowComponent,
    changeShowDetail,
    changeShowPanel,
    changeShowPromitionVideo
  };
});

// const state = {
//   showComponent: true,
//   showDetail: false,
//   detailParams: {},
//   isInDetail: false,
//   panelShow: true
// };
// const mutations = {
//   CHANGE_SHOW_COMPONENT: (state, data) => {
//     state.showComponent = data;
//     if (data) {
//       state.isInDetail = false;
//     }
//   },
//   CHANGE_SHOW_DETAIL: (state, { show, params }) => {
//     state.showDetail = show;
//     state.detailParams = {...params};
//     console.log('CHANGE_SHOW_DETAIL',state.detailParams);
//     if (show) {
//       state.isInDetail = true;
//     }
//   },
//   CHANGE_SHOW_PANEL: (state, data) => {
//     state.panelShow = data;
//   }
// };

// export default {
//   state,
//   mutations,
//   getters
// };
