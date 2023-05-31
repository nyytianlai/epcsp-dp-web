import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUeStore = defineStore('ue', () => {
  const isReady = ref(false);
  const showUeVideo = ref(false);

  function changeReady(value) {
    isReady.value = value;
  }
  function changeShowUeVideo(data) {
    showUeVideo.value = data;
  }
  // function sendUEmessage(message) {
  //   ready.then(() => {
  //     try {
  //       console.log(message);
  //       ps.emitMessage(message);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // }
  return {
    isReady,
    showUeVideo,
    changeReady,
    changeShowUeVideo
  };
});
