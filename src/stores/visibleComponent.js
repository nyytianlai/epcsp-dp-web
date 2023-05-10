/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-20 17:47:18
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-10 11:10:32
 * @FilePath: \epcsp-dp-web\src\store\modules\visibleComponent.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref } from 'vue';

import { defineStore } from 'pinia'

export const useVisibleComponentStore = defineStore('visibleComponent', () => {
  const showComponent = ref(true)
  const showDetail = ref(false)
  const detailParams = ref({})
  const isInDetail = ref(false)
  const panelShow = ref(true)

  function changeShowComponent(data) {
    showComponent.value = data
    if (data) {
      isInDetail.value = false
    }
  }

  function changeShowDetail({ show, params }) {
    showDetail.value = show;
    detailParams.value = {...params};
    if (show) {
      isInDetail.value = true;
    }
  }

  function changeShowPanel(data) {
    panelShow.value = data;
  }
  return { showComponent, showDetail,detailParams,isInDetail,panelShow,changeShowComponent,changeShowDetail,changeShowPanel }
})


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
