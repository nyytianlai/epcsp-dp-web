<template>
  <div class="video-box">
    <video class="video" ref="videoRef" autoplay loop :muted="muted" @click="play">
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <!-- <video-player
      ref="videoRef"
      :src="videoUrl"
      :loop="true"
      :volume="0.6"
      :autoplay="true"
      :muted="muted"
      @ready="play"
    /> -->
    <div id="test"></div>
    <div class="close" @click="handleCloseVideo">x</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
const videoRef = ref();
const muted = ref(true);
const videoUrl = ref('/promotion/lx/videos/home_video.mp4');
const store = useVisibleComponentStore();
// 视频播放状态
let playStatus = '';
const handleCloseVideo = () => {
  store.changeShowPromitionVideo(false);
};
const play = () => {
  // 第一次点击更改静音状态，视频不暂停
  if (sessionStorage.getItem('promition')) {
    if (playStatus === 'playing') {
      videoRef.value.pause();
    } else if (playStatus === 'pause') {
      videoRef.value.play();
    }
  } else {
    videoRef.value.muted = false;
    sessionStorage.setItem('promition', 'promition');
  }
};
onMounted(() => {
  videoRef.value.addEventListener('playing', function () {
    playStatus = 'playing';
    //播放中的函数
    console.log('播放中');
  });
  videoRef.value.addEventListener('pause', function () {
    playStatus = 'pause';
    //播放暂停执行的函数
    console.log('暂停播放');
  });
  if (sessionStorage.getItem('promition')) {
    videoRef.value.muted = false;
  }
});
</script>
<style lang="less" scoped>
.video-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #010527;
  .video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .close {
    width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 18px;
    text-align: center;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
}
</style>
