/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-05-10 10:39:51
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-10 11:49:29
 * @FilePath: \epcsp-dp-web\src\stores\system.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', () => {
  const currentPosition = ref('深圳市');
  const currentPositionBak = ref('');
  const currentHrStationID = ref('');
  const currentJd = ref('');
  const currentJdCode = ref('');
  const currentQu = ref('');
  const stationType = ref([]);
  const buttomTabCode = ref(1);
  const treeInfo = ref([]);
  const requestTimer = ref(null);

  function changeCurrentPosition(data) {
    currentPosition.value = data;
  }
  function changeCurrentPositionBak(data) {
    currentPositionBak.value = data;
  }
  function changeCurrentHrStationId(data) {
    console.log('changeCurrentHrStationId:' + data);
    currentHrStationID.value = data;
  }
  function changeCurrentJd(data) {
    currentJd.value = data;
  }
  function changeCurrentJdCode(data) {
    currentJdCode.value = data;
  }
  function changeCurrentQu(data) {
    currentQu.value = data;
  }
  function changeStationType(data) {
    stationType.value = data;
  }
  function changeButtomTabCode(data) {
    buttomTabCode.value = data;
  }
  function changeTreeInfo(data) {
    treeInfo.value = data;
  }
  function changeRequestTimer(data) {
    requestTimer.value = data;
  }
  return {
    currentPosition,
    currentPositionBak,
    currentHrStationID,
    currentJd,
    currentQu,
    stationType,
    buttomTabCode,
    treeInfo,
    currentJdCode,
    requestTimer,
    changeCurrentPosition,
    changeCurrentPositionBak,
    changeCurrentHrStationId,
    changeCurrentJd,
    changeCurrentQu,
    changeStationType,
    changeButtomTabCode,
    changeTreeInfo,
    changeCurrentJdCode,
    changeRequestTimer
  };
});
