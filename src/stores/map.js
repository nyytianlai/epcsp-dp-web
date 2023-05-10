/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-05-10 10:39:51
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-10 11:49:29
 * @FilePath: \epcsp-dp-web\src\stores\system.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const currentPosition = ref('深圳市')
  const currentPositionBak = ref('')
  const currentHrStationID = ref('')
  const lastPosition = ref('')
  const currentJd = ref('')
  const currentQu = ref('')
  const lastJd = ref('')
  const lastQu = ref('')
  function changeCurrentPosition(data){
    currentPosition.value = data;
  }
  function changeCurrentPositionBak(data){
    currentPositionBak.value = data;
  }
  function changeCurrentHrStationId( data){
    currentHrStationID.value = data;
  }
  function changeLastPosition( data){
    lastPosition.value = data;
  }
  function changeCurrentJd( data){
    currentJd.value = data;
  }
  function changeCurrentQu( data){
    currentQu.value = data;
  }
  function changeLastJd( data){
    lastJd.value = data;
  }
  function changeLastQu( data){
    lastQu.value = data;
  }
  return {
    currentPosition,
    currentPositionBak,
    currentHrStationID,
    lastPosition,
    currentJd,
    currentQu,
    lastJd,
    lastQu,
    changeCurrentPosition,
    changeCurrentPositionBak,
    changeCurrentHrStationId,
    changeLastPosition,
    changeCurrentJd,
    changeCurrentQu,
    changeLastJd,
    changeLastQu
  }
})

// const state = {
//   currentPosition: '深圳市',
//   currentPositionBak: '',
//   currentHrStationID: '',
//   lastPosition: '',
//   currentJd: '',
//   currentQu: '',
//   lastJd: '',
//   lastQu: ''
// };
// const mutations = {
//   CHANGE_CURRENTPOSITION: (state, currentPosition) => {
//     state.currentPosition = currentPosition;
//   },
//   CHANGE_CURRENTPOSITIONBAK: (state, currentPositionBak) => {
//     state.currentPositionBak = currentPositionBak;
//   },
//   CHANGE_CURRENTHRSTATIONID: (state, currentHrStationID) => {
//     state.currentHrStationID = currentHrStationID;
//   },
//   CHANGE_LASTPOSITION: (state, lastPosition) => {
//     state.lastPosition = lastPosition;
//   },
//   CHANGE_CURRENTJD: (state, currentJd) => {
//     state.currentJd = currentJd;
//   },
//   CHANGE_CURRENTQU: (state, currentQu) => {
//     state.currentQu = currentQu;
//   },
//   CHANGE_LASTJD: (state, lastJd) => {
//     state.lastJd = lastJd;
//   },
//   CHANGE_LASTQU: (state, lastQu) => {
//     state.lastQu = lastQu;
//   }
// };

// export default {
//   state,
//   mutations,
//   getters
// };
