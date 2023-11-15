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
  const szOrSs = ref('sz');

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
  function changeSzOrSs(data) {
    szOrSs.value = data;
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
    szOrSs,
    changeCurrentPosition,
    changeCurrentPositionBak,
    changeCurrentHrStationId,
    changeCurrentJd,
    changeCurrentQu,
    changeStationType,
    changeButtomTabCode,
    changeTreeInfo,
    changeCurrentJdCode,
    changeRequestTimer,
    changeSzOrSs
  };
});
