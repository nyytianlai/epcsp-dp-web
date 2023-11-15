<template>
  <video width="320" height="240" id="camera-video" autoplay muted>
    <source :src="videoUrl" type="video/mp4" />
    <source :src="videoUrl" type="video/ogg" />
    <source :src="videoUrl" type="video/webm" />
  </video>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';
const props = defineProps({
  videoUrl: {
    type: String,
    default: ''
  }
});
const { videoUrl } = toRefs(props);
</script>
<style lang="less" scoped>
#camera-video {
  width: 100%;
  height: 346px;
}
</style>
