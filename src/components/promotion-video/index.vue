<template>
  <div class="video-box">
    <!-- <video class="video" ref="videoRef" autoplay :muted="muted">
      <source :src="videoUrl" type="video/mp4" />
    </video> -->
    <video class="video" ref="videoRef" autoplay muted @click="play">
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <div id="test"></div>
    <div class="close" @click="handleCloseVideo">x</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useVisibleComponentStore } from '@/stores/visibleComponent';
const videoRef = ref();
const muted = ref(true);
const videoUrl = ref('http://10.10.2.63:9109/lx/videos/home_video.mp4');
const store = useVisibleComponentStore();
const handleCloseVideo = () => {
  store.changeShowPromitionVideo(false);
};
const play = () => {
  videoRef.value.muted = false;
  videoRef.value.play();
};
onMounted(() => {
  nextTick(() => {
    if (videoRef.value.muted) {
      // videoRef.value.muted = false;
      // videoRef.value.play();
    }
  });
  // 监听视频播放结束
  videoRef.value.addEventListener('ended', () => {
    console.log('播放结束');
    handleCloseVideo();
  });
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
